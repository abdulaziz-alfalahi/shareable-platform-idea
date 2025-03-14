
import { useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (!containerRef.current) return;
    if (!mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      
      map.current = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: initialCenter,
        zoom: initialZoom
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Call onMapLoaded callback when map is loaded
      map.current.on('load', () => {
        if (onMapLoaded) {
          onMapLoaded();
        }
      });

      // Handle errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        toast({
          title: 'Map Error',
          description: 'An error occurred with the map. Please try again later.',
          variant: 'destructive'
        });
      });

      return () => {
        map.current?.remove();
        map.current = null;
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: 'Map Error',
        description: 'Failed to initialize map. Please check your Mapbox token.',
        variant: 'destructive'
      });
      return undefined;
    }
  }, [mapboxToken, containerRef, initialCenter, initialZoom, onMapLoaded]);

  return map;
};

export default useMapInitialization;
