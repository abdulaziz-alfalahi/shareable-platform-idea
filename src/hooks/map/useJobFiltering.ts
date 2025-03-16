
import { useState, useEffect, useCallback } from 'react';
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
  const findNearbyJobs = useCallback((latitude: number, longitude: number, jobs: JobLocation[] = []) => {
    console.log(`Finding jobs near [${latitude}, ${longitude}] within ${searchRadius}km radius`);
    console.log(`Total jobs to filter: ${jobs.length}`);
    
    setUserCoordinates([longitude, latitude]);
    
    // Store all jobs received for later reference
    if (jobs.length > 0) {
      console.log('Storing job data:', jobs);
      // Process jobs to ensure each has valid location data
      const processedJobs = jobs.map(job => {
        // Ensure location object exists
        if (!job.location) {
          return {
            ...job,
            location: {
              latitude: 25.2637 + (Math.random() * 0.1 - 0.05),  // Default to near Al Fahidi Fort with slight variation
              longitude: 55.2972 + (Math.random() * 0.1 - 0.05),
              address: job.company || 'Unknown location'
            }
          };
        }
        
        // Ensure latitude and longitude exist and are valid numbers
        if (!job.location.latitude || !job.location.longitude || 
            isNaN(job.location.latitude) || isNaN(job.location.longitude)) {
          return {
            ...job,
            location: {
              ...job.location,
              latitude: 25.2637 + (Math.random() * 0.1 - 0.05),
              longitude: 55.2972 + (Math.random() * 0.1 - 0.05),
              address: job.location.address || job.company || 'Unknown location'
            }
          };
        }
        
        return job;
      });
      
      setAllJobs(processedJobs);
    }

    try {
      // Use allJobs as fallback if no jobs provided
      const jobsToFilter = jobs.length > 0 ? jobs : allJobs;
      
      if (jobsToFilter.length === 0) {
        console.log('No jobs to filter');
        setNearbyJobs([]);
        return;
      }

      console.log('Filtering', jobsToFilter.length, 'jobs');
      
      // Ensure all jobs have valid location data
      const validJobs = jobsToFilter.map(job => {
        // Fix any jobs with invalid location data
        if (!job.location || !job.location.latitude || !job.location.longitude || 
            isNaN(job.location.latitude) || isNaN(job.location.longitude)) {
          console.log(`Fixing job ${job.id} with invalid location data`);
          return {
            ...job,
            location: {
              ...(job.location || {}),
              latitude: 25.2637 + (Math.random() * 0.1 - 0.05),
              longitude: 55.2972 + (Math.random() * 0.1 - 0.05),
              address: job.location?.address || job.company || 'Unknown location'
            }
          };
        }
        return job;
      });
      
      // Calculate distance for each job
      const jobsWithDistance = validJobs.map(job => {
        // Calculate distance using Haversine formula
        const distance = calculateDistance(
          latitude, 
          longitude, 
          job.location.latitude, 
          job.location.longitude
        );

        return { ...job, distance };
      });
      
      // Filter by distance
      const nearby = jobsWithDistance
        .filter(job => job.distance !== undefined && job.distance <= searchRadius)
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));

      console.log(`Found ${nearby.length} jobs within ${searchRadius}km radius`);
      setNearbyJobs(nearby);
      
      // Store in localStorage for debugging
      localStorage.setItem('nearbyJobs', JSON.stringify(nearby));
      localStorage.setItem('currentJobs', JSON.stringify(validJobs)); // Store all valid jobs
    } catch (error) {
      console.error('Error finding nearby jobs:', error);
      toast({
        title: 'Error',
        description: 'Could not calculate nearby jobs.',
        variant: 'destructive'
      });
    }
  }, [searchRadius, allJobs, toast]);

  // Recalculate when radius changes
  useEffect(() => {
    if (userCoordinates && allJobs.length > 0) {
      console.log(`Radius changed to ${searchRadius}km, recalculating nearby jobs`);
      findNearbyJobs(userCoordinates[1], userCoordinates[0], allJobs);
    }
  }, [searchRadius, userCoordinates, allJobs, findNearbyJobs]);

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
