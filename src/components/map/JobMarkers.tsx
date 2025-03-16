
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';

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
  const workplaceMarker = useRef<mapboxgl.Marker | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const isAddingMarkers = useRef(false);
  const prevJobsLength = useRef<number>(0);
  const prevJobsRef = useRef<JobLocation[]>([]);

  useEffect(() => {
    // Only proceed if map is fully loaded
    if (!map.current) return;
    
    // Compare jobs using JSON to prevent unnecessary re-renders
    const currentJobsString = JSON.stringify(jobs.map(job => job.id));
    const prevJobsString = JSON.stringify(prevJobsRef.current.map(job => job.id));
    
    if (currentJobsString === prevJobsString && markersRef.current.length > 0) {
      return; // Skip if jobs haven't changed and we already have markers
    }
    
    prevJobsRef.current = [...jobs];
    prevJobsLength.current = jobs.length;

    // Flag to prevent multiple attempts to add markers simultaneously
    if (isAddingMarkers.current) return;

    // Function to add markers to the map
    const addMarkers = () => {
      if (!map.current || !map.current.loaded()) {
        console.log('Map not loaded yet, will retry');
        return;
      }
      
      isAddingMarkers.current = true;

      try {
        // Clear any existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (workplaceMarker.current) {
          workplaceMarker.current.remove();
          workplaceMarker.current = null;
        }

        console.log(`Adding ${jobs.length} markers to map`);

        // Add job markers
        jobs.forEach(job => {
          if (!map.current || !job.location) return;

          try {
            if (job.id === "workplace" && onLocationUpdate) {
              // Create a draggable marker for the workplace
              workplaceMarker.current = new mapboxgl.Marker({ color: '#f59e0b', draggable: true })
                .setLngLat([job.location.longitude, job.location.latitude])
                .setPopup(
                  new mapboxgl.Popup().setHTML(
                    `<h3>${job.title}</h3><p>${job.company}</p><p>${job.location.address || "Drag to set location"}</p>`
                  )
                );
              
              // Add to map if it's loaded  
              if (map.current.loaded()) {
                workplaceMarker.current.addTo(map.current);
              }
              
              // Update job location when marker is dragged
              workplaceMarker.current.on('dragend', () => {
                if (workplaceMarker.current) {
                  const lngLat = workplaceMarker.current.getLngLat();
                  // Reverse geocode to get address
                  reverseGeocode(lngLat.lat, lngLat.lng);
                }
              });
            } else {
              // Regular non-draggable marker
              const marker = new mapboxgl.Marker({ color: '#f59e0b' })
                .setLngLat([job.location.longitude, job.location.latitude])
                .setPopup(
                  new mapboxgl.Popup().setHTML(
                    `<h3>${job.title}</h3><p>${job.company}</p><p>${job.location.address || ""}</p><p>Match: ${job.matchPercentage || 0}%</p>`
                  )
                );
              
              // Add to map if it's loaded
              if (map.current && map.current.loaded()) {
                marker.addTo(map.current);
                markersRef.current.push(marker);
              }
            }
          } catch (error) {
            console.error("Error adding marker:", error, job);
          }
        });
        
        console.log(`Added ${markersRef.current.length} markers to the map`);
      } catch (error) {
        console.error("Error in marker addition process:", error);
      } finally {
        isAddingMarkers.current = false;
      }
    };

    // Try to add markers if map is ready
    if (map.current.loaded()) {
      addMarkers();
    } else {
      // Set up a load event listener for when the map is ready
      const loadHandler = () => {
        console.log('Map loaded, adding markers');
        setTimeout(() => {
          addMarkers();
        }, 500); // Small delay to ensure map is fully initialized
      };
      
      map.current.on('load', loadHandler);
      
      return () => {
        if (map.current) {
          map.current?.off('load', loadHandler);
        }
      };
    }

    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.remove());
      if (workplaceMarker.current) {
        workplaceMarker.current.remove();
      }
    };
  }, [map, jobs, onLocationUpdate, reverseGeocode]);

  return null; // This is a logic-only component
};

export default JobMarkers;
