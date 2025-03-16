
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
  const [previousToken, setPreviousToken] = useState('');
  const mapInitRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-validate token before trying to initialize the map
  useEffect(() => {
    if (!mapboxToken) return;
    if (mapboxToken === previousToken) return;
    
    // Basic validation - token starts with 'pk.'
    if (!mapboxToken.startsWith('pk.')) {
      console.error('Invalid token format - must start with pk.');
      toast({
        title: 'Invalid Token Format',
        description: 'Mapbox token must start with "pk."',
        variant: 'destructive'
      });
      return;
    }
    
    // Clean up previous map instance if token changed
    if (map.current && previousToken !== '' && previousToken !== mapboxToken) {
      map.current.remove();
      map.current = null;
    }
    
    // Set validation state immediately while waiting for API response
    setTokenValidated(true);
    setPreviousToken(mapboxToken);
    
  }, [mapboxToken, previousToken]);

  useEffect(() => {
    // Don't proceed if token isn't validated
    if (!tokenValidated) return;
    
    // Clear any existing initialization timeout
    if (mapInitRef.current) {
      clearTimeout(mapInitRef.current);
      mapInitRef.current = null;
    }
    
    if (!containerRef.current) return;
    if (!mapboxToken) return;
    
    setInitializationAttempted(true);

    try {
      // Set the Mapbox access token
      mapboxgl.accessToken = mapboxToken;
      
      // Add a small delay to ensure the container is fully rendered
      mapInitRef.current = setTimeout(() => {
        try {
          // Create a new map instance
          map.current = new mapboxgl.Map({
            container: containerRef.current as HTMLElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: initialCenter,
            zoom: initialZoom,
            pitchWithRotate: false,
            attributionControl: false,
          });

          // Add navigation controls
          map.current.addControl(
            new mapboxgl.NavigationControl(),
            'top-right'
          );

          // Add attribution control
          map.current.addControl(
            new mapboxgl.AttributionControl({ compact: true }),
            'bottom-right'
          );

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
            if (e.error && typeof e.error.message === 'string' && (
              e.error.message.toLowerCase().includes('token') || 
              e.error.message.toLowerCase().includes('access') ||
              e.error.message.toLowerCase().includes('api key')
            )) {
              toast({
                title: 'Mapbox Token Error',
                description: 'There was a problem with your Mapbox token. Please try a different one.',
                variant: 'destructive'
              });
              
              // Remove the map to prevent cascading errors
              if (map.current) {
                map.current.remove();
                map.current = null;
              }
            }
          });
        } catch (error) {
          console.error('Error initializing map:', error);
          toast({
            title: 'Map Initialization Failed',
            description: 'Could not initialize the map. Please try a different token.',
            variant: 'destructive'
          });
        }
      }, 300);
    } catch (error) {
      console.error('Error setting up map:', error);
    }

    return () => {
      if (mapInitRef.current) {
        clearTimeout(mapInitRef.current);
      }
      
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, containerRef, initialCenter, initialZoom, onMapLoaded, tokenValidated]);

  return map;
};

export default useMapInitialization;
