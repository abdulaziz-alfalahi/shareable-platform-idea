
import { CareerPath } from './pathwayTypes';

// Mock data for development
export const mockCareerPaths: CareerPath[] = [
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
