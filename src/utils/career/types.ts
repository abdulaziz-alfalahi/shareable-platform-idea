
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
