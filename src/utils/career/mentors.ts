
import { Student } from '@/types/student';

// Function to check if a user qualifies as a mentor
export const checkMentorEligibility = (student: Student): boolean => {
  // Count the total number of stamps
  const totalStamps = student.passportStamps.length;
  
  // Check if they have enough gold/silver stamps
  const highLevelStamps = student.passportStamps.filter(
    stamp => stamp.level === "Gold" || stamp.level === "Silver"
  ).length;
  
  // Criteria: At least 10 total stamps with at least 3 gold/silver stamps
  return totalStamps >= 10 && highLevelStamps >= 3;
};

// Function to find potential mentors for a student
export const findPotentialMentors = async (student: Student, limit: number = 3): Promise<{id: number, name: string, stamps: number}[]> => {
  // In a real app, this would be a database query
  console.log(`Finding mentors for student ${student.id}`);
  
  // For demo, return mock data
  return [
    { id: 101, name: "Ahmed Al Mansoori", stamps: 32 },
    { id: 102, name: "Fatima Al Hashemi", stamps: 28 },
    { id: 103, name: "Mohammed Al Marzooqi", stamps: 25 }
  ];
};
