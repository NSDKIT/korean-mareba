import { Plan, Role } from '@prisma/client';

export type { Plan, Role };

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface Scenario {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  aiRole: string;
  scenarioType: 'cafe' | 'friend' | 'business' | 'teacher' | 'hotel';
  minLevel: number;
  maxLevel: number;
  imageUrl?: string;
}

export interface LevelConfig {
  level: number;
  name: string;
  description: string;
  vocabCount: string;
  instructions: string;
}

export interface FeedbackReport {
  totalScore: number;
  breakdown: {
    fluency: number;
    accuracy: number;
    vocabulary: number;
    taskCompletion: number;
  };
  goodPoints: string[];
  improvements: Array<{
    original: string;
    suggestion: string;
    explanation: string;
  }>;
  newWords: Array<{
    ko: string;
    ruby: string;
    ja: string;
  }>;
}

export interface UserProfile {
  id: string;
  email: string;
  role: Role;
  level: number;
  plan: Plan;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
  dailyCount?: number;
}

export type User = UserProfile;

export interface PlacementTestResult {
  level: number;
  reasoning: string;
  confidence: number;
}
