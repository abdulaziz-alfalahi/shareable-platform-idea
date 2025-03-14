
export interface SchoolInfo {
  name: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  registration_number: string;
  description: string;
}

export interface GradeUpload {
  grade_level: string;
  academic_year: string;
  term: string;
  file: File | null;
}
