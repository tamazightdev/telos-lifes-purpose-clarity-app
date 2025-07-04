import React from 'react';
import { motion } from 'framer-motion';
import { Target, Home, Download } from 'lucide-react';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { useTelosStore } from '../store/telosStore';

export const Header: React.FC = () => {
  const { completedSections, isCoaching, setIsCoaching } = useTelosStore();
  const totalSections = 9;
  const completedCount = completedSections.size;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-violet-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400">
              TELOS
            </h1>
          </div>
          
          {isCoaching && (
            <div className="flex-1 max-w-md mx-8">
              <div className="text-center mb-2">
                <span className="text-sm text-white/70">
                  Progress: {completedCount}/{totalSections} sections
                </span>
              </div>
              <ProgressBar progress={completedCount} total={totalSections} />
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCoaching(!isCoaching)}
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={completedCount === 0}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};