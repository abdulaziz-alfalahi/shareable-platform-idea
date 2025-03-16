
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && setActiveFilter(value as FilterType)}>
        <ToggleGroupItem value="all" className="text-sm">
          All Jobs
        </ToggleGroupItem>
        <ToggleGroupItem value="ai-top-10" className="text-sm">
          AI Top 10
        </ToggleGroupItem>
        <ToggleGroupItem value="portfolio-match" className="text-sm">
          Portfolio Match
        </ToggleGroupItem>
      </ToggleGroup>
      
      <div className="mt-2 sm:mt-0 text-sm text-gray-500">
        Showing: <span className="font-medium">{filteredJobsCount}</span>
      </div>
    </div>
  );
};

export default FilterTabs;
