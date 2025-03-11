
import { useState } from 'react';
import { sampleJobs } from '@/components/jobs/mockData';
import JobMap from '@/components/JobMap';
import LocationMatchingHeader from '@/components/jobs/location/LocationMatchingHeader';
import FilterTabs, { FilterType } from '@/components/jobs/location/FilterTabs';

const JobLocationMatching = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  // Filter jobs based on selected filter
  const getFilteredJobs = () => {
    switch (activeFilter) {
      case 'ai-top-10':
        return [...sampleJobs]
          .sort((a, b) => b.matchPercentage - a.matchPercentage)
          .slice(0, 10);
      case 'portfolio-match':
        return sampleJobs.filter(job => job.portfolioMatch);
      case 'all':
      default:
        return sampleJobs;
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

      <JobMap jobs={filteredJobs} />
    </div>
  );
};

export default JobLocationMatching;
