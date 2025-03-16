
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useLanguage } from '@/contexts/LanguageContext';

export type FilterType = 'all' | 'ai-top-10' | 'portfolio-match';

interface FilterTabsProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  filteredJobsCount: number;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  activeFilter, 
  setActiveFilter,
  filteredJobsCount
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && setActiveFilter(value as FilterType)}>
        <ToggleGroupItem value="all" className="text-sm">
          {t('allJobs')}
        </ToggleGroupItem>
        <ToggleGroupItem value="ai-top-10" className="text-sm">
          {t('aiTopTen')}
        </ToggleGroupItem>
        <ToggleGroupItem value="portfolio-match" className="text-sm">
          {t('portfolioMatch')}
        </ToggleGroupItem>
      </ToggleGroup>
      
      <div className="mt-2 sm:mt-0 text-sm text-gray-500">
        {t('showingJobs')}: <span className="font-medium">{filteredJobsCount}</span>
      </div>
    </div>
  );
};

export default FilterTabs;
