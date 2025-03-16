
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { JobLocation } from '@/types/map';
import { calculateDistanceCoordinates } from '@/components/map/mapUtils';

export const useLocationSearch = (
  mapboxToken: string,
  setUserLocation: (location: [number, number]) => void,
  onLocationUpdate?: (jobs: JobLocation[]) => void
) => {
  const [locationSearch, setLocationSearch] = useState<string>('');
  const { toast } = useToast();

  // Search for a location - using a more reliable endpoint
  const searchLocation = async (jobs: JobLocation[], findNearbyJobs: (lat: number, lng: number) => void) => {
    if (!locationSearch || !mapboxToken) return;
    
    try {
      console.log('Searching for location:', locationSearch, 'with token:', mapboxToken.substring(0, 10) + '...');
      
      // Use the styles endpoint first to validate the token works at all
      const validationCheck = await fetch(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${mapboxToken}`
      );
      
      if (!validationCheck.ok) {
        throw new Error(`Token validation failed with status: ${validationCheck.status}`);
      }
      
      // Now proceed with geocoding
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationSearch)}.json?access_token=${mapboxToken}`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const address = data.features[0].place_name;
        
        console.log('Location found:', {lng, lat, address});
        
        // Update the map and nearby jobs
        setUserLocation([lng, lat]);
        findNearbyJobs(lat, lng);
        
        // Store current jobs in local storage for position calculation
        localStorage.setItem('currentJobs', JSON.stringify(jobs));
        
        // Update the location if onLocationUpdate is provided
        if (onLocationUpdate) {
          // Calculate dynamic job positions based on this location
          const dynamicJobs = jobs.map(job => {
            // Skip jobs without distanceFromUser property
            if (!job.distanceFromUser) return job;

            // Calculate new coordinates based on distance
            const bearing = Math.random() * 360; // Random direction
            const { latitude, longitude } = calculateDistanceCoordinates(
              lat, 
              lng, 
              job.distanceFromUser, 
              bearing
            );

            return {
              ...job,
              location: {
                ...job.location,
                latitude,
                longitude
              }
            };
          });
          
          // Find workplace job and update if it exists
          const updatedJobs = dynamicJobs.map(job => 
            job.id === "workplace" 
              ? { 
                  ...job, 
                  location: { 
                    ...job.location, 
                    latitude: lat, 
                    longitude: lng, 
                    address 
                  } 
                } 
              : job
          );
          
          onLocationUpdate(updatedJobs);
        }
      } else {
        toast({
          title: 'Location Not Found',
          description: 'Could not find the specified location.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error searching location:', error);
      toast({
        title: 'Geocoding Error',
        description: 'Could not search for the location. Please check your Mapbox token.',
        variant: 'destructive'
      });
    }
  };

  return {
    locationSearch,
    setLocationSearch,
    searchLocation
  };
};
