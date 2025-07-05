import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, X, ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SectionHeader } from '../SectionHeader';
import { CoachingPrompt } from '../CoachingPrompt';
import { VoiceCoaching } from '../VoiceCoaching';
import { GlassCard } from '../../ui/GlassCard';
import { TextArea } from '../../ui/TextArea';
import { Button } from '../../ui/Button';
import { useTelosStore } from '../../../store/telosStore';
import { Mission } from '../../../types/telos';

const missionSchema = z.object({
  text: z.string().min(1, 'Mission text is required'),
  problemId: z.string().min(1, 'Please select a problem'),
});

type MissionFormData = z.infer<typeof missionSchema>;

const actionVerbs = [
  'Create', 'Build', 'Develop', 'Design', 'Educate', 'Empower', 'Connect',
  'Inspire', 'Transform', 'Improve', 'Solve', 'Innovate', 'Lead', 'Support',
  'Organize', 'Advocate', 'Research', 'Teach', 'Heal', 'Protect'
];

export const MissionsSection: React.FC = () => {
  const { currentTelos, updateTelosSection, markSectionComplete, setCurrentSection } = useTelosStore();
  const [missions, setMissions] = useState<Mission[]>(currentTelos?.missions || []);
  const [useVoiceCoaching, setUseVoiceCoaching] = useState(false);
  const [voiceInputTranscript, setVoiceInputTranscript] = useState<string>('');
  const problems = currentTelos?.problems || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<MissionFormData>({
    resolver: zodResolver(missionSchema)
  });

  const selectedProblemId = watch('problemId');

  const onSubmit = (data: MissionFormData) => {
    const newMission: Mission = {
      id: crypto.randomUUID(),
      text: data.text,
      problemId: data.problemId,
      actionVerb: data.text.split(' ')[0] || 'Create'
    };

    const updatedMissions = [...missions, newMission];
    setMissions(updatedMissions);
    updateTelosSection('missions', updatedMissions);
    reset();
  };

  const handleRemoveMission = (id: string) => {
    const updatedMissions = missions.filter(m => m.id !== id);
    setMissions(updatedMissions);
    updateTelosSection('missions', updatedMissions);
  };

  const handleContinue = () => {
    if (missions.length > 0) {
      markSectionComplete('missions');
      setCurrentSection('narratives');
    }
  };

  const handleVoiceCoachingComplete = (userTranscript: string) => {
    setVoiceInputTranscript(userTranscript);
    setUseVoiceCoaching(false);
  };

  const extractFromTranscript = (text: string) => {
    setValue('text', text);
    setVoiceInputTranscript('');
  };

  const getSelectedProblem = (problemId: string) => {
    return problems.find(p => p.id === problemId);
  };

  const problemsContext = problems.map(p => p.text).join(', ');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <SectionHeader
        icon={Target}
        title="Missions"
        description="Based on your problems, what are you called to do? Define your missions with clear action verbs."
        stepNumber={2}
        totalSteps={9}
      />

      <CoachingPrompt
        prompt="Your missions should start with strong action verbs and clearly connect to the problems you identified. Think about what you want to accomplish, not just what you want to change."
      />

      {/* Voice/Text Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          variant={!useVoiceCoaching ? "primary" : "secondary"}
          onClick={() => setUseVoiceCoaching(false)}
          className="flex items-center space-x-2"
        >
          <Target className="w-4 h-4" />
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
          section="Missions"
          onComplete={handleVoiceCoachingComplete}
          initialPrompt={`Based on the problems you identified: ${problemsContext}, let's define your missions. What are you called to do? Think about actionable missions that start with strong verbs like Create, Build, Develop, or Transform.`}
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
                    Extract specific missions from your voice responses. Look for action-oriented statements.
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
              <h3 className="text-lg font-semibold text-white mb-4">Your Missions ({missions.length})</h3>
              
              {missions.length > 0 && (
                <div className="space-y-3 mb-6">
                  {missions.map((mission, index) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-white/90 mb-2">{mission.text}</p>
                            <div className="flex items-center text-xs text-white/60">
                              <span className="bg-violet-400/20 px-2 py-1 rounded">
                                {mission.actionVerb}
                              </span>
                              <ArrowRight className="w-3 h-3 mx-2" />
                              <span>{getSelectedProblem(mission.problemId)?.text}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveMission(mission.id)}
                            className="text-white/60 hover:text-white ml-3"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/90 mb-2 block">
                    Link to Problem
                  </label>
                  <select
                    {...register('problemId')}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-400/50"
                  >
                    <option value="">Select a problem...</option>
                    {problems.map((problem) => (
                      <option key={problem.id} value={problem.id} className="bg-slate-800">
                        {problem.text}
                      </option>
                    ))}
                  </select>
                  {errors.problemId && (
                    <p className="text-sm text-red-400 mt-1">{errors.problemId.message}</p>
                  )}
                </div>

                <TextArea
                  {...register('text')}
                  placeholder="Start with an action verb... (e.g., 'Create accessible technology solutions...')"
                  error={errors.text?.message}
                  className="min-h-[120px]"
                />

                <Button type="submit" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Mission
                </Button>
              </form>
            </GlassCard>

            {missions.length > 0 && (
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
                  Continue to Narratives
                </Button>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h4 className="font-medium text-white mb-4">Action Verb Suggestions</h4>
              <div className="flex flex-wrap gap-2">
                {actionVerbs.map((verb) => (
                  <button
                    key={verb}
                    onClick={() => setValue('text', verb + ' ')}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white/80 transition-colors"
                  >
                    {verb}
                  </button>
                ))}
              </div>
            </GlassCard>

            {selectedProblemId && (
              <GlassCard className="p-6">
                <h4 className="font-medium text-white mb-2">Selected Problem</h4>
                <p className="text-white/80 text-sm">
                  {getSelectedProblem(selectedProblemId)?.text}
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
};