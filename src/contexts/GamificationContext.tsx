
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, Challenge, PassportStamp } from '@/types/student';
import { useToast } from '@/hooks/toast';
import { getStudentChallenges } from '@/services/passport/passportService';
import { processCulturalAchievements } from '@/utils/career/achievements/achievementAwarder';

interface GamificationContextType {
  points: number;
  level: number;
  streak: number;
  badges: PassportStamp[];
  challenges: Challenge[];
  recentAchievements: PassportStamp[];
  questProgress: Record<string, number>;
  pointsHistory: Array<{ date: string, points: number, reason: string }>;
  addPoints: (amount: number, reason: string) => void;
  completeChallenge: (challengeId: number) => void;
  refreshChallenges: () => void;
  startQuest: (questId: string) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  redeemReward: (rewardId: string, pointCost: number) => Promise<boolean>;
  loading: boolean;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

interface GamificationProviderProps {
  children: ReactNode;
  studentId: number;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ 
  children,
  studentId
}) => {
  const { toast } = useToast();
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<PassportStamp[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<PassportStamp[]>([]);
  const [questProgress, setQuestProgress] = useState<Record<string, number>>({});
  const [pointsHistory, setPointsHistory] = useState<Array<{ date: string, points: number, reason: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Initialize gamification data
  useEffect(() => {
    const loadGamificationData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // Mock data for now
        setPoints(250);
        setLevel(2);
        setStreak(5);
        
        // Load challenges
        const fetchedChallenges = await getStudentChallenges(studentId);
        setChallenges(fetchedChallenges);
        
        // Load history (mock data)
        setPointsHistory([
          { date: new Date().toISOString(), points: 50, reason: 'Completed profile' },
          { date: new Date(Date.now() - 86400000).toISOString(), points: 100, reason: 'Completed assessment' },
          { date: new Date(Date.now() - 172800000).toISOString(), points: 75, reason: 'Daily login streak' },
          { date: new Date(Date.now() - 259200000).toISOString(), points: 25, reason: 'Shared achievement' },
        ]);
        
        // Check for login streak
        checkLoginStreak();
      } catch (error) {
        console.error('Error loading gamification data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGamificationData();
  }, [studentId]);

  // Update the login streak
  const checkLoginStreak = () => {
    // This would check with an API in a real implementation
    // For now, we'll just increment the streak for demo purposes
    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();
    
    if (lastLogin) {
      const lastDate = new Date(lastLogin);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastDate.toDateString() === yesterday.toDateString()) {
        // Consecutive day login
        setStreak(prevStreak => prevStreak + 1);
        addPoints(10, 'Daily login streak');
      } else if (lastDate.toDateString() !== today) {
        // Not consecutive, reset streak
        setStreak(1);
      }
    } else {
      // First login
      setStreak(1);
    }
    
    localStorage.setItem('lastLogin', today);
  };

  // Add points and check for level up
  const addPoints = (amount: number, reason: string) => {
    setPoints(prevPoints => {
      const newPoints = prevPoints + amount;
      
      // Check for level up (simplified formula)
      const newLevel = Math.floor(newPoints / 500) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        showLevelUpNotification(newLevel);
      }
      
      return newPoints;
    });
    
    // Add to history
    const historyEntry = {
      date: new Date().toISOString(),
      points: amount,
      reason
    };
    
    setPointsHistory(prev => [historyEntry, ...prev]);
  };

  // Show level up notification
  const showLevelUpNotification = (newLevel: number) => {
    toast({
      title: `Level ${newLevel} Unlocked! 🎉`,
      description: "Congratulations! You've reached a new level.",
      variant: "celebratory",
    });
  };

  // Complete a challenge
  const completeChallenge = async (challengeId: number) => {
    try {
      // Find the challenge
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) return;
      
      // Update challenge status
      setChallenges(prev => 
        prev.map(c => 
          c.id === challengeId 
            ? { ...c, currentProgress: c.requiredCount } 
            : c
        )
      );
      
      // Award points based on challenge difficulty
      const pointsAwarded = challenge.rewardLevel === 'Gold' 
        ? 100 
        : challenge.rewardLevel === 'Silver' 
          ? 50 
          : 25;
      
      addPoints(pointsAwarded, `Completed challenge: ${challenge.title}`);
      
      // Show notification
      toast({
        title: "Challenge Completed! 🏆",
        description: `You've completed the "${challenge.title}" challenge!`,
        variant: "celebratory",
      });
      
      // Check for cultural achievements
      await checkForCulturalAchievements();
    } catch (error) {
      console.error("Error completing challenge:", error);
    }
  };

  // Refresh challenges
  const refreshChallenges = async () => {
    setLoading(true);
    try {
      const fetchedChallenges = await getStudentChallenges(studentId);
      setChallenges(fetchedChallenges);
    } catch (error) {
      console.error("Error refreshing challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check for cultural achievements
  const checkForCulturalAchievements = async () => {
    try {
      // This is a mock, in a real app this would use the student's full profile
      const mockStudent: Student = {
        id: studentId,
        name: "Mock Student",
        program: "Computer Science",
        year: 3,
        gradeLevel: "university-3",
        gpa: 3.8,
        advisingStatus: "Good Standing",
        riskLevel: "Low",
        progress: 75,
        lastMeeting: "2023-04-15",
        nextMeeting: "2023-05-15",
        careerPath: "Software Development",
        flagged: false,
        coursesCompleted: 15,
        totalCourses: 20,
        achievements: ["Dean's List", "Hackathon Winner"],
        notes: "Excellent progress",
        goals: [],
        feedback: [],
        passportStamps: badges,
        careerMilestones: [],
        passportLevel: level,
        totalPoints: points,
        activeChallenges: challenges,
      };

      const newAchievements = await processCulturalAchievements(mockStudent);
      
      if (newAchievements.length > 0) {
        // Update badges
        setBadges(prev => [...prev, ...newAchievements]);
        
        // Update recent achievements
        setRecentAchievements(newAchievements);
        
        // Award points
        newAchievements.forEach(achievement => {
          const pointsAwarded = 
            achievement.level === 'Gold' ? 200 : 
            achievement.level === 'Silver' ? 100 : 50;
          
          addPoints(pointsAwarded, `Earned achievement: ${achievement.title}`);
        });
      }
    } catch (error) {
      console.error("Error checking for cultural achievements:", error);
    }
  };

  // Start a quest
  const startQuest = (questId: string) => {
    setQuestProgress(prev => ({
      ...prev,
      [questId]: 0
    }));
    
    toast({
      title: "New Quest Started!",
      description: "You've started a new adventure. Complete all steps to claim your reward.",
      variant: "default",
    });
  };

  // Update quest progress
  const updateQuestProgress = (questId: string, progress: number) => {
    setQuestProgress(prev => {
      const currentProgress = prev[questId] || 0;
      const newProgress = Math.min(100, currentProgress + progress);
      
      // Check if quest completed
      if (newProgress === 100 && currentProgress < 100) {
        toast({
          title: "Quest Completed! 🎉",
          description: "You've completed all steps. Claim your reward now!",
          variant: "celebratory",
        });
        
        // Add points
        addPoints(150, "Quest completed");
      }
      
      return {
        ...prev,
        [questId]: newProgress
      };
    });
  };

  // Redeem a reward
  const redeemReward = async (rewardId: string, pointCost: number): Promise<boolean> => {
    if (points < pointCost) {
      toast({
        title: "Not Enough Points",
        description: `You need ${pointCost - points} more points to redeem this reward.`,
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // This would be an API call in a real app
      // Mock success for now
      setPoints(prev => prev - pointCost);
      
      // Add to history
      setPointsHistory(prev => [
        {
          date: new Date().toISOString(),
          points: -pointCost,
          reason: `Redeemed reward: ${rewardId}`
        },
        ...prev
      ]);
      
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed a reward for ${pointCost} points.`,
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error("Error redeeming reward:", error);
      return false;
    }
  };

  return (
    <GamificationContext.Provider
      value={{
        points,
        level,
        streak,
        badges,
        challenges,
        recentAchievements,
        questProgress,
        pointsHistory,
        addPoints,
        completeChallenge,
        refreshChallenges,
        startQuest,
        updateQuestProgress,
        redeemReward,
        loading,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
