import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelosStore } from '../../store/telosStore';
import { ProblemsSection } from './sections/ProblemsSection';
import { MissionsSection } from './sections/MissionsSection';
import { NarrativesSection } from './sections/NarrativesSection';
import { CompletionSection } from './sections/CompletionSection';

const sectionComponents = {
  problems: ProblemsSection,
  missions: MissionsSection,
  narratives: NarrativesSection,
  goals: CompletionSection, // Placeholder for now
  challenges: CompletionSection, // Placeholder for now
  strategies: CompletionSection, // Placeholder for now
  projects: CompletionSection, // Placeholder for now
  history: CompletionSection, // Placeholder for now
  log: CompletionSection, // Placeholder for now
};

export const CoachingFlow: React.FC = () => {
  const { currentSection } = useTelosStore();
  const CurrentComponent = sectionComponents[currentSection];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};