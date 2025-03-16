
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Define translation keys structure
type TranslationKeys = {
  // Common
  languageName: string;
  toggle: string;
  
  // Navigation
  home: string;
  dashboard: string;
  careerPassport: string;
  jobs: string;
  training: string;
  mindmap: string;
  dataEntry: string;
  
  // Home page
  getStarted: string;
  welcomeHeading: string;
  welcomeSubheading: string;
  
  // Jobs and location
  jobLocationMatching: string;
  backToHome: string;
  discoverJobsNear: string;
  enableLocation: string;
  allJobs: string;
  aiTopTen: string;
  portfolioMatch: string;
  showingJobs: string;
  nearbyJobs: string;
  noJobsFound: string;
  kmAway: string;
  
  // Headers and titles
  culturalThemes: string;
  
  // Job details
  jobDetails: string;
  company: string;
  location: string;
  positionType: string;
  responsibilities: string;
  requirements: string;
  apply: string;
  matches: string;
};

// Define translations
const translations: Record<Language, TranslationKeys> = {
  en: {
    // Common
    languageName: 'English',
    toggle: 'العربية',
    
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    careerPassport: 'Career Passport',
    jobs: 'Jobs',
    training: 'Training',
    mindmap: 'Mindmap',
    dataEntry: 'Data Entry',
    
    // Home page
    getStarted: 'Get Started',
    welcomeHeading: 'Your Career Journey in the UAE',
    welcomeSubheading: 'From Education to Retirement, Supporting Every Step',
    
    // Jobs and location
    jobLocationMatching: 'Job Location Matching',
    backToHome: 'Back to Home',
    discoverJobsNear: 'Discover job opportunities near you! Enable location services to see jobs within your preferred radius.',
    enableLocation: 'Enable Location',
    allJobs: 'All Jobs',
    aiTopTen: 'AI Top 10',
    portfolioMatch: 'Portfolio Match',
    showingJobs: 'Showing',
    nearbyJobs: 'Nearby Jobs',
    noJobsFound: 'No jobs found within the search radius',
    kmAway: 'km away',
    
    // Headers and titles
    culturalThemes: 'Cultural Heritage Themes',
    
    // Job details
    jobDetails: 'Job Details',
    company: 'Company',
    location: 'Location',
    positionType: 'Position Type',
    responsibilities: 'Responsibilities',
    requirements: 'Requirements',
    apply: 'Apply Now',
    matches: 'matches your profile'
  },
  ar: {
    // Common
    languageName: 'العربية',
    toggle: 'English',
    
    // Navigation
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    careerPassport: 'جواز المهنة',
    jobs: 'الوظائف',
    training: 'التدريب',
    mindmap: 'خريطة العقل',
    dataEntry: 'إدخال البيانات',
    
    // Home page
    getStarted: 'البدء',
    welcomeHeading: 'رحلة مهنتك في الإمارات',
    welcomeSubheading: 'من التعليم إلى التقاعد، ندعم كل خطوة',
    
    // Jobs and location
    jobLocationMatching: 'تطابق موقع الوظيفة',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    discoverJobsNear: 'اكتشف فرص العمل بالقرب منك! قم بتمكين خدمات الموقع لرؤية الوظائف ضمن نطاق مفضل.',
    enableLocation: 'تمكين الموقع',
    allJobs: 'جميع الوظائف',
    aiTopTen: 'أفضل 10 بالذكاء الاصطناعي',
    portfolioMatch: 'تطابق المحفظة',
    showingJobs: 'عرض',
    nearbyJobs: 'الوظائف القريبة',
    noJobsFound: 'لم يتم العثور على وظائف ضمن نطاق البحث',
    kmAway: 'كم بعيد',
    
    // Headers and titles
    culturalThemes: 'سمات التراث الثقافي',
    
    // Job details
    jobDetails: 'تفاصيل الوظيفة',
    company: 'الشركة',
    location: 'الموقع',
    positionType: 'نوع المنصب',
    responsibilities: 'المسؤوليات',
    requirements: 'المتطلبات',
    apply: 'تقدم الآن',
    matches: 'يتطابق مع ملفك الشخصي'
  }
};

// Create the context
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// Create provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get saved language from localStorage, default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang === 'ar' ? 'ar' : 'en';
  });

  // Set document direction based on language
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = dir === 'rtl';

  // Translation function
  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key];
  };

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Add RTL class to body for global styling
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language, dir, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
