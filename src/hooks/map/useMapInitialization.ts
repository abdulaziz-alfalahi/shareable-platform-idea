
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { toast } from '@/components/ui/use-toast';

interface UseMapInitializationProps {
  mapboxToken: string;
  containerRef: React.RefObject<HTMLDivElement>;
  initialCenter?: [number, number];
  initialZoom?: number;
}

const useMapInitialization = ({ 
  mapboxToken, 
  containerRef, 
  initialCenter = [55.2708, 25.2048], // Default to Dubai
  initialZoom = 11 
}: UseMapInitializationProps) => {
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    try {
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

      return () => {
        map.current?.remove();
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
  }, [mapboxToken, containerRef, initialCenter, initialZoom]);

  return map;
};

export default useMapInitialization;
