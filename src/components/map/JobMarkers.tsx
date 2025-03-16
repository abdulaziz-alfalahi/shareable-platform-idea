
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
  
  // Clear all markers
  const clearAllMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    if (workplaceMarker.current) {
      workplaceMarker.current.remove();
      workplaceMarker.current = null;
    }
  };

  // Add markers for jobs
  const addMarkers = () => {
    if (!map.current) {
      console.error('Cannot add markers: map not initialized');
      return;
    }
    
    console.log(`Adding ${jobs.length} job markers to map`);
    
    // Clear existing markers first
    clearAllMarkers();
    
    if (jobs.length === 0) {
      console.log('No jobs to display on map');
      return;
    }
    
    // Create new markers
    jobs.forEach(job => {
      if (!job.location || !job.location.latitude || !job.location.longitude) {
        console.warn(`Skipping job ${job.id} - missing location data`);
        return;
      }

      // Skip jobs with invalid coordinates
      if (isNaN(job.location.latitude) || isNaN(job.location.longitude)) {
        console.warn(`Skipping job ${job.id} - invalid coordinates:`, job.location);
        return;
      }

      try {
        if (job.id === "workplace" && onLocationUpdate) {
          // Create a draggable marker for the workplace
          const workplace = new mapboxgl.Marker({ 
            color: '#f59e0b', 
            draggable: true 
          })
            .setLngLat([job.location.longitude, job.location.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<h3>${job.title}</h3><p>${job.company}</p><p>${job.location.address || "Drag to set location"}</p>`
              )
            )
            .addTo(map.current);
          
          workplaceMarker.current = workplace;
          
          // Update job location when marker is dragged
          workplace.on('dragend', () => {
            const lngLat = workplace.getLngLat();
            console.log('Workplace marker dragged to:', lngLat);
            reverseGeocode(lngLat.lat, lngLat.lng);
          });
          
          console.log('Added workplace marker at:', [job.location.longitude, job.location.latitude]);
        } else {
          // Regular non-draggable marker
          const marker = new mapboxgl.Marker({ color: '#f59e0b' })
            .setLngLat([job.location.longitude, job.location.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<h3>${job.title || 'Job'}</h3><p>${job.company || 'Company'}</p><p>${job.location.address || ""}</p><p>Match: ${job.matchPercentage || 0}%</p>`
              )
            );
          
          // Add to map and track in our ref
          marker.addTo(map.current);
          markersRef.current.push(marker);
          console.log('Added job marker at:', [job.location.longitude, job.location.latitude]);
        }
      } catch (error) {
        console.error("Error adding marker:", error, job);
      }
    });
    
    console.log(`Successfully added ${markersRef.current.length} markers to the map`);
  };

  // Update markers when map is ready and jobs change
  useEffect(() => {
    if (!map.current) return;
    
    console.log('Checking if map is loaded to add markers');
    
    const handleMapLoad = () => {
      console.log('Map loaded event fired, adding markers');
      addMarkers();
    };
    
    if (map.current.loaded()) {
      console.log('Map already loaded, adding markers now');
      addMarkers();
    } else {
      console.log('Map not loaded yet, adding load event listener');
      map.current.once('load', handleMapLoad);
    }
    
    return () => {
      if (map.current) {
        map.current.off('load', handleMapLoad);
      }
      clearAllMarkers();
    };
  }, [map.current, jobs]);

  return null;
};

export default JobMarkers;
