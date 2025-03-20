
export interface Mentor {
  id: string;
  name: string;
  industry: string;
  experience_years: number;
  expertise: string[];
  bio: string | null;
}

export interface MentorshipRequest {
  id: string;
  mentor_id: string;
  status: string;
  created_at: string;
  mentor_name?: string;
  mentor_industry?: string;
}
