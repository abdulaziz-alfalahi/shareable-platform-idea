
import { notifySuccess } from '@/utils/notification';
import { TrainingRecommendation } from './types';
import { trainingRecommendations } from './mock-data';

/**
 * Enroll student in a training program
 */
export const enrollInTraining = async (
  userId: number, 
  trainingId: string, 
  trainingTitle: string
): Promise<boolean> => {
  try {
    // In a real app, this would make an API call to enroll the student
    console.log(`Enrolling user ${userId} in training: ${trainingTitle} (${trainingId})`);
    
    // Simulate API call success
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success notification
    notifySuccess({
      title: "Enrollment Successful",
      description: `You've been enrolled in "${trainingTitle}". Check your email for details.`
    });
    
    return true;
  } catch (error) {
    console.error("Error enrolling in training:", error);
    return false;
  }
};

/**
 * Get all available training programs across all skills
 */
export const getAllTrainingPrograms = (): TrainingRecommendation[] => {
  return Object.values(trainingRecommendations).flat();
};

/**
 * Search for training programs by keyword
 */
export const searchTrainingPrograms = (keyword: string): TrainingRecommendation[] => {
  const searchTerm = keyword.toLowerCase();
  const allPrograms = getAllTrainingPrograms();
  
  return allPrograms.filter(program => 
    program.title.toLowerCase().includes(searchTerm) || 
    program.provider.toLowerCase().includes(searchTerm)
  );
};
