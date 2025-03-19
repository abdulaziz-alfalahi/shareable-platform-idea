
import { JobLocation } from '@/types/map';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  MapPin, 
  Briefcase, 
  Building, 
  Award,
  Activity,
  Cpu,
  TrendingUp,
  Zap,
  Utensils
} from "lucide-react";

interface NearbyJobsListProps {
  jobs: JobLocation[];
  searchRadius: number;
}

const getCareerIcon = (iconName?: string) => {
  switch (iconName) {
    case 'cpu':
      return <Cpu className="h-4 w-4 text-blue-500" />;
    case 'trending-up':
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    case 'activity':
      return <Activity className="h-4 w-4 text-red-500" />;
    case 'utensils':
      return <Utensils className="h-4 w-4 text-amber-500" />;
    case 'zap':
      return <Zap className="h-4 w-4 text-lime-500" />;
    default:
      return <Award className="h-4 w-4 text-purple-500" />;
  }
};

const NearbyJobsList = ({ jobs, searchRadius }: NearbyJobsListProps) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <MapPin className="h-12 w-12 text-gray-300 mb-2" />
        <h3 className="text-lg font-semibold text-gray-700">No Locations Found</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Try adjusting your search radius or moving the map to find more opportunities.
        </p>
      </div>
    );
  }

  const sortedJobs = [...jobs].sort((a, b) => {
    // First sort by career pin (if available)
    if (a.careerPathPin && !b.careerPathPin) return -1;
    if (!a.careerPathPin && b.careerPathPin) return 1;
    
    // Then sort by distance
    const distanceA = a.distance || 999;
    const distanceB = b.distance || 999;
    return distanceA - distanceB;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {jobs.some(job => job.careerPathPin) 
            ? 'Career Locations & Jobs' 
            : `Jobs within ${searchRadius}km`}
        </h3>
        <Badge variant="outline" className="bg-gray-100">
          {sortedJobs.length} found
        </Badge>
      </div>

      <div className="space-y-3">
        {sortedJobs.map((job) => (
          <Card 
            key={job.id} 
            className={`p-3 hover:shadow-md transition-shadow ${
              job.careerPathPin 
                ? 'border-l-4' 
                : ''
            }`}
            style={{
              borderLeftColor: job.careerPathPin?.color
            }}
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  {job.careerPathPin ? (
                    getCareerIcon(job.careerPathPin.icon)
                  ) : (
                    <Briefcase className="h-4 w-4 text-gray-500" />
                  )}
                  <h4 className="font-medium text-sm leading-tight">
                    {job.title}
                  </h4>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                  <Building className="h-3 w-3" />
                  <span>{job.company}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location.address}</span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                {job.distance && (
                  <span className="text-xs text-gray-500">
                    {job.distance.toFixed(1)}km
                  </span>
                )}
                
                {job.matchPercentage && (
                  <Badge className={
                    job.matchPercentage > 85 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : job.matchPercentage > 70 
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }>
                    {job.matchPercentage}% Match
                  </Badge>
                )}
                
                {job.careerPathPin && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    {job.careerPathPin.type}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NearbyJobsList;
