
import { Student } from '@/types/student';
import { Vacancy } from './types';
import { notifySuccess } from '../notification';

// Define skill gap types
export interface SkillGap {
  skill: string;
  demandLevel: 'high' | 'medium' | 'low';
  relevanceScore: number; // 0-100
  suggestedTraining: TrainingRecommendation[];
}

export interface TrainingRecommendation {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  format: 'online' | 'in-person' | 'hybrid';
  url?: string;
}

// Mock data for UAE job market trends (in a real app, this would come from an API or database)
const uaeJobMarketTrends = [
  { skill: 'data analytics', growth: 35, priority: 'high', sector: 'technology' },
  { skill: 'artificial intelligence', growth: 42, priority: 'high', sector: 'technology' },
  { skill: 'blockchain', growth: 28, priority: 'medium', sector: 'finance' },
  { skill: 'cybersecurity', growth: 38, priority: 'high', sector: 'technology' },
  { skill: 'digital marketing', growth: 25, priority: 'medium', sector: 'marketing' },
  { skill: 'project management', growth: 20, priority: 'high', sector: 'general' },
  { skill: 'uae business culture', growth: 15, priority: 'medium', sector: 'general' },
  { skill: 'arabic language', growth: 18, priority: 'medium', sector: 'general' },
  { skill: 'sustainable energy', growth: 30, priority: 'high', sector: 'energy' },
  { skill: 'tourism management', growth: 22, priority: 'medium', sector: 'hospitality' },
  { skill: 'healthcare administration', growth: 26, priority: 'high', sector: 'healthcare' },
  { skill: 'financial analysis', growth: 21, priority: 'medium', sector: 'finance' },
  { skill: 'supply chain management', growth: 23, priority: 'medium', sector: 'logistics' },
  { skill: 'mobile app development', growth: 32, priority: 'high', sector: 'technology' },
  { skill: 'user experience design', growth: 29, priority: 'medium', sector: 'technology' }
];

// Mock data for training recommendations (in a real app, this would come from an API or database)
const trainingRecommendations: Record<string, TrainingRecommendation[]> = {
  'data analytics': [
    {
      id: 'da001',
      title: 'Data Analytics Fundamentals',
      provider: 'UAE Tech Institute',
      duration: '6 weeks',
      level: 'beginner',
      format: 'hybrid'
    },
    {
      id: 'da002',
      title: 'Advanced Data Visualization',
      provider: 'Dubai Data Academy',
      duration: '8 weeks',
      level: 'intermediate',
      format: 'online'
    }
  ],
  'artificial intelligence': [
    {
      id: 'ai001',
      title: 'Introduction to AI for Business',
      provider: 'MBZUAI',
      duration: '4 weeks',
      level: 'beginner',
      format: 'online'
    },
    {
      id: 'ai002',
      title: 'Machine Learning Applications',
      provider: 'Khalifa University',
      duration: '12 weeks',
      level: 'advanced',
      format: 'in-person'
    }
  ],
  'cybersecurity': [
    {
      id: 'cs001',
      title: 'Cybersecurity Essentials',
      provider: 'Emirates Cyber Academy',
      duration: '8 weeks',
      level: 'beginner',
      format: 'online'
    },
    {
      id: 'cs002',
      title: 'Network Security Certification',
      provider: 'UAE Secure Networks Institute',
      duration: '10 weeks',
      level: 'intermediate',
      format: 'hybrid'
    }
  ],
  'project management': [
    {
      id: 'pm001',
      title: 'Agile Project Management',
      provider: 'Emirates Leadership Institute',
      duration: '6 weeks',
      level: 'intermediate',
      format: 'hybrid'
    },
    {
      id: 'pm002',
      title: 'PMP Certification Preparation',
      provider: 'Dubai Knowledge Park',
      duration: '12 weeks',
      level: 'advanced',
      format: 'in-person'
    }
  ],
  'uae business culture': [
    {
      id: 'bc001',
      title: 'UAE Business Etiquette',
      provider: 'Emirati Cultural Center',
      duration: '2 weeks',
      level: 'beginner',
      format: 'hybrid'
    }
  ],
  'arabic language': [
    {
      id: 'al001',
      title: 'Business Arabic for Professionals',
      provider: 'Arabic Language Academy',
      duration: '8 weeks',
      level: 'beginner',
      format: 'in-person'
    }
  ],
  'digital marketing': [
    {
      id: 'dm001',
      title: 'Digital Marketing Strategy',
      provider: 'UAE Marketing Institute',
      duration: '6 weeks',
      level: 'intermediate',
      format: 'online'
    }
  ],
  'blockchain': [
    {
      id: 'bc001',
      title: 'Blockchain for Business',
      provider: 'Dubai Blockchain Center',
      duration: '4 weeks',
      level: 'beginner',
      format: 'online'
    }
  ],
  'mobile app development': [
    {
      id: 'mad001',
      title: 'Mobile App Development with React Native',
      provider: 'Abu Dhabi Coding School',
      duration: '10 weeks',
      level: 'intermediate',
      format: 'hybrid'
    }
  ],
  'user experience design': [
    {
      id: 'ux001',
      title: 'UX Design Principles',
      provider: 'Dubai Design Academy',
      duration: '8 weeks',
      level: 'beginner',
      format: 'online'
    }
  ]
};

// Extract student skills from achievements and passport stamps
const extractStudentSkills = (student: Student): string[] => {
  const skillsFromAchievements = student.achievements || [];
  
  // Extract skills from passport stamps (those with 'Skills' category)
  const skillsFromStamps = student.passportStamps
    .filter(stamp => stamp.category === 'Skills')
    .map(stamp => stamp.title.toLowerCase());
  
  // Combine and deduplicate skills
  return Array.from(new Set([...skillsFromAchievements.map(s => s.toLowerCase()), ...skillsFromStamps]));
};

// Analyze skill gaps based on market trends and student profile
export const analyzeSkillGaps = (student: Student): SkillGap[] => {
  const studentSkills = extractStudentSkills(student);
  const skillGaps: SkillGap[] = [];
  
  // Find skills in high demand that the student doesn't have
  for (const trend of uaeJobMarketTrends) {
    // Check if student has this skill already
    const hasSkill = studentSkills.some(skill => 
      skill.includes(trend.skill) || trend.skill.includes(skill)
    );
    
    if (!hasSkill) {
      // Calculate relevance based on student's career path and the skill's sector
      // This is a simplified calculation - in a real app, this would be more sophisticated
      let relevanceScore = trend.growth;
      
      // If student has a career path that matches the sector, increase relevance
      if (student.careerPath && trend.sector.includes(student.careerPath.toLowerCase())) {
        relevanceScore += 20;
      }
      
      // Cap at 100
      relevanceScore = Math.min(relevanceScore, 100);
      
      // Add to skill gaps if relevance is above a threshold
      if (relevanceScore > 15) {
        skillGaps.push({
          skill: trend.skill,
          demandLevel: trend.priority as 'high' | 'medium' | 'low',
          relevanceScore,
          suggestedTraining: trainingRecommendations[trend.skill] || []
        });
      }
    }
  }
  
  // Sort skill gaps by relevance (highest first)
  return skillGaps.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

// Get top recommended skills for a student
export const getTopSkillRecommendations = (student: Student, limit: number = 3): SkillGap[] => {
  const gaps = analyzeSkillGaps(student);
  return gaps.slice(0, limit);
};

// Enroll student in a training program
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

// Get all available training programs across all skills
export const getAllTrainingPrograms = (): TrainingRecommendation[] => {
  return Object.values(trainingRecommendations).flat();
};

// Search for training programs by keyword
export const searchTrainingPrograms = (keyword: string): TrainingRecommendation[] => {
  const searchTerm = keyword.toLowerCase();
  const allPrograms = getAllTrainingPrograms();
  
  return allPrograms.filter(program => 
    program.title.toLowerCase().includes(searchTerm) || 
    program.provider.toLowerCase().includes(searchTerm)
  );
};
