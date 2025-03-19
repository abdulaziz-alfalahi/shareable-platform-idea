
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { createWorkplacePopupHtml } from '../utils/popupUtils';

interface WorkplaceMarkerProps {
  map?: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  markersRef?: React.MutableRefObject<mapboxgl.Marker[]>;
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  reverseGeocode?: (lat: number, lng: number) => Promise<void>;
}

/**
 * Component for rendering the workplace marker on the map
 */
const WorkplaceMarker: React.FC<WorkplaceMarkerProps> = ({ 
  map, 
  jobs, 
  markersRef,
  onLocationUpdate,
  reverseGeocode
}) => {
  const workplaceMarkerRef = useRef<mapboxgl.Marker | null>(null);
  
  // Add workplace marker
  useEffect(() => {
    if (!map?.current || !onLocationUpdate || !reverseGeocode) return;
    
    // Find workplace job
    const workplaceJob = jobs.find(job => job.id === "workplace");
    if (!workplaceJob) return;
    
    if (!workplaceJob.location) {
      console.warn('Workplace job is missing location data');
      return;
    }

    // Skip if invalid coordinates
    if (!workplaceJob.location.latitude || !workplaceJob.location.longitude || 
        isNaN(workplaceJob.location.latitude) || isNaN(workplaceJob.location.longitude)) {
      console.warn('Workplace job has invalid coordinates:', workplaceJob.location);
      return;
    }

    try {
      const coordinates: [number, number] = [
        workplaceJob.location.longitude, 
        workplaceJob.location.latitude
      ];
      
      // Create a draggable marker for the workplace
      const workplace = new mapboxgl.Marker({ 
        color: '#f59e0b', 
        draggable: true 
      })
        .setLngLat(coordinates)
        .addTo(map.current);
        
      // Add popup only after adding marker to map
      workplace.setPopup(
        new mapboxgl.Popup().setHTML(createWorkplacePopupHtml(workplaceJob))
      );
      
      workplaceMarkerRef.current = workplace;
      
      // Add to the markers ref if provided
      if (markersRef) {
        markersRef.current.push(workplace);
      }
      
      // Update job location when marker is dragged
      workplace.on('dragend', () => {
        const lngLat = workplace.getLngLat();
        console.log('Workplace marker dragged to:', lngLat);
        reverseGeocode(lngLat.lat, lngLat.lng);
      });
      
      console.log('Added workplace marker at:', coordinates);
    } catch (error) {
      console.error("Error adding workplace marker:", error, workplaceJob);
    }
    
    // Cleanup function to remove the marker when the component unmounts
    return () => {
      if (workplaceMarkerRef.current) {
        workplaceMarkerRef.current.remove();
        workplaceMarkerRef.current = null;
      }
    };
  }, [map, jobs, onLocationUpdate, reverseGeocode, markersRef]);

  return null;
};

export default WorkplaceMarker;
