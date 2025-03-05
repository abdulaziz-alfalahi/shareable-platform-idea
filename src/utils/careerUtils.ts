
import { supabase } from "@/integrations/supabase/client";
import { PassportStamp, Student } from "@/types/student";
import { Vacancy } from "@/components/jobs/MatchingVacanciesTab";
import { notifySuccess } from "./notification";

/**
 * Checks user progress and awards stamps/achievements when thresholds are met
 */
export async function checkMilestones(userId: number, currentProgress: number, serviceType: string): Promise<boolean> {
  // In a real app with Supabase, this would query the database
  // For demo purposes, we'll use a simple threshold check
  if (currentProgress === 100) {
    // Award a new stamp
    const newStamp: PassportStamp = {
      id: Date.now(),
      title: `${serviceType} Master`,
      description: `Completed all ${serviceType.toLowerCase()} requirements`,
      category: serviceType as "Workshop" | "Assessment" | "Training" | "Employment" | "Education" | "Skills",
      iconName: serviceType.toLowerCase(),
      dateEarned: new Date().toISOString().split('T')[0],
      level: "Gold",
      featured: true
    };
    
    // In a real app, this would insert into Supabase
    // For now, we'll just notify the user
    notifySuccess({
      title: "New Achievement Unlocked!",
      description: `You've earned the "${newStamp.title}" badge!`
    });
    
    return true;
  }
  
  // For 50% completion, award a silver badge
  if (currentProgress >= 50 && currentProgress < 100) {
    notifyInfo({
      title: "Progress Milestone",
      description: `You're halfway to earning the ${serviceType} Master badge!`
    });
  }
  
  return false;
}

/**
 * Calculates similarity between user skills and job requirements
 * Uses a simple Jaccard similarity coefficient
 */
function calculateSimilarity(userSkills: string[], jobSkills: string[]): number {
  // Convert all skills to lowercase for case-insensitive comparison
  const normalizedUserSkills = userSkills.map(skill => skill.toLowerCase());
  const normalizedJobSkills = jobSkills.map(skill => skill.toLowerCase());
  
  // Find intersection (skills in both sets)
  const intersection = normalizedUserSkills.filter(skill => 
    normalizedJobSkills.includes(skill)
  );
  
  // Find union (all unique skills)
  const union = [...new Set([...normalizedUserSkills, ...normalizedJobSkills])];
  
  // Calculate Jaccard similarity: size of intersection / size of union
  return union.length === 0 ? 0 : intersection.length / union.length;
}

/**
 * Recommends jobs based on user skills using similarity matching
 */
export function recommendJobs(student: Student, availableJobs: Vacancy[]): Vacancy[] {
  // Extract skills from student profile
  // In a real app, this would come from the student's profile
  const userSkills = [
    student.program,
    ...student.achievements,
    ...(student.passportStamps?.map(stamp => stamp.category) || [])
  ];
  
  // Calculate similarity scores and sort jobs
  return [...availableJobs].sort((jobA, jobB) => {
    const similarityA = calculateSimilarity(userSkills, [...jobA.requiredSkills, ...jobA.missingSkills]);
    const similarityB = calculateSimilarity(userSkills, [...jobB.requiredSkills, ...jobB.missingSkills]);
    
    // Sort by descending similarity (highest match first)
    return similarityB - similarityA;
  });
}

/**
 * Tracks user progress for specific service/activity
 */
export function trackProgress(userId: number, serviceId: string, progressPercentage: number): void {
  // In a real app with Supabase, this would be:
  // await supabase.from('user_progress').upsert({
  //   user_id: userId,
  //   service_id: serviceId,
  //   progress_percentage: progressPercentage,
  //   updated_at: new Date()
  // });
  
  // For demo, we'll log and check milestones
  console.log(`User ${userId} progress for ${serviceId}: ${progressPercentage}%`);
  
  // Check if this progress update should trigger a milestone
  const serviceType = serviceId.split('-')[0]; // Extract service type from id
  checkMilestones(userId, progressPercentage, serviceType);
}

/**
 * Sets up real-time subscription for passport updates
 * In a real app with Supabase, this would use the Supabase real-time API
 */
export function subscribeToPassportUpdates(userId: number, callback: (newStamp: PassportStamp) => void): () => void {
  // Mock implementation for demo
  console.log(`Subscribed to passport updates for user ${userId}`);
  
  // In a real app with Supabase, this would be:
  // const subscription = supabase
  //   .from('passport_stamps')
  //   .on('INSERT', payload => {
  //     if (payload.new.user_id === userId) {
  //       callback(payload.new);
  //     }
  //   })
  //   .subscribe();
  
  // Return unsubscribe function
  return () => {
    console.log(`Unsubscribed from passport updates for user ${userId}`);
    // In a real app with Supabase, this would be:
    // supabase.removeSubscription(subscription);
  };
}
