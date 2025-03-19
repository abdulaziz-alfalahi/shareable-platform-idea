
import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { useToast } from '@/components/ui/use-toast';
import RegularMarkers from './markers/RegularMarkers';
import CareerPathMarkers from './markers/CareerPathMarkers';
import WorkplaceMarker from './markers/WorkplaceMarker';

interface JobMarkersProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  reverseGeocode: (lat: number, lng: number) => Promise<void>;
}

const JobMarkers: React.FC<JobMarkersProps> = ({
  map,
  jobs,
  onLocationUpdate,
  reverseGeocode
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

  // Add markers for jobs - extracted as a function to avoid code duplication
  const addMarkers = useCallback(() => {
    if (!map.current) {
      console.error('Cannot add markers: map not initialized');
      return;
    }

    if (!map.current.loaded()) {
      console.log('Map not fully loaded yet, will retry when loaded');
      map.current.once('load', () => {
        console.log('Map now loaded, adding markers');
        addMarkers();
      });
      return;
    }
    
    // Only proceed if jobs actually changed or no markers present yet
    const jobsChanged = JSON.stringify(jobs) !== JSON.stringify(jobsRef);
    if (!jobsChanged && markersRef.current.length > 0) {
      console.log('Jobs data unchanged, skipping marker update');
      return;
    }
    
    console.log(`Adding ${jobs.length} job markers to map`);
    
    // Check for career path pins specifically
    const regularJobs = jobs.filter(job => !job.careerPathPin && job.id !== 'workplace');
    const careerPathPins = jobs.filter(job => job.careerPathPin);
    const workplaceJobs = jobs.filter(job => job.id === 'workplace');
    
    console.log(`Breaking down jobs: ${regularJobs.length} regular, ${careerPathPins.length} career pins, ${workplaceJobs.length} workplace`);
    
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
    if (map.current && !bounds.isEmpty()) {
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
  }, [jobs, map, clearAllMarkers, toast, jobsRef]);

  // This effect runs once when the map is first ready
  useEffect(() => {
    if (!map.current) {
      console.log('Map ref is not available yet');
      return;
    }
    
    if (map.current.loaded()) {
      console.log('Map is already loaded, adding markers now');
      setMapReady(true);
    } else {
      console.log('Map not loaded yet, adding load event listener');
      const handleMapLoad = () => {
        console.log('Map loaded event fired, adding markers');
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

  // This effect runs when the map is ready or jobs change
  useEffect(() => {
    if (mapReady && map.current) {
      console.log('Map is ready, adding markers');
      addMarkers();
    }
  }, [mapReady, jobs, addMarkers, map]);

  // Clean up markers when component unmounts
  useEffect(() => {
    return () => {
      clearAllMarkers();
    };
  }, [clearAllMarkers]);

  // Special effect just for career path pins to force rerender
  useEffect(() => {
    const careerPathPins = jobs.filter(job => job.careerPathPin);
    if (mapReady && map.current && careerPathPins.length > 0) {
      console.log(`Found ${careerPathPins.length} career path pins, ensuring they're rendered`);
      // Force clear markers and re-add after a short delay
      setTimeout(() => {
        clearAllMarkers();
        console.log('Re-rendering all markers after timeout');
        setTimeout(() => {
          // This will call addMarkers indirectly through the dependency
          setJobsRef([]);
        }, 100);
      }, 100);
    }
  }, [jobs.length, mapReady, map, clearAllMarkers]);

  return (
    <>
      {mapReady && map.current && (
        <>
          <RegularMarkers 
            map={map} 
            jobs={jobs.filter(job => !job.careerPathPin && job.id !== 'workplace')} 
            markersRef={markersRef} 
          />
          <CareerPathMarkers 
            map={map} 
            jobs={jobs.filter(job => job.careerPathPin)} 
            markersRef={markersRef} 
          />
          <WorkplaceMarker 
            map={map} 
            jobs={jobs.filter(job => job.id === 'workplace')} 
            onLocationUpdate={onLocationUpdate} 
            reverseGeocode={reverseGeocode} 
          />
        </>
      )}
    </>
  );
};

export default JobMarkers;
