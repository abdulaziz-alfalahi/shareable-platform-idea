
import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  const [validJobs, setValidJobs] = useState<JobLocation[]>([]);
  const { toast } = useToast();
  
  // Use Al Fahidi Fort as default if user location is null
  const defaultLocation: [number, number] = [55.2972, 25.2637];
  const centerLocation = userLocation || defaultLocation;
  
  // Validate jobs data only when jobs change, not on every render
  useEffect(() => {
    const filteredJobs = jobs.filter(job => 
      job.location && 
      typeof job.location.latitude === 'number' && 
      typeof job.location.longitude === 'number' && 
      !isNaN(job.location.latitude) && 
      !isNaN(job.location.longitude)
    );
    
    setValidJobs(filteredJobs);
    
    if (jobs.length > 0) {
      console.log(`MapContainer received ${jobs.length} jobs, ${filteredJobs.length} valid locations`);
      if (filteredJobs.length > 0) {
        console.log('Valid job sample:', filteredJobs[0]);
      } else {
        console.log('Invalid job sample:', jobs[0]);
      }
    }
  }, [jobs]);

  // Initialize the map with our custom hook
  const onMapLoaded = useCallback(() => {
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
  }, [centerLocation, defaultLocation, findNearbyJobs, setUserLocation, userLocation, validJobs.length]);

  const map = useMapInitialization({
    mapboxToken,
    containerRef: mapContainer,
    initialCenter: centerLocation,
    onMapLoaded
  });

  // Force a map resize if the container dimensions change
  useEffect(() => {
    if (map.current && mapReady) {
      map.current.resize();
    }
  }, [mapContainer.current?.clientWidth, mapContainer.current?.clientHeight, mapReady, map]);

  return (
    <div ref={mapContainer} className="h-full w-full rounded-lg border border-gray-200 shadow-sm">
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
