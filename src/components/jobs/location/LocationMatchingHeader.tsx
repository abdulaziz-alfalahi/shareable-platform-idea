
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const LocationMatchingHeader = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="flex justify-between items-center mb-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="flex items-center"
      >
        <ArrowLeftIcon className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        {t('backToHome')}
      </Button>
      <h1 className="text-3xl font-bold text-emirati-oasisGreen">{t('jobLocationMatching')}</h1>
      <div className="w-24"></div>
    </div>
  );
};

export default LocationMatchingHeader;
