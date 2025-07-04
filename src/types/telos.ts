export interface Problem {
  id: string;
  text: string;
  category: string;
  personalRelevance: number;
  isCustom?: boolean;
}

export interface Mission {
  id: string;
  text: string;
  problemId: string;
  actionVerb: string;
}

export interface Narratives {
  short: string;
  conversational: string;
  pitch: string;
}

export interface Goal {
  id: string;
  text: string;
  missionId: string;
  metric: string;
  deadline: string;
  smartCriteria: {
    specific: boolean;
    measurable: boolean;
    achievable: boolean;
    relevant: boolean;
    timeBound: boolean;
  };
}

export interface Challenge {
  id: string;
  text: string;
  category: 'internal' | 'external' | 'resource';
}

export interface Strategy {
  id: string;
  text: string;
  challengeId: string;
}

export interface Project {
  id: string;
  text: string;
  strategyId: string;
  status: 'planned' | 'active' | 'completed';
  timeline: string;
}

export interface HistoryEvent {
  year: number;
  event: string;
  impactRating: number;
}

export interface LogEntry {
  date: string;
  entry: string;
  tags: string[];
}

export interface TelosData {
  id: string;
  createdAt: string;
  updatedAt: string;
  problems: Problem[];
  missions: Mission[];
  narratives: Narratives;
  goals: Goal[];
  challenges: Challenge[];
  strategies: Strategy[];
  projects: Project[];
  history: HistoryEvent[];
  log: LogEntry[];
}

export type TelosSection = 'problems' | 'missions' | 'narratives' | 'goals' | 'challenges' | 'strategies' | 'projects' | 'history' | 'log';

export interface ProblemCategory {
  id: string;
  name: string;
  description: string;
  problems: string[];
}