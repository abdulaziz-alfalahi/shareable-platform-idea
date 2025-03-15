
import { Student, Challenge } from '@/types/student';
import { 
  getActiveChallenges as fetchActiveChallenges, 
  checkMilestoneEligibility as checkEligibility,
  awardPassportStamp,
  shareAchievementToSocial
} from '@/utils/career';

// Use a different name to avoid naming conflicts
const getStudentChallenges = (studentId: number): Challenge[] => {
  // This is a wrapper function that converts the returned challenges to the correct type
  const challenges = fetchActiveChallenges(studentId);
  
  // Filter and map challenges to ensure they have valid categories
  return challenges
    .filter(challenge => {
      // Only include challenges with valid categories
      const validCategories = ["Workshop", "Assessment", "Training", "Employment", "Education", "Skills"];
      return validCategories.includes(challenge.category);
    })
    .map(challenge => ({
      ...challenge,
      // Force the category to be one of the allowed types
      category: challenge.category as "Workshop" | "Assessment" | "Training" | "Employment" | "Education" | "Skills"
    }));
};

// Use a different name to avoid naming conflicts
const checkStudentEligibility = (student: Student, serviceType: string): boolean => {
  // This is a wrapper function to use the imported function with a different name
  return checkEligibility(student, serviceType);
};

export {
  getStudentChallenges,
  checkStudentEligibility,
  awardPassportStamp,
  shareAchievementToSocial
};
