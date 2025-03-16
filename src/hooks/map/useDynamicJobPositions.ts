
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
    if (!userLocation || !onLocationUpdate) return;

    const [longitude, latitude] = userLocation;
    
    // Get jobs from localStorage for debugging
    const storedJobs = localStorage.getItem('currentJobs');
    let jobs: JobLocation[] = [];
    
    try {
      if (storedJobs) {
        jobs = JSON.parse(storedJobs);
      }
    } catch (error) {
      console.error('Error parsing jobs from localStorage:', error);
    }
    
    // Update any jobs that have distanceFromUser but no actual coordinates
    const updatedJobs = jobs.map(job => {
      // Skip jobs that already have valid coordinates
      if (
        job.location && 
        job.location.latitude !== 0 && 
        job.location.longitude !== 0 && 
        !isNaN(job.location.latitude) && 
        !isNaN(job.location.longitude)
      ) {
        return job;
      }
      
      // Calculate new coordinates based on distanceFromUser
      if (job.distanceFromUser) {
        // Convert km to radians
        const earthRadius = 6371; // km
        const distanceRadians = job.distanceFromUser / earthRadius;
        
        // Generate a random angle
        const angle = Math.random() * 2 * Math.PI;
        
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
        
        console.log(`Calculated dynamic position for job ${job.id}: [${newLat}, ${newLon}]`);
        
        // Create a copy of the job with updated coordinates
        return {
          ...job,
          location: {
            ...job.location,
            latitude: newLat,
            longitude: newLon
          }
        };
      }
      
      return job;
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
