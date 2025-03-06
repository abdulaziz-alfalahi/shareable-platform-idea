
import { CareerPath, CareerNode, SimulationResult } from './pathwayTypes';
import { Student } from '@/types/student';

// Get all available career paths
export const getCareerPaths = async (): Promise<CareerPath[]> => {
  // In a production environment, this would fetch from an API
  // For now, we'll return mock data
  return mockCareerPaths;
};

// Get a specific career path by ID
export const getCareerPathById = async (pathId: string): Promise<CareerPath | null> => {
  const paths = await getCareerPaths();
  return paths.find(path => path.id === pathId) || null;
};

// Simulate a career path for a student
export const simulateCareerPath = (
  student: Student,
  pathId: string,
  selectedNodes: string[]
): SimulationResult => {
  // In a real implementation, this would use AI to generate a more personalized simulation
  // For now, we'll use a simplified algorithm
  
  // Get path data
  const path = mockCareerPaths.find(p => p.id === pathId);
  if (!path) {
    throw new Error(`Career path with ID ${pathId} not found`);
  }
  
  // Calculate time to complete (simplified)
  let timeMonths = selectedNodes.length * 18; // Assuming each node takes ~18 months
  const timeToComplete = timeMonths > 24 
    ? `${Math.round(timeMonths / 12)} years` 
    : `${timeMonths} months`;
  
  // Calculate potential salary
  const lastNodeId = selectedNodes[selectedNodes.length - 1];
  const lastNode = path.nodes.find(n => n.id === lastNodeId);
  const potentialSalary = lastNode 
    ? Math.round((lastNode.salary.min + lastNode.salary.max) / 2)
    : 0;
  
  // Collect required skills
  const requiredSkills: string[] = [];
  selectedNodes.forEach(nodeId => {
    const node = path.nodes.find(n => n.id === nodeId);
    if (node) {
      node.skills.forEach(skill => {
        if (!requiredSkills.includes(skill)) {
          requiredSkills.push(skill);
        }
      });
    }
  });
  
  // Determine challenge level (simplified)
  let challengeLevel: 'low' | 'medium' | 'high' = 'medium';
  if (requiredSkills.length > 12) {
    challengeLevel = 'high';
  } else if (requiredSkills.length < 6) {
    challengeLevel = 'low';
  }
  
  // Determine demand level based on path popularity
  let demandLevel: 'low' | 'medium' | 'high' = 'medium';
  if (path.popularity > 7) {
    demandLevel = 'high';
  } else if (path.popularity < 4) {
    demandLevel = 'low';
  }
  
  // Generate recommended training
  const recommendedTraining = generateRecommendedTraining(requiredSkills);
  
  return {
    timeToComplete,
    potentialSalary,
    requiredSkills,
    challengeLevel,
    demandLevel,
    recommendedTraining
  };
};

// Helper function to generate training recommendations
const generateRecommendedTraining = (skills: string[]): string[] => {
  // In a real implementation, this would use an AI recommendation system
  // For now, we'll use a simplified mapping
  const trainingMap: Record<string, string> = {
    'Data Analysis': 'Advanced Data Analytics with Python',
    'Leadership': 'Strategic Leadership for UAE Professionals',
    'Project Management': 'PMP Certification Course',
    'Programming': 'Full-Stack Development Bootcamp',
    'Communication': 'Business Communication Masterclass',
    'AI': 'Artificial Intelligence Fundamentals',
    'Blockchain': 'Blockchain Applications in Finance',
    'Cloud Computing': 'AWS Solutions Architect Training',
    'Digital Marketing': 'Digital Marketing Certification',
    'Financial Analysis': 'Financial Modeling & Valuation',
    'Healthcare Management': 'Healthcare Administration Certificate',
    'Cybersecurity': 'Certified Information Systems Security Professional (CISSP)',
    'Renewable Energy': 'Sustainable Energy Solutions Course',
    'UX Design': 'User Experience Design Certificate'
  };
  
  return skills
    .filter(skill => trainingMap[skill])
    .map(skill => trainingMap[skill])
    .slice(0, 3); // Return top 3 recommendations
};

// Mock data for development
const mockCareerPaths: CareerPath[] = [
  {
    id: 'tech-path',
    name: 'Technology & Digital Innovation',
    description: 'Career path focused on technology and digital innovation roles in UAE\'s growing tech sector',
    sector: 'Technology',
    popularity: 8,
    nodes: [
      {
        id: 'tech-entry',
        title: 'Junior Developer',
        description: 'Entry-level development role focused on building and maintaining applications',
        level: 'entry',
        salary: { min: 15000, max: 25000, currency: 'AED' },
        skills: ['Programming', 'Problem Solving', 'Communication'],
        education: ['Bachelor\'s in Computer Science or related field'],
        timeToAchieve: '0-1 years'
      },
      {
        id: 'tech-mid',
        title: 'Senior Developer',
        description: 'Mid-level development role with focus on complex application development',
        level: 'mid',
        salary: { min: 25000, max: 35000, currency: 'AED' },
        skills: ['Advanced Programming', 'System Design', 'Team Leadership'],
        education: ['Bachelor\'s in Computer Science or related field'],
        certifications: ['Specialized programming certifications'],
        timeToAchieve: '3-5 years',
        prerequisites: ['tech-entry']
      },
      {
        id: 'tech-senior',
        title: 'Technical Lead',
        description: 'Senior position leading development teams and projects',
        level: 'senior',
        salary: { min: 35000, max: 50000, currency: 'AED' },
        skills: ['Architecture Design', 'Team Management', 'Strategic Planning'],
        education: ['Bachelor\'s or Master\'s in Computer Science'],
        timeToAchieve: '5-8 years',
        prerequisites: ['tech-mid']
      },
      {
        id: 'tech-expert',
        title: 'Chief Technology Officer',
        description: 'Executive position overseeing technology strategy and implementation',
        level: 'expert',
        salary: { min: 50000, max: 90000, currency: 'AED' },
        skills: ['Strategic Leadership', 'Technology Vision', 'Executive Management'],
        education: ['Master\'s in Computer Science or MBA'],
        timeToAchieve: '10+ years',
        prerequisites: ['tech-senior']
      }
    ]
  },
  {
    id: 'finance-path',
    name: 'Financial Services & Banking',
    description: 'Career path for financial services, banking, and investment sectors in UAE',
    sector: 'Finance',
    popularity: 7,
    nodes: [
      {
        id: 'finance-entry',
        title: 'Financial Analyst',
        description: 'Entry-level role analyzing financial data and preparing reports',
        level: 'entry',
        salary: { min: 18000, max: 28000, currency: 'AED' },
        skills: ['Financial Analysis', 'Data Analysis', 'Excel'],
        education: ['Bachelor\'s in Finance, Economics, or Accounting'],
        timeToAchieve: '0-1 years'
      },
      {
        id: 'finance-mid',
        title: 'Investment Associate',
        description: 'Mid-level role evaluating investment opportunities and managing portfolios',
        level: 'mid',
        salary: { min: 30000, max: 45000, currency: 'AED' },
        skills: ['Investment Analysis', 'Financial Modeling', 'Market Research'],
        education: ['Bachelor\'s in Finance or related field'],
        certifications: ['CFA Level I or II'],
        timeToAchieve: '3-5 years',
        prerequisites: ['finance-entry']
      },
      {
        id: 'finance-senior',
        title: 'Investment Manager',
        description: 'Senior role managing large investment portfolios and client relationships',
        level: 'senior',
        salary: { min: 45000, max: 65000, currency: 'AED' },
        skills: ['Portfolio Management', 'Risk Assessment', 'Client Management'],
        education: ['Bachelor\'s or Master\'s in Finance'],
        certifications: ['CFA or MBA'],
        timeToAchieve: '6-10 years',
        prerequisites: ['finance-mid']
      },
      {
        id: 'finance-expert',
        title: 'Chief Investment Officer',
        description: 'Executive position leading investment strategy and operations',
        level: 'expert',
        salary: { min: 65000, max: 120000, currency: 'AED' },
        skills: ['Strategic Leadership', 'Economic Forecasting', 'Executive Management'],
        education: ['Master\'s in Finance or MBA'],
        certifications: ['CFA'],
        timeToAchieve: '12+ years',
        prerequisites: ['finance-senior']
      }
    ]
  },
  {
    id: 'healthcare-path',
    name: 'Healthcare & Medical Services',
    description: 'Career path for healthcare and medical services sectors in UAE',
    sector: 'Healthcare',
    popularity: 6,
    nodes: [
      {
        id: 'healthcare-entry',
        title: 'Medical Officer',
        description: 'Entry-level healthcare provider in clinical settings',
        level: 'entry',
        salary: { min: 20000, max: 30000, currency: 'AED' },
        skills: ['Patient Care', 'Medical Knowledge', 'Communication'],
        education: ['MBBS or equivalent medical degree'],
        timeToAchieve: '0-1 years after medical school'
      },
      {
        id: 'healthcare-mid',
        title: 'Specialist Doctor',
        description: 'Specialized healthcare provider with focused expertise',
        level: 'mid',
        salary: { min: 35000, max: 50000, currency: 'AED' },
        skills: ['Specialized Medical Knowledge', 'Advanced Diagnosis', 'Treatment Planning'],
        education: ['Medical Degree with Specialization'],
        timeToAchieve: '4-6 years',
        prerequisites: ['healthcare-entry']
      },
      {
        id: 'healthcare-senior',
        title: 'Senior Consultant',
        description: 'Senior specialist handling complex cases and supervising junior doctors',
        level: 'senior',
        salary: { min: 50000, max: 80000, currency: 'AED' },
        skills: ['Expert Medical Knowledge', 'Healthcare Leadership', 'Research'],
        education: ['Medical Degree with Fellowship/Board Certification'],
        timeToAchieve: '8-12 years',
        prerequisites: ['healthcare-mid']
      },
      {
        id: 'healthcare-expert',
        title: 'Chief of Medicine',
        description: 'Executive medical position leading hospital departments or healthcare organizations',
        level: 'expert',
        salary: { min: 80000, max: 150000, currency: 'AED' },
        skills: ['Healthcare Administration', 'Strategic Leadership', 'Policy Development'],
        education: ['Medical Degree with additional management qualifications'],
        timeToAchieve: '15+ years',
        prerequisites: ['healthcare-senior']
      }
    ]
  }
];
