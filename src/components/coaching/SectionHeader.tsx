import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stepNumber: number;
  totalSteps: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  description,
  stepNumber,
  totalSteps
}) => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-violet-400 mr-4" />
        <div className="text-left">
          <div className="text-sm text-white/60">
            Step {stepNumber} of {totalSteps}
          </div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
      </div>
      <p className="text-lg text-white/80 max-w-2xl mx-auto">{description}</p>
    </motion.div>
  );
};