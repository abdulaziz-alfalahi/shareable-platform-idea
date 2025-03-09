
import { useState, useEffect } from "react";
import { Student, PassportStamp } from "@/types/student";
import { passportCache } from "@/utils/cacheUtils";

export const usePassportData = (student: Student) => {
  const [loading, setLoading] = useState(false);
  const [recentAchievements, setRecentAchievements] = useState<PassportStamp[]>([]);
  
  // Calculate next level progress
  const nextLevelPoints = 500 * (student.passportLevel + 1);
  const progressToNextLevel = Math.min(Math.round((student.totalPoints / nextLevelPoints) * 100), 100);
  
  useEffect(() => {
    const fetchPassportData = async () => {
      setLoading(true);
      try {
        // Get cached passport data if available
        const cachedData = passportCache.get<PassportStamp[]>(`recentAchievements:${student.id}`);
        
        if (cachedData) {
          setRecentAchievements(cachedData);
        } else {
          // If not cached, compute and cache it
          const sortedAchievements = student.passportStamps
            .sort((a, b) => new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime())
            .slice(0, 3);
          
          setRecentAchievements(sortedAchievements);
          
          // Cache for future use
          passportCache.set(`recentAchievements:${student.id}`, sortedAchievements, { ttl: 300 }); // 5 minutes
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPassportData();
  }, [student.id, student.passportStamps]);

  return {
    loading,
    recentAchievements,
    progressToNextLevel,
    nextLevelPoints
  };
};
