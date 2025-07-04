import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, Clock, Brain, Heart } from 'lucide-react';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { useTelosStore } from '../store/telosStore';

export const Welcome: React.FC = () => {
  const { initializeTelos, setIsCoaching } = useTelosStore();

  const handleStart = () => {
    initializeTelos();
    setIsCoaching(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Target className="w-20 h-20 mx-auto mb-8 text-violet-400 animate-pulse-slow" />
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400">
            TELOS
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your abstract life frustrations into concrete, actionable missions through our guided coaching experience.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard className="p-6 text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white mb-2">Intelligent Guidance</h3>
            <p className="text-white/70">AI-powered coaching prompts and problem suggestions</p>
          </GlassCard>
          
          <GlassCard className="p-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-orange-400" />
            <h3 className="text-lg font-semibold text-white mb-2">7-10 Minutes</h3>
            <p className="text-white/70">Quick yet thorough first draft of your life purpose</p>
          </GlassCard>
          
          <GlassCard className="p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
            <h3 className="text-lg font-semibold text-white mb-2">Purpose Clarity</h3>
            <p className="text-white/70">Systematic approach to discovering your true calling</p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GlassCard className="p-8 mb-8 text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">What is TELOS?</h2>
            <p className="text-white/80 mb-4">
              TELOS is a comprehensive framework that guides you through 9 essential sections 
              to clarify your life purpose and create actionable plans.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div>• <strong>Problems:</strong> Identify issues that matter to you</div>
              <div>• <strong>Missions:</strong> Define your calling to action</div>
              <div>• <strong>Narratives:</strong> Craft your story in different formats</div>
              <div>• <strong>Goals:</strong> Set SMART objectives</div>
              <div>• <strong>And 5 more sections...</strong></div>
            </div>
          </GlassCard>

          <Button
            size="lg"
            onClick={handleStart}
            className="text-xl px-12 py-6"
          >
            Start Your Journey
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};