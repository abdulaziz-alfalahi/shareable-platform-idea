
import { UserRole } from "@/components/notifications/types";

export { UserRole };

export interface OnboardingData {
  role: UserRole;
  name: string;
  interests: string[];
  goals: string[];
  culturalValues: string[];
  location: string;
  profileImage?: string;
}

export interface OnboardingStepProps {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export type OnboardingStep = 
  | "profile"
  | "role"
  | "location"
  | "cultural"
  | "interests"
  | "goals"
  | "complete";

export const STEPS: OnboardingStep[] = [
  "profile", 
  "role", 
  "location",
  "cultural",
  "interests", 
  "goals", 
  "complete"
];
