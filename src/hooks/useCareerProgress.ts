
import { useState, useEffect } from 'react';
import { Student, PassportStamp } from '@/types/student';
import { 
  trackProgress, 
  subscribeToPassportUpdates, 
  awardPassportStamp 
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
export const useCareerProgress = (studentId: number) => {
  const [state, setState] = useState<CareerProgressState>({
    loading: true,
    stamps: [],
    totalPoints: 0,
    recentStamp: null
  });

  // Track a new service completion
  const trackServiceProgress = (serviceId: string, progress: number) => {
    // Update progress in the backend
    trackProgress(studentId, serviceId, progress);
    
    // If 100% completion, award a stamp
    if (progress === 100) {
      awardPassportStamp(studentId, serviceId, "Bronze").then(stamp => {
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

  // Get points based on stamp level
  const getLevelPoints = (level: "Bronze" | "Silver" | "Gold"): number => {
    switch (level) {
      case "Gold": return 100;
      case "Silver": return 50;
      case "Bronze": return 25;
      default: return 10;
    }
  };

  // Load initial data and subscribe to updates
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
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToPassportUpdates(studentId, (newStamp) => {
      setState(prevState => ({
        ...prevState,
        stamps: [...prevState.stamps, newStamp],
        recentStamp: newStamp,
        totalPoints: prevState.totalPoints + getLevelPoints(newStamp.level)
      }));
    });
    
    // Cleanup subscription
    return unsubscribe;
  }, [studentId]);

  return {
    ...state,
    trackServiceProgress
  };
};
