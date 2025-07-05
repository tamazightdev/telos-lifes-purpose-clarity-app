import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Presentation, MessageCircle, FileText, X } from 'lucide-react';
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

const narrativeSchema = z.object({
  short: z.string().max(75, 'Short narrative must be 15 words or less'),
  conversational: z.string().max(200, 'Conversational narrative should be one sentence'),
  pitch: z.string().max(500, 'Pitch should be around 70 words'),
});

type NarrativeFormData = z.infer<typeof narrativeSchema>;

export const NarrativesSection: React.FC = () => {
  const { currentTelos, updateTelosSection, markSectionComplete, setCurrentSection } = useTelosStore();
  const [activeTab, setActiveTab] = useState<'short' | 'conversational' | 'pitch'>('short');
  const [useVoiceCoaching, setUseVoiceCoaching] = useState(false);
  const [voiceInputTranscript, setVoiceInputTranscript] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<NarrativeFormData>({
    resolver: zodResolver(narrativeSchema),
    defaultValues: currentTelos?.narratives || {
      short: '',
      conversational: '',
      pitch: ''
    }
  });

  const watchedValues = watch();

  const onSubmit = (data: NarrativeFormData) => {
    updateTelosSection('narratives', data);
    markSectionComplete('narratives');
    setCurrentSection('goals');
  };

  const handleVoiceCoachingComplete = (userTranscript: string) => {
    setVoiceInputTranscript(userTranscript);
    setUseVoiceCoaching(false);
  };

  const extractFromTranscript = (text: string, field: 'short' | 'conversational' | 'pitch') => {
    setValue(field, text);
    setVoiceInputTranscript('');
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const tabs = [
    {
      id: 'short' as const,
      label: 'Short (15 words)',
      icon: MessageSquare,
      description: 'Elevator pitch version',
      placeholder: 'A concise statement of your purpose...'
    },
    {
      id: 'conversational' as const,
      label: 'Conversational',
      icon: Users,
      description: 'How you\'d explain it to a friend',
      placeholder: 'I help people by...'
    },
    {
      id: 'pitch' as const,
      label: 'Pitch (70 words)',
      icon: Presentation,
      description: 'Detailed explanation',
      placeholder: 'A comprehensive explanation of your mission and impact...'
    }
  ];

  const isComplete = watchedValues.short && watchedValues.conversational && watchedValues.pitch;

  const missionsContext = currentTelos?.missions?.map(m => m.text).join(', ') || '';

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <SectionHeader
        icon={MessageSquare}
        title="Narratives"
        description="Craft your story in three different formats for different situations and audiences."
        stepNumber={3}
        totalSteps={9}
      />

      <CoachingPrompt
        prompt="Your narratives should tell the same story but adapt to different contexts. The short version is for quick introductions, conversational is for casual explanations, and the pitch is for formal presentations or detailed discussions."
      />

      {/* Voice/Text Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          variant={!useVoiceCoaching ? "primary" : "secondary"}
          onClick={() => setUseVoiceCoaching(false)}
          className="flex items-center space-x-2"
        >
          <MessageSquare className="w-4 h-4" />
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
          section="Narratives"
          onComplete={handleVoiceCoachingComplete}
          initialPrompt={`Based on your missions: ${missionsContext}, let's craft your story in three formats. First, give me a very short elevator pitch (15 words or less). Then explain it conversationally as you would to a friend. Finally, give me a detailed pitch you'd use in a formal presentation.`}
        />
      ) : (
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
                  Extract different narrative formats from your voice responses. Look for short, conversational, and detailed versions.
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {tabs.map((tab) => (
                    <div key={tab.id} className="space-y-1">
                      <div className="text-xs text-white/60 font-medium">{tab.label}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => extractFromTranscript(voiceInputTranscript.substring(0, tab.id === 'short' ? 75 : tab.id === 'conversational' ? 200 : 500), tab.id)}
                        className="text-xs bg-white/5 hover:bg-white/10 w-full"
                      >
                        Use for {tab.label}
                      </Button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          <GlassCard className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {tabs.map((tab) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeTab === tab.id ? 1 : 0.5,
                    y: 0,
                    scale: activeTab === tab.id ? 1 : 0.98
                  }}
                  transition={{ duration: 0.3 }}
                  className={`space-y-4 ${activeTab !== tab.id ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <tab.icon className="w-5 h-5 mr-2" />
                        {tab.label}
                      </h3>
                      <p className="text-sm text-white/70">{tab.description}</p>
                    </div>
                    <div className="text-sm text-white/60">
                      {getWordCount(watchedValues[tab.id] || '')} words
                    </div>
                  </div>

                  <TextArea
                    {...register(tab.id)}
                    placeholder={tab.placeholder}
                    error={errors[tab.id]?.message}
                    className="min-h-[120px]"
                  />
                </motion.div>
              ))}

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="text-sm text-white/60">
                  {isComplete ? 'All narratives completed' : 'Complete all three narratives to continue'}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isComplete}
                >
                  Continue to Goals
                </Button>
              </div>
            </form>
          </GlassCard>

          <div className="grid md:grid-cols-3 gap-4">
            {tabs.map((tab) => (
              <GlassCard key={tab.id} className="p-4">
                <div className="flex items-center mb-2">
                  <tab.icon className="w-5 h-5 text-violet-400 mr-2" />
                  <h4 className="font-medium text-white">{tab.label}</h4>
                </div>
                <p className="text-sm text-white/70 mb-3">{tab.description}</p>
                {watchedValues[tab.id] && (
                  <div className="text-xs text-white/60 bg-white/5 p-2 rounded">
                    {watchedValues[tab.id]}
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};