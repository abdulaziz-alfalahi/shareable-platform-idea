
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import { useToast } from '@/components/ui/use-toast';

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
  const [mapReady, setMapReady] = useState(false);
  const { toast } = useToast();
  
  // Clear all markers
  const clearAllMarkers = () => {
    console.log(`Clearing ${markersRef.current.length} markers`);
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

    if (!map.current.loaded()) {
      console.log('Map not fully loaded yet, will retry when loaded');
      map.current.once('load', () => {
        console.log('Map now loaded, adding markers');
        addMarkers();
      });
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
        if (job.id === "workplace" && onLocationUpdate) {
          // Create a draggable marker for the workplace
          const workplace = new mapboxgl.Marker({ 
            color: '#f59e0b', 
            draggable: true 
          })
            .setLngLat([job.location.longitude, job.location.latitude])
            .addTo(map.current);
            
          // Add popup only after adding marker to map
          workplace.setPopup(
            new mapboxgl.Popup().setHTML(
              `<h3>${job.title || 'Workplace'}</h3><p>${job.company || ''}</p><p>${job.location.address || "Drag to set location"}</p>`
            )
          );
          
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
          const marker = new mapboxgl.Marker({ 
            color: job.matchPercentage && job.matchPercentage > 80 ? '#10b981' : '#f59e0b' 
          })
            .setLngLat([job.location.longitude, job.location.latitude])
            .addTo(map.current);
            
          // Add popup after adding to map
          marker.setPopup(
            new mapboxgl.Popup().setHTML(
              `<h3>${job.title || 'Job'}</h3>
               <p>${job.company || 'Company'}</p>
               <p>${job.location.address || ""}</p>
               ${job.matchPercentage ? `<p>Match: ${job.matchPercentage}%</p>` : ''}
               ${job.distance ? `<p>Distance: ${job.distance.toFixed(1)} km</p>` : ''}`
            )
          );
          
          // Add to map and track in our ref
          markersRef.current.push(marker);
          console.log('Added job marker at:', [job.location.longitude, job.location.latitude]);
        }
      } catch (error) {
        console.error("Error adding marker:", error, job);
      }
    });
    
    console.log(`Successfully added ${markersRef.current.length} markers to the map`);
    
    // Fit bounds if we have markers
    if (markersRef.current.length > 0 && map.current) {
      try {
        const bounds = new mapboxgl.LngLatBounds();
        
        // Add all marker positions to bounds
        markersRef.current.forEach(marker => {
          bounds.extend(marker.getLngLat());
        });
        
        // Add workplace marker if it exists
        if (workplaceMarker.current) {
          bounds.extend(workplaceMarker.current.getLngLat());
        }
        
        // Fit map to bounds with padding
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  };

  // Update markers when map is ready and jobs change
  useEffect(() => {
    if (!map.current) {
      console.log('Map ref is not available yet');
      return;
    }
    
    if (map.current.loaded()) {
      console.log('Map is already loaded, adding markers now');
      addMarkers();
      setMapReady(true);
    } else {
      console.log('Map not loaded yet, adding load event listener');
      const handleMapLoad = () => {
        console.log('Map loaded event fired, adding markers');
        addMarkers();
        setMapReady(true);
      };
      
      map.current.once('load', handleMapLoad);
      
      return () => {
        if (map.current) {
          map.current.off('load', handleMapLoad);
        }
      };
    }
  }, [map.current, jobs]);

  // Force marker update when map becomes ready
  useEffect(() => {
    if (mapReady && map.current && jobs.length > 0) {
      console.log('Map is ready, ensuring markers are added');
      addMarkers();
    }
  }, [mapReady, jobs]);

  return null;
};

export default JobMarkers;
