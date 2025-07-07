import React, { useState, useEffect } from 'react';
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
  Loader,
  Send,
  Type
} from 'lucide-react';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { Input } from './ui/Input';

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
  const [volume, setVolume] = useState(0.8);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [textInput, setTextInput] = useState('');

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to TELOS voice coach');
      setConnectionStatus('connected');
      addMessage('Connected to your TELOS voice coach! You can speak or type to interact.', 'system');
    },
    onDisconnect: () => {
      console.log('Disconnected from voice coach');
      setIsActive(false);
      setConnectionStatus('disconnected');
      addMessage('Voice coaching session ended.', 'system');
      setTextInput('');
    },
    onMessage: (message) => {
      console.log('Received message:', message);
      if (message.type === 'agent_response') {
        addMessage(message.text, 'agent');
      } else if (message.type === 'user_transcript') {
        addMessage(message.text, 'user');
      }
    },
    onError: (error) => {
      console.error('Voice coaching error:', error);
      addMessage(`Error: ${error.message}`, 'system');
      setConnectionStatus('disconnected');
      setIsActive(false);
      setTextInput('');
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
        connectionType: 'webrtc'
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
      setIsActive(false);
      setConnectionStatus('disconnected');
      setTextInput('');
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

  const sendTextMessage = async () => {
    if (!textInput.trim() || !isActive) return;

    const messageText = textInput.trim();
    
    try {
      // Add user message to chat immediately
      addMessage(messageText, 'user');
      
      // Clear input field immediately for better UX
      setTextInput('');
      
      // Try different methods to send text message to ElevenLabs
      let messageSent = false;
      
      // Method 1: Direct sendMessage if available
      if (conversation && typeof conversation.sendMessage === 'function') {
        try {
          await conversation.sendMessage(messageText);
          messageSent = true;
          console.log('Text message sent via sendMessage');
        } catch (error) {
          console.log('sendMessage failed, trying alternative methods');
        }
      }
      
      // Method 2: sendText if available
      if (!messageSent && conversation && typeof conversation.sendText === 'function') {
        try {
          await conversation.sendText(messageText);
          messageSent = true;
          console.log('Text message sent via sendText');
        } catch (error) {
          console.log('sendText failed, trying alternative methods');
        }
      }
      
      // Method 3: Try accessing the internal conversation object
      if (!messageSent && conversation && conversation.conversation) {
        try {
          if (typeof conversation.conversation.sendMessage === 'function') {
            await conversation.conversation.sendMessage(messageText);
            messageSent = true;
            console.log('Text message sent via conversation.sendMessage');
          } else if (typeof conversation.conversation.sendText === 'function') {
            await conversation.conversation.sendText(messageText);
            messageSent = true;
            console.log('Text message sent via conversation.sendText');
          }
        } catch (error) {
          console.log('Internal conversation methods failed');
        }
      }
      
      // Method 4: Try using the WebRTC data channel if available
      if (!messageSent && conversation && conversation.dataChannel) {
        try {
          const messageData = JSON.stringify({
            type: 'user_message',
            text: messageText,
            timestamp: Date.now()
          });
          conversation.dataChannel.send(messageData);
          messageSent = true;
          console.log('Text message sent via data channel');
        } catch (error) {
          console.log('Data channel send failed');
        }
      }
      
      if (!messageSent) {
        // If all methods fail, show an error but don't remove the user message
        addMessage('Unable to send text message. Please try speaking instead or restart the session.', 'system');
        console.error('All text message sending methods failed');
      }
      
    } catch (error) {
      console.error('Error sending text message:', error);
      addMessage(`Failed to send message: ${error.message}`, 'system');
      // Restore the text input if there was an error
      setTextInput(messageText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
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
                      <p className="text-xs mt-2 text-white/40">You can use voice or text to communicate</p>
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

                  {isActive && (
                    <div className="flex items-center space-x-3">
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

                  {/* Text Input Section - Available when session is active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2 text-xs text-white/60">
                        <Type className="w-3 h-3" />
                        <span>Type or speak to interact with your coach</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Input
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={conversation.isSpeaking ? "Coach is speaking..." : "Type your message..."}
                          disabled={conversation.isSpeaking}
                          className="flex-1 text-sm py-2"
                        />
                        <Button
                          onClick={sendTextMessage}
                          disabled={!textInput.trim() || conversation.isSpeaking}
                          size="sm"
                          className="px-3"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
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