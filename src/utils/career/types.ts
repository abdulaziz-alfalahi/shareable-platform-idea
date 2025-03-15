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

// Add the missing types for Vacancy and JobMatchDetails
export interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  // Add other necessary fields based on your application's needs
}

export interface JobMatchDetails {
  id: number;
  vacancyId: number;
  studentId: number;
  matchScore: number;
  skillsMatch: string[];
  // Add other necessary fields based on your application's needs
}

// Re-export the CulturalAchievement interface
export { CulturalAchievement } from './types';
