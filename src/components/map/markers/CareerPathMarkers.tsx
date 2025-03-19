
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { createCareerPathIconElement } from '../utils/iconUtils';
import { createCareerPathPopupHtml } from '../utils/popupUtils';
import { useToast } from '@/components/ui/use-toast';

interface CareerPathMarkersProps {
  map?: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  markersRef?: React.MutableRefObject<mapboxgl.Marker[]>;
}

/**
 * Component for rendering career path markers on the map
 */
const CareerPathMarkers: React.FC<CareerPathMarkersProps> = ({ 
  map, 
  jobs, 
  markersRef 
}) => {
  const { toast } = useToast();
  const [markersAdded, setMarkersAdded] = useState(false);
  
  // Add career path markers
  useEffect(() => {
    // Check if we have already added markers
    if (markersAdded) {
      console.log("Career path markers already added, skipping");
      return;
    }
    
    // Wait for next render tick to ensure map is fully loaded
    const timer = setTimeout(() => {
      if (!map?.current || !markersRef) {
        console.error('Career path markers: Map or markersRef not initialized');
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
    }, 1000); // Increased timeout
    
    function addCareerPathMarkers() {
      if (!map?.current || !markersRef) {
        console.error('Map reference lost when adding career path markers');
        return;
      }
      
      console.log('Career path jobs found:', jobs.length, jobs);
      
      if (jobs.length === 0) {
        console.log('No career path jobs found in data');
        return;
      }
      
      console.log(`Adding ${jobs.length} career path markers to the map`, jobs);
      
      // Create markers for career path jobs
      jobs.forEach(job => {
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
          
          // Create the marker with explicit anchor at bottom
          const marker = new mapboxgl.Marker({ 
            element: el,
            anchor: 'bottom',
            offset: [0, 0],
            scale: 1.2, // Make it slightly larger
          })
            .setLngLat(coordinates);
          
          // Add to map with explicit error checking
          if (map.current) {
            marker.addTo(map.current);
            console.log(`Added marker to map for ${job.id}`);
            
            // Create popup before adding to marker
            const popup = new mapboxgl.Popup({ 
              offset: 25,
              closeButton: true,
              closeOnClick: false
            }).setHTML(createCareerPathPopupHtml(job));
            
            // Add popup to marker
            marker.setPopup(popup);
            
            // Track in our ref
            markersRef.current.push(marker);
            console.log(`Successfully added career path marker for ${job.title}`);
            
            // Force marker to appear by toggling visibility
            setTimeout(() => {
              const markerElement = marker.getElement();
              if (markerElement) {
                markerElement.style.visibility = 'hidden';
                setTimeout(() => {
                  markerElement.style.visibility = 'visible';
                }, 100);
              }
            }, 500);
          } else {
            console.error('Map is not available when trying to add marker');
          }
        } catch (error) {
          console.error("Error adding career path marker:", error, job);
          toast({
            title: "Error adding career path marker",
            description: `Could not add marker for ${job.title}`,
            variant: "destructive"
          });
        }
      });
      
      // Mark that we've added the markers
      setMarkersAdded(true);
      
      // Show success toast
      if (jobs.length > 0) {
        toast({
          title: "Career paths loaded",
          description: `Added ${jobs.length} career paths to the map`,
        });
      }
    }
    
    return () => clearTimeout(timer);
  }, [map, jobs, markersRef, toast, markersAdded]);

  return null;
};

export default CareerPathMarkers;
