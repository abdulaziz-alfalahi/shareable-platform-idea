
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { toast } from '@/components/ui/use-toast';

interface UseMapInitializationProps {
  mapboxToken: string;
  containerRef: React.RefObject<HTMLDivElement>;
  initialCenter?: [number, number];
  initialZoom?: number;
  onMapLoaded?: () => void;
}

const useMapInitialization = ({ 
  mapboxToken, 
  containerRef, 
  initialCenter = [55.2708, 25.2048], // Default to Dubai
  initialZoom = 11,
  onMapLoaded
}: UseMapInitializationProps) => {
  const map = useRef<mapboxgl.Map | null>(null);
  const [initializationAttempted, setInitializationAttempted] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);

  // Validate token format
  useEffect(() => {
    if (!mapboxToken) return;
    
    try {
      // Basic validation - token starts with 'pk.'
      if (!mapboxToken.startsWith('pk.')) {
        console.error('Invalid token format');
        toast({
          title: 'Invalid Token Format',
          description: 'Mapbox token must start with "pk."',
          variant: 'destructive'
        });
        return;
      }
      
      setTokenValidated(true);
    } catch (error) {
      console.error('Token validation error:', error);
      setTokenValidated(false);
    }
  }, [mapboxToken]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!mapboxToken || !tokenValidated) return;
    
    setInitializationAttempted(true);

    try {
      // Clean up previous map instance if it exists
      if (map.current) {
        map.current.remove();
        map.current = null;
      }

      // Set the Mapbox access token
      mapboxgl.accessToken = mapboxToken;
      
      // Create a new map instance with error handling
      map.current = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: initialCenter,
        zoom: initialZoom,
        failIfMajorPerformanceCaveat: false,
        attributionControl: false, // Removes attribution control which can cause issues in some cases
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add attribution control in a better position
      map.current.addControl(new mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');

      // Call onMapLoaded callback when map is loaded
      map.current.on('load', () => {
        console.log('Map loaded successfully');
        if (onMapLoaded) {
          onMapLoaded();
        }
      });

      // Handle errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        
        // Check for token-related errors
        if (e.error && (
          (e.error.message || '').toLowerCase().includes('token') || 
          (e.error.message || '').toLowerCase().includes('access') ||
          (e.error.message || '').toLowerCase().includes('api key')
        )) {
          toast({
            title: 'Mapbox Token Error',
            description: 'The Mapbox token is invalid or has insufficient permissions.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Map Error',
            description: 'An error occurred with the map. Please try again later.',
            variant: 'destructive'
          });
        }
      });

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: 'Map Error',
        description: 'Failed to initialize map. Please check your network connection and try again.',
        variant: 'destructive'
      });
      return undefined;
    }
  }, [mapboxToken, containerRef, initialCenter, initialZoom, onMapLoaded, tokenValidated]);

  useEffect(() => {
    // Show a toast if initialization was attempted but map is still null
    if (initializationAttempted && !map.current) {
      toast({
        title: 'Map Initialization Failed',
        description: 'The map could not be initialized. Please try refreshing the page or use a different browser.',
        variant: 'destructive'
      });
    }
  }, [initializationAttempted]);

  return map;
};

export default useMapInitialization;
