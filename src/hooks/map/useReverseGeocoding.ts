
import { useToast } from '@/components/ui/use-toast';
import { JobLocation } from '@/types/map';
import { calculateDistanceCoordinates } from '@/components/map/mapUtils';

export const useReverseGeocoding = (
  mapboxToken: string,
  onLocationUpdate?: (jobs: JobLocation[]) => void
) => {
  const { toast } = useToast();

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number, jobs: JobLocation[] = []) => {
    if (!mapboxToken) return;
    
    try {
      console.log('Reverse geocoding coordinates:', {lat, lng});
      
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      
      if (!response.ok) {
        throw new Error(`Reverse geocoding request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        console.log('Address found:', address);
        
        if (jobs.length === 0) return;
        
        // Store current jobs for position calculation
        localStorage.setItem('currentJobs', JSON.stringify(jobs));
        
        // Update the job data with new coordinates and address
        const updatedJobs = jobs.map(job => 
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
        
        // Calculate positions for dynamic jobs
        if (onLocationUpdate) {
          const dynamicJobs = updatedJobs.map(job => {
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
          
          onLocationUpdate(dynamicJobs);
        }
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      toast({
        title: 'Geocoding Error',
        description: 'Could not get address for the selected location.',
        variant: 'destructive'
      });
    }
  };

  return {
    reverseGeocode
  };
};
