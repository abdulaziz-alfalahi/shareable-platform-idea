
import { JobLocation } from "@/types/map";

/**
 * Generates HTML content for a career path marker popup
 * @param job The job location data
 * @returns HTML string for the popup
 */
export const createCareerPathPopupHtml = (job: JobLocation): string => {
  const { title, company, location, matchPercentage, careerPathPin } = job;
  
  return `<div style="text-align: center;">
    <h3 style="margin-bottom: 5px; color: ${careerPathPin?.color};">${title}</h3>
    <p style="margin: 5px 0;">${company}</p>
    <p style="margin: 5px 0; font-size: 0.9em;">${location.address}</p>
    ${matchPercentage ? `<p style="margin: 5px 0; font-weight: bold;">Career Match: ${matchPercentage}%</p>` : ''}
    <p style="margin-top: 8px; font-style: italic; font-size: 0.8em;">Career Path: ${careerPathPin?.type}</p>
  </div>`;
};

/**
 * Generates HTML content for a regular job marker popup
 * @param job The job location data
 * @returns HTML string for the popup
 */
export const createJobPopupHtml = (job: JobLocation): string => {
  const { title, company, location, matchPercentage, distance } = job;
  
  return `<h3>${title || 'Job'}</h3>
    <p>${company || 'Company'}</p>
    <p>${location.address || ""}</p>
    ${matchPercentage ? `<p>Match: ${matchPercentage}%</p>` : ''}
    ${distance ? `<p>Distance: ${distance.toFixed(1)} km</p>` : ''}`;
};

/**
 * Generates HTML content for a workplace marker popup
 * @param job The job location data
 * @returns HTML string for the popup
 */
export const createWorkplacePopupHtml = (job: JobLocation): string => {
  const { title, company, location } = job;
  
  return `<h3>${title || 'Workplace'}</h3>
    <p>${company || ''}</p>
    <p>${location.address || "Drag to set location"}</p>`;
};
