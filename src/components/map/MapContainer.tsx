
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from '@/components/ui/use-toast';
import { JobLocation } from '../JobMap';

interface MapContainerProps {
  mapboxToken: string;
  jobs: JobLocation[];
  userLocation: [number, number] | null;
  setUserLocation: (location: [number, number]) => void;
  marker: React.MutableRefObject<mapboxgl.Marker | null>;
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  reverseGeocode: (lat: number, lng: number) => Promise<void>;
  findNearbyJobs: (latitude: number, longitude: number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  mapboxToken,
  jobs,
  userLocation,
  setUserLocation,
  marker,
  onLocationUpdate,
  reverseGeocode,
  findNearbyJobs,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation || [55.2708, 25.2048], // Default to Dubai
        zoom: 11
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

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

      // Add job markers
      jobs.forEach(job => {
        if (map.current && job.location) {
          if (job.id === "workplace" && onLocationUpdate) {
            // Create a draggable marker for the workplace
            marker.current = new mapboxgl.Marker({ color: '#f59e0b', draggable: true })
              .setLngLat([job.location.longitude, job.location.latitude])
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  `<h3>${job.title}</h3><p>${job.company}</p><p>${job.location.address || "Drag to set location"}</p>`
                )
              )
              .addTo(map.current);
            
            // Update job location when marker is dragged
            marker.current.on('dragend', () => {
              if (marker.current) {
                const lngLat = marker.current.getLngLat();
                // Reverse geocode to get address
                reverseGeocode(lngLat.lat, lngLat.lng);
              }
            });
          } else {
            // Regular non-draggable marker
            new mapboxgl.Marker({ color: '#f59e0b' })
              .setLngLat([job.location.longitude, job.location.latitude])
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  `<h3>${job.title}</h3><p>${job.company}</p><p>${job.location.address}</p>`
                )
              )
              .addTo(map.current);
          }
        }
      });

      // Add click handler to set location if we're in edit mode
      if (onLocationUpdate) {
        map.current.on('click', (e) => {
          if (marker.current) {
            marker.current.setLngLat([e.lngLat.lng, e.lngLat.lat]);
            reverseGeocode(e.lngLat.lat, e.lngLat.lng);
          }
        });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: 'Map Error',
        description: 'Failed to initialize map. Please check your Mapbox token.',
        variant: 'destructive'
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, jobs, userLocation, setUserLocation, marker, onLocationUpdate, reverseGeocode, findNearbyJobs]);

  return (
    <div ref={mapContainer} className="h-[500px] rounded-lg border border-gray-200 shadow-sm" />
  );
};

export default MapContainer;
