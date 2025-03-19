
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { JobLocation } from '@/types/map';
import RegularMarkers from './markers/RegularMarkers';
import CareerPathMarkers from './markers/CareerPathMarkers';
import WorkplaceMarker from './markers/WorkplaceMarker';
import MarkerManager from './markers/MarkerManager';

interface JobMarkersProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  reverseGeocode: (lat: number, lng: number) => Promise<void>;
}

/**
 * JobMarkers component that manages different types of markers on the map.
 * This has been refactored to use a MarkerManager component that handles
 * the common marker management logic, while delegating specific marker
 * rendering to specialized components.
 */
const JobMarkers: React.FC<JobMarkersProps> = ({
  map,
  jobs,
  onLocationUpdate,
  reverseGeocode
}) => {
  // Filter jobs by type for each marker component
  const regularJobs = jobs.filter(job => !job.careerPathPin && job.id !== 'workplace');
  const careerPathJobs = jobs.filter(job => job.careerPathPin);
  const workplaceJobs = jobs.filter(job => job.id === 'workplace');

  return (
    <MarkerManager 
      map={map} 
      jobs={jobs} 
      onLocationUpdate={onLocationUpdate} 
      reverseGeocode={reverseGeocode}
    >
      <RegularMarkers jobs={regularJobs} />
      <CareerPathMarkers jobs={careerPathJobs} />
      <WorkplaceMarker jobs={workplaceJobs} />
    </MarkerManager>
  );
};

export default JobMarkers;
