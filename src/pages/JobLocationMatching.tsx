
import { useState } from 'react';
import { jobLocationsData } from '@/components/jobs/mockData';
import LocationMatchingHeader from '@/components/jobs/location/LocationMatchingHeader';
import FilterTabs, { FilterType } from '@/components/jobs/location/FilterTabs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapIcon } from 'lucide-react';

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
          <Alert className="bg-emirati-sandBeige/10 border-emirati-oasisGreen">
            <MapIcon className="h-5 w-5 text-emirati-oasisGreen" />
            <AlertTitle>Map Feature Temporarily Unavailable</AlertTitle>
            <AlertDescription>
              We're currently improving our map functionality to better display job locations across the UAE.
              This feature will be available again soon with enhanced capabilities.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map(job => (
              <Card key={job.id} className="p-3 border-emirati-sandBeige/40">
                <h3 className="font-medium text-emirati-oasisGreen">{job.title}</h3>
                <p className="text-sm">{job.company}</p>
                <p className="text-sm text-muted-foreground">{job.location.address}</p>
                {job.matchPercentage && (
                  <div className="mt-2 text-sm font-medium">
                    {job.matchPercentage}% Match
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobLocationMatching;
