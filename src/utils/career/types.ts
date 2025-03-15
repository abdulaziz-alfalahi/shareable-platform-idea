
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
