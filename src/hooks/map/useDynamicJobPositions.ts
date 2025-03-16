
import { useEffect } from 'react';
import { JobLocation } from '@/types/map';
import { calculateDistance } from '@/components/map/mapUtils';

/**
 * Hook to calculate dynamic job positions based on a specified distance from a reference point
 */
export const useDynamicJobPositions = (
  userLocation: [number, number] | null,
  onLocationUpdate?: (jobs: JobLocation[]) => void
) => {
  useEffect(() => {
    if (!userLocation || !onLocationUpdate) {
      console.log('Cannot update job positions: missing userLocation or onLocationUpdate callback');
      return;
    }

    const [longitude, latitude] = userLocation;
    console.log(`Calculating dynamic job positions around [${latitude}, ${longitude}]`);
    
    // Get jobs from localStorage for debugging
    const storedJobs = localStorage.getItem('currentJobs');
    let jobs: JobLocation[] = [];
    
    try {
      if (storedJobs) {
        jobs = JSON.parse(storedJobs);
        console.log(`Retrieved ${jobs.length} jobs from localStorage`);
      }
    } catch (error) {
      console.error('Error parsing jobs from localStorage:', error);
    }
    
    // If no jobs found, create some sample jobs around the user location
    if (jobs.length === 0) {
      console.log('Creating sample jobs around user location');
      
      // Create 5 sample jobs at various distances
      jobs = Array(5).fill(0).map((_, index) => {
        const distance = 2 + (index * 1.5); // 2, 3.5, 5, 6.5, 8 km
        const id = `sample-${index + 1}`;
        
        return {
          id,
          title: `Sample Job ${index + 1}`,
          company: `Company ${index + 1}`,
          location: {
            latitude: 0, // Will be calculated
            longitude: 0, // Will be calculated
            address: `${distance.toFixed(1)}km from current location`
          },
          distanceFromUser: distance,
          matchPercentage: Math.floor(60 + Math.random() * 35)
        };
      });
    }
    
    // Update any jobs that need coordinates
    const updatedJobs = jobs.map(job => {
      // Check for valid existing coordinates
      const hasValidCoordinates = 
        job.location && 
        typeof job.location.latitude === 'number' && 
        typeof job.location.longitude === 'number' &&
        !isNaN(job.location.latitude) && 
        !isNaN(job.location.longitude) &&
        (job.location.latitude !== 0 || job.location.longitude !== 0);
      
      // Skip jobs that already have valid coordinates
      if (hasValidCoordinates) {
        // Calculate the actual distance for these jobs if not present
        const distance = job.distance || calculateDistance(
          latitude,
          longitude,
          job.location.latitude,
          job.location.longitude
        );
        return { ...job, distance };
      }
      
      // For jobs without coordinates or with invalid coordinates, calculate position
      const distance = job.distanceFromUser || (Math.random() * 5) + 2; // 2-7km if no distance
      
      // Convert km to radians
      const earthRadius = 6371; // km
      const distanceRadians = distance / earthRadius;
      
      // Generate a random angle - use job ID for consistency if available
      const jobIdHash = job.id ? 
        Array.from(job.id).reduce((a, c) => a + c.charCodeAt(0), 0) : 
        Math.floor(Math.random() * 1000);
      const angle = (jobIdHash % 360) * (Math.PI / 180);
      
      // Calculate new coordinates
      const latRadian = latitude * (Math.PI / 180);
      const lonRadian = longitude * (Math.PI / 180);
      
      const newLatRadian = Math.asin(
        Math.sin(latRadian) * Math.cos(distanceRadians) +
        Math.cos(latRadian) * Math.sin(distanceRadians) * Math.cos(angle)
      );
      
      const newLonRadian = lonRadian + Math.atan2(
        Math.sin(angle) * Math.sin(distanceRadians) * Math.cos(latRadian),
        Math.cos(distanceRadians) - Math.sin(latRadian) * Math.sin(newLatRadian)
      );
      
      // Convert back to degrees
      const newLat = newLatRadian * (180 / Math.PI);
      const newLon = newLonRadian * (180 / Math.PI);
      
      console.log(`Generated position for job ${job.id}: [${newLat.toFixed(6)}, ${newLon.toFixed(6)}] at ${distance}km`);
      
      // Create a copy of the job with updated coordinates
      return {
        ...job,
        location: {
          ...job.location,
          latitude: newLat,
          longitude: newLon
        },
        distance
      };
    });
    
    // Update the jobs with their new coordinates
    if (updatedJobs.length > 0) {
      console.log(`Updated ${updatedJobs.length} job positions`);
      onLocationUpdate(updatedJobs);
      
      // Save to localStorage for debugging
      localStorage.setItem('currentJobs', JSON.stringify(updatedJobs));
    }
  }, [userLocation, onLocationUpdate]);
};

export default useDynamicJobPositions;
