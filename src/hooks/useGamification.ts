
import { useState, useEffect } from 'react';
import { Student, Challenge } from '@/types/student';
import { 
  fetchUserChallenges, 
  updateChallengeProgress, 
  completeChallenge 
} from '@/utils/career/challengesService';
import { useToast } from '@/hooks/toast';

interface UseGamificationResult {
  challenges: Challenge[];
  loading: boolean;
  updateProgress: (challengeId: number, increment?: number) => Promise<void>;
  completeChallenge: (challengeId: number) => Promise<void>;
  refreshChallenges: () => Promise<void>;
}

/**
 * Hook for managing gamification features
 */
export const useGamification = (student: Student): UseGamificationResult => {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<Challenge[]>(student.activeChallenges || []);
  const [loading, setLoading] = useState(false);

  // Load challenges when component mounts
  useEffect(() => {
    const loadChallenges = async () => {
      if (student?.id) {
        setLoading(true);
        try {
          const fetchedChallenges = await fetchUserChallenges(student.id);
          setChallenges(fetchedChallenges);
        } catch (error) {
          console.error("Error loading challenges:", error);
          toast({
            title: "Error",
            description: "Failed to load challenges",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadChallenges();
  }, [student?.id, toast]);

  // Refresh challenges
  const refreshChallenges = async () => {
    if (!student?.id) return;
    
    setLoading(true);
    try {
      const fetchedChallenges = await fetchUserChallenges(student.id);
      setChallenges(fetchedChallenges);
    } catch (error) {
      console.error("Error refreshing challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update challenge progress
  const handleUpdateProgress = async (challengeId: number, increment: number = 1) => {
    if (!student?.id) return;
    
    try {
      await updateChallengeProgress(student.id, challengeId, increment);
      
      // Update local state
      setChallenges(prevChallenges => 
        prevChallenges.map(challenge => {
          if (challenge.id === challengeId) {
            const newProgress = Math.min(
              challenge.currentProgress + increment,
              challenge.requiredCount
            );
            
            return {
              ...challenge,
              currentProgress: newProgress
            };
          }
          return challenge;
        })
      );
    } catch (error) {
      console.error("Error updating challenge progress:", error);
      toast({
        title: "Error",
        description: "Failed to update challenge progress",
        variant: "destructive",
      });
    }
  };

  // Complete a challenge
  const handleCompleteChallenge = async (challengeId: number) => {
    if (!student?.id) return;
    
    try {
      await completeChallenge(student.id, challengeId);
      await refreshChallenges();
    } catch (error) {
      console.error("Error completing challenge:", error);
      toast({
        title: "Error",
        description: "Failed to complete challenge",
        variant: "destructive",
      });
    }
  };

  return {
    challenges,
    loading,
    updateProgress: handleUpdateProgress,
    completeChallenge: handleCompleteChallenge,
    refreshChallenges
  };
};
