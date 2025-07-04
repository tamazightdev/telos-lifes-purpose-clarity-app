# TELOS - Life Purpose Clarity App

<div align="center">
  <img src="https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=800" alt="TELOS Banner" width="800" height="300" style="border-radius: 12px; object-fit: cover;">
  
  [![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

## 🎯 Purpose

**TELOS** is a comprehensive React-based web application that transforms abstract life frustrations into concrete, actionable missions through a guided coaching experience. Built on the proven TELOS framework, this app helps individuals systematically discover and organize their life purpose through 9 essential sections.

The name "TELOS" comes from the Greek word meaning "end goal" or "ultimate purpose" - exactly what this application helps you discover.

## ✨ Key Features

### 🧭 **Guided Coaching Flow**
- **Step-by-step progression** through all 9 TELOS sections
- **AI-powered coaching prompts** that adapt to your responses
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

## 📁 Project Structure

```
telos-life-purpose-app/
├── src/
│   ├── components/           # React components
│   │   ├── coaching/        # Coaching flow components
│   │   │   ├── sections/    # Individual TELOS sections
│   │   │   └── ...
│   │   ├── ui/              # Reusable UI components
│   │   └── ...
│   ├── data/                # Static data and problem database
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── ...
├── public/                  # Static assets
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

## 📱 User Experience

### First-Time Users
1. **Welcome Screen** - Beautiful introduction to TELOS
2. **Framework Explanation** - Understanding the methodology
3. **Guided Coaching** - Step-by-step section completion
4. **Progress Celebration** - Visual feedback and encouragement
5. **Export Options** - Multiple ways to save and share

### Returning Users
- **Dashboard Overview** - See existing TELOS files
- **Seamless Editing** - Jump to any section for updates
- **Progress Tracking** - Visual progress on goals and projects
- **Log Updates** - Easy addition of new journal entries

## 🎯 Target Audience

### Primary Users
- **Purpose Seekers** (25-45) - Individuals seeking life clarity and direction
- **Entrepreneurs** - Business owners aligning ventures with personal values
- **Career Changers** - Professionals considering major life transitions

### Secondary Users
- **Life Coaches** - Mentors using TELOS with clients
- **Students** - Young adults exploring career and life paths

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines
- Follow the existing code style and patterns
- Use TypeScript for type safety
- Maintain the glassmorphic design aesthetic
- Ensure responsive design across all devices
- Add appropriate animations and micro-interactions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **TELOS Framework** - The foundational methodology for life purpose clarity
- **Design Inspiration** - Apple's design principles and glassmorphic aesthetics
- **Community** - All users providing feedback and suggestions

---

<div align="center">
  <p><strong>Transform your life frustrations into actionable missions with TELOS</strong></p>
  <p>Built with ❤️ using React, TypeScript, and Tailwind CSS</p>
</div>