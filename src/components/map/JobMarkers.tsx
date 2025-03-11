
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

  useEffect(() => {
    if (!map.current) return;

    // Clear any existing markers
    if (workplaceMarker.current) {
      workplaceMarker.current.remove();
      workplaceMarker.current = null;
    }

    // Add job markers
    jobs.forEach(job => {
      if (map.current && job.location) {
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
          new mapboxgl.Marker({ color: '#f59e0b' })
            .setLngLat([job.location.longitude, job.location.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<h3>${job.title}</h3><p>${job.company}</p><p>${job.location.address}</p>`
              )
            )
            .addTo(map.current);
        }
      }
    });

    // Add click handler to set location if we're in edit mode
    if (onLocationUpdate) {
      const clickHandler = (e: mapboxgl.MapMouseEvent) => {
        if (workplaceMarker.current) {
          workplaceMarker.current.setLngLat([e.lngLat.lng, e.lngLat.lat]);
          reverseGeocode(e.lngLat.lat, e.lngLat.lng);
        }
      };

      map.current.on('click', clickHandler);
      
      return () => {
        if (map.current) {
          map.current.off('click', clickHandler);
        }
      };
    }
  }, [map, jobs, onLocationUpdate, reverseGeocode]);

  return null; // This is a logic-only component
};

export default JobMarkers;
