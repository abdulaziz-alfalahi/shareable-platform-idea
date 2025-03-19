
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { useToast } from '@/components/ui/use-toast';

interface MarkerManagerProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  reverseGeocode: (lat: number, lng: number) => Promise<void>;
}

const MarkerManager: React.FC<MarkerManagerProps> = ({
  map,
  jobs,
  onLocationUpdate,
  reverseGeocode,
  children
}) => {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [jobsRef, setJobsRef] = useState<JobLocation[]>([]);
  const { toast } = useToast();
  
  // Clear all markers - this can be safely called multiple times
  const clearAllMarkers = useCallback(() => {
    if (markersRef.current.length > 0) {
      console.log(`Clearing ${markersRef.current.length} markers`);
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    }
  }, []);

  // This effect runs once when the map is first ready
  useEffect(() => {
    if (!map.current) {
      console.log('Map ref is not available yet');
      return;
    }
    
    if (map.current.loaded()) {
      console.log('Map is already loaded, setting mapReady');
      setMapReady(true);
    } else {
      console.log('Map not loaded yet, adding load event listener');
      const handleMapLoad = () => {
        console.log('Map loaded event fired, setting mapReady');
        setMapReady(true);
      };
      
      map.current.once('load', handleMapLoad);
      
      return () => {
        if (map.current) {
          map.current.off('load', handleMapLoad);
        }
      };
    }
  }, [map]);

  // This effect runs when the map is ready or jobs change to fit bounds
  useEffect(() => {
    if (!mapReady || !map.current) return;
    
    // Only proceed if jobs actually changed or no markers present yet
    const jobsChanged = JSON.stringify(jobs) !== JSON.stringify(jobsRef);
    if (!jobsChanged && markersRef.current.length > 0) {
      console.log('Jobs data unchanged, skipping marker update');
      return;
    }
    
    console.log(`Adding ${jobs.length} job markers to map`);
    
    // Check for career path pins specifically
    const careerPathPins = jobs.filter(job => job.careerPathPin);
    console.log(`Found ${careerPathPins.length} career path pins to display`);
    
    // Save the current jobs for comparison next time
    setJobsRef([...jobs]);
    
    // Clear existing markers first
    clearAllMarkers();
    
    if (jobs.length === 0) {
      console.log('No jobs to display on map');
      return;
    }
    
    // Create a bounds object to fit all markers later
    const bounds = new mapboxgl.LngLatBounds();
    
    // Extend bounds with each valid marker position
    let validCoordinatesCount = 0;
    jobs.forEach(job => {
      if (job.location && 
          job.location.latitude && 
          job.location.longitude && 
          !isNaN(job.location.latitude) && 
          !isNaN(job.location.longitude)) {
        bounds.extend([job.location.longitude, job.location.latitude]);
        validCoordinatesCount++;
      }
    });
    
    console.log(`${validCoordinatesCount} out of ${jobs.length} jobs have valid coordinates`);
    
    // Fit bounds if we have valid bounds and markers
    if (validCoordinatesCount > 0) {
      try {
        // Fit map to bounds with padding
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
        
        // Add toast notification
        if (jobs.length > 0) {
          toast({
            title: "Map updated",
            description: `Showing ${jobs.length} locations on the map`,
            duration: 3000
          });
        }
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  }, [mapReady, jobs, map, clearAllMarkers, toast, jobsRef]);

  // Clean up markers when component unmounts
  useEffect(() => {
    return () => {
      clearAllMarkers();
    };
  }, [clearAllMarkers]);

  // Only render children when map is ready
  if (!mapReady || !map.current) {
    return null;
  }

  // Pass necessary props to children for rendering markers
  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            map, 
            jobs, 
            markersRef,
            onLocationUpdate, 
            reverseGeocode 
          });
        }
        return child;
      })}
    </>
  );
};

export default MarkerManager;
