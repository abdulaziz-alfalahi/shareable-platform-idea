
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { createJobPopupHtml } from '../utils/popupUtils';

interface RegularMarkersProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>;
}

const RegularMarkers: React.FC<RegularMarkersProps> = ({ map, jobs, markersRef }) => {
  // Add regular markers for jobs
  useEffect(() => {
    if (!map.current) return;
    
    // Filter only regular job markers (not career path pins or workplace)
    const regularJobs = jobs.filter(job => 
      !job.careerPathPin && job.id !== 'workplace'
    );
    
    // Create markers for regular jobs
    regularJobs.forEach(job => {
      if (!job.location) {
        console.warn(`Job ${job.id} is missing location data`);
        return;
      }

      // Skip jobs with invalid coordinates
      if (!job.location.latitude || !job.location.longitude || 
          isNaN(job.location.latitude) || isNaN(job.location.longitude)) {
        console.warn(`Job ${job.id} has invalid coordinates:`, job.location);
        return;
      }

      try {
        const coordinates: [number, number] = [job.location.longitude, job.location.latitude];
        
        // Regular non-draggable marker
        const marker = new mapboxgl.Marker({ 
          color: job.matchPercentage && job.matchPercentage > 80 ? '#10b981' : '#f59e0b' 
        })
          .setLngLat(coordinates)
          .addTo(map.current!);
          
        // Add popup after adding to map
        marker.setPopup(
          new mapboxgl.Popup().setHTML(createJobPopupHtml(job))
        );
        
        // Add to map and track in our ref
        markersRef.current.push(marker);
      } catch (error) {
        console.error("Error adding regular marker:", error, job);
      }
    });
    
    // No cleanup needed here as the parent component handles marker cleanup
  }, [map, jobs, markersRef]);

  return null;
};

export default RegularMarkers;
