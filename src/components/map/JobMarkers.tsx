
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '../JobMap';

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

  useEffect(() => {
    // Only proceed if map is fully loaded
    if (!map.current) return;

    // Wait for the map to be fully loaded before adding markers
    const handleMapLoad = () => {
      // Clear any existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      if (workplaceMarker.current) {
        workplaceMarker.current.remove();
        workplaceMarker.current = null;
      }

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
              )
              .addTo(map.current);
            
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
                  `<h3>${job.title}</h3><p>${job.company}</p><p>${job.location.address}</p>`
                )
              );
              
            // Add to map if it's loaded
            if (map.current && map.current.loaded()) {
              marker.addTo(map.current);
              markersRef.current.push(marker);
            }
          }
        } catch (error) {
          console.error("Error adding marker:", error);
        }
      });
    };

    // Check if map is already loaded, otherwise listen for load event
    if (map.current.loaded()) {
      handleMapLoad();
    } else {
      map.current.on('load', handleMapLoad);
    }

    // Add click handler to set location if we're in edit mode
    if (onLocationUpdate) {
      const clickHandler = (e: mapboxgl.MapMouseEvent) => {
        if (workplaceMarker.current) {
          workplaceMarker.current.setLngLat([e.lngLat.lng, e.lngLat.lat]);
          reverseGeocode(e.lngLat.lat, e.lngLat.lng);
        }
      };

      if (map.current.loaded()) {
        map.current.on('click', clickHandler);
      } else {
        map.current.on('load', () => {
          map.current?.on('click', clickHandler);
        });
      }
      
      return () => {
        if (map.current) {
          map.current.off('click', clickHandler);
          map.current.off('load', handleMapLoad);
        }
        
        // Clean up markers
        markersRef.current.forEach(marker => marker.remove());
        if (workplaceMarker.current) {
          workplaceMarker.current.remove();
        }
      };
    }
    
    return () => {
      if (map.current) {
        map.current.off('load', handleMapLoad);
      }
      
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
