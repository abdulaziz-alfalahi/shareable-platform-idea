
import { useState, useEffect } from 'react';
import { allJobLocationsData } from '@/components/jobs/mock';
import LocationMatchingHeader from '@/components/jobs/location/LocationMatchingHeader';
import FilterTabs, { FilterType } from '@/components/jobs/location/FilterTabs';
import { JobLocation } from '@/types/map';
import JobLocationTab from '@/components/jobs/JobLocationTab';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

const JobLocationMatching = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [jobs, setJobs] = useState<JobLocation[]>(allJobLocationsData);
  const [displayJobs, setDisplayJobs] = useState<JobLocation[]>(allJobLocationsData);
  
  // This function will be passed down to components that need to update job data
  const handleLocationUpdate = (updatedJobs: JobLocation[]) => {
    // Only update if there's a meaningful change in the data
    if (JSON.stringify(updatedJobs) !== JSON.stringify(jobs)) {
      console.log('Jobs updated in JobLocationMatching:', updatedJobs.length);
      setJobs(updatedJobs);
    }
  };

  // Apply filters to jobs
  useEffect(() => {
    let filtered: JobLocation[] = [];
    
    switch (activeFilter) {
      case 'ai-top-10':
        filtered = [...jobs]
          .sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0))
          .slice(0, 10);
        break;
      case 'portfolio-match':
        filtered = jobs.filter(job => job.portfolioMatch);
        break;
      case 'all':
      default:
        filtered = [...jobs];
        break;
    }
    
    setDisplayJobs(filtered);
    console.log(`Filtering jobs: ${filtered.length} jobs after applying "${activeFilter}" filter`);
  }, [activeFilter, jobs]);

  return (
    <div className="min-h-screen flex flex-col bg-emirati-sandstone/30">
      <Header />
      <main className="flex-grow container mx-auto py-10 px-4">
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

        <JobLocationTab jobs={displayJobs} onLocationUpdate={handleLocationUpdate} />
      </main>
      <Footer />
    </div>
  );
};

export default JobLocationMatching;
