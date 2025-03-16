
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
  setLocationSearch: (location: string) => void;
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
  if (!tokenSubmitted) {
    return (
      <TokenInput 
        mapboxToken={mapboxToken} 
        setMapboxToken={setMapboxToken} 
        setTokenSubmitted={setTokenSubmitted} 
      />
    );
  }

  return (
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
  );
};

export default MapDisplay;
