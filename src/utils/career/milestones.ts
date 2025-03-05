
import { CareerMilestone } from '@/types/student';
import { notifyWarning, notifySuccess } from '../notification';
import { awardPassportStamp } from './stamps';

// Career milestone achievement check functions
export const checkMilestones = async (userId: number, progress: number, serviceType: string): Promise<boolean> => {
  // This would normally be a server API call
  // Simulating backend logic here
  console.log(`Checking milestones for ${userId} with ${progress}% progress in ${serviceType}`);
  
  // Mock achievement logic
  if (progress >= 100) {
    // Create a new milestone
    const milestone: CareerMilestone = {
      id: Math.floor(Math.random() * 10000),
      title: `${serviceType} Mastery`,
      description: `Successfully completed all ${serviceType} requirements`,
      dateAchieved: new Date().toISOString().split('T')[0],
      points: 100,
      badgeUrl: `/badges/${serviceType.toLowerCase()}.png`
    };
    
    console.log('New milestone achieved:', milestone);
    
    // Award a stamp automatically
    await awardPassportStamp(userId, serviceType);
    
    return true;
  } else if (progress >= 90) {
    // Near milestone notification
    sendNearMilestoneNotification(userId, serviceType, progress);
  }
  
  return false;
};

// Send notification when user is close to milestone
export const sendNearMilestoneNotification = (userId: number, serviceType: string, progress: number): void => {
  console.log(`User ${userId} is at ${progress}% for ${serviceType} - sending notification`);
  
  // In a real app, this would check if we've already sent this notification recently
  // and would potentially send an email/push notification
  
  notifyWarning({
    title: "Almost There!",
    description: `You're ${progress}% to your next ${serviceType} stamp! Complete the remaining tasks to earn it.`
  });
  
  // Simulate storing this notification in the database
  console.log(`Saved notification for user ${userId}`);
};

// Track progress for a specific user and service
export const trackProgress = (userId: number, serviceId: string, progress: number): void => {
  // This would be a server call to update the user_progress table
  console.log(`Tracking progress for user ${userId}, service ${serviceId}: ${progress}%`);
  
  // Check for near-milestone notification
  if (progress >= 90 && progress < 100) {
    sendNearMilestoneNotification(userId, serviceId, progress);
  }
  
  // Simulate database update
  setTimeout(() => {
    console.log('Progress updated successfully');
  }, 500);
};

// Function to check milestone eligibility
export const checkMilestoneEligibility = (student: any, serviceType: string): boolean => {
  // Simple implementation for demonstration
  const relevantStamps = student.passportStamps.filter(
    (stamp: any) => stamp.category.toLowerCase() === serviceType.toLowerCase()
  );
  
  // Example logic: If student has at least 3 stamps in this category, they're eligible
  return relevantStamps.length >= 3;
};
