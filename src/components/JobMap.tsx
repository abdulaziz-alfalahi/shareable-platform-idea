
import React, { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { JobMapProps } from '@/types/map';
import { useJobMapState } from '@/hooks/map/useJobMapState';
import MapDisplay from './map/MapDisplay';

interface ExtendedJobMapProps extends JobMapProps {
  onNearbyJobsUpdate?: (jobs: any[]) => void;
  onRadiusChange?: (radius: number) => void;
}

const JobMap = ({ 
  jobs = [], 
  onLocationUpdate,
  onNearbyJobsUpdate,
  onRadiusChange 
}: ExtendedJobMapProps) => {
  const {
    mapboxToken,
    setMapboxToken,
    userLocation,
    setUserLocation,
    searchRadius,
    nearbyJobs,
    tokenSubmitted,
    setTokenSubmitted,
    locationSearch,
    setLocationSearch,
    handleRadiusChange,
    searchLocation,
    findNearbyJobs,
    reverseGeocode
  } = useJobMapState(jobs, onLocationUpdate);
  
  useEffect(() => {
    if (jobs.length > 0) {
      console.log(`JobMap received ${jobs.length} jobs to display`);
    }
  }, [jobs]);

  // Pass nearby jobs to parent component
  useEffect(() => {
    if (onNearbyJobsUpdate && nearbyJobs.length > 0) {
      onNearbyJobsUpdate(nearbyJobs);
    }
  }, [nearbyJobs, onNearbyJobsUpdate]);

  // Handle radius changes and propagate to parent
  const handleRadiusChangeExtended = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRadiusChange(e);
    if (onRadiusChange) {
      onRadiusChange(parseInt(e.target.value));
    }
  };

  return (
    <div className="h-full">
      <MapDisplay
        mapboxToken={mapboxToken}
        setMapboxToken={setMapboxToken}
        tokenSubmitted={tokenSubmitted}
        setTokenSubmitted={setTokenSubmitted}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        searchRadius={searchRadius}
        handleRadiusChange={handleRadiusChangeExtended}
        nearbyJobs={nearbyJobs}
        locationSearch={locationSearch}
        setLocationSearch={setLocationSearch}
        searchLocation={searchLocation}
        jobs={jobs}
        onLocationUpdate={onLocationUpdate}
        findNearbyJobs={findNearbyJobs}
        reverseGeocode={reverseGeocode}
      />
    </div>
  );
};

export default JobMap;
