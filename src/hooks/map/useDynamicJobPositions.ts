
import { useState, useEffect } from 'react';
import { JobLocation } from '@/types/map';
import { calculateDistanceCoordinates } from '@/components/map/mapUtils';

export const useDynamicJobPositions = (
  userLocation: [number, number] | null,
  onLocationUpdate?: (jobs: JobLocation[]) => void
) => {
  // Dynamic job position calculation based on user's location
  useEffect(() => {
    if (!userLocation || !onLocationUpdate) return;

    const userLat = userLocation[1];
    const userLng = userLocation[0];

    // Calculate positions for jobs with specified distances
    const calculateJobPositions = (jobs: JobLocation[]) => {
      return jobs.map(job => {
        // Skip jobs without distanceFromUser property
        if (!job.distanceFromUser) return job;

        // Calculate new coordinates based on distance
        const bearing = Math.random() * 360; // Random direction
        const { latitude, longitude } = calculateDistanceCoordinates(
          userLat, 
          userLng, 
          job.distanceFromUser, 
          bearing
        );

        return {
          ...job,
          location: {
            ...job.location,
            latitude,
            longitude
          }
        };
      });
    };

    // Update job positions when user location changes
    const updateJobPositions = (jobs: JobLocation[]) => {
      const updatedJobs = calculateJobPositions(jobs);
      onLocationUpdate(updatedJobs);
    };

    updateJobPositions(
      JSON.parse(localStorage.getItem('currentJobs') || '[]')
    );
  }, [userLocation, onLocationUpdate]);
};
