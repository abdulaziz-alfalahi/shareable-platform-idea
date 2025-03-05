import { Student, Challenge } from '@/types/student';
import { 
  getActiveChallenges as fetchActiveChallenges, 
  checkMilestoneEligibility as checkEligibility,
  awardPassportStamp,
  shareAchievementToSocial
} from '@/utils/career';

// Use a different name to avoid naming conflicts
const getStudentChallenges = (studentId: number): Challenge[] => {
  // This is a wrapper function to use the imported function with a different name
  return fetchActiveChallenges(studentId);
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
