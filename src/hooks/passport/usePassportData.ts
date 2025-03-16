
import { useState, useEffect } from "react";
import { Student, PassportStamp } from "@/types/student";
import { passportCache } from "@/utils/cacheUtils";

export const usePassportData = (student: Student) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentAchievements, setRecentAchievements] = useState<PassportStamp[]>([]);
  
  // Calculate next level progress
  const nextLevelPoints = 500 * (student.passportLevel + 1);
  const progressToNextLevel = Math.min(Math.round((student.totalPoints / nextLevelPoints) * 100), 100);
  
  useEffect(() => {
    const fetchPassportData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get cached passport data if available
        const cachedData = passportCache.get<PassportStamp[]>(`recentAchievements:${student.id}`);
        
        if (cachedData) {
          console.log("Using cached passport data:", cachedData);
          setRecentAchievements(cachedData);
        } else {
          // If not cached, compute and cache it
          console.log("Computing passport data from stamps:", student.passportStamps);
          
          // Fallback if passportStamps is undefined
          const stamps = student.passportStamps || [];
          
          const sortedAchievements = stamps
            .sort((a, b) => new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime())
            .slice(0, 3);
          
          console.log("Sorted achievements:", sortedAchievements);
          setRecentAchievements(sortedAchievements);
          
          // Cache for future use
          if (sortedAchievements.length > 0) {
            passportCache.set(`recentAchievements:${student.id}`, sortedAchievements, { ttl: 300 }); // 5 minutes
          }
        }
      } catch (err) {
        console.error("Error fetching passport data:", err);
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPassportData();
  }, [student.id, student.passportStamps]);

  return {
    loading,
    error,
    recentAchievements,
    progressToNextLevel,
    nextLevelPoints
  };
};
