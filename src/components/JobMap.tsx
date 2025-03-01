
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPinIcon, SearchIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Define job location type
interface JobLocation {
  id: string;
  title: string;
  company: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance?: number;
}

interface JobMapProps {
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
}

const JobMap = ({ jobs = [], onLocationUpdate }: JobMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(10); // in kilometers
  const [nearbyJobs, setNearbyJobs] = useState<JobLocation[]>([]);
  const [tokenSubmitted, setTokenSubmitted] = useState<boolean>(false);
  const [locationSearch, setLocationSearch] = useState<string>('');
  const { toast } = useToast();

  // Initialize map when token is submitted
  useEffect(() => {
    if (!tokenSubmitted || !mapContainer.current) return;

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
  }, [tokenSubmitted, jobs, mapboxToken]);

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    if (!mapboxToken) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        
        // Update the job data with new coordinates and address
        const updatedJobs = jobs.map(job => 
          job.id === "workplace" 
            ? { 
                ...job, 
                location: { 
                  ...job.location, 
                  latitude: lat, 
                  longitude: lng, 
                  address 
                } 
              } 
            : job
        );
        
        // Call the callback with updated job data
        if (onLocationUpdate) {
          onLocationUpdate(updatedJobs);
        }
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
    }
  };

  // Search for a location
  const searchLocation = async () => {
    if (!locationSearch || !mapboxToken || !map.current) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationSearch)}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const address = data.features[0].place_name;
        
        // Fly to the location
        map.current.flyTo({
          center: [lng, lat],
          zoom: 14
        });
        
        // Move the marker if in edit mode
        if (marker.current && onLocationUpdate) {
          marker.current.setLngLat([lng, lat]);
          
          // Update the job data
          const updatedJobs = jobs.map(job => 
            job.id === "workplace" 
              ? { 
                  ...job, 
                  location: { 
                    ...job.location, 
                    latitude: lat, 
                    longitude: lng, 
                    address 
                  } 
                } 
              : job
          );
          
          if (onLocationUpdate) {
            onLocationUpdate(updatedJobs);
          }
        }
      } else {
        toast({
          title: 'Location Not Found',
          description: 'Could not find the specified location.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  // Find jobs within the search radius
  const findNearbyJobs = (latitude: number, longitude: number) => {
    if (!jobs.length) return;

    const nearby = jobs.map(job => {
      if (!job.location) return { ...job, distance: Infinity };

      // Calculate distance using Haversine formula
      const distance = calculateDistance(
        latitude, 
        longitude, 
        job.location.latitude, 
        job.location.longitude
      );

      return { ...job, distance };
    }).filter(job => job.distance <= searchRadius);

    setNearbyJobs(nearby);
  };

  // Haversine formula to calculate distance between coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Handle radius change
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radius = Number(e.target.value);
    setSearchRadius(radius);
    if (userLocation) {
      findNearbyJobs(userLocation[1], userLocation[0]);
    }
  };

  // Handle token submit
  const handleTokenSubmit = () => {
    if (!mapboxToken) {
      toast({
        title: "Token Required",
        description: "Please enter your Mapbox token",
        variant: "destructive"
      });
      return;
    }
    setTokenSubmitted(true);
  };

  return (
    <div className="space-y-4">
      {!tokenSubmitted ? (
        <Card>
          <CardHeader>
            <CardTitle>Mapbox Integration</CardTitle>
            <CardDescription>
              To use the map feature, please enter your Mapbox token. 
              You can get a free token at <a href="https://www.mapbox.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your Mapbox token" 
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTokenSubmit}>Submit</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {onLocationUpdate && (
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for a location..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') searchLocation();
                  }}
                />
                <Button onClick={searchLocation}>Search</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Search for a location or click on the map to place the marker. Drag the marker to adjust the position.
              </p>
            </div>
          )}
          
          <div className="flex items-center gap-4 mb-4">
            <MapPinIcon className="text-emirati-oasisGreen" />
            <div className="flex-1">
              <label htmlFor="radius" className="block text-sm font-medium mb-1">
                Search Radius: {searchRadius} km
              </label>
              <Input
                id="radius"
                type="range"
                min="1"
                max="50"
                value={searchRadius}
                onChange={handleRadiusChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-1 lg:col-span-2">
              <div ref={mapContainer} className="h-[500px] rounded-lg border border-gray-200 shadow-sm" />
            </div>
            
            <div className="col-span-1">
              <Card className="h-[500px] overflow-auto">
                <CardHeader>
                  <CardTitle className="text-emirati-oasisGreen flex items-center">
                    <SearchIcon className="mr-2 h-5 w-5" />
                    Nearby Jobs ({nearbyJobs.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {nearbyJobs.length > 0 ? (
                    <div className="space-y-3">
                      {nearbyJobs.map(job => (
                        <div key={job.id} className="p-3 border rounded-md hover:bg-gray-50">
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-500">{job.company}</p>
                          <p className="text-sm">{job.location.address}</p>
                          {job.distance !== undefined && (
                            <p className="text-xs text-emirati-oasisGreen mt-1">
                              {job.distance.toFixed(1)} km away
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No jobs found within {searchRadius} km
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobMap;
