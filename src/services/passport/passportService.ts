
import { PassportStamp, Challenge } from '@/types/student';

// Get student challenges (mock implementation)
export const getStudentChallenges = (studentId: number): Challenge[] => {
  // This would be fetched from a database in a real application
  return [
    {
      id: 201,
      title: "Network Navigator",
      description: "Connect with 5 professionals in your field",
      requiredCount: 5,
      currentProgress: 2,
      category: "Employment",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Networking Pro",
      rewardLevel: "Silver"
    },
    {
      id: 202,
      title: "Majlis Master",
      description: "Participate in 3 community discussions",
      requiredCount: 3,
      currentProgress: 1,
      category: "Skills",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Community Leader",
      rewardLevel: "Bronze"
    },
    {
      id: 203,
      title: "Desert Explorer",
      description: "Complete 3 career pathway assessments",
      requiredCount: 3,
      currentProgress: 0,
      category: "Assessment",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Path Finder",
      rewardLevel: "Gold"
    }
  ];
};

// Get student passport stamps
export const getPassportStamps = async (studentId: number): Promise<PassportStamp[]> => {
  // This would be fetched from a database in a real application
  console.log(`Fetching passport stamps for student ${studentId}`);
  
  // Mock data
  return [
    {
      id: 1,
      title: "Workshop Explorer",
      description: "Completed first career workshop",
      category: "Workshop",
      iconName: "star",
      dateEarned: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      level: "Bronze",
      featured: false
    },
    {
      id: 2,
      title: "Assessment Master",
      description: "Completed all core career assessments",
      category: "Assessment",
      iconName: "award",
      dateEarned: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      level: "Silver",
      featured: true
    },
    {
      id: 3,
      title: "Skills Specialist",
      description: "Demonstrated proficiency in key workplace skills",
      category: "Skills",
      iconName: "code",
      dateEarned: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      level: "Silver",
      featured: false
    }
  ];
};

// Award a new passport stamp
export const awardPassportStamp = async (
  studentId: number,
  stampData: Partial<PassportStamp>
): Promise<PassportStamp> => {
  // This would be an API call in production
  console.log(`Awarding passport stamp to student ${studentId}`);
  
  // Create a new stamp with default values and override with provided data
  const newStamp: PassportStamp = {
    id: Date.now(),
    title: stampData.title || "New Achievement",
    description: stampData.description || "You've earned a new achievement",
    category: stampData.category || "Skills",
    iconName: stampData.iconName || "award",
    dateEarned: new Date().toISOString().split('T')[0],
    level: stampData.level || "Bronze",
    featured: stampData.featured || false
  };
  
  // In a real app, this would save to the database
  
  return newStamp;
};

// Get passport level and points
export const getPassportLevelInfo = async (studentId: number): Promise<{
  level: number;
  points: number;
  nextLevelPoints: number;
}> => {
  // This would be fetched from a database in a real application
  console.log(`Fetching passport level info for student ${studentId}`);
  
  // Mock data
  return {
    level: 3,
    points: 1250,
    nextLevelPoints: 2000
  };
};
