
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefcaseIcon, UserCheckIcon, DatabaseIcon } from 'lucide-react';

export type FilterType = 'ai-top-10' | 'portfolio-match' | 'all';

interface FilterTabsProps {
  activeFilter: FilterType;
  setActiveFilter: (value: FilterType) => void;
  filteredJobsCount: number;
}

const FilterTabs = ({ activeFilter, setActiveFilter, filteredJobsCount }: FilterTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs defaultValue={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterType)} className="w-full">
        <TabsList className="mb-4 bg-emirati-sandBeige/20 w-full justify-start">
          <TabsTrigger value="ai-top-10" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <BriefcaseIcon size={16} className="mr-2" /> AI Top 10 Matchings
          </TabsTrigger>
          <TabsTrigger value="portfolio-match" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <UserCheckIcon size={16} className="mr-2" /> Matching My Portfolio
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <DatabaseIcon size={16} className="mr-2" /> All Vacancies
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="rounded-md bg-slate-50 p-3 text-sm">
        <p className="font-medium mb-1">
          {activeFilter === 'ai-top-10' && 'Showing top 10 job matches based on your profile and skills'}
          {activeFilter === 'portfolio-match' && 'Showing vacancies that align with your portfolio and experience'}
          {activeFilter === 'all' && 'Showing all available job vacancies'}
        </p>
        <p className="text-muted-foreground">
          {filteredJobsCount} vacancies found
        </p>
      </div>
    </div>
  );
};

export default FilterTabs;
