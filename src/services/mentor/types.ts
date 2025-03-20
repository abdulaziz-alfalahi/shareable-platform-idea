
import { Student } from "@/types/student";

/**
 * Interface for mentor profile data
 */
export interface MentorProfile {
  id: string;
  name: string;
  industry: string;
  experience_years: number;
  expertise: string[];
  bio: string | null;
  available: boolean;
}

/**
 * Interface for mentorship request data
 */
export interface MentorshipRequest {
  id: string;
  student_id: string;
  mentor_id: string;
  status: string;
  message: string | null;
  created_at: string;
}

/**
 * Interface for potential mentor recommendation data
 */
export interface PotentialMentor {
  id: string;
  name: string;
  industry: string;
  stamps: number;
}
