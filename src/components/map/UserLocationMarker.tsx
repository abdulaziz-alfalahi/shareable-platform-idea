
import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (!map.current) return;

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 11
            });
            
            // Add marker for user location
            new mapboxgl.Marker({ color: '#3b82f6' })
              .setLngLat([longitude, latitude])
              .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"))
              .addTo(map.current);
            
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
  }, [map, setUserLocation, findNearbyJobs]);

  return null; // This is a logic-only component
};

export default UserLocationMarker;
