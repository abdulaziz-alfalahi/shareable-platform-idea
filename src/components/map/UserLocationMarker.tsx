
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

  useEffect(() => {
    if (!map.current) return;
    
    const addUserLocationMarker = () => {
      // Get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([longitude, latitude]);
            
            if (map.current && map.current.loaded()) {
              map.current.flyTo({
                center: [longitude, latitude],
                zoom: 11
              });
              
              // Remove existing marker if present
              if (markerRef.current) {
                markerRef.current.remove();
              }
              
              // Add marker for user location
              try {
                markerRef.current = new mapboxgl.Marker({ color: '#3b82f6' })
                  .setLngLat([longitude, latitude])
                  .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"));
                
                if (map.current) {
                  markerRef.current.addTo(map.current);
                }
              } catch (error) {
                console.error('Error adding user location marker:', error);
              }
              
              // Calculate nearby jobs
              findNearbyJobs(latitude, longitude);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            toast({
              title: 'Location Error',
              description: 'Could not get your location. Please enable location services.',
              variant: 'destructive'
            });
          }
        );
      }
    };

    // Check if map is already loaded
    if (map.current.loaded()) {
      addUserLocationMarker();
    } else {
      // Wait for map to load
      map.current.on('load', addUserLocationMarker);
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
