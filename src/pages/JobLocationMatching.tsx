
import { useState, useEffect } from 'react';
import { jobLocationsData } from '@/components/jobs/mockData';
import LocationMatchingHeader from '@/components/jobs/location/LocationMatchingHeader';
import FilterTabs, { FilterType } from '@/components/jobs/location/FilterTabs';
import { Card, CardContent } from '@/components/ui/card';
import JobMap from '@/components/JobMap';
import { JobLocation } from '@/types/map';

const JobLocationMatching = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [jobs, setJobs] = useState<JobLocation[]>(jobLocationsData);
  
  // Handle location updates from the map
  const handleLocationUpdate = (updatedJobs: JobLocation[]) => {
    setJobs(updatedJobs);
    console.log('Jobs updated in JobLocationMatching:', updatedJobs.length);
  };
  
  // Filter jobs based on selected filter
  const getFilteredJobs = () => {
    switch (activeFilter) {
      case 'ai-top-10':
        return [...jobs]
          .sort((a, b) => b.matchPercentage - a.matchPercentage)
          .slice(0, 10);
      case 'portfolio-match':
        return jobs.filter(job => job.portfolioMatch);
      case 'all':
      default:
        return jobs;
    }
  };

  const filteredJobs = getFilteredJobs();

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
        filteredJobsCount={filteredJobs.length}
      />

      <Card className="border-emirati-sandBeige mb-6">
        <CardContent className="p-6">
          <JobMap jobs={filteredJobs} onLocationUpdate={handleLocationUpdate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobLocationMatching;
