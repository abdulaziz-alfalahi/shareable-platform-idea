
import { Student, CareerMilestone, PassportStamp, Challenge } from '@/types/student';

// Define a Challenge type for time-bound challenges
export interface ChallengeBase {
  id: number;
  title: string;
  description: string;
  requiredCount: number;
  category: string;
  startDate: string;
  endDate: string;
  rewardTitle: string;
  rewardLevel: "Bronze" | "Silver" | "Gold";
}

// Simplified Vacancy type for job matching
export interface Vacancy {
  id: number;
  title: string;
  company: string;
  requirements: string[];
  location: string;
  type: string;
}

// Cultural Achievement definitions
export interface CulturalAchievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  requiredCount: number;
  category: "Mentorship" | "Resilience" | "Leadership" | "Innovation" | "Heritage";
  stampLevel: "Bronze" | "Silver" | "Gold";
}

// Skill Gap Analysis Types
export interface SkillGap {
  skill: string;
  demandLevel: 'high' | 'medium' | 'low';
  relevanceScore: number;
  suggestedTraining: TrainingRecommendation[];
}

export interface TrainingRecommendation {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  format: 'online' | 'in-person' | 'hybrid';
  url?: string;
}
