import { useState, useEffect } from 'react';
import { Student, PassportStamp } from '@/types/student';
import {
  trackProgress,
  subscribeToPassportUpdates,
  awardPassportStamp,
  checkMilestones
} from '@/utils/career';

interface UseCareerProgressResult {
  trackServiceProgress: (serviceId: string, progress: number) => void;
  loading: boolean;
  stamps: PassportStamp[];
  totalPoints: number;
  recentStamp: PassportStamp | null;
  checkAndAwardMilestone: (userId: number, progress: number, serviceType: string) => Promise<boolean>;
}

/**
 * Hook for tracking career progress and passport stamps
 */
export const useCareerProgress = (userId: number): UseCareerProgressResult => {
  const [stamps, setStamps] = useState<PassportStamp[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [recentStamp, setRecentStamp] = useState<PassportStamp | null>(null);

  // Initialize with any existing stamps
  useEffect(() => {
    // This would normally fetch stamps from the server
    console.log(`Initializing career progress for user ${userId}`);
  }, [userId]);

  // Subscribe to real-time stamp updates
  useEffect(() => {
    // Subscribe to updates and handle new stamps
    const unsubscribe = subscribeToPassportUpdates(userId, (newStamp) => {
      setStamps(prevStamps => [...prevStamps, newStamp]);
      setRecentStamp(newStamp);
      
      // Update points based on stamp level
      const pointsForLevel = {
        "Bronze": 25,
        "Silver": 50,
        "Gold": 100
      };
      setTotalPoints(prev => prev + pointsForLevel[newStamp.level]);
    });
    
    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [userId]);

  // Function for tracking service progress
  const trackServiceProgress = (serviceId: string, progress: number) => {
    setLoading(true);
    
    try {
      // Track progress in the system
      trackProgress(userId, serviceId, progress);
      
      // Check for milestones
      checkMilestones(userId, progress, serviceId)
        .then(achieved => {
          if (achieved) {
            console.log(`User ${userId} achieved a milestone in ${serviceId}`);
          }
        })
        .catch(err => console.error("Error checking milestones:", err))
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error tracking progress:", error);
      setLoading(false);
    }
  };

  // Function to check and award a milestone
  const checkAndAwardMilestone = async (
    userId: number, 
    progress: number, 
    serviceType: string
  ): Promise<boolean> => {
    return await checkMilestones(userId, progress, serviceType);
  };

  return {
    trackServiceProgress,
    loading,
    stamps,
    totalPoints,
    recentStamp,
    checkAndAwardMilestone
  };
};
