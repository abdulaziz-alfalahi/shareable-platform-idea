
import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  const jobsRef = useRef<JobLocation[]>([]);
  const { toast } = useToast();
  
  // Clear all markers - this can be safely called multiple times
  const clearAllMarkers = useCallback(() => {
    if (markersRef.current.length > 0) {
      console.log(`Clearing ${markersRef.current.length} markers`);
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    }
    
    if (workplaceMarker.current) {
      workplaceMarker.current.remove();
      workplaceMarker.current = null;
    }
  }, []);

  // Add markers for jobs - extracted as a function to avoid code duplication
  const addMarkers = useCallback(() => {
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
    
    // Only proceed if jobs actually changed
    if (JSON.stringify(jobs) === JSON.stringify(jobsRef.current) && markersRef.current.length > 0) {
      return;
    }
    
    console.log(`Adding ${jobs.length} job markers to map`);
    jobsRef.current = [...jobs];
    
    // Clear existing markers first
    clearAllMarkers();
    
    if (jobs.length === 0) {
      console.log('No jobs to display on map');
      return;
    }
    
    // Create a bounds object to fit all markers later
    const bounds = new mapboxgl.LngLatBounds();
    
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
        const coordinates: [number, number] = [job.location.longitude, job.location.latitude];
        
        // Extend bounds with each valid marker position
        bounds.extend(coordinates);
        
        if (job.id === "workplace" && onLocationUpdate) {
          // Create a draggable marker for the workplace
          const workplace = new mapboxgl.Marker({ 
            color: '#f59e0b', 
            draggable: true 
          })
            .setLngLat(coordinates)
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
          
          console.log('Added workplace marker at:', coordinates);
        } else {
          // Regular non-draggable marker
          const marker = new mapboxgl.Marker({ 
            color: job.matchPercentage && job.matchPercentage > 80 ? '#10b981' : '#f59e0b' 
          })
            .setLngLat(coordinates)
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
        }
      } catch (error) {
        console.error("Error adding marker:", error, job);
      }
    });
    
    console.log(`Successfully added ${markersRef.current.length} markers to the map`);
    
    // Fit bounds if we have valid bounds and markers
    if (markersRef.current.length > 0 && map.current && !bounds.isEmpty()) {
      try {
        // Fit map to bounds with padding
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  }, [jobs, map, clearAllMarkers, onLocationUpdate, reverseGeocode]);

  // This effect runs once when the map is first ready
  useEffect(() => {
    if (!map.current) {
      console.log('Map ref is not available yet');
      return;
    }
    
    if (map.current.loaded()) {
      console.log('Map is already loaded, adding markers now');
      setMapReady(true);
    } else {
      console.log('Map not loaded yet, adding load event listener');
      const handleMapLoad = () => {
        console.log('Map loaded event fired, adding markers');
        setMapReady(true);
      };
      
      map.current.once('load', handleMapLoad);
      
      return () => {
        if (map.current) {
          map.current.off('load', handleMapLoad);
        }
      };
    }
  }, [map]);

  // This effect runs when the map is ready or jobs change
  useEffect(() => {
    if (mapReady && map.current) {
      console.log('Map is ready, adding markers');
      addMarkers();
    }
  }, [mapReady, jobs, addMarkers, map]);

  // Clean up markers when component unmounts
  useEffect(() => {
    return () => {
      clearAllMarkers();
    };
  }, [clearAllMarkers]);

  return null;
};

export default JobMarkers;
