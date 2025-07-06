import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Loader, FileText, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { TextArea } from '../ui/TextArea';

interface VoiceCoachingProps {
  section: string;
  onComplete?: (userTranscript: string) => void;
  initialPrompt: string;
  className?: string;
}

interface Message {
  id: string;
  text: string;
  type: 'user' | 'agent' | 'system';
  timestamp: Date;
}

export const VoiceCoaching: React.FC<VoiceCoachingProps> = ({
  section,
  onComplete,
  initialPrompt,
  className
}) => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [volume, setVolume] = useState(0.8);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [showTranscript, setShowTranscript] = useState(false);

  // AUDIO PLAYBACK FIX: Explicitly set the AudioContext sample rate to 24kHz 
  // to match the incoming audio stream from ElevenLabs. This prevents the browser's
  // default sample rate (e.g., 48kHz) from playing the audio back at double speed.
  const conversation = useConversation({
    audioContextOptions: {
      sampleRate: 24000,
    },
    onConnect: () => {
      console.log(`Connected to TELOS voice coach for ${section}`);
      setConnectionStatus('connected');
      addMessage(`Voice coaching session started for ${section}. ${initialPrompt}`, 'system');
    },
    onDisconnect: () => {
      console.log('Disconnected from voice coach');
      setIsActive(false);
      setConnectionStatus('disconnected');
      addMessage('Voice coaching session ended.', 'system');
      
      // Show transcript when session ends
      if (userTranscript.trim()) {
        setShowTranscript(true);
      }
    },
    onMessage: (message) => {
      console.log('Received message:', message);
      if (message.type === 'agent_response') {
        addMessage(message.text, 'agent');
      } else if (message.type === 'user_transcript') {
        addMessage(message.text, 'user');
        // Accumulate user transcript
        setUserTranscript(prev => prev ? `${prev}\n\n${message.text}` : message.text);
      }
    },
    onError: (error) => {
      console.error('Voice coaching error:', error);
      addMessage(`Error: ${error.message}`, 'system');
      setConnectionStatus('disconnected');
      setIsActive(false);
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

  const startVoiceSession = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // The primary fix is setting the sampleRate in the useConversation hook options.
      const conversationId = await conversation.startSession({
        agentId: 'agent_01jzcte6amegrvmax3k84bhwks',
        connectionType: 'webrtc',
      });
      
      console.log('Started conversation:', conversationId);
      setIsActive(true);
      
    } catch (error) {
      console.error('Failed to start voice session:', error);
      setConnectionStatus('disconnected');
      addMessage(`Failed to start voice session: ${error.message}`, 'system');
    }
  };

  const endVoiceSession = async () => {
    try {
      await conversation.endSession();
      setIsActive(false);
      setConnectionStatus('disconnected');
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  const adjustVolume = async (newVolume: number) => {
    setVolume(newVolume);
    try {
      await conversation.setVolume({ volume: newVolume });
    } catch (error) {
      console.error('Error adjusting volume:', error);
    }
  };

  const handleUseTranscript = () => {
    if (onComplete && userTranscript.trim()) {
      onComplete(userTranscript);
      setShowTranscript(false);
    }
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(userTranscript);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <GlassCard className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 mr-2" />
            Voice Coaching: {section}
          </h3>
          <p className="text-white/70">
            Speak with your AI coach to work through this section
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-400' :
              connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
              'bg-gray-400'
            }`} />
            <span className="text-white/60">
              {connectionStatus === 'connected' && conversation.isSpeaking ? 'Coach is speaking...' :
               connectionStatus === 'connected' ? 'Listening...' :
               connectionStatus === 'connecting' ? 'Connecting...' :
               'Disconnected'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          <Button
            onClick={isActive ? endVoiceSession : startVoiceSession}
            variant={isActive ? "secondary" : "primary"}
            size="lg"
            className="flex items-center space-x-2"
            disabled={connectionStatus === 'connecting'}
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

          {isActive && (
            <div className="flex items-center space-x-3 w-full max-w-xs">
              <VolumeX className="w-4 h-4 text-white/60" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => adjustVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <Volume2 className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/60 w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Transcript Review Modal */}
        {showTranscript && userTranscript.trim() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <GlassCard className="p-4 border-violet-400/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-white flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Your Voice Responses
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyTranscript}
                  className="flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
                <p className="text-sm text-white/80 whitespace-pre-wrap">
                  {userTranscript}
                </p>
              </div>
              
              <div className="text-xs text-white/60 mb-4">
                Review your responses above and use them to populate the {section.toLowerCase()} section. 
                You can manually extract key points and add them using the form below.
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleUseTranscript}
                  size="sm"
                  className="flex-1"
                >
                  Use This Transcript
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowTranscript(false)}
                  size="sm"
                >
                  Dismiss
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="bg-white/5 rounded-lg p-4 max-h-60 overflow-y-auto">
            <h4 className="text-sm font-medium text-white/80 mb-3">Conversation</h4>
            <div className="space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-lg text-xs ${
                      message.type === 'user'
                        ? 'bg-violet-500/20 text-white'
                        : message.type === 'agent'
                        ? 'bg-white/10 text-white/90'
                        : 'bg-orange-500/20 text-orange-200 text-center'
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
          </div>
        )}

        {/* Initial Prompt Display */}
        {messages.length === 0 && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white/80 mb-2">Coaching Prompt</h4>
            <p className="text-sm text-white/70">{initialPrompt}</p>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};
