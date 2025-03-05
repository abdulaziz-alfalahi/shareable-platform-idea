
import { Student, CareerMilestone, PassportStamp } from '@/types/student';
import { Vacancy } from '@/components/jobs/MatchingVacanciesTab';
import { notifySuccess, notifyInfo } from './notification';

// Career milestone achievement check functions
export const checkMilestones = async (userId: number, progress: number, serviceType: string): Promise<boolean> => {
  // This would normally be a server API call
  // Simulating backend logic here
  console.log(`Checking milestones for ${userId} with ${progress}% progress in ${serviceType}`);
  
  // Simple logic - award milestone if progress is 100%
  if (progress === 100) {
    // Create a new milestone
    const milestone: CareerMilestone = {
      id: Math.floor(Math.random() * 10000),
      title: `${serviceType} Mastery`,
      description: `Completed all ${serviceType.toLowerCase()} requirements with excellence`,
      dateAchieved: new Date().toISOString().split('T')[0],
      points: 100,
      badgeUrl: `/badges/${serviceType.toLowerCase()}.png`
    };
    
    // Simulate adding to database
    console.log('New milestone awarded:', milestone);
    
    // Return true to indicate a milestone was awarded
    return true;
  }
  
  return false;
};

// Award a passport stamp
export const awardPassportStamp = async (userId: number, category: string): Promise<PassportStamp | null> => {
  // This would be a server call in production
  console.log(`Awarding ${category} stamp to user ${userId}`);
  
  // Create a new stamp
  const stamp: PassportStamp = {
    id: Math.floor(Math.random() * 10000),
    title: `${category} Explorer`,
    description: `Demonstrated excellence in ${category}`,
    category: category as any, // Using type assertion for demo
    iconName: category.toLowerCase(),
    dateEarned: new Date().toISOString().split('T')[0],
    level: "Bronze", // Start with bronze
    featured: false
  };
  
  // Notify user of new stamp
  notifyInfo({
    title: "New Passport Stamp!",
    description: `You've earned the ${stamp.title} stamp for your Career Passport.`
  });
  
  return stamp;
};

// Track progress for a specific user and service
export const trackProgress = (userId: number, serviceId: string, progress: number): void => {
  // This would be a server call to update the user_progress table
  console.log(`Tracking progress for user ${userId}, service ${serviceId}: ${progress}%`);
  
  // Simulate database update
  setTimeout(() => {
    console.log('Progress updated successfully');
  }, 500);
};

// Subscribe to passport updates (real-time)
export const subscribeToPassportUpdates = (
  userId: number, 
  callback: (newStamp: PassportStamp) => void
): () => void => {
  // This would use Supabase or Firebase real-time subscriptions
  console.log(`Subscribing to passport updates for user ${userId}`);
  
  // For demonstration, we'll just simulate a new stamp after 5 seconds
  const timeoutId = setTimeout(() => {
    const newStamp: PassportStamp = {
      id: Math.floor(Math.random() * 10000),
      title: "Workshop Master",
      description: "Completed a series of industry workshops",
      category: "Workshop",
      iconName: "graduation-cap",
      dateEarned: new Date().toISOString().split('T')[0],
      level: "Silver",
      featured: true
    };
    
    callback(newStamp);
  }, 5000);
  
  // Return a function to unsubscribe
  return () => {
    clearTimeout(timeoutId);
    console.log(`Unsubscribed from passport updates for user ${userId}`);
  };
};

// Simple job recommendation function based on skills
export const recommendJobs = (student: Student, jobs: Vacancy[]): Vacancy[] => {
  // Extract skills from student (in a real app, you'd have a skills field)
  const userSkills = student.achievements; // Using achievements as proxy for skills
  
  // Calculate similarity between user skills and job requirements
  const scoredJobs = jobs.map(job => {
    const matchingSkills = userSkills.filter(skill => 
      job.skills.some(jobSkill => 
        jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(jobSkill.toLowerCase())
      )
    );
    
    const similarityScore = matchingSkills.length / Math.max(userSkills.length, job.skills.length);
    
    return {
      ...job,
      similarityScore,
      matchingSkills
    };
  });
  
  // Sort by similarity score
  return scoredJobs.sort((a, b) => b.similarityScore - a.similarityScore);
};
