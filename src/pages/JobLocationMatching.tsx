
import { useState } from 'react';
import { jobLocationsData } from '@/components/jobs/mockData';
import LocationMatchingHeader from '@/components/jobs/location/LocationMatchingHeader';
import FilterTabs, { FilterType } from '@/components/jobs/location/FilterTabs';
import { Card, CardContent } from '@/components/ui/card';
import JobMap from '@/components/JobMap';

const JobLocationMatching = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  // Filter jobs based on selected filter
  const getFilteredJobs = () => {
    switch (activeFilter) {
      case 'ai-top-10':
        return [...jobLocationsData]
          .sort((a, b) => b.matchPercentage - a.matchPercentage)
          .slice(0, 10);
      case 'portfolio-match':
        return jobLocationsData.filter(job => job.portfolioMatch);
      case 'all':
      default:
        return jobLocationsData;
    }
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className="container mx-auto py-10 px-4">
      <LocationMatchingHeader />

      <div className="mb-6">
        <p className="text-gray-600">
          Discover job opportunities near you! Enable location services to see jobs within your preferred radius.
        </p>
      </div>

      <FilterTabs 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filteredJobsCount={filteredJobs.length}
      />

      <Card className="border-emirati-sandBeige mb-6">
        <CardContent className="p-6">
          <JobMap jobs={filteredJobs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobLocationMatching;
