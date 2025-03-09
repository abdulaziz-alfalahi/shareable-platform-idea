
// Define common user role types to ensure consistency across the application
export type UserRole = 
  | "school_student" 
  | "university_student" 
  | "parent" 
  | "internship_coordinator" 
  | "recruiter" 
  | "training_center_rep" 
  | "assessment_center_rep" 
  | "advisor" 
  | "coach" 
  | "jobseeker" 
  | "administrator"
  | "leadership";

export type AccessLevel = "read_only" | "standard" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bio?: string;
  access_level?: AccessLevel;
}
