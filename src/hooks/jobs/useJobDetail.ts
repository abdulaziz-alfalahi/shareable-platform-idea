
import { useState, useEffect } from 'react';
import { Vacancy } from "@/types/jobs";
import { Student } from "@/types/student";
import { JobMatchDetails } from "@/utils/career/types";
import { getJobMatchDetails } from "@/utils/career/recommendations";
import { notifySuccess } from "@/utils/notification";

interface UseJobDetailProps {
  vacancyId: string | undefined;
  vacanciesData: any[]; // Change this from Vacancy[] to any[] to avoid type issues during conversion
  student: Student;
}

interface UseJobDetailReturn {
  vacancy: Vacancy | null;
  matchDetails: JobMatchDetails;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasApplied: boolean;
  isSubmitting: boolean;
  handleApply: () => void;
}

// This function enriches a vacancy data object to ensure it has all required properties
const enrichVacancy = (vacancy: any): Vacancy => {
  return {
    ...vacancy,
    matchedSkills: vacancy.matchedSkills || vacancy.requiredSkills.slice(0, Math.ceil(vacancy.requiredSkills.length * (vacancy.matchPercentage / 100))),
    missingSkills: vacancy.missingSkills || vacancy.requiredSkills.slice(Math.ceil(vacancy.requiredSkills.length * (vacancy.matchPercentage / 100))),
    culturalFit: vacancy.culturalFit || Math.round(65 + Math.random() * 25),
    careerPathAlignment: vacancy.careerPathAlignment || Math.round(60 + Math.random() * 30)
  };
};

export const useJobDetail = ({ vacancyId, vacanciesData, student }: UseJobDetailProps): UseJobDetailReturn => {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [hasApplied, setHasApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (vacancyId) {
      const foundVacancy = vacanciesData.find(v => v.id === vacancyId);
      if (foundVacancy) {
        setVacancy(enrichVacancy(foundVacancy));
        
        // Check if user has already applied (demo purposes)
        const randomApplied = Math.random() > 0.7;
        setHasApplied(randomApplied);
      }
    }
  }, [vacancyId, vacanciesData]);

  const handleApply = () => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setHasApplied(true);
      notifySuccess({
        title: "Application Submitted",
        description: `Your application for ${vacancy?.title} at ${vacancy?.company} has been submitted.`,
      });
    }, 1500);
  };

  // Default to empty match details if no vacancy
  const defaultMatchDetails: JobMatchDetails = {
    matchPercentage: 0,
    matchedSkills: [],
    missingSkills: [],
    careerPathAlignment: 0,
    culturalFit: 0
  };

  // Get match details for this specific job if vacancy exists
  const matchDetails = vacancy 
    ? getJobMatchDetails(student, vacancy)
    : defaultMatchDetails;

  return {
    vacancy,
    matchDetails,
    activeTab,
    setActiveTab,
    hasApplied,
    isSubmitting,
    handleApply
  };
};
