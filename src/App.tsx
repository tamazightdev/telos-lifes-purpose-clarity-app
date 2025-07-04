import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Welcome } from './components/Welcome';
import { CoachingFlow } from './components/coaching/CoachingFlow';
import { useTelosStore } from './store/telosStore';

function App() {
  const { isCoaching } = useTelosStore();

  return (
    <div className="font-sans min-h-screen">
      <Background />
      <Header />
      
      <AnimatePresence mode="wait">
        {isCoaching ? (
          <CoachingFlow key="coaching" />
        ) : (
          <Welcome key="welcome" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;