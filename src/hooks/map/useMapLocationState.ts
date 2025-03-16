
import { useState } from 'react';
import { JobLocation } from '@/types/map';
import { useMapboxToken } from './useMapboxToken';
import { useLocationSearch } from './useLocationSearch';
import { useReverseGeocoding } from './useReverseGeocoding';
import { useDynamicJobPositions } from './useDynamicJobPositions';

export const useMapLocationState = (onLocationUpdate?: (jobs: JobLocation[]) => void) => {
  // Set default location to Al Fahidi Fort
  const [userLocation, setUserLocation] = useState<[number, number] | null>([55.2972, 25.2637]);
  
  // Use our refactored hooks
  const { 
    mapboxToken, 
    setMapboxToken,
    tokenSubmitted, 
    setTokenSubmitted 
  } = useMapboxToken();
  
  const { 
    locationSearch, 
    setLocationSearch, 
    searchLocation 
  } = useLocationSearch(mapboxToken, setUserLocation, onLocationUpdate);
  
  const { 
    reverseGeocode 
  } = useReverseGeocoding(mapboxToken, onLocationUpdate);
  
  // Use effect hook for dynamic job positions
  useDynamicJobPositions(userLocation, onLocationUpdate);

  return {
    mapboxToken,
    setMapboxToken,
    userLocation,
    setUserLocation,
    tokenSubmitted,
    setTokenSubmitted,
    locationSearch,
    setLocationSearch,
    searchLocation,
    reverseGeocode
  };
};
