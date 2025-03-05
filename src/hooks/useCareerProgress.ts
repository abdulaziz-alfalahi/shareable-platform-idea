import { useState, useEffect } from 'react';
import { Student, PassportStamp } from '@/types/student';
import { 
  awardPassportStamp,
  checkMilestones
} from '@/utils/careerUtils';
import { notifySuccess } from '@/utils/notification';

interface CareerProgressState {
  loading: boolean;
  stamps: PassportStamp[];
  totalPoints: number;
  recentStamp: PassportStamp | null;
}

/**
 * Hook to track and manage student career progress
 */
export const useCareerProgress = ({ student }: { student: Student }) => {
  const [state, setState] = useState<CareerProgressState>({
    loading: true,
    stamps: [],
    totalPoints: 0,
    recentStamp: null
  });

  // Track a new service completion
  const trackServiceProgress = (serviceId: string, progress: number) => {
    // In a real app this would update progress in the backend
    console.log(`Tracking progress for service ${serviceId}: ${progress}%`);
    
    // If 100% completion, award a stamp
    if (progress === 100) {
      awardPassportStamp(student.id, serviceId, "Bronze").then(stamp => {
        if (stamp) {
          // Add the stamp to state
          setState(prevState => ({
            ...prevState,
            stamps: [...prevState.stamps, stamp],
            recentStamp: stamp,
            totalPoints: prevState.totalPoints + getLevelPoints(stamp.level)
          }));
          
          // Show a success notification
          notifySuccess({
            title: "New Achievement!",
            description: `You've earned the ${stamp.title} badge!`
          });
        }
      });
    }
  };

  // Check if a milestone should be awarded and award it if needed
  const checkAndAwardMilestone = async (serviceType: string, progress: number): Promise<boolean> => {
    return await checkMilestones(student.id, progress, serviceType);
  };

  // Get points based on stamp level
  const getLevelPoints = (level: "Bronze" | "Silver" | "Gold"): number => {
    switch (level) {
      case "Gold": return 100;
      case "Silver": return 50;
      case "Bronze": return 25;
      default: return 10;
    }
  };

  // Load initial data
  useEffect(() => {
    setState(prevState => ({ ...prevState, loading: true }));
    
    // In a real app, this would load stamps from API
    setTimeout(() => {
      // Mock data load
      setState({
        loading: false,
        stamps: [],
        totalPoints: 0,
        recentStamp: null
      });
    }, 1000);
    
    // No need for subscription in this demo version, but keeping the pattern:
    return () => {
      console.log("Cleaning up career progress hook");
    };
  }, [student.id]);

  return {
    ...state,
    trackServiceProgress,
    checkAndAwardMilestone
  };
};
