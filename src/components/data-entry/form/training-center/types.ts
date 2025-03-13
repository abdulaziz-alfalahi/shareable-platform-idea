
export interface TrainingProgram {
  name: string;
  description: string;
  duration: string;
  skill_level: string;
  target_audience: string;
  certification_offered: boolean;
  start_date: string;
  end_date: string;
  cost: string;
}

export interface TrainingCenterData {
  name: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  license_number: string;
  description: string;
  programs: TrainingProgram[];
}

export const initialFormData: TrainingCenterData = {
  name: "",
  location: "",
  contact_email: "",
  contact_phone: "",
  license_number: "",
  description: "",
  programs: [
    {
      name: "",
      description: "",
      duration: "",
      skill_level: "",
      target_audience: "",
      certification_offered: false,
      start_date: "",
      end_date: "",
      cost: ""
    }
  ]
};
