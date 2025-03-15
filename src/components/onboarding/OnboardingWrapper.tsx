
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OnboardingFlow, { OnboardingData } from "./OnboardingFlow";

interface OnboardingWrapperProps {
  hasCompletedOnboarding?: boolean;
}

const OnboardingWrapper: React.FC<OnboardingWrapperProps> = ({ 
  hasCompletedOnboarding = false 
}) => {
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);
  const navigate = useNavigate();

  const handleOnboardingComplete = (data: OnboardingData) => {
    // In a real app, this would save to a database or state management
    console.log("Onboarding completed with data:", data);
    
    // Show success toast
    toast.success("Welcome to Emirati Journey!", {
      description: "Your profile has been set up successfully.",
    });
    
    // Close onboarding flow
    setShowOnboarding(false);
    
    // Redirect based on role
    switch (data.role) {
      case "student":
        navigate("/student-dashboard");
        break;
      case "recruiter":
        navigate("/recruiter-dashboard");
        break;
      case "advisor":
        navigate("/advisor-dashboard");
        break;
      case "training":
        navigate("/training-centers");
        break;
      case "parent":
        navigate("/student-dashboard"); // Parents see a view similar to students
        break;
      default:
        navigate("/");
    }
  };

  if (!showOnboarding) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <OnboardingFlow onComplete={handleOnboardingComplete} />
    </div>
  );
};

export default OnboardingWrapper;
