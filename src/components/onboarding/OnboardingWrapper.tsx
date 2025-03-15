
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OnboardingFlow, { OnboardingData } from "./OnboardingFlow";
import { UserRole } from "@/components/notifications/RoleNotifications";

interface OnboardingWrapperProps {
  hasCompletedOnboarding?: boolean;
}

const OnboardingWrapper: React.FC<OnboardingWrapperProps> = ({ 
  hasCompletedOnboarding = false 
}) => {
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);
  const navigate = useNavigate();

  // Check if the user has already completed onboarding
  useEffect(() => {
    const hasCompleted = localStorage.getItem('hasCompletedOnboarding') === 'true';
    if (hasCompleted) {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    // In a real app, this would save to a database or state management
    console.log("Onboarding completed with data:", data);
    
    // Show culturally relevant success toast based on role
    const messages = {
      student: "مرحباً بك في رحلة الإماراتي! Your learning journey begins now.",
      recruiter: "مرحباً بك في رحلة الإماراتي! Ready to find exceptional Emirati talent.",
      advisor: "مرحباً بك في رحلة الإماراتي! Guide the next generation to success.",
      training: "مرحباً بك في رحلة الإماراتي! Develop the skills of tomorrow.",
      parent: "مرحباً بك في رحلة الإماراتي! Support your child's educational journey."
    };
    
    toast.success(messages[data.role as keyof typeof messages] || "Welcome to Emirati Journey!", {
      description: `Your ${data.role} profile has been set up successfully.`,
    });
    
    // Close onboarding flow
    setShowOnboarding(false);
    
    // Redirect based on role
    redirectBasedOnRole(data.role);
  };

  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
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
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 bg-opacity-95">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-emirati-oasisGreen/20 to-emirati-desertGold/20"></div>
      <div className="absolute bottom-0 right-0 w-full h-16 bg-gradient-to-l from-emirati-oasisGreen/20 to-emirati-desertGold/20"></div>
      <OnboardingFlow onComplete={handleOnboardingComplete} />
    </div>
  );
};

export default OnboardingWrapper;
