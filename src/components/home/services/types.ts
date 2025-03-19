
// Define career stages for filtering
export type CareerStage = "all" | "early" | "mid" | "late";

export interface ServiceCategory {
  id: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  categories: string[];
}

export interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  iconBg?: string;
  stage: CareerStage | CareerStage[];
  hoverInfo?: string;
}
