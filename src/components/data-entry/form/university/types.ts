
export interface UniversityInfo {
  name: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  accreditation_number: string;
  description: string;
}

export interface Program {
  id?: number;
  name: string;
  description: string;
  degree_level: string;
  duration: string;
  credits: string;
  department: string;
}

export interface GradeUpload {
  program: string;
  academic_year: string;
  semester: string;
  file: File | null;
}
