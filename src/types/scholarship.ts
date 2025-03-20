
export type ScholarshipStatus = 'active' | 'closed' | 'draft' | 'archived';
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'waitlisted';

export interface Scholarship {
  id: string;
  title: string;
  description?: string;
  sponsor?: string;
  award_amount: number;
  application_deadline: string;
  eligibility_criteria: Record<string, any>;
  requirements?: string[];
  document_requirements?: string[];
  website_url?: string;
  status: ScholarshipStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentScholarshipProfile {
  id: string;
  user_id: string;
  academic_info?: Record<string, any>;
  financial_info?: Record<string, any>;
  areas_of_interest?: string[];
  achievements?: string[];
  documents?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipApplication {
  id: string;
  scholarship_id: string;
  applicant_id: string;
  status: ApplicationStatus;
  answers?: Record<string, any>;
  documents?: Record<string, any>;
  submitted_at?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  scholarship_id?: string;
  application_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface ScholarshipMatch {
  scholarship_id: string;
  match_score: number;
}
