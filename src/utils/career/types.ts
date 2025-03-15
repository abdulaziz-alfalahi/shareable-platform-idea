
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
  category: "Mentorship" | "Resilience" | "Leadership" | "Innovation" | "Heritage" | "Hospitality" | "Craftsmanship" | "Navigation" | "Employment";
  stampLevel: "Bronze" | "Silver" | "Gold";
  culturalBackground?: string;
}

// Job match details for personalized feedback
export interface JobMatchDetails {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  careerPathAlignment: number;  // Score indicating how well the job aligns with career path
  culturalFit: number;         // Score indicating cultural fit with UAE values
}

// Employment preference type for enhanced matching
export interface EmploymentPreference {
  workStyle: "Remote" | "Hybrid" | "In-office";
  sector: string;
  companySize: "Startup" | "SME" | "Enterprise" | "Government";
  workHours: "Full-time" | "Part-time" | "Flexible";
  salaryExpectation?: number;
}

// Re-export skill gap types for backward compatibility
export type { SkillGap, TrainingRecommendation };
