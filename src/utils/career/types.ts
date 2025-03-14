
import { Student, CareerMilestone, PassportStamp, Challenge } from '@/types/student';
import { SkillGap, TrainingRecommendation } from './skill-gap/types';

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

// Re-export skill gap types for backward compatibility
export type { SkillGap, TrainingRecommendation };
