
export interface Scholarship {
  id: string;
  title: string;
  description: string | null;
  eligibility_criteria: Record<string, any>;
  award_amount: number;
  application_deadline: string;
  sponsor: string | null;
  website_url: string | null;
  requirements: string[] | null;
  document_requirements: string[] | null;
  status: 'active' | 'inactive' | 'draft' | 'expired';
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface StudentScholarshipProfile {
  id: string;
  user_id: string;
  academic_info: Record<string, any> | null;
  financial_info: Record<string, any> | null;
  areas_of_interest: string[] | null;
  achievements: string[] | null;
  documents: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipApplication {
  id: string;
  scholarship_id: string;
  applicant_id: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submitted_at: string | null;
  documents: Record<string, any> | null;
  answers: Record<string, any> | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  scholarship_id: string | null;
  application_id: string | null;
  is_read: boolean;
  created_at: string;
}

export interface ScholarshipMatch {
  scholarship_id: string;
  match_score: number;
  scholarship?: Scholarship;
}
