
import { useState, useEffect } from 'react';
import { JobLocation } from '@/types/map';
import { useToast } from '@/components/ui/use-toast';
import { calculateDistance } from '@/components/map/mapUtils';

export const useJobFiltering = () => {
  const [searchRadius, setSearchRadius] = useState<number>(10); // in kilometers
  const [nearbyJobs, setNearbyJobs] = useState<JobLocation[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);
  const [allJobs, setAllJobs] = useState<JobLocation[]>([]);
  const { toast } = useToast();

  // Find jobs within the search radius
  const findNearbyJobs = (latitude: number, longitude: number, jobs: JobLocation[] = []) => {
    console.log(`Finding jobs near [${latitude}, ${longitude}] within ${searchRadius}km radius`);
    console.log(`Total jobs to filter: ${jobs.length}`);
    
    setUserCoordinates([longitude, latitude]);
    
    if (jobs.length > 0) {
      setAllJobs(jobs);
    }

    try {
      // Use allJobs as fallback if no jobs provided
      const jobsToFilter = jobs.length > 0 ? jobs : allJobs;
      
      if (jobsToFilter.length === 0) {
        console.log('No jobs to filter');
        return;
      }

      const nearby = jobsToFilter.map(job => {
        if (!job.location) return { ...job, distance: Infinity };

        // Calculate distance using Haversine formula
        const distance = calculateDistance(
          latitude, 
          longitude, 
          job.location.latitude, 
          job.location.longitude
        );

        return { ...job, distance };
      }).filter(job => job.distance !== undefined && job.distance <= searchRadius);

      console.log(`Found ${nearby.length} jobs within ${searchRadius}km radius`);
      setNearbyJobs(nearby);
      
      // Store in localStorage for debugging
      localStorage.setItem('nearbyJobs', JSON.stringify(nearby));
    } catch (error) {
      console.error('Error finding nearby jobs:', error);
      toast({
        title: 'Error',
        description: 'Could not calculate nearby jobs.',
        variant: 'destructive'
      });
    }
  };

  // Recalculate when radius changes
  useEffect(() => {
    if (userCoordinates && allJobs.length > 0) {
      console.log(`Radius changed to ${searchRadius}km, recalculating nearby jobs`);
      findNearbyJobs(userCoordinates[1], userCoordinates[0], allJobs);
    }
  }, [searchRadius]);

  // Handle radius change
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>, userLocation: [number, number] | null, jobs: JobLocation[]) => {
    const radius = Number(e.target.value);
    setSearchRadius(radius);
    console.log(`Radius changed to ${radius}km`);
    
    if (userLocation) {
      findNearbyJobs(userLocation[1], userLocation[0], jobs);
    }
  };

  return {
    searchRadius,
    nearbyJobs,
    findNearbyJobs,
    handleRadiusChange
  };
};
