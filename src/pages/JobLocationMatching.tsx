
import { useState, useEffect } from 'react';
import { allJobLocationsData } from '@/components/jobs/mock';
import LocationMatchingHeader from '@/components/jobs/location/LocationMatchingHeader';
import FilterTabs, { FilterType } from '@/components/jobs/location/FilterTabs';
import { JobLocation } from '@/types/map';
import JobLocationTab from '@/components/jobs/JobLocationTab';

const JobLocationMatching = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [jobs, setJobs] = useState<JobLocation[]>(allJobLocationsData);
  const [displayJobs, setDisplayJobs] = useState<JobLocation[]>(allJobLocationsData);
  
  const handleLocationUpdate = (updatedJobs: JobLocation[]) => {
    setJobs(updatedJobs);
    console.log('Jobs updated in JobLocationMatching:', updatedJobs.length);
  };

  const getFilteredJobs = () => {
    switch (activeFilter) {
      case 'ai-top-10':
        return [...jobs]
          .sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0))
          .slice(0, 10);
      case 'portfolio-match':
        return jobs.filter(job => job.portfolioMatch);
      case 'all':
      default:
        return jobs;
    }
  };

  // Update displayed jobs whenever the filter changes or jobs array changes
  useEffect(() => {
    const filtered = getFilteredJobs();
    setDisplayJobs(filtered);
    console.log(`Filtering jobs: ${filtered.length} jobs after applying "${activeFilter}" filter`);
  }, [activeFilter, jobs]);

  return (
    <div className="container mx-auto py-10 px-4">
      <LocationMatchingHeader />

      <div className="mb-6">
        <p className="text-gray-600">
          Discover job opportunities near Al Fahidi Fort! Use the map to explore jobs within your preferred radius.
        </p>
      </div>

      <FilterTabs 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filteredJobsCount={displayJobs.length}
      />

      <JobLocationTab jobs={displayJobs} />
    </div>
  );
};

export default JobLocationMatching;
