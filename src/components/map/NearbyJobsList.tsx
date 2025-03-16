
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon } from 'lucide-react';
import { JobLocation } from '@/types/map';
import { useLanguage } from '@/contexts/LanguageContext';

interface NearbyJobsListProps {
  nearbyJobs: JobLocation[];
}

const NearbyJobsList: React.FC<NearbyJobsListProps> = ({ nearbyJobs }) => {
  const { t, isRTL } = useLanguage();
  
  return (
    <Card className="h-[500px] overflow-auto">
      <CardHeader>
        <CardTitle className="text-emirati-oasisGreen flex items-center">
          <SearchIcon className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('nearbyJobs')} ({nearbyJobs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {nearbyJobs.length > 0 ? (
          <div className="space-y-3">
            {nearbyJobs.map(job => (
              <div key={job.id} className="p-3 border rounded-md hover:bg-gray-50">
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="text-sm">{job.location.address}</p>
                {job.distance !== undefined && (
                  <p className="text-xs text-emirati-oasisGreen mt-1">
                    {job.distance.toFixed(1)} {t('kmAway')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            {t('noJobsFound')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyJobsList;
