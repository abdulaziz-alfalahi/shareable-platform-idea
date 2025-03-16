
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
  const markerAdded = useRef<boolean>(false);

  // Clear all markers
  const clearAllMarkers = () => {
    console.log('Clearing all markers, count:', markersRef.current.length);
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    if (workplaceMarker.current) {
      workplaceMarker.current.remove();
      workplaceMarker.current = null;
    }
    markerAdded.current = false;
  };

  // Add markers for jobs
  const addMarkers = () => {
    if (!map.current || !map.current.loaded()) {
      console.log('Map not ready, cannot add markers yet');
      return;
    }
    
    console.log(`Adding ${jobs.length} markers to map`, jobs);

    // Clear existing markers first
    clearAllMarkers();
    
    if (jobs.length === 0) {
      console.log('No jobs to add markers for');
      return;
    }
    
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
    markerAdded.current = true;
  };

  // Handle map load event separately
  useEffect(() => {
    if (!map.current) return;
    
    const onMapLoad = () => {
      console.log('Map loaded in JobMarkers component, adding markers');
      addMarkers();
    };

    if (map.current.loaded()) {
      console.log('Map already loaded, adding markers immediately');
      addMarkers();
    } else {
      console.log('Setting up load event listener for map');
      map.current.once('load', onMapLoad);
    }

    return () => {
      if (map.current) {
        map.current.off('load', onMapLoad);
      }
      clearAllMarkers();
    };
  }, [map.current]);

  // Handle job changes
  useEffect(() => {
    if (!map.current) {
      console.log('Map ref is null, cannot add markers');
      return;
    }
    
    console.log('Jobs changed:', jobs.length);
    
    if (map.current.loaded()) {
      console.log('Map is loaded, adding markers after job change');
      addMarkers();
    }
    
    return () => {
      clearAllMarkers();
    };
  }, [jobs]);

  return null; // This is a logic-only component
};

export default JobMarkers;
