
import React, { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { JobMapProps } from '@/types/map';
import { useJobMapState } from '@/hooks/map/useJobMapState';
import MapDisplay from './map/MapDisplay';

const JobMap = ({ jobs = [], onLocationUpdate }: JobMapProps) => {
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

  return (
    <div className="space-y-4">
      <MapDisplay
        mapboxToken={mapboxToken}
        setMapboxToken={setMapboxToken}
        tokenSubmitted={tokenSubmitted}
        setTokenSubmitted={setTokenSubmitted}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        searchRadius={searchRadius}
        handleRadiusChange={handleRadiusChange}
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
