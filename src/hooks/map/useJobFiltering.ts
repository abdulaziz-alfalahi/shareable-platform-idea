
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
              latitude: latitude + (Math.random() * 0.1 - 0.05),  // Near current location with slight variation
              longitude: longitude + (Math.random() * 0.1 - 0.05),
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
              latitude: latitude + (Math.random() * 0.1 - 0.05),
              longitude: longitude + (Math.random() * 0.1 - 0.05),
              address: job.location.address || job.company || 'Unknown location'
            }
          };
        }
        
        return job;
      });
      
      setAllJobs(processedJobs);
      
      // Store in localStorage for debugging and reuse
      localStorage.setItem('currentJobs', JSON.stringify(processedJobs));
    }

    try {
      // Use allJobs as fallback if no jobs provided
      const jobsToFilter = jobs.length > 0 ? jobs : allJobs;
      
      if (jobsToFilter.length === 0) {
        console.log('No jobs to filter, generating sample jobs');
        // Generate sample jobs at various distances
        const sampleJobs = Array(8).fill(0).map((_, index) => {
          const distance = (Math.random() * searchRadius * 0.8) + 1; // Random distance up to 80% of radius
          return {
            id: `sample-job-${index}`,
            title: `Sample Position ${index + 1}`,
            company: `Company ${String.fromCharCode(65 + index)}`,
            location: {
              latitude: latitude + (distance * 0.009 * (Math.random() > 0.5 ? 1 : -1)),
              longitude: longitude + (distance * 0.009 * (Math.random() > 0.5 ? 1 : -1)),
              address: `${distance.toFixed(1)}km from current location`
            },
            matchPercentage: Math.floor(60 + Math.random() * 40),
            distance: distance
          };
        });
        
        setNearbyJobs(sampleJobs);
        setAllJobs(sampleJobs);
        localStorage.setItem('currentJobs', JSON.stringify(sampleJobs));
        localStorage.setItem('nearbyJobs', JSON.stringify(sampleJobs));
        return;
      }

      console.log('Filtering', jobsToFilter.length, 'jobs');
      
      // Ensure all jobs have valid location data
      const validJobs = jobsToFilter.filter(job => 
        job.location && 
        typeof job.location.latitude === 'number' && 
        typeof job.location.longitude === 'number' &&
        !isNaN(job.location.latitude) && 
        !isNaN(job.location.longitude)
      );
      
      if (validJobs.length === 0) {
        console.log('No jobs with valid coordinates found');
        toast({
          title: 'No valid job locations',
          description: 'Could not find any jobs with valid location data.',
          variant: 'destructive'
        });
        return;
      }
      
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
    if (userCoordinates) {
      console.log(`Radius changed to ${searchRadius}km, recalculating nearby jobs`);
      findNearbyJobs(userCoordinates[1], userCoordinates[0], allJobs);
    }
  }, [searchRadius, userCoordinates, allJobs, findNearbyJobs]);

  // Handle radius change
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radius = Number(e.target.value);
    console.log(`Search radius changed to ${radius}km`);
    setSearchRadius(radius);
    
    if (userCoordinates) {
      findNearbyJobs(userCoordinates[1], userCoordinates[0], allJobs);
    }
  };

  return {
    searchRadius,
    nearbyJobs,
    findNearbyJobs,
    handleRadiusChange
  };
};
