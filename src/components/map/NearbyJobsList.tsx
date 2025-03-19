
import React from 'react';
import { JobLocation } from '@/types/map';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, PercentIcon } from 'lucide-react';

interface NearbyJobsListProps {
  jobs: JobLocation[];
  searchRadius: number;
}

const NearbyJobsList: React.FC<NearbyJobsListProps> = ({ jobs, searchRadius }) => {
  if (jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-muted-foreground py-4">
          No jobs found within {searchRadius}km radius. Try increasing the search radius.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-medium mb-2 text-emirati-deepBrown">
        {jobs.length} job{jobs.length !== 1 ? 's' : ''} within {searchRadius}km radius
      </h3>
      <div className="space-y-3 overflow-y-auto pr-1 flex-grow">
        {jobs.map((job) => (
          <div key={job.id} className="p-3 border rounded-md hover:bg-accent/50 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium">{job.title}</h4>
              {job.matchPercentage && (
                <Badge variant="outline" className="bg-emirati-sandBeige/20 flex items-center">
                  <PercentIcon className="h-3 w-3 mr-1" /> {job.matchPercentage}% match
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Briefcase className="h-3.5 w-3.5 mr-1" /> {job.company}
            </div>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1" /> {job.location.address}
              {job.distance && (
                <span className="ml-auto text-xs">
                  {job.distance.toFixed(1)}km away
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyJobsList;
