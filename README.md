# TELOS - Life Purpose Clarity App

<div align="center">
  <img src="https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=800" alt="TELOS Banner" width="800" height="300" style="border-radius: 12px; object-fit: cover;">
  
  [![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![ElevenLabs](https://img.shields.io/badge/ElevenLabs-AI_Voice-FF6B35?style=for-the-badge&logo=microphone&logoColor=white)](https://elevenlabs.io/)
</div>

## 🎯 Purpose

**TELOS** is a comprehensive React-based web application that transforms abstract life frustrations into concrete, actionable missions through a guided coaching experience. Built on the proven TELOS framework, this app helps individuals systematically discover and organize their life purpose through 9 essential sections.

The name "TELOS" comes from the Greek word meaning "end goal" or "ultimate purpose" - exactly what this application helps you discover.

## ✨ Key Features

### 🎙️ **AI-Powered Voice Coaching** ⭐ NEW!
- **Real-time voice conversations** with ElevenLabs AI coach
- **Automatic language detection** - speak in any supported language
- **Intelligent coaching prompts** that adapt to your responses
- **Seamless voice-to-text integration** for natural conversations
- **Always-available floating voice coach** accessible throughout the app
- **Section-specific voice guidance** for each TELOS framework component

### 🧭 **Guided Coaching Flow**
- **Step-by-step progression** through all 9 TELOS sections
- **Dual input modes**: Choose between traditional text input or voice coaching
- **Visual progress tracking** showing completion across sections
- **Contextual guidance** for each section with examples and best practices

### 🎨 **Beautiful Glassmorphic Design**
- **Stunning visual experience** with animated gradient backgrounds
- **Glassmorphic UI components** with backdrop blur effects
- **Smooth animations** powered by Framer Motion
- **Responsive design** optimized for all devices
- **Apple-level design aesthetics** with attention to detail

### 🧠 **Intelligent Problem Database**
- **200+ curated real-world problems** across 12 categories:
  - Poverty & Economic Inequality
  - Government, Politics & Justice
  - War, Conflict & Human Rights
  - Technology, AI & The Internet
  - Health & Well-being
  - Environment & Energy
  - And 6 more comprehensive categories
- **Smart search functionality** with real-time filtering
- **Category-based browsing** for inspiration
- **Custom problem addition** for personalized needs

### 📝 **Dynamic TELOS Builder**
- **Interactive forms** with real-time validation
- **Smart suggestions** based on your input patterns
- **Progress persistence** with automatic saving
- **Section linking** showing relationships between elements

### 📊 **Export & Sharing**
- **Multiple export formats**: JSON, Markdown (PDF coming soon)
- **Shareable progress** for coaches and mentors
- **Local storage** for offline capability
- **Data persistence** across sessions

## 🎙️ Voice Coaching Features

### **Floating Voice Coach**
The TELOS app includes an always-available AI voice coach powered by ElevenLabs:

- **Floating Button**: Located in the bottom-right corner, accessible from any screen
- **Real-time Status**: Visual indicators show connection status and speaking state
- **Beautiful Interface**: Glassmorphic modal with conversation history
- **Volume Controls**: Adjustable audio levels for optimal experience

### **Section-Specific Voice Coaching**
Each TELOS section offers optional voice coaching:

- **Toggle Interface**: Switch between text input and voice coaching
- **Contextual Prompts**: AI coach asks relevant questions for each section
- **Natural Conversations**: Speak naturally about your thoughts and ideas
- **Progress Integration**: Voice responses automatically sync with your TELOS data

### **Automatic Language Detection**
The voice coach automatically detects and responds in your preferred language:

- **20+ Supported Languages**: Including English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Dutch, Swedish, Danish, Norwegian, Finnish, Polish, and Turkish
- **Seamless Switching**: No manual language selection required
- **Cultural Adaptation**: Coaching style adapts to different cultural contexts
- **Global Accessibility**: Removes language barriers for international users

### **How to Use Voice Coaching**

#### **1. Floating Voice Coach (Always Available)**
1. Look for the floating button in the bottom-right corner
2. Click the button to open the voice coach interface
3. Click "Start Voice Coaching" to begin a conversation
4. Grant microphone permission when prompted
5. Speak naturally with your AI coach about your TELOS journey

#### **2. Section-Specific Voice Coaching**
1. Navigate to any TELOS section (Problems, Missions, Narratives, etc.)
2. Look for the "Voice Coaching" toggle button
3. Switch from "Text Input" to "Voice Coaching"
4. Click "Start Voice Coaching" to begin section-specific guidance
5. Follow the AI coach's prompts to work through that section

#### **3. Voice Coaching Tips**
- **Speak Clearly**: Use a normal conversational tone
- **Be Natural**: The AI understands natural speech patterns
- **Take Your Time**: Pause between thoughts - the AI will wait
- **Ask Questions**: The coach can clarify or provide examples
- **Use Any Language**: Speak in your preferred language - detection is automatic

## 🏗️ The TELOS Framework

The app guides you through 9 essential sections:

1. **Problems** - Identify 1-3 issues you want to help solve
2. **Missions** - Define your calling with clear action verbs
3. **Narratives** - Craft your story in three formats (short, conversational, pitch)
4. **Goals** - Set SMART objectives linked to your missions
5. **Challenges** - Identify internal and external obstacles
6. **Strategies** - Develop approaches to overcome challenges
7. **Projects** - Create actionable project plans
8. **History** - Document key life events and milestones
9. **Log** - Maintain ongoing progress journal

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** (recommended) or **npm**
- **Modern browser** with microphone support (for voice features)

### Installation

#### Using pnpm (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd telos-life-purpose-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

#### Using npm

```bash
# Clone the repository
git clone <repository-url>
cd telos-life-purpose-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🌐 Access the Application

Once the development server starts, open your browser and navigate to:
```
http://localhost:5173
```

The application will automatically reload when you make changes to the source code.

### 🎙️ Voice Coaching Setup

The voice coaching features are pre-configured and ready to use:

1. **Microphone Permission**: The app will request microphone access when you first use voice features
2. **ElevenLabs Integration**: Uses a public agent ID for immediate functionality
3. **Language Detection**: Automatically enabled - just speak in your preferred language
4. **No Additional Setup**: Voice coaching works out of the box

## 📁 Project Structure

```
telos-life-purpose-app/
├── src/
│   ├── components/           # React components
│   │   ├── coaching/        # Coaching flow components
│   │   │   ├── sections/    # Individual TELOS sections
│   │   │   ├── VoiceCoaching.tsx  # Voice coaching component
│   │   │   └── ...
│   │   ├── ui/              # Reusable UI components
│   │   ├── TelosAgent.tsx   # Floating voice coach
│   │   └── ...
│   ├── data/                # Static data and problem database
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── ...
├── public/                  # Static assets
├── .env.local              # Environment variables (voice agent config)
└── ...
```

## 🛠️ Available Scripts

### Development
```bash
# Start development server
pnpm dev          # or npm run dev

# Build for production
pnpm build        # or npm run build

# Preview production build
pnpm preview      # or npm run preview

# Run linting
pnpm lint         # or npm run lint
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Purple (#8B5CF6), Violet (#A855F7)
- **Accents**: Pink (#EC4899), Cyan (#06B6D4), Orange (#FB923C)
- **Success**: Emerald (#10B981)
- **Voice**: Green (#10B981) for active states, Yellow (#F59E0B) for connecting

### Typography
- **Font**: Inter (300, 400, 500, 600, 700, 800)
- **Headings**: Gradient text effects
- **Body**: High contrast white/transparent combinations

### Glass Components
- **Background**: Semi-transparent white overlays
- **Borders**: Subtle white borders with transparency
- **Backdrop**: Blur effects for depth
- **Hover States**: Smooth transitions and micro-interactions

## 🔧 Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphic components
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand for lightweight state management
- **Build Tool**: Vite for fast development and building
- **Icons**: Lucide React for consistent iconography
- **Voice AI**: ElevenLabs Conversational AI with React SDK
- **Audio Processing**: WebRTC for low-latency voice communication

## 📱 User Experience

### First-Time Users
1. **Welcome Screen** - Beautiful introduction to TELOS
2. **Framework Explanation** - Understanding the methodology
3. **Voice Coach Introduction** - Optional voice coaching demonstration
4. **Guided Coaching** - Step-by-step section completion with voice or text
5. **Progress Celebration** - Visual feedback and encouragement
6. **Export Options** - Multiple ways to save and share

### Returning Users
- **Dashboard Overview** - See existing TELOS files
- **Voice Coach Always Available** - Floating button for instant access
- **Seamless Editing** - Jump to any section for updates with voice or text
- **Progress Tracking** - Visual progress on goals and projects
- **Log Updates** - Easy addition of new journal entries via voice or text

### Voice Coaching Experience
- **Natural Conversations** - Speak as you would with a human coach
- **Intelligent Responses** - AI understands context and provides relevant guidance
- **Language Flexibility** - Automatic detection and response in your language
- **Visual Feedback** - See conversation history and connection status
- **Seamless Integration** - Voice responses automatically update your TELOS data

## 🎯 Target Audience

### Primary Users
- **Purpose Seekers** (25-45) - Individuals seeking life clarity and direction
- **Entrepreneurs** - Business owners aligning ventures with personal values
- **Career Changers** - Professionals considering major life transitions
- **Global Users** - International users preferring voice interaction in native languages

### Secondary Users
- **Life Coaches** - Mentors using TELOS with clients (voice coaching adds new dimension)
- **Students** - Young adults exploring career and life paths
- **Accessibility Users** - Those who prefer or require voice-based interfaces

## 🌍 Supported Languages (Voice Coaching)

The voice coach automatically detects and responds in:

- **English** (en) - Primary language
- **Spanish** (es) - Español
- **French** (fr) - Français
- **German** (de) - Deutsch
- **Italian** (it) - Italiano
- **Portuguese** (pt) - Português
- **Russian** (ru) - Русский
- **Japanese** (ja) - 日本語
- **Korean** (ko) - 한국어
- **Chinese** (zh) - 中文
- **Arabic** (ar) - العربية
- **Hindi** (hi) - हिन्दी
- **Dutch** (nl) - Nederlands
- **Swedish** (sv) - Svenska
- **Danish** (da) - Dansk
- **Norwegian** (no) - Norsk
- **Finnish** (fi) - Suomi
- **Polish** (pl) - Polski
- **Turkish** (tr) - Türkçe

## 🔒 Privacy & Security

### Voice Data Protection
- **No Permanent Storage**: Voice conversations are not permanently stored
- **Secure Transmission**: All audio data encrypted in transit
- **User Consent**: Clear permission requests for microphone access
- **Data Control**: Users can end sessions and clear conversation history

### API Security
- **Public Agent**: Uses ElevenLabs public agent for secure access
- **No API Keys Exposed**: All sensitive credentials handled securely
- **HTTPS Only**: All communications over secure connections

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines
- Follow the existing code style and patterns
- Use TypeScript for type safety
- Maintain the glassmorphic design aesthetic
- Ensure responsive design across all devices
- Add appropriate animations and micro-interactions
- Test voice features across different browsers and devices
- Consider accessibility for voice and traditional interfaces

### Voice Feature Development
- Test with multiple languages and accents
- Ensure graceful fallbacks for voice failures
- Maintain conversation context and flow
- Optimize for low-latency audio processing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **TELOS Framework** - The foundational methodology for life purpose clarity
- **ElevenLabs** - Advanced AI voice technology and conversational AI platform
- **Design Inspiration** - Apple's design principles and glassmorphic aesthetics
- **Community** - All users providing feedback and suggestions
- **Voice AI Community** - Pioneers in conversational AI and voice interfaces

## 🚀 Future Enhancements

### Voice Coaching Roadmap
- **Emotion Detection** - Adapt coaching style based on user emotion
- **Voice Cloning** - Personalized coach voices
- **Group Coaching** - Multi-user voice sessions
- **Advanced Analytics** - Voice conversation insights and patterns
- **Offline Voice** - Local voice processing capabilities
- **Custom Agents** - User-created coaching personalities

### Platform Expansion
- **Mobile Apps** - Native iOS and Android applications
- **Desktop Apps** - Electron-based desktop versions
- **API Platform** - Third-party integrations and extensions
- **Enterprise Features** - Team coaching and organizational TELOS

---

<div align="center">
  <p><strong>Transform your life frustrations into actionable missions with TELOS</strong></p>
  <p>Now featuring AI-powered voice coaching with automatic language detection</p>
  <p>Built with ❤️ using React, TypeScript, Tailwind CSS, and ElevenLabs AI</p>
</div>