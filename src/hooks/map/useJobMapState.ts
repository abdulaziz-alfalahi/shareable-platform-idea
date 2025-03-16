
import { useEffect } from 'react';
import { JobLocation } from '@/types/map';
import { useMapLocationState } from './useMapLocationState';
import { useJobFiltering } from './useJobFiltering';

export const useJobMapState = (jobs: JobLocation[], onLocationUpdate?: (jobs: JobLocation[]) => void) => {
  const {
    mapboxToken,
    setMapboxToken,
    userLocation,
    setUserLocation,
    tokenSubmitted,
    setTokenSubmitted,
    locationSearch,
    setLocationSearch,
    searchLocation: searchLocationBase,
    reverseGeocode: reverseGeocodeBase
  } = useMapLocationState(onLocationUpdate);

  const {
    searchRadius,
    nearbyJobs,
    findNearbyJobs: findNearbyJobsBase,
    handleRadiusChange: handleRadiusChangeBase
  } = useJobFiltering();

  // Wrapper functions that include the jobs parameter
  const findNearbyJobs = (latitude: number, longitude: number) => {
    findNearbyJobsBase(latitude, longitude, jobs);
  };

  // Corrected function to only pass the event parameter
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRadiusChangeBase(e);
  };

  const searchLocation = () => {
    searchLocationBase(jobs, findNearbyJobs);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    reverseGeocodeBase(lat, lng, jobs);
  };

  // Reset the tokenSubmitted state if the token is cleared
  useEffect(() => {
    if (!mapboxToken && tokenSubmitted) {
      setTokenSubmitted(false);
    }
  }, [mapboxToken, tokenSubmitted]);

  return {
    mapboxToken,
    setMapboxToken,
    userLocation,
    setUserLocation,
    searchRadius,
    nearbyJobs,
    tokenSubmitted,
    setTokenSubmitted,
    locationSearch,
    setLocationSearch,
    handleRadiusChange,
    searchLocation,
    findNearbyJobs,
    reverseGeocode
  };
};
