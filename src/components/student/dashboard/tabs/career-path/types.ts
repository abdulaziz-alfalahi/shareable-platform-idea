
export interface CareerSpecialization {
  name: string;
  description: string;
  popularity: string;
}

export interface CareerPathway {
  title: string;
  salary: string;
  growth: string;
}

export interface CareerField {
  id: string;
  name: string;
  icon: React.ReactNode;
  specializations: CareerSpecialization[];
  pathways: CareerPathway[];
}
