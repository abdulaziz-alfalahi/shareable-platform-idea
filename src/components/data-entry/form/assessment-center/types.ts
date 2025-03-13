
export interface AssessmentType {
  name: string;
  description: string;
  duration: string;
  skill_areas: string;
  certification_level: string;
  cost: string;
}

export interface AssessmentCenterData {
  name: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  license_number: string;
  description: string;
  assessments: AssessmentType[];
}

export const initialFormData: AssessmentCenterData = {
  name: "",
  location: "",
  contact_email: "",
  contact_phone: "",
  license_number: "",
  description: "",
  assessments: [
    {
      name: "",
      description: "",
      duration: "",
      skill_areas: "",
      certification_level: "",
      cost: ""
    }
  ]
};
