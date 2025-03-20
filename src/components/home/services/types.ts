
// Define career stages for filtering
export type CareerStage = "all" | "early" | "mid" | "late";

export interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  iconBg?: string;
  stage: CareerStage | CareerStage[];
  hoverInfo?: string;
}
