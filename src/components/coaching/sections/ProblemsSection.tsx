import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, X, Plus, MessageCircle, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SectionHeader } from '../SectionHeader';
import { CoachingPrompt } from '../CoachingPrompt';
import { ProblemSuggestions } from '../ProblemSuggestions';
import { VoiceCoaching } from '../VoiceCoaching';
import { GlassCard } from '../../ui/GlassCard';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { useTelosStore } from '../../../store/telosStore';
import { Problem } from '../../../types/telos';

const problemSchema = z.object({
  text: z.string().min(1, 'Problem text is required').max(100, 'Problem must be 100 characters or less'),
});

type ProblemFormData = z.infer<typeof problemSchema>;

export const ProblemsSection: React.FC = () => {
  const { currentTelos, updateTelosSection, markSectionComplete, setCurrentSection } = useTelosStore();
  const [problems, setProblems] = useState<Problem[]>(currentTelos?.problems || []);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [useVoiceCoaching, setUseVoiceCoaching] = useState(false);
  const [voiceInputTranscript, setVoiceInputTranscript] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema)
  });

  const currentText = watch('text', '');
  const wordCount = currentText.trim().split(/\s+/).filter(word => word.length > 0).length;

  const onSubmit = (data: ProblemFormData) => {
    if (problems.length >= 3) return;

    const newProblem: Problem = {
      id: crypto.randomUUID(),
      text: data.text,
      category: 'custom',
      personalRelevance: 5,
      isCustom: true
    };

    const updatedProblems = [...problems, newProblem];
    setProblems(updatedProblems);
    updateTelosSection('problems', updatedProblems);
    reset();
  };

  const handleSelectProblem = (problemText: string) => {
    if (problems.length >= 3) return;

    const newProblem: Problem = {
      id: crypto.randomUUID(),
      text: problemText,
      category: 'suggested',
      personalRelevance: 5,
      isCustom: false
    };

    const updatedProblems = [...problems, newProblem];
    setProblems(updatedProblems);
    updateTelosSection('problems', updatedProblems);
  };

  const handleRemoveProblem = (id: string) => {
    const updatedProblems = problems.filter(p => p.id !== id);
    setProblems(updatedProblems);
    updateTelosSection('problems', updatedProblems);
  };

  const handleContinue = () => {
    if (problems.length > 0) {
      markSectionComplete('problems');
      setCurrentSection('missions');
    }
  };

  const handleVoiceCoachingComplete = (userTranscript: string) => {
    setVoiceInputTranscript(userTranscript);
    setUseVoiceCoaching(false); // Switch back to text input to show transcript
  };

  const extractFromTranscript = (text: string) => {
    setValue('text', text);
    setVoiceInputTranscript(''); // Clear transcript after use
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <SectionHeader
        icon={AlertCircle}
        title="Problems"
        description="What problems in the world do you want to help solve? Choose 1-3 issues that truly matter to you."
        stepNumber={1}
        totalSteps={9}
      />

      <CoachingPrompt
        prompt="Think about issues that frustrate you or situations you wish were different. These could be global problems, local community issues, or personal challenges. What problems do you feel called to address?"
      />

      {/* Voice/Text Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          variant={!useVoiceCoaching ? "primary" : "secondary"}
          onClick={() => setUseVoiceCoaching(false)}
          className="flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Text Input</span>
        </Button>
        <Button
          variant={useVoiceCoaching ? "primary" : "secondary"}
          onClick={() => setUseVoiceCoaching(true)}
          className="flex items-center space-x-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Voice Coaching</span>
        </Button>
      </div>

      {useVoiceCoaching ? (
        <VoiceCoaching
          section="Problems"
          onComplete={handleVoiceCoachingComplete}
          initialPrompt="Let's identify the problems you want to help solve. What issues in the world frustrate you or make you want to take action? Think about 1-3 problems that really matter to you."
        />
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Voice Input Transcript Display */}
            {voiceInputTranscript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-4 border-violet-400/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-white flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Voice Coaching Results
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setVoiceInputTranscript('')}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4 max-h-32 overflow-y-auto">
                    <p className="text-sm text-white/80 whitespace-pre-wrap">
                      {voiceInputTranscript}
                    </p>
                  </div>
                  
                  <div className="text-xs text-white/60 mb-3">
                    Review your voice responses above and extract specific problems to add below. 
                    You can click on key phrases to auto-fill the problem input.
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {voiceInputTranscript.split(/[.!?]+/).filter(sentence => sentence.trim().length > 10).map((sentence, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => extractFromTranscript(sentence.trim())}
                        className="text-xs bg-white/5 hover:bg-white/10"
                      >
                        "{sentence.trim().substring(0, 30)}..."
                      </Button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Problems ({problems.length}/3)</h3>
              
              {problems.length > 0 && (
                <div className="space-y-3 mb-6">
                  {problems.map((problem, index) => (
                    <motion.div
                      key={problem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard className="p-4 flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white/90">{problem.text}</p>
                          <p className="text-xs text-white/60 mt-1">
                            {problem.isCustom ? 'Custom' : 'Suggested'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveProblem(problem.id)}
                          className="text-white/60 hover:text-white ml-3"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              )}

              {problems.length < 3 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <TextArea
                    {...register('text')}
                    placeholder="Describe a problem you want to help solve..."
                    error={errors.text?.message}
                    className="min-h-[120px]"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      {wordCount} words (aim for 5-20 words)
                    </span>
                    <Button type="submit" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Problem
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-white/10">
                <Button
                  variant="secondary"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="w-full"
                >
                  {showSuggestions ? 'Hide' : 'Browse'} Problem Database
                </Button>
              </div>
            </GlassCard>

            {problems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={handleContinue}
                  className="w-full"
                  size="lg"
                >
                  Continue to Missions
                </Button>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            {showSuggestions && (
              <ProblemSuggestions
                onSelectProblem={handleSelectProblem}
                selectedProblems={problems.map(p => p.text)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};