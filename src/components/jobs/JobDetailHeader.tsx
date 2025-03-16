
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Vacancy } from "@/types/jobs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/components/i18n/LanguageContext";

interface JobDetailHeaderProps {
  vacancy: Vacancy | null;
}

const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ vacancy }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Button 
        variant="ghost" 
        size={isMobile ? "sm" : "default"} 
        onClick={() => navigate('/job-applications')}
        className="px-2"
      >
        <ChevronLeft size={16} className={language === 'ar' ? 'ml-1 transform rotate-180' : 'mr-1'} /> 
        {t('action.back')}
      </Button>
      <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-emirati-oasisGreen line-clamp-2`}>
        {vacancy ? vacancy.title : t('job.detail.title')}
      </h1>
    </div>
  );
};

export default JobDetailHeader;
