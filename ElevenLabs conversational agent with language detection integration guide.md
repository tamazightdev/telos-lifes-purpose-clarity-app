# ElevenLabs Conversational Agent with Language Detection Integration Guide

## Overview

This guide outlines how to integrate ElevenLabs Conversational AI with automatic language detection into the TELOS Life Purpose Clarity app. The integration will provide users with voice-guided coaching sessions that can automatically adapt to their preferred language.

## Integration Strategy

### 1. Voice-Guided Coaching Sessions

Transform the existing text-based coaching prompts into interactive voice conversations:

- **Problems Section**: Voice agent asks users about issues they want to solve
- **Missions Section**: Interactive discussion to define actionable missions
- **Narratives Section**: Conversational refinement of user stories
- **All Sections**: Voice guidance through each TELOS framework component

### 2. Automatic Language Detection

Implement ElevenLabs' language detection system to:

- Automatically detect user's spoken language
- Switch agent responses to match detected language
- Provide seamless multilingual coaching experience
- Support global users without manual language selection

### 3. Enhanced User Experience

- **Real-time Voice Interaction**: Replace static prompts with dynamic conversations
- **Adaptive Coaching**: AI agent adjusts questions based on user responses
- **Progress Tracking**: Voice confirmations and summaries
- **Accessibility**: Support for users who prefer voice over text input

## Technical Implementation Plan

### Phase 1: ElevenLabs Setup

#### 1.1 Account Configuration
```bash
# Sign up at elevenlabs.io
# Navigate to Conversational AI dashboard
# Create new agent with custom configuration
```

#### 1.2 Agent Configuration
```javascript
// Agent settings for TELOS coaching
const agentConfig = {
  name: "TELOS Life Purpose Coach",
  firstMessage: "Welcome to TELOS! I'm here to guide you through discovering your life purpose. What language would you prefer to use today?",
  systemPrompt: `You are a compassionate life purpose coach specializing in the TELOS framework. 
  
  Your role is to guide users through 9 sections:
  1. Problems - Help identify 1-3 issues they want to solve
  2. Missions - Define actionable missions with clear verbs
  3. Narratives - Craft their story in three formats
  4. Goals - Set SMART objectives
  5. Challenges - Identify obstacles
  6. Strategies - Develop approaches
  7. Projects - Create action plans
  8. History - Document key events
  9. Log - Maintain progress journal
  
  Guidelines:
  - Be encouraging and supportive
  - Ask clarifying questions
  - Provide examples when helpful
  - Keep responses concise but thorough
  - Adapt to user's communication style
  - Celebrate progress and insights`,
  
  supportedLanguages: [
    "en", "es", "fr", "de", "it", "pt", "ru", "ja", "ko", "zh", 
    "ar", "hi", "nl", "sv", "da", "no", "fi", "pl", "tr"
  ]
};
```

#### 1.3 Language Detection Setup
```javascript
// Enable language detection tool
const languageDetectionTool = {
  name: "language_detection",
  description: "Automatically switch to user's detected language or when explicitly requested",
  type: "system"
};

// Language presets for common languages
const languagePresets = {
  "es": {
    firstMessage: "¡Bienvenido a TELOS! Estoy aquí para guiarte en el descubrimiento de tu propósito de vida. ¿Cómo te gustaría comenzar?",
    overrides: {
      agent: {
        prompt: "Eres un coach compasivo especializado en el marco TELOS..."
      }
    }
  },
  "fr": {
    firstMessage: "Bienvenue à TELOS ! Je suis là pour vous guider dans la découverte de votre but dans la vie. Comment aimeriez-vous commencer ?",
    overrides: {
      agent: {
        prompt: "Vous êtes un coach de vie compatissant spécialisé dans le cadre TELOS..."
      }
    }
  },
  "de": {
    firstMessage: "Willkommen bei TELOS! Ich bin hier, um Sie bei der Entdeckung Ihres Lebenszwecks zu begleiten. Wie möchten Sie beginnen?",
    overrides: {
      agent: {
        prompt: "Sie sind ein einfühlsamer Lebenscoach, der sich auf das TELOS-Framework spezialisiert hat..."
      }
    }
  }
  // Add more languages as needed
};
```

### Phase 2: React Integration

#### 2.1 Install Dependencies
```bash
npm install @elevenlabs/react @elevenlabs/elevenlabs-js
```

#### 2.2 Create Voice Coaching Component
```typescript
// src/components/coaching/VoiceCoaching.tsx
import React, { useState, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

interface VoiceCoachingProps {
  section: string;
  onComplete: (data: any) => void;
  initialPrompt: string;
}

export const VoiceCoaching: React.FC<VoiceCoachingProps> = ({
  section,
  onComplete,
  initialPrompt
}) => {
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [volume, setVolume] = useState(0.8);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to TELOS voice coach');
    },
    onDisconnect: () => {
      console.log('Disconnected from voice coach');
      setIsActive(false);
    },
    onMessage: (message) => {
      setTranscript(prev => [...prev, message.text]);
    },
    onError: (error) => {
      console.error('Voice coaching error:', error);
    }
  });

  const startVoiceSession = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start conversation with agent
      await conversation.startSession({
        agentId: process.env.REACT_APP_ELEVENLABS_AGENT_ID,
        connectionType: 'webrtc'
      });
      
      setIsActive(true);
    } catch (error) {
      console.error('Failed to start voice session:', error);
    }
  };

  const endVoiceSession = async () => {
    await conversation.endSession();
    setIsActive(false);
  };

  const adjustVolume = async (newVolume: number) => {
    setVolume(newVolume);
    await conversation.setVolume({ volume: newVolume });
  };

  return (
    <GlassCard className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Voice Coaching: {section}
        </h3>
        <p className="text-white/70">
          Speak with your AI coach to work through this section
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          onClick={isActive ? endVoiceSession : startVoiceSession}
          variant={isActive ? "secondary" : "primary"}
          size="lg"
          className="flex items-center space-x-2"
        >
          {isActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          <span>{isActive ? 'End Session' : 'Start Voice Coaching'}</span>
        </Button>

        {isActive && (
          <div className="flex items-center space-x-2">
            <VolumeX className="w-4 h-4 text-white/60" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => adjustVolume(parseFloat(e.target.value))}
              className="w-20"
            />
            <Volume2 className="w-4 h-4 text-white/60" />
          </div>
        )}
      </div>

      {conversation.status === 'connected' && (
        <div className="mb-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
            <div className={`w-2 h-2 rounded-full ${conversation.isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span>{conversation.isSpeaking ? 'Coach is speaking...' : 'Listening...'}</span>
          </div>
        </div>
      )}

      {transcript.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4 max-h-60 overflow-y-auto">
          <h4 className="text-sm font-medium text-white/80 mb-2">Conversation</h4>
          <div className="space-y-2">
            {transcript.map((message, index) => (
              <p key={index} className="text-sm text-white/70">
                {message}
              </p>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
};
```

#### 2.3 Environment Configuration
```bash
# .env.local
REACT_APP_ELEVENLABS_API_KEY=your_api_key_here
REACT_APP_ELEVENLABS_AGENT_ID=your_agent_id_here
```

#### 2.4 Update Coaching Sections
```typescript
// src/components/coaching/sections/ProblemsSection.tsx
import { VoiceCoaching } from '../VoiceCoaching';

export const ProblemsSection: React.FC = () => {
  const [useVoiceCoaching, setUseVoiceCoaching] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Existing section header */}
      
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          variant={useVoiceCoaching ? "secondary" : "primary"}
          onClick={() => setUseVoiceCoaching(false)}
        >
          Text Input
        </Button>
        <Button
          variant={useVoiceCoaching ? "primary" : "secondary"}
          onClick={() => setUseVoiceCoaching(true)}
        >
          Voice Coaching
        </Button>
      </div>

      {useVoiceCoaching ? (
        <VoiceCoaching
          section="Problems"
          onComplete={(data) => {
            // Handle voice coaching completion
            updateTelosSection('problems', data);
          }}
          initialPrompt="Let's identify the problems you want to help solve. What issues in the world frustrate you or make you want to take action?"
        />
      ) : (
        // Existing text-based interface
        <div>
          {/* Current problems section content */}
        </div>
      )}
    </div>
  );
};
```

### Phase 3: Advanced Features

#### 3.1 Context-Aware Coaching
```typescript
// Enhanced agent prompts based on current section
const getSectionPrompt = (section: string, userData: any) => {
  const prompts = {
    problems: `Help the user identify 1-3 problems they want to solve. Current progress: ${userData.problems?.length || 0} problems identified.`,
    missions: `Based on their problems: ${userData.problems?.map(p => p.text).join(', ')}, help them define actionable missions.`,
    narratives: `Help craft their story in three formats based on their missions: ${userData.missions?.map(m => m.text).join(', ')}`
  };
  
  return prompts[section] || 'Guide the user through this section of the TELOS framework.';
};
```

#### 3.2 Progress Integration
```typescript
// Sync voice coaching results with existing store
const syncVoiceResults = (section: string, voiceData: any) => {
  const { updateTelosSection } = useTelosStore();
  
  // Parse voice coaching results and update store
  const parsedData = parseVoiceCoachingResults(voiceData);
  updateTelosSection(section, parsedData);
};
```

#### 3.3 Multilingual Support
```typescript
// Language detection and switching
const handleLanguageDetection = (detectedLanguage: string) => {
  // Update UI language
  setCurrentLanguage(detectedLanguage);
  
  // Update coaching prompts
  updateCoachingLanguage(detectedLanguage);
  
  // Notify user of language switch
  showLanguageChangeNotification(detectedLanguage);
};
```

## Implementation Steps

### Step 1: ElevenLabs Account Setup
1. Create account at [elevenlabs.io](https://elevenlabs.io)
2. Navigate to Conversational AI dashboard
3. Create new agent with TELOS coaching configuration
4. Enable language detection system tool
5. Configure supported languages and presets
6. Test agent in ElevenLabs dashboard

### Step 2: React Integration
1. Install ElevenLabs React SDK
2. Create VoiceCoaching component
3. Add environment variables
4. Integrate with existing coaching sections
5. Test voice functionality

### Step 3: Language Detection
1. Configure language presets in ElevenLabs
2. Implement language switching in React
3. Add UI indicators for current language
4. Test with multiple languages

### Step 4: Enhanced Features
1. Add context-aware prompting
2. Implement progress synchronization
3. Add voice coaching analytics
4. Optimize for mobile devices

### Step 5: Testing & Optimization
1. Test all coaching sections with voice
2. Verify language detection accuracy
3. Optimize for different accents/dialects
4. Performance testing and optimization

## Security Considerations

### API Key Management
```typescript
// Server-side token generation (recommended)
app.get('/conversation-token', authenticateUser, async (req, res) => {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${process.env.ELEVENLABS_AGENT_ID}`,
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      }
    }
  );
  
  const { token } = await response.json();
  res.json({ token });
});
```

### Privacy Protection
- Implement user consent for voice recording
- Add data retention policies
- Ensure GDPR compliance for EU users
- Provide voice data deletion options

## Expected Benefits

### User Experience
- **Accessibility**: Voice interface for users who prefer speaking
- **Engagement**: More interactive and personal coaching experience
- **Global Reach**: Automatic language detection removes barriers
- **Efficiency**: Faster input through natural conversation

### Technical Advantages
- **Modern Interface**: Cutting-edge voice AI integration
- **Scalability**: Cloud-based voice processing
- **Flexibility**: Easy to extend to new languages
- **Analytics**: Rich conversation data for insights

## Success Metrics

### User Engagement
- Voice session completion rates
- Average session duration
- User preference (voice vs text)
- Language detection accuracy

### Technical Performance
- Response latency
- Audio quality scores
- Error rates
- System uptime

## Future Enhancements

### Advanced Features
- **Emotion Detection**: Adapt coaching style based on user emotion
- **Voice Cloning**: Personalized coach voices
- **Group Coaching**: Multi-user voice sessions
- **Integration**: Connect with calendar, CRM, or other tools

### AI Improvements
- **Custom Training**: Train agent on TELOS-specific conversations
- **Personality Adaptation**: Adjust coaching style per user
- **Progress Tracking**: AI-powered progress analysis
- **Recommendations**: Intelligent next-step suggestions

## Conclusion

This integration will transform TELOS from a text-based tool into an interactive, voice-powered life coaching platform. The automatic language detection ensures global accessibility, while the conversational AI provides personalized guidance through the TELOS framework.

The implementation follows a phased approach, starting with basic voice integration and building toward advanced features like context-aware coaching and multilingual support. This creates a foundation for future enhancements while delivering immediate value to users.