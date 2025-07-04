import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface CoachingPromptProps {
  prompt: string;
  className?: string;
}

export const CoachingPrompt: React.FC<CoachingPromptProps> = ({
  prompt,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <GlassCard className="p-6 border-l-4 border-violet-400">
        <div className="flex items-start space-x-3">
          <MessageCircle className="w-6 h-6 text-violet-400 mt-1 flex-shrink-0" />
          <p className="text-white/90 leading-relaxed">{prompt}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
};