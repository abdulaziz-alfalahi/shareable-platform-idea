
import React from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { OnboardingData } from "@/components/onboarding/types";

const OnboardingPage: React.FC = () => {
  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log("Onboarding completed with data:", data);
    // Implement onboarding completion logic
  };

  return (
    <div>
      <OnboardingWrapper hasCompletedOnboarding={false}>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </OnboardingWrapper>
    </div>
  );
};

export default OnboardingPage;
