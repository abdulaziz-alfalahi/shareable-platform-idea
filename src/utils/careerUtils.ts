import { Student, CareerMilestone, PassportStamp } from '@/types/student';
import { notifySuccess, notifyInfo } from './notification';

// Career milestone achievement check functions
export const checkMilestones = async (userId: string, progress: number, serviceType: string): Promise<boolean> => {
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
export const awardPassportStamp = async (userId: string, category: string): Promise<PassportStamp | null> => {
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

// Simple job recommendation function based on skills
export const recommendJobs = (userSkills: string[], jobs: any[]): any[] => {
  // Calculate similarity between user skills and job requirements
  const scoredJobs = jobs.map(job => {
    const matchingSkills = userSkills.filter(skill => 
      job.skills.some((jobSkill: string) => 
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
