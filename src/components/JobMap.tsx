
import React, { useEffect, useState, useCallback } from 'react';
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
  const [initialized, setInitialized] = useState(false);
  
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
  
  // Prevent repeated re-renders by using useCallback and memoizing handlers
  const handleRadiusChangeExtended = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleRadiusChange(e);
    if (onRadiusChange) {
      onRadiusChange(parseInt(e.target.value));
    }
  }, [handleRadiusChange, onRadiusChange]);

  // Only log jobs on initial render or when jobs array length changes
  useEffect(() => {
    if (!initialized || jobs.length !== nearbyJobs.length) {
      console.log(`JobMap received ${jobs.length} jobs to display`);
      setInitialized(true);
    }
  }, [jobs.length, initialized, nearbyJobs.length]);

  // Pass nearby jobs to parent component only when nearbyJobs change
  useEffect(() => {
    if (onNearbyJobsUpdate && nearbyJobs.length > 0) {
      onNearbyJobsUpdate(nearbyJobs);
    }
  }, [nearbyJobs, onNearbyJobsUpdate]);

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
