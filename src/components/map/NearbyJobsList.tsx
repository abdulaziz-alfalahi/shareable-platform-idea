
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, MapPinIcon } from 'lucide-react';
import { JobLocation } from '@/types/map';

interface NearbyJobsListProps {
  nearbyJobs: JobLocation[];
}

const NearbyJobsList: React.FC<NearbyJobsListProps> = ({ nearbyJobs }) => {
  return (
    <Card className="h-[500px] overflow-auto">
      <CardHeader>
        <CardTitle className="text-emirati-oasisGreen flex items-center">
          <SearchIcon className="mr-2 h-5 w-5" />
          Nearby Jobs ({nearbyJobs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {nearbyJobs.length > 0 ? (
          <div className="space-y-3">
            {nearbyJobs.map(job => (
              <div key={job.id} className="p-3 border rounded-md hover:bg-gray-50">
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <div className="flex items-start mt-1">
                  <MapPinIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{job.location.address}</p>
                </div>
                {job.distance !== undefined && (
                  <p className="text-xs text-emirati-oasisGreen mt-1 font-medium">
                    {job.distance.toFixed(1)} km away
                  </p>
                )}
                {job.matchPercentage && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-emirati-oasisGreen h-1.5 rounded-full" 
                      style={{ width: `${job.matchPercentage}%` }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-1">
                      {job.matchPercentage}% match
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <SearchIcon className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>No jobs found within the search radius</p>
            <p className="text-sm mt-2">Try increasing the radius or searching a different location</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyJobsList;
