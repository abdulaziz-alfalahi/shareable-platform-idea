
import React from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";

const OnboardingPage: React.FC = () => {
  return (
    <OnboardingWrapper>
      <OnboardingFlow />
    </OnboardingWrapper>
  );
};

export default OnboardingPage;
