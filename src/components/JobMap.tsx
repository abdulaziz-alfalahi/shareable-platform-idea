
import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/components/ui/use-toast';
import TokenInput from './map/TokenInput';
import MapContainer from './map/MapContainer';
import MapControls from './map/MapControls';
import NearbyJobsList from './map/NearbyJobsList';
import { calculateDistance } from './map/mapUtils';

// Define job location type
export interface JobLocation {
  id: string;
  title: string;
  company: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance?: number;
  matchPercentage?: number;
  portfolioMatch?: boolean;
}

interface JobMapProps {
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
}

const JobMap = ({ jobs = [], onLocationUpdate }: JobMapProps) => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(10); // in kilometers
  const [nearbyJobs, setNearbyJobs] = useState<JobLocation[]>([]);
  const [tokenSubmitted, setTokenSubmitted] = useState<boolean>(false);
  const [locationSearch, setLocationSearch] = useState<string>('');
  const { toast } = useToast();

  // Reset the tokenSubmitted state if the token is cleared
  useEffect(() => {
    if (!mapboxToken && tokenSubmitted) {
      setTokenSubmitted(false);
    }
  }, [mapboxToken, tokenSubmitted]);

  // Find jobs within the search radius
  const findNearbyJobs = (latitude: number, longitude: number) => {
    if (!jobs.length) return;

    try {
      const nearby = jobs.map(job => {
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

      setNearbyJobs(nearby);
    } catch (error) {
      console.error('Error finding nearby jobs:', error);
      toast({
        title: 'Error',
        description: 'Could not calculate nearby jobs.',
        variant: 'destructive'
      });
    }
  };

  // Handle radius change
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radius = Number(e.target.value);
    setSearchRadius(radius);
    if (userLocation) {
      findNearbyJobs(userLocation[1], userLocation[0]);
    }
  };

  // Search for a location
  const searchLocation = async () => {
    if (!locationSearch || !mapboxToken) return;
    
    try {
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
        
        // Update the map and nearby jobs
        setUserLocation([lng, lat]);
        findNearbyJobs(lat, lng);
        
        // Update the location if onLocationUpdate is provided
        if (onLocationUpdate) {
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

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    if (!mapboxToken) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      
      if (!response.ok) {
        throw new Error(`Reverse geocoding request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        
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
        
        // Call the callback with updated job data
        if (onLocationUpdate) {
          onLocationUpdate(updatedJobs);
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

  return (
    <div className="space-y-4">
      {!tokenSubmitted ? (
        <TokenInput 
          mapboxToken={mapboxToken} 
          setMapboxToken={setMapboxToken} 
          setTokenSubmitted={setTokenSubmitted} 
        />
      ) : (
        <>
          <MapControls 
            locationSearch={locationSearch}
            setLocationSearch={setLocationSearch}
            searchLocation={searchLocation}
            searchRadius={searchRadius}
            handleRadiusChange={handleRadiusChange}
            onLocationUpdate={onLocationUpdate}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-1 lg:col-span-2">
              <MapContainer 
                mapboxToken={mapboxToken}
                jobs={jobs}
                userLocation={userLocation}
                setUserLocation={setUserLocation}
                onLocationUpdate={onLocationUpdate}
                reverseGeocode={reverseGeocode}
                findNearbyJobs={findNearbyJobs}
              />
            </div>
            
            <div className="col-span-1">
              <NearbyJobsList nearbyJobs={nearbyJobs} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobMap;
