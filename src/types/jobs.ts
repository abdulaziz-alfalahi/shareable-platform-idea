
/**
 * Shared job application interfaces for consistency across components
 */

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "applied" | "interview" | "offer" | "rejected" | "Applied" | "In Review" | "Interview Scheduled" | "Rejected" | "Offer Received";
  notes: string;
  jobTitle: string;
  appliedDate: string;
  priority: "high" | "medium" | "low";
}

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchPercentage: number;
  postedDate: string;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  description?: string; // Added to ensure consistency with Career Vacancy
  culturalFit?: number;
  careerPathAlignment?: number;
}
