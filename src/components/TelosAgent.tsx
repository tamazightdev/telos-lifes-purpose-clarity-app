import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversation } from '@elevenlabs/react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  X, 
  AlertCircle,
  Loader
} from 'lucide-react';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';

// FINAL AUDIO FIX v3: This hook now aligns the AudioContext sample rate to 16000 Hz.
// This matches the required setting in the ElevenLabs dashboard (PCM 16000 Hz).
// By ensuring the source and receiver have the exact same sample rate, we eliminate
// the root cause of the speed issue, providing a robust and permanent fix without
// needing playback rate workarounds.
const useManualAudioPlayback = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
                sampleRate: 16000, // Align with ElevenLabs setting
            });
        } catch (e) {
            console.error("Error creating AudioContext:", e);
        }
    }

    return () => {
      if (sourceNodeRef.current) {
        try {
            sourceNodeRef.current.stop();
        } catch (e) {}
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playNextInQueue = useCallback(async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    const audioData = audioQueueRef.current.shift();
    if (!audioData || !audioContextRef.current) {
        isPlayingRef.current = false;
        return;
    };

    if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
    }

    try {
      const audioBuffer = await audioContextRef.current.decodeAudioData(audioData);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      
      // Removed the playbackRate workaround as it's no longer needed.
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        playNextInQueue();
      };
      source.start();
      sourceNodeRef.current = source;
    } catch (error) {
      console.error('Error playing audio:', error);
      isPlayingRef.current = false;
      playNextInQueue();
    }
  }, []);

  const addAudioToQueue = useCallback((audioData: ArrayBuffer) => {
    audioQueueRef.current.push(audioData);
    if (!isPlayingRef.current) {
      playNextInQueue();
    }
  }, [playNextInQueue]);

  const stopPlayback = useCallback(() => {
    audioQueueRef.current = [];
    if (sourceNodeRef.current) {
        try {
            sourceNodeRef.current.stop();
        } catch (e) {
            console.error("Error stopping playback:", e);
        }
    }
    isPlayingRef.current = false;
  }, []);

  return { addAudioToQueue, stopPlayback };
};


interface Message {
  id: string;
  text: string;
  type: 'user' | 'agent' | 'system';
  timestamp: Date;
}

export const TelosAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  
  const { addAudioToQueue, stopPlayback } = useManualAudioPlayback();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to TELOS voice coach');
      setConnectionStatus('connected');
      addMessage('Connected to your TELOS voice coach! How can I help you today?', 'system');
    },
    onDisconnect: () => {
      console.log('Disconnected from voice coach');
      setIsActive(false);
      setConnectionStatus('disconnected');
      addMessage('Voice coaching session ended.', 'system');
      stopPlayback();
    },
    onMessage: (message) => {
      console.log('Received message:', message);
      if (message.type === 'agent_response' && message.audio) {
        addMessage(message.text, 'agent');
        addAudioToQueue(message.audio);
      } else if (message.type === 'user_transcript') {
        addMessage(message.text, 'user');
      }
    },
    onError: (error) => {
      console.error('Voice coaching error:', error);
      addMessage(`Error: ${error.message}`, 'system');
      setConnectionStatus('disconnected');
      setIsActive(false);
      stopPlayback();
    }
  });

  const addMessage = (text: string, type: 'user' | 'agent' | 'system') => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission('granted');
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setMicPermission('denied');
      addMessage('Microphone access is required for voice coaching. Please enable it in your browser settings.', 'system');
      return false;
    }
  };

  const startVoiceSession = async () => {
    try {
      setConnectionStatus('connecting');
      
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        setConnectionStatus('disconnected');
        return;
      }

      const conversationId = await conversation.startSession({
        agentId: 'agent_01jzcte6amegrvmax3k84bhwks',
        connectionType: 'webrtc',
      });
      
      console.log('Started conversation:', conversationId);
      setIsActive(true);
      addMessage('Starting voice coaching session...', 'system');
      
    } catch (error) {
      console.error('Failed to start voice session:', error);
      setConnectionStatus('disconnected');
      addMessage(`Failed to start voice session: ${error.message}`, 'system');
    }
  };

  const endVoiceSession = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Error ending session:', error);
      setIsActive(false);
      setConnectionStatus('disconnected');
      stopPlayback();
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connecting':
        return <Loader className="w-4 h-4 animate-spin text-yellow-400" />;
      case 'connected':
        return conversation.isSpeaking ? 
          <Volume2 className="w-4 h-4 text-green-400 animate-pulse" /> :
          <Mic className="w-4 h-4 text-green-400" />;
      default:
        return <MessageCircle className="w-4 h-4 text-white/60" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return conversation.isSpeaking ? 'Coach is speaking...' : 'Listening...';
      default:
        return 'Voice Coach';
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg relative"
          size="lg"
        >
          {getStatusIcon()}
          {connectionStatus === 'connected' && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-96 h-[600px] mb-20 mr-2"
              initial={{ x: 400, y: 100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: 400, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <div>
                      <h3 className="font-semibold text-white">TELOS Voice Coach</h3>
                      <p className="text-xs text-white/60">{getStatusText()}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-white/60 py-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Start a voice coaching session to begin your TELOS journey</p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.type === 'user'
                            ? 'bg-violet-500/20 text-white ml-4'
                            : message.type === 'agent'
                            ? 'bg-white/10 text-white/90 mr-4'
                            : 'bg-orange-500/20 text-orange-200 mx-4 text-center'
                        }`}
                      >
                        {message.text}
                        <div className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10 space-y-4">
                  {micPermission === 'denied' && (
                    <div className="flex items-center space-x-2 p-3 bg-red-500/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <p className="text-xs text-red-200">
                        Microphone access required. Please enable in browser settings.
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={isActive ? endVoiceSession : startVoiceSession}
                    variant={isActive ? "secondary" : "primary"}
                    size="lg"
                    className="w-full flex items-center justify-center space-x-2"
                    disabled={connectionStatus === 'connecting' || micPermission === 'denied'}
                  >
                    {connectionStatus === 'connecting' ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : isActive ? (
                      <>
                        <MicOff className="w-5 h-5" />
                        <span>End Session</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5" />
                        <span>Start Voice Coaching</span>
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-green-400' :
                      connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
                      'bg-gray-400'
                    }`} />
                    <span>
                      {connectionStatus === 'connected' ? 'Connected' :
                       connectionStatus === 'connecting' ? 'Connecting' :
                       'Disconnected'}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
