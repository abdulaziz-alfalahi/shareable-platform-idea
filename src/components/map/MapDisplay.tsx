
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import TokenInput from './TokenInput';
import MapContainer from './MapContainer';
import MapControls from './MapControls';
import NearbyJobsList from './NearbyJobsList';
import { JobLocation } from '@/types/map';

interface MapDisplayProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  tokenSubmitted: boolean;
  setTokenSubmitted: (submitted: boolean) => void;
  userLocation: [number, number] | null;
  setUserLocation: (location: [number, number]) => void;
  searchRadius: number;
  handleRadiusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nearbyJobs: JobLocation[];
  locationSearch: string;
  setLocationSearch: (search: string) => void;
  searchLocation: () => void;
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  findNearbyJobs: (latitude: number, longitude: number) => void;
  reverseGeocode: (lat: number, lng: number) => Promise<void>;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  mapboxToken,
  setMapboxToken,
  tokenSubmitted,
  setTokenSubmitted,
  userLocation,
  setUserLocation,
  searchRadius,
  handleRadiusChange,
  nearbyJobs,
  locationSearch,
  setLocationSearch,
  searchLocation,
  jobs,
  onLocationUpdate,
  findNearbyJobs,
  reverseGeocode
}) => {
  // Log job counts (moved outside of useEffect to avoid conditional hooks)
  console.log(`MapDisplay received ${jobs.length} jobs and ${nearbyJobs.length} nearby jobs`);
  
  // For map display, we want to show the filtered jobs if there are any, or all jobs otherwise
  const displayJobs = nearbyJobs.length > 0 ? nearbyJobs : jobs;
  
  // Log what we're displaying (moved outside of useEffect to avoid conditional hooks)
  console.log(`MapDisplay displaying ${displayJobs.length} jobs on the map`);

  // Display token input if no token is provided
  if (!tokenSubmitted) {
    return (
      <TokenInput
        mapboxToken={mapboxToken}
        setMapboxToken={setMapboxToken}
        setTokenSubmitted={setTokenSubmitted}
      />
    );
  }

  // Display map and controls if token is provided
  return (
    <div className="space-y-4">
      <MapControls
        locationSearch={locationSearch}
        setLocationSearch={setLocationSearch}
        searchLocation={searchLocation}
        searchRadius={searchRadius}
        handleRadiusChange={handleRadiusChange}
        onLocationUpdate={onLocationUpdate}
      />

      <MapContainer
        mapboxToken={mapboxToken}
        jobs={displayJobs}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        onLocationUpdate={onLocationUpdate}
        reverseGeocode={reverseGeocode}
        findNearbyJobs={findNearbyJobs}
      />

      <NearbyJobsList jobs={nearbyJobs} searchRadius={searchRadius} />
    </div>
  );
};

export default MapDisplay;
