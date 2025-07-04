import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2 } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { Button } from '../../ui/Button';
import { useTelosStore } from '../../../store/telosStore';

export const CompletionSection: React.FC = () => {
  const { currentTelos, setIsCoaching } = useTelosStore();

  const handleExport = () => {
    if (currentTelos) {
      const dataStr = JSON.stringify(currentTelos, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'telos-' + new Date().toISOString().split('T')[0] + '.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const handleStartOver = () => {
    setIsCoaching(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">
          Congratulations!
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          You've completed the first sections of your TELOS framework. 
          This is a great start to clarifying your life purpose!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What's Next?</h2>
          <div className="space-y-4 text-white/80">
            <p>
              You've identified your key problems, defined your missions, and crafted your narratives. 
              The remaining sections (Goals, Challenges, Strategies, Projects, History, and Log) will be 
              available in the next update.
            </p>
            <p>
              For now, you can export your progress and continue refining your responses.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          onClick={handleExport}
          className="flex items-center justify-center space-x-2"
          size="lg"
        >
          <Download className="w-5 h-5" />
          <span>Export Progress</span>
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleStartOver}
          className="flex items-center justify-center space-x-2"
          size="lg"
        >
          <Share2 className="w-5 h-5" />
          <span>Start Over</span>
        </Button>
      </motion.div>
    </div>
  );
};