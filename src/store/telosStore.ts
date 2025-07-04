import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TelosData, TelosSection } from '../types/telos';

interface TelosStore {
  currentTelos: TelosData | null;
  currentSection: TelosSection;
  completedSections: Set<TelosSection>;
  isCoaching: boolean;
  
  // Actions
  initializeTelos: () => void;
  updateTelosSection: (section: TelosSection, data: any) => void;
  setCurrentSection: (section: TelosSection) => void;
  markSectionComplete: (section: TelosSection) => void;
  setIsCoaching: (isCoaching: boolean) => void;
  exportTelos: () => TelosData | null;
  resetTelos: () => void;
}

const createEmptyTelos = (): TelosData => ({
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  problems: [],
  missions: [],
  narratives: {
    short: '',
    conversational: '',
    pitch: ''
  },
  goals: [],
  challenges: [],
  strategies: [],
  projects: [],
  history: [],
  log: []
});

export const useTelosStore = create<TelosStore>()(
  persist(
    (set, get) => ({
      currentTelos: null,
      currentSection: 'problems',
      completedSections: new Set(),
      isCoaching: false,

      initializeTelos: () => {
        const existingTelos = get().currentTelos;
        if (!existingTelos) {
          set({ currentTelos: createEmptyTelos() });
        }
      },

      updateTelosSection: (section: TelosSection, data: any) => {
        const currentTelos = get().currentTelos;
        if (!currentTelos) return;

        const updatedTelos = {
          ...currentTelos,
          [section]: data,
          updatedAt: new Date().toISOString()
        };

        set({ currentTelos: updatedTelos });
      },

      setCurrentSection: (section: TelosSection) => {
        set({ currentSection: section });
      },

      markSectionComplete: (section: TelosSection) => {
        const completedSections = new Set(get().completedSections);
        completedSections.add(section);
        set({ completedSections });
      },

      setIsCoaching: (isCoaching: boolean) => {
        set({ isCoaching });
      },

      exportTelos: () => {
        return get().currentTelos;
      },

      resetTelos: () => {
        set({ 
          currentTelos: createEmptyTelos(),
          currentSection: 'problems',
          completedSections: new Set(),
          isCoaching: false
        });
      }
    }),
    {
      name: 'telos-storage',
      partialize: (state) => ({
        currentTelos: state.currentTelos,
        completedSections: Array.from(state.completedSections),
        currentSection: state.currentSection
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        completedSections: new Set(persistedState.completedSections || [])
      })
    }
  )
);