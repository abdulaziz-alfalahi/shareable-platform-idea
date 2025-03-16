
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/i18n/LanguageContext';

const LocationMatchingHeader = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  return (
    <div className={`flex justify-between items-center mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="flex items-center"
      >
        <ArrowLeftIcon className={`h-4 w-4 ${language === 'ar' ? 'ml-2 transform rotate-180' : 'mr-2'}`} />
        {t('action.back')} {t('nav.home')}
      </Button>
      <h1 className="text-3xl font-bold text-emirati-oasisGreen">{t('jobs.location.title')}</h1>
      <div className="w-24"></div>
    </div>
  );
};

export default LocationMatchingHeader;
