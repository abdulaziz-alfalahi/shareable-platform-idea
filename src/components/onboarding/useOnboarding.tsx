
import { useState } from "react";
import { OnboardingData, OnboardingStep, STEPS } from "./types";

export interface UseOnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export const useOnboarding = ({ onComplete }: UseOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    role: "student",
    name: "",
    interests: [],
    goals: [],
    culturalValues: [],
    location: "",
  });
  
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    // In a real app, save to localStorage or database
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('userProfile', JSON.stringify(data));
    onComplete(data);
  };

  const updateData = (newData: Partial<OnboardingData>) => {
    setData({ ...data, ...newData });
  };
  
  const currentStepName = STEPS[currentStep];

  return {
    data,
    updateData,
    progress,
    currentStep,
    currentStepName,
    handleNext,
    handleBack,
    handleComplete,
    locationSuggestions,
    setLocationSuggestions
  };
};
