
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { createCareerPathIconElement } from '../utils/iconUtils';
import { createCareerPathPopupHtml } from '../utils/popupUtils';

interface CareerPathMarkersProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>;
}

const CareerPathMarkers: React.FC<CareerPathMarkersProps> = ({ map, jobs, markersRef }) => {
  // Add career path markers
  useEffect(() => {
    if (!map.current) return;
    
    // Filter only career path markers
    const careerPathJobs = jobs.filter(job => job.careerPathPin);
    
    // Create markers for career path jobs
    careerPathJobs.forEach(job => {
      if (!job.location || !job.careerPathPin) {
        console.warn(`Career path job ${job.id} is missing location data or career path info`);
        return;
      }

      // Skip jobs with invalid coordinates
      if (!job.location.latitude || !job.location.longitude || 
          isNaN(job.location.latitude) || isNaN(job.location.longitude)) {
        console.warn(`Career path job ${job.id} has invalid coordinates:`, job.location);
        return;
      }

      try {
        const coordinates: [number, number] = [job.location.longitude, job.location.latitude];
        
        // Create a custom marker for career path pins
        const el = createCareerPathIconElement(job.careerPathPin.icon, job.careerPathPin.color);
        
        // Add the marker to the map
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(coordinates)
          .addTo(map.current!);
          
        // Add popup after adding to map
        marker.setPopup(
          new mapboxgl.Popup().setHTML(createCareerPathPopupHtml(job))
        );
        
        // Add to map and track in our ref
        markersRef.current.push(marker);
        console.log(`Added career path marker for ${job.title}`);
      } catch (error) {
        console.error("Error adding career path marker:", error, job);
      }
    });
    
    // No cleanup needed here as the parent component handles marker cleanup
  }, [map, jobs, markersRef]);

  return null;
};

export default CareerPathMarkers;
