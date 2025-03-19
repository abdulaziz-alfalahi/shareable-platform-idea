
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { createCareerPathIconElement } from '../utils/iconUtils';
import { createCareerPathPopupHtml } from '../utils/popupUtils';
import { useToast } from '@/components/ui/use-toast';

interface CareerPathMarkersProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>;
}

const CareerPathMarkers: React.FC<CareerPathMarkersProps> = ({ map, jobs, markersRef }) => {
  const { toast } = useToast();
  
  // Add career path markers
  useEffect(() => {
    // Wait for next render tick to ensure map is fully loaded
    const timer = setTimeout(() => {
      if (!map.current) {
        console.error('Career path markers: Map not initialized');
        return;
      }
      
      // Double-check that map is loaded and ready
      if (!map.current.loaded()) {
        console.log('Map not fully loaded yet, waiting for load event...');
        const onLoad = () => {
          console.log('Map loaded, now adding career path markers');
          addCareerPathMarkers();
          map.current?.off('load', onLoad);
        };
        map.current.on('load', onLoad);
        return;
      }
      
      addCareerPathMarkers();
    }, 500);
    
    function addCareerPathMarkers() {
      // Filter only career path markers
      const careerPathJobs = jobs.filter(job => job.careerPathPin);
      console.log('Career path jobs found:', careerPathJobs.length, careerPathJobs);
      
      if (careerPathJobs.length === 0) {
        console.log('No career path jobs found in data');
        return;
      }
      
      console.log(`Adding ${careerPathJobs.length} career path markers to the map`, careerPathJobs);
      
      // Create markers for career path jobs
      careerPathJobs.forEach(job => {
        if (!job.location || !job.careerPathPin) {
          console.warn(`Career path job ${job.id} is missing location data or career path info`, job);
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
          console.log(`Creating marker for ${job.title} at coordinates:`, coordinates);
          
          // Create a custom marker for career path pins
          const el = createCareerPathIconElement(job.careerPathPin.icon, job.careerPathPin.color);
          
          // Create the marker
          const marker = new mapboxgl.Marker({ 
            element: el,
            anchor: 'bottom',
          })
            .setLngLat(coordinates);
          
          // Add to map
          marker.addTo(map.current!);
            
          // Add popup after adding to map
          marker.setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(createCareerPathPopupHtml(job))
          );
          
          // Track in our ref
          markersRef.current.push(marker);
          console.log(`Successfully added career path marker for ${job.title} at [${job.location.latitude}, ${job.location.longitude}]`);
        } catch (error) {
          console.error("Error adding career path marker:", error, job);
          toast({
            title: "Error adding career path marker",
            description: `Could not add marker for ${job.title}`,
            variant: "destructive"
          });
        }
      });
    }
    
    return () => clearTimeout(timer);
  }, [map, jobs, markersRef, toast]);

  return null;
};

export default CareerPathMarkers;
