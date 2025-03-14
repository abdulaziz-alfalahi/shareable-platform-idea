
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { toast } from '@/components/ui/use-toast';

interface UserLocationMarkerProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  setUserLocation: (location: [number, number]) => void;
  findNearbyJobs: (latitude: number, longitude: number) => void;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({
  map,
  setUserLocation,
  findNearbyJobs
}) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const isLocating = useRef(false);

  useEffect(() => {
    if (!map.current) return;
    
    const addUserLocationMarker = () => {
      // Prevent multiple concurrent location attempts
      if (isLocating.current) return;
      isLocating.current = true;
      
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            try {
              const { latitude, longitude } = position.coords;
              setUserLocation([longitude, latitude]);
              
              if (map.current && map.current.loaded()) {
                map.current.flyTo({
                  center: [longitude, latitude],
                  zoom: 11,
                  duration: 1500
                });
                
                // Remove existing marker if present
                if (markerRef.current) {
                  markerRef.current.remove();
                }
                
                // Add marker for user location
                markerRef.current = new mapboxgl.Marker({ color: '#3b82f6' })
                  .setLngLat([longitude, latitude])
                  .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"));
                
                if (map.current) {
                  markerRef.current.addTo(map.current);
                }
                
                // Calculate nearby jobs
                findNearbyJobs(latitude, longitude);
              }
            } catch (error) {
              console.error('Error adding user location marker:', error);
              toast({
                title: 'Map Error',
                description: 'Could not add your location to the map. Please try again.',
                variant: 'destructive'
              });
            } finally {
              isLocating.current = false;
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            toast({
              title: 'Location Error',
              description: 'Could not get your location. Please enable location services in your browser.',
              variant: 'destructive'
            });
            isLocating.current = false;
          },
          { 
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        toast({
          title: 'Location Not Supported',
          description: 'Geolocation is not supported by your browser. Please try using a different browser.',
          variant: 'destructive'
        });
        isLocating.current = false;
      }
    };

    // Check if map is already loaded
    if (map.current.loaded()) {
      setTimeout(addUserLocationMarker, 500); // Short delay to ensure map is ready
    } else {
      // Wait for map to load
      const loadHandler = () => {
        setTimeout(addUserLocationMarker, 500);
      };
      map.current.on('load', loadHandler);
      
      return () => {
        map.current?.off('load', loadHandler);
      };
    }

    return () => {
      // Clean up map event listener
      if (map.current) {
        map.current.off('load', addUserLocationMarker);
      }
      // Remove marker
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, [map, setUserLocation, findNearbyJobs]);

  return null; // This is a logic-only component
};

export default UserLocationMarker;
