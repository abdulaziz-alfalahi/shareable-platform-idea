
import { JobMarketTrend, TrainingRecommendation } from './types';

/**
 * Mock data for UAE job market trends
 * In a real app, this would come from an API or database
 */
export const uaeJobMarketTrends: JobMarketTrend[] = [
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

/**
 * Mock data for training recommendations
 * In a real app, this would come from an API or database
 */
export const trainingRecommendations: Record<string, TrainingRecommendation[]> = {
  'data analytics': [
    {
      id: 'da001',
      title: 'Data Analytics Fundamentals',
      provider: 'UAE Tech Institute',
      duration: '6 weeks',
      level: 'beginner',
      format: 'hybrid',
      description: 'Learn the fundamentals of data analytics including data visualization, statistical analysis, and tools like Excel and Tableau.'
    },
    {
      id: 'da002',
      title: 'Advanced Data Visualization',
      provider: 'Dubai Data Academy',
      duration: '8 weeks',
      level: 'intermediate',
      format: 'online',
      description: 'Master advanced data visualization techniques and tools to transform complex data into compelling visual stories.'
    }
  ],
  'artificial intelligence': [
    {
      id: 'ai001',
      title: 'Introduction to AI for Business',
      provider: 'MBZUAI',
      duration: '4 weeks',
      level: 'beginner',
      format: 'online',
      description: 'An introduction to artificial intelligence concepts and their practical applications in business settings.'
    },
    {
      id: 'ai002',
      title: 'Machine Learning Applications',
      provider: 'Khalifa University',
      duration: '12 weeks',
      level: 'advanced',
      format: 'in-person',
      description: 'Comprehensive course on implementing machine learning algorithms for real-world applications across various industries.'
    }
  ],
  'cybersecurity': [
    {
      id: 'cs001',
      title: 'Cybersecurity Essentials',
      provider: 'Emirates Cyber Academy',
      duration: '8 weeks',
      level: 'beginner',
      format: 'online',
      description: 'Learn the fundamentals of cybersecurity, including threat detection, prevention, and best practices for digital safety.'
    },
    {
      id: 'cs002',
      title: 'Network Security Certification',
      provider: 'UAE Secure Networks Institute',
      duration: '10 weeks',
      level: 'intermediate',
      format: 'hybrid',
      description: 'Comprehensive certification program focused on securing network infrastructure and identifying vulnerabilities.'
    }
  ],
  'project management': [
    {
      id: 'pm001',
      title: 'Agile Project Management',
      provider: 'Emirates Leadership Institute',
      duration: '6 weeks',
      level: 'intermediate',
      format: 'hybrid',
      description: 'Learn agile methodologies and frameworks for effective project delivery in fast-paced environments.'
    },
    {
      id: 'pm002',
      title: 'PMP Certification Preparation',
      provider: 'Dubai Knowledge Park',
      duration: '12 weeks',
      level: 'advanced',
      format: 'in-person',
      description: 'Comprehensive preparation course for the Project Management Professional (PMP) certification exam.'
    }
  ],
  'uae business culture': [
    {
      id: 'bc001',
      title: 'UAE Business Etiquette',
      provider: 'Emirati Cultural Center',
      duration: '2 weeks',
      level: 'beginner',
      format: 'hybrid',
      description: 'Essential course on UAE business customs, protocols, and cultural considerations for professional success.'
    }
  ],
  'arabic language': [
    {
      id: 'al001',
      title: 'Business Arabic for Professionals',
      provider: 'Arabic Language Academy',
      duration: '8 weeks',
      level: 'beginner',
      format: 'in-person',
      description: 'Practical Arabic language training focused on business vocabulary and common professional scenarios.'
    }
  ],
  'digital marketing': [
    {
      id: 'dm001',
      title: 'Digital Marketing Strategy',
      provider: 'UAE Marketing Institute',
      duration: '6 weeks',
      level: 'intermediate',
      format: 'online',
      description: 'Comprehensive digital marketing course covering SEO, social media, content strategy, and analytics.'
    }
  ],
  'blockchain': [
    {
      id: 'bc001',
      title: 'Blockchain for Business',
      provider: 'Dubai Blockchain Center',
      duration: '4 weeks',
      level: 'beginner',
      format: 'online',
      description: 'Introduction to blockchain technology and its applications in various business sectors including finance and supply chain.'
    }
  ],
  'mobile app development': [
    {
      id: 'mad001',
      title: 'Mobile App Development with React Native',
      provider: 'Abu Dhabi Coding School',
      duration: '10 weeks',
      level: 'intermediate',
      format: 'hybrid',
      description: 'Practical course on building cross-platform mobile applications using React Native framework.'
    }
  ],
  'user experience design': [
    {
      id: 'ux001',
      title: 'UX Design Principles',
      provider: 'Dubai Design Academy',
      duration: '8 weeks',
      level: 'beginner',
      format: 'online',
      description: 'Learn the fundamentals of user experience design, including research methods, wireframing, prototyping and usability testing.'
    }
  ]
};
