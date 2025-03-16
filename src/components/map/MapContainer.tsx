
import React, { useRef, useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { JobLocation } from '@/types/map';
import useMapInitialization from '@/hooks/map/useMapInitialization';
import UserLocationMarker from './UserLocationMarker';
import JobMarkers from './JobMarkers';

interface MapContainerProps {
  mapboxToken: string;
  jobs: JobLocation[];
  userLocation: [number, number] | null;
  setUserLocation: (location: [number, number]) => void;
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  reverseGeocode: (lat: number, lng: number) => Promise<void>;
  findNearbyJobs: (latitude: number, longitude: number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  mapboxToken,
  jobs,
  userLocation,
  setUserLocation,
  onLocationUpdate,
  reverseGeocode,
  findNearbyJobs,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  
  // Log jobs for debugging
  useEffect(() => {
    console.log(`MapContainer received ${jobs.length} jobs to display`);
    if (jobs.length > 0) {
      console.log('First job sample:', jobs[0]);
    }
  }, [jobs]);

  // Initialize the map with our custom hook
  const map = useMapInitialization({
    mapboxToken,
    containerRef: mapContainer,
    initialCenter: userLocation || undefined,
    onMapLoaded: () => {
      console.log('Map is initialized and ready');
      setMapReady(true);
    }
  });

  return (
    <div ref={mapContainer} className="h-[500px] rounded-lg border border-gray-200 shadow-sm">
      {map.current && (
        <>
          <UserLocationMarker 
            map={map} 
            setUserLocation={setUserLocation} 
            findNearbyJobs={findNearbyJobs} 
          />
          <JobMarkers 
            map={map} 
            jobs={jobs} 
            onLocationUpdate={onLocationUpdate} 
            reverseGeocode={reverseGeocode}
          />
        </>
      )}
    </div>
  );
};

export default MapContainer;
