
import { Student } from '@/types/student';
import { CulturalAchievement } from '../types';

// Define employment achievements
const employmentAchievements: CulturalAchievement[] = [
  {
    id: "employment-1",
    name: "First Job",
    description: "Secured your first job position in the UAE market",
    iconName: "briefcase",
    requiredCount: 1,
    category: "Employment",
    stampLevel: "Bronze"
  },
  {
    id: "employment-2",
    name: "Career Progression",
    description: "Advanced to a higher position within your career",
    iconName: "briefcase",
    requiredCount: 1,
    category: "Employment",
    stampLevel: "Silver"
  },
  {
    id: "employment-3",
    name: "Industry Leader",
    description: "Reached a leadership position in your industry",
    iconName: "briefcase",
    requiredCount: 1,
    category: "Employment",
    stampLevel: "Gold"
  },
  {
    id: "employment-4",
    name: "Networking Star",
    description: "Connected with 10+ industry professionals",
    iconName: "users",
    requiredCount: 10,
    category: "Employment",
    stampLevel: "Bronze"
  },
  {
    id: "employment-5",
    name: "Skills Development",
    description: "Completed 5 professional development courses",
    iconName: "book-open",
    requiredCount: 5,
    category: "Employment",
    stampLevel: "Silver"
  }
];

// Calculate employment achievements based on student data
export const calculateEmploymentAchievements = (student: Student): string[] => {
  const achievements: string[] = [];
  
  // Check for first job achievement
  if (student.careerMilestones && student.careerMilestones.length > 0) {
    achievements.push("employment-1");
  }
  
  // Check for career progression
  if (student.careerMilestones && student.careerMilestones.length >= 2) {
    achievements.push("employment-2");
  }
  
  // Check for leadership positions
  const leadershipMilestones = student.careerMilestones?.filter(
    milestone => milestone.title.toLowerCase().includes("leader") || 
               milestone.title.toLowerCase().includes("manager") ||
               milestone.title.toLowerCase().includes("director")
  );
  
  if (leadershipMilestones && leadershipMilestones.length > 0) {
    achievements.push("employment-3");
  }
  
  // For networking and skills achievements, we would need more data
  // This is a simplified implementation
  if (student.totalPoints > 100) {
    achievements.push("employment-4"); // Networking achievement
  }
  
  if (student.passportStamps.filter(stamp => stamp.category === "Skills").length >= 5) {
    achievements.push("employment-5"); // Skills development achievement
  }
  
  return achievements;
};

export default employmentAchievements;
