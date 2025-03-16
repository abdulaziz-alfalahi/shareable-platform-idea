
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefcaseIcon, UserCheckIcon, DatabaseIcon } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageContext';

export type FilterType = 'ai-top-10' | 'portfolio-match' | 'all';

interface FilterTabsProps {
  activeFilter: FilterType;
  setActiveFilter: (value: FilterType) => void;
  filteredJobsCount: number;
}

const FilterTabs = ({ activeFilter, setActiveFilter, filteredJobsCount }: FilterTabsProps) => {
  const { t, language } = useLanguage();

  return (
    <div className={`mb-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Tabs defaultValue={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterType)} className="w-full">
        <TabsList className="mb-4 bg-emirati-sandBeige/20 w-full justify-start">
          <TabsTrigger value="ai-top-10" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <BriefcaseIcon size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} /> {t('jobs.ai.match')}
          </TabsTrigger>
          <TabsTrigger value="portfolio-match" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <UserCheckIcon size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} /> {t('jobs.portfolio.match')}
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <DatabaseIcon size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} /> {t('jobs.all.vacancies')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="rounded-md bg-slate-50 p-3 text-sm">
        <p className="font-medium mb-1">
          {activeFilter === 'ai-top-10' && t('jobs.ai.match')}
          {activeFilter === 'portfolio-match' && t('jobs.portfolio.match')}
          {activeFilter === 'all' && t('jobs.all.vacancies')}
        </p>
        <p className="text-muted-foreground">
          {filteredJobsCount} {t('jobs.vacancies.found')}
        </p>
      </div>
    </div>
  );
};

export default FilterTabs;
