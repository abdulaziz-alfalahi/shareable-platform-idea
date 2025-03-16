
import { Student } from '@/types/student';

export interface EmployerMatch {
  employerId: number;
  companyName: string;
  matchScore: number;
  matchReasons: string[];
  jobOpenings: number;
}

export interface EmployerSearchResult {
  employers: EmployerMatch[];
  totalResults: number;
}

export interface CulturalAchievement {
  id: string;
  name: string;
  description: string;
  requiredCount: number;
  category: string;
  iconName: string;
  stampLevel: "Bronze" | "Silver" | "Gold";
  culturalBackground?: string;
}

export interface CulturalValue {
  id: string;
  name: string;
  description: string;
  relatedCareers: string[];
  historicalContext: string;
}

export interface JobCultureMatch {
  student: Student;
  jobId: number;
  culturalAlignment: number;
  valueMatches: {
    value: string;
    significance: string;
    matchLevel: 'high' | 'medium' | 'low';
  }[];
  recommendations: string[];
}

// Updated Vacancy interface to include all required properties
export interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  requiredSkills: string[];
  salary?: string;
  description: string; // Changed from optional to required
}

// Updated JobMatchDetails interface to include all required properties
export interface JobMatchDetails {
  id?: number;
  vacancyId?: number;
  studentId?: number;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  skillsMatch?: string[];
  careerPathAlignment: number;
  culturalFit: number;
}

// Use 'export type' for re-exporting to fix the TS1205 error
export type { CulturalAchievement as CulturalAchievementType };
