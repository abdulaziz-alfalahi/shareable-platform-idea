
import { useState, useEffect } from 'react';
import { Student, PassportStamp } from '@/types/student';
import { Vacancy } from '@/components/jobs/MatchingVacanciesTab';
import { 
  checkMilestones, 
  recommendJobs, 
  trackProgress, 
  subscribeToPassportUpdates 
} from '@/utils/careerUtils';
import { notifySuccess } from '@/utils/notification';

interface UseCareerProgressProps {
  student: Student;
  availableJobs?: Vacancy[];
}

interface UseCareerProgressReturn {
  recommendedJobs: Vacancy[];
  trackServiceProgress: (serviceId: string, progress: number) => void;
  checkAndAwardMilestone: (serviceType: string, progress: number) => Promise<boolean>;
  latestStamp: PassportStamp | null;
}

/**
 * Hook for managing career progress and passport stamps
 */
export function useCareerProgress({ 
  student, 
  availableJobs = [] 
}: UseCareerProgressProps): UseCareerProgressReturn {
  const [recommendedJobs, setRecommendedJobs] = useState<Vacancy[]>([]);
  const [latestStamp, setLatestStamp] = useState<PassportStamp | null>(null);
  
  // Process job recommendations when student or jobs change
  useEffect(() => {
    if (student && availableJobs.length > 0) {
      const recommended = recommendJobs(student, availableJobs);
      setRecommendedJobs(recommended);
    }
  }, [student, availableJobs]);
  
  // Subscribe to passport updates
  useEffect(() => {
    if (student) {
      const unsubscribe = subscribeToPassportUpdates(student.id, (newStamp) => {
        setLatestStamp(newStamp);
        notifySuccess({
          title: "New Achievement!",
          description: `You've earned the "${newStamp.title}" stamp in your Career Passport!`
        });
      });
      
      return unsubscribe;
    }
  }, [student]);
  
  // Function to track progress for a service
  const trackServiceProgress = (serviceId: string, progress: number) => {
    if (student) {
      trackProgress(student.id, serviceId, progress);
    }
  };
  
  // Function to check and award milestone
  const checkAndAwardMilestone = async (serviceType: string, progress: number) => {
    if (student) {
      return await checkMilestones(student.id, progress, serviceType);
    }
    return false;
  };
  
  return {
    recommendedJobs,
    trackServiceProgress,
    checkAndAwardMilestone,
    latestStamp
  };
}
