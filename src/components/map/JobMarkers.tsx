
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
  const prevJobsRef = useRef<JobLocation[]>([]);

  // Clear all markers
  const clearAllMarkers = () => {
    console.log('Clearing all markers, count:', markersRef.current.length);
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    if (workplaceMarker.current) {
      workplaceMarker.current.remove();
      workplaceMarker.current = null;
    }
  };

  // Add markers for jobs
  const addMarkers = () => {
    if (!map.current || !map.current.loaded()) {
      console.log('Map not ready, skipping marker addition');
      return;
    }
    
    console.log(`Adding ${jobs.length} markers to map`);

    // Clear existing markers first
    clearAllMarkers();
    
    // Create new markers
    jobs.forEach(job => {
      if (!job.location || !job.location.latitude || !job.location.longitude) {
        console.log(`Skipping job ${job.id} - missing or invalid location`);
        return;
      }

      // Skip jobs with invalid coordinates
      if (isNaN(job.location.latitude) || isNaN(job.location.longitude)) {
        console.log(`Skipping job ${job.id} - invalid coordinates:`, job.location);
        return;
      }

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
          
          // Add to map  
          workplaceMarker.current.addTo(map.current);
          
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
                `<h3>${job.title || 'Job'}</h3><p>${job.company || 'Company'}</p><p>${job.location.address || ""}</p><p>Match: ${job.matchPercentage || 0}%</p>`
              )
            );
          
          // Add to map
          marker.addTo(map.current);
          markersRef.current.push(marker);
        }
      } catch (error) {
        console.error("Error adding marker:", error, job);
      }
    });
    
    console.log(`Added ${markersRef.current.length} markers to the map`);
    prevJobsRef.current = [...jobs];
  };

  useEffect(() => {
    // Always add markers when the component mounts or jobs change
    if (map.current && map.current.loaded()) {
      console.log('Map is ready, adding markers');
      addMarkers();
    } else {
      console.log('Map not ready yet, waiting for load event');
      
      // If map is not ready yet, set up a load event listener
      if (map.current) {
        map.current.once('load', () => {
          console.log('Map loaded, now adding markers');
          addMarkers();
        });
      }
    }
    
    return () => {
      clearAllMarkers();
    };
  }, [map, jobs, reverseGeocode]);

  return null; // This is a logic-only component
};

export default JobMarkers;
