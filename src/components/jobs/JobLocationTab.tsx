
import React from 'react';
import { JobLocation } from '@/types/map';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BriefcaseIcon, 
  UserCheckIcon, 
  DatabaseIcon
} from "lucide-react";
import JobMap from '@/components/JobMap';
import { useLanguage } from '@/components/i18n/LanguageContext';

interface JobLocationTabProps {
  jobs: JobLocation[];
}

export const JobLocationTab = ({ jobs }: JobLocationTabProps) => {
  const [activeLocationFilter, setActiveLocationFilter] = useState<'ai-top-10' | 'portfolio-match' | 'all'>('all');
  const { t, language } = useLanguage();

  const getFilteredLocationJobs = () => {
    switch (activeLocationFilter) {
      case 'ai-top-10':
        return [...jobs]
          .sort((a, b) => {
            const aMatch = a.matchPercentage || Math.floor(Math.random() * 40) + 60;
            const bMatch = b.matchPercentage || Math.floor(Math.random() * 40) + 60;
            return bMatch - aMatch;
          })
          .slice(0, 10);
      case 'portfolio-match':
        return jobs.filter(job => 
          job.portfolioMatch === true || Math.random() > 0.7
        );
      case 'all':
      default:
        return jobs;
    }
  };

  const filteredLocationJobs = getFilteredLocationJobs();

  return (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-6">
        <p className="text-gray-600">
          {t('jobs.location.description')}
        </p>
      </div>

      <div className="mb-6">
        <Tabs 
          defaultValue="all" 
          onValueChange={(value) => setActiveLocationFilter(value as 'ai-top-10' | 'portfolio-match' | 'all')} 
          className="w-full"
        >
          <TabsList className="mb-4 bg-emirati-sandBeige/20 w-full justify-start">
            <TabsTrigger value="ai-top-10" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <BriefcaseIcon size={16} className="mr-2" /> {t('jobs.ai.match')}
            </TabsTrigger>
            <TabsTrigger value="portfolio-match" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <UserCheckIcon size={16} className="mr-2" /> {t('jobs.portfolio.match')}
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <DatabaseIcon size={16} className="mr-2" /> {t('jobs.all.vacancies')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="rounded-md bg-slate-50 p-3 text-sm">
          <p className="font-medium mb-1">
            {activeLocationFilter === 'ai-top-10' && t('jobs.ai.match')}
            {activeLocationFilter === 'portfolio-match' && t('jobs.portfolio.match')}
            {activeLocationFilter === 'all' && t('jobs.all.vacancies')}
          </p>
          <p className="text-muted-foreground">
            {filteredLocationJobs.length} {t('jobs.vacancies.found')}
          </p>
        </div>
      </div>

      <Card className="border-emirati-sandBeige mb-6">
        <CardContent className="p-6">
          <JobMap jobs={filteredLocationJobs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobLocationTab;
