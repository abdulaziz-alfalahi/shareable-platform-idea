
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { OnboardingData, STEPS } from "./types";
import { useOnboarding } from "./useOnboarding";

// Import step components
import ProfileStep from "./steps/ProfileStep";
import RoleStep from "./steps/RoleStep";
import LocationStep from "./steps/LocationStep";
import CulturalStep from "./steps/CulturalStep";
import InterestsStep from "./steps/InterestsStep";
import GoalsStep from "./steps/GoalsStep";
import CompleteStep from "./steps/CompleteStep";

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const {
    data,
    updateData,
    progress,
    currentStep,
    currentStepName,
    handleNext,
    handleBack,
    handleComplete
  } = useOnboarding({ onComplete });
  
  const renderStep = () => {
    const stepProps = {
      data,
      updateData,
      onNext: handleNext,
      onBack: handleBack
    };

    switch (currentStepName) {
      case 'profile':
        return <ProfileStep {...stepProps} />;
        
      case 'role':
        return <RoleStep {...stepProps} />;

      case 'location':
        return <LocationStep {...stepProps} />;

      case 'cultural':
        return <CulturalStep {...stepProps} />;
        
      case 'interests':
        return <InterestsStep {...stepProps} />;
        
      case 'goals':
        return <GoalsStep {...stepProps} />;
        
      case 'complete':
        return <CompleteStep {...stepProps} onNext={handleComplete} />;
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Getting Started</span>
          <span>{currentStep + 1} of {STEPS.length}</span>
        </div>
      </div>
      
      <Card className="p-6">{renderStep()}</Card>
    </div>
  );
};

export default OnboardingFlow;
export type { OnboardingData };
