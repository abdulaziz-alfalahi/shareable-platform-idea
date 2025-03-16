
import React, { useRef, useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { JobLocation } from '@/types/map';
import useMapInitialization from '@/hooks/map/useMapInitialization';
import UserLocationMarker from './UserLocationMarker';
import JobMarkers from './JobMarkers';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  
  // Use Al Fahidi Fort as default if user location is null
  const defaultLocation: [number, number] = [55.2972, 25.2637];
  const centerLocation = userLocation || defaultLocation;
  
  // Validate jobs data to ensure we have valid locations
  const validJobs = jobs.filter(job => 
    job.location && 
    typeof job.location.latitude === 'number' && 
    typeof job.location.longitude === 'number' && 
    !isNaN(job.location.latitude) && 
    !isNaN(job.location.longitude)
  );
  
  // Log jobs for debugging
  useEffect(() => {
    console.log(`MapContainer received ${jobs.length} jobs, ${validJobs.length} valid locations`);
    if (validJobs.length > 0) {
      console.log('Valid job sample:', validJobs[0]);
    } else if (jobs.length > 0) {
      console.log('Invalid job sample:', jobs[0]);
    }
  }, [jobs, validJobs]);

  // Initialize the map with our custom hook
  const map = useMapInitialization({
    mapboxToken,
    containerRef: mapContainer,
    initialCenter: centerLocation,
    onMapLoaded: () => {
      console.log('Map is initialized and ready');
      setMapReady(true);
      
      // Set user location if not already set
      if (!userLocation) {
        console.log('Setting default user location to', defaultLocation);
        setUserLocation(defaultLocation);
      }
      
      // If no jobs have locations yet, find nearby jobs using current center
      if (validJobs.length === 0) {
        console.log('No jobs with valid locations, finding nearby jobs');
        findNearbyJobs(centerLocation[1], centerLocation[0]);
      }
    }
  });

  // Force a map resize if the container dimensions change
  useEffect(() => {
    if (map.current && mapReady) {
      map.current.resize();
    }
  }, [mapContainer.current?.clientWidth, mapContainer.current?.clientHeight, mapReady]);

  return (
    <div ref={mapContainer} className="h-[500px] rounded-lg border border-gray-200 shadow-sm">
      {mapReady && map.current && (
        <>
          <UserLocationMarker 
            map={map} 
            setUserLocation={setUserLocation} 
            findNearbyJobs={findNearbyJobs} 
          />
          <JobMarkers 
            map={map} 
            jobs={validJobs.length > 0 ? validJobs : jobs} 
            onLocationUpdate={onLocationUpdate} 
            reverseGeocode={reverseGeocode}
          />
        </>
      )}
    </div>
  );
};

export default MapContainer;
