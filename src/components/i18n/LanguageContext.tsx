
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.className = language === 'ar' ? 'font-arabic' : 'font-sans';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    'app.title': 'Emirati Journey',
    'app.description': 'Discover your career path from school to retirement',
    'toggle.language': 'العربية',
    
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Jobs',
    'nav.training': 'Training',
    'nav.passport': 'Career Passport',
    'nav.mindmap': 'Platform Mindmap',
    'nav.retirement': 'Retirement Planning',
    
    // Jobs
    'jobs.location.title': 'Job Location Matching',
    'jobs.location.description': 'Discover job opportunities near you! Enable location services to see jobs within your preferred radius.',
    'jobs.ai.match': 'AI Top 10 Matchings',
    'jobs.portfolio.match': 'Matching My Portfolio',
    'jobs.all.vacancies': 'All Vacancies',
    'jobs.vacancies.found': 'vacancies found',
    'jobs.nearby': 'Nearby Jobs',
    'jobs.km.away': 'km away',
    'jobs.no.jobs': 'No jobs found within the search radius',
    
    // Profile
    'profile.welcome': 'Welcome',
    'profile.greeting': 'Welcome to Emirati Journey',
    'profile.setup': 'Let\'s set up your profile to personalize your journey.',
    'profile.name': 'Your Name',
    'profile.enter.name': 'Enter your full name',
    'profile.continue': 'Continue',
    
    // Onboarding
    'onboarding.role': 'Choose Your Role',
    'onboarding.role.description': 'Select the role that best describes you.',
    'onboarding.interests': 'Areas of Interest',
    'onboarding.interests.description': 'Select sectors or fields that interest you most.',
    'onboarding.cultural': 'Cultural Values',
    'onboarding.cultural.description': 'Select values that align with your personal and professional journey.',
    'onboarding.goals': 'Your Career Goals',
    'onboarding.goals.description': 'What do you hope to achieve in your career journey?',
    'onboarding.location': 'Where Are You Located?',
    'onboarding.location.description': 'This helps us personalize opportunities near you.',
    'onboarding.complete': 'Start Your Journey',
    'onboarding.back': 'Back',
    
    // Retirement
    'retirement.title': 'Retirement Planning',
    'retirement.description': 'Planning for retirement is an essential part of every Emirati\'s career journey.',
    
    // MindMap
    'mindmap.title': 'Platform Mindmap',
    'mindmap.description': 'Explore the journey of different users through the Emirati Journey platform. Select a persona below to see their step-by-step journey from start to finish.',
    'mindmap.search': 'Search journeys, steps, skills...',
    
    // Common actions
    'action.search': 'Search',
    'action.enroll': 'Enroll Now',
    'action.apply': 'Apply',
    'action.view': 'View Details',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.back': 'Back',
    
    // Map controls
    'map.location': 'Search for a location...',
    'map.tip': 'Search for a location or click on the map to place the marker. Drag the marker to adjust the position.',
    'map.radius': 'Search Radius',

    // Job details
    'job.detail.title': 'Job Details',
    'job.company.about': 'About the Company',
    'job.company.size': 'Company Size',
    'job.company.values': 'Company Values',
    'job.company.environment': 'Work Environment',
    'job.description': 'Job Description',
    'job.posted.date': 'Posted Date',
    'job.salary.range': 'Salary Range',
    'job.location': 'Location',
    'job.company': 'Company',
    'job.required.skills': 'Required Skills',
    'job.skills.develop': 'Skills to Develop',
    'job.quick.application': 'Quick Application',
    'job.profile.match': 'Your profile is',
    'job.matched': 'matched to this job',
    'job.missing.skills': 'Missing Skills',
    'job.apply.profile': 'Apply with Profile',
    'job.applying': 'Applying...',
    'job.applied': 'Applied',
    'job.profile.share': 'Your profile will be shared with',
    'job.tab.overview': 'Overview',
    'job.tab.match': 'Match Details',
    'job.tab.company': 'Company',
    'job.apply': 'Apply Now',
    'job.share': 'Share',
    'job.visit.website': 'Visit Website',

    // Career Passport
    'passport.title': 'Career Passport',
    'passport.skills': 'Skills and Competencies',
    'passport.education': 'Education',
    'passport.experience': 'Work Experience',
    'passport.achievements': 'Achievements',
    'passport.certifications': 'Certifications',
    'passport.goals': 'Career Goals',
    'passport.progress': 'Progress Tracking',
    'passport.mentor': 'Mentor Matching',
    'passport.challenges': 'Current Challenges',
    'passport.level': 'Current Level',
    'passport.next.level': 'Next Level',
    'passport.points': 'Career Points',
    'passport.cultural.achievements': 'Cultural Achievements',
    'passport.recent.achievements': 'Recent Achievements',
    'passport.leaderboard': 'Career Leaderboard',
    'passport.public.profile': 'Public Profile',
    'passport.settings': 'Settings',
  },
  ar: {
    // General
    'app.title': 'رحلة إماراتية',
    'app.description': 'اكتشف مسار حياتك المهنية من المدرسة إلى التقاعد',
    'toggle.language': 'English',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.dashboard': 'لوحة التحكم',
    'nav.jobs': 'الوظائف',
    'nav.training': 'التدريب',
    'nav.passport': 'جواز المسار المهني',
    'nav.mindmap': 'خريطة المنصة',
    'nav.retirement': 'تخطيط التقاعد',
    
    // Jobs
    'jobs.location.title': 'مطابقة موقع الوظيفة',
    'jobs.location.description': 'اكتشف فرص العمل بالقرب منك! قم بتمكين خدمات الموقع لرؤية الوظائف ضمن نطاق البحث الذي تفضله.',
    'jobs.ai.match': 'أفضل 10 مطابقات بالذكاء الاصطناعي',
    'jobs.portfolio.match': 'مطابقة ملفي الشخصي',
    'jobs.all.vacancies': 'جميع الوظائف الشاغرة',
    'jobs.vacancies.found': 'وظائف شاغرة',
    'jobs.nearby': 'وظائف قريبة',
    'jobs.km.away': 'كم بعيد',
    'jobs.no.jobs': 'لم يتم العثور على وظائف ضمن نطاق البحث',
    
    // Profile
    'profile.welcome': 'مرحباً',
    'profile.greeting': 'مرحباً بك في رحلة إماراتية',
    'profile.setup': 'دعنا نقوم بإعداد ملفك الشخصي لتخصيص رحلتك.',
    'profile.name': 'اسمك',
    'profile.enter.name': 'أدخل اسمك الكامل',
    'profile.continue': 'متابعة',
    
    // Onboarding
    'onboarding.role': 'اختر دورك',
    'onboarding.role.description': 'حدد الدور الذي يصفك بشكل أفضل.',
    'onboarding.interests': 'مجالات الاهتمام',
    'onboarding.interests.description': 'حدد القطاعات أو المجالات التي تهمك.',
    'onboarding.cultural': 'القيم الثقافية',
    'onboarding.cultural.description': 'حدد القيم التي تتماشى مع رحلتك الشخصية والمهنية.',
    'onboarding.goals': 'أهدافك المهنية',
    'onboarding.goals.description': 'ما الذي تأمل في تحقيقه في رحلتك المهنية؟',
    'onboarding.location': 'أين أنت موجود؟',
    'onboarding.location.description': 'هذا يساعدنا على تخصيص الفرص بالقرب منك.',
    'onboarding.complete': 'ابدأ رحلتك',
    'onboarding.back': 'رجوع',
    
    // Retirement
    'retirement.title': 'تخطيط التقاعد',
    'retirement.description': 'التخطيط للتقاعد هو جزء أساسي من الرحلة المهنية لكل إماراتي.',
    
    // MindMap
    'mindmap.title': 'خريطة المنصة',
    'mindmap.description': 'استكشف رحلة المستخدمين المختلفين عبر منصة الرحلة الإماراتية. حدد نوع المستخدم أدناه لمشاهدة رحلته خطوة بخطوة من البداية إلى النهاية.',
    'mindmap.search': 'البحث في الرحلات والخطوات والمهارات...',
    
    // Common actions
    'action.search': 'بحث',
    'action.enroll': 'سجل الآن',
    'action.apply': 'تقديم',
    'action.view': 'عرض التفاصيل',
    'action.save': 'حفظ',
    'action.cancel': 'إلغاء',
    'action.back': 'رجوع',
    
    // Map controls
    'map.location': 'ابحث عن موقع...',
    'map.tip': 'ابحث عن موقع أو انقر على الخريطة لوضع العلامة. اسحب العلامة لضبط الموقع.',
    'map.radius': 'نطاق البحث',

    // Job details
    'job.detail.title': 'تفاصيل الوظيفة',
    'job.company.about': 'عن الشركة',
    'job.company.size': 'حجم الشركة',
    'job.company.values': 'قيم الشركة',
    'job.company.environment': 'بيئة العمل',
    'job.description': 'وصف الوظيفة',
    'job.posted.date': 'تاريخ النشر',
    'job.salary.range': 'نطاق الراتب',
    'job.location': 'الموقع',
    'job.company': 'الشركة',
    'job.required.skills': 'المهارات المطلوبة',
    'job.skills.develop': 'مهارات للتطوير',
    'job.quick.application': 'التقديم السريع',
    'job.profile.match': 'ملفك الشخصي يتطابق بنسبة',
    'job.matched': 'مع هذه الوظيفة',
    'job.missing.skills': 'المهارات الناقصة',
    'job.apply.profile': 'تقديم بالملف الشخصي',
    'job.applying': 'جاري التقديم...',
    'job.applied': 'تم التقديم',
    'job.profile.share': 'سيتم مشاركة ملفك الشخصي مع',
    'job.tab.overview': 'نظرة عامة',
    'job.tab.match': 'تفاصيل التطابق',
    'job.tab.company': 'الشركة',
    'job.apply': 'تقديم الآن',
    'job.share': 'مشاركة',
    'job.visit.website': 'زيارة الموقع',

    // Career Passport
    'passport.title': 'جواز المسار المهني',
    'passport.skills': 'المهارات والكفاءات',
    'passport.education': 'التعليم',
    'passport.experience': 'الخبرة العملية',
    'passport.achievements': 'الإنجازات',
    'passport.certifications': 'الشهادات',
    'passport.goals': 'الأهداف المهنية',
    'passport.progress': 'تتبع التقدم',
    'passport.mentor': 'مطابقة المرشد',
    'passport.challenges': 'التحديات الحالية',
    'passport.level': 'المستوى الحالي',
    'passport.next.level': 'المستوى التالي',
    'passport.points': 'نقاط المسار المهني',
    'passport.cultural.achievements': 'الإنجازات الثقافية',
    'passport.recent.achievements': 'الإنجازات الأخيرة',
    'passport.leaderboard': 'لوحة المتصدرين',
    'passport.public.profile': 'الملف العام',
    'passport.settings': 'الإعدادات',
  }
};

