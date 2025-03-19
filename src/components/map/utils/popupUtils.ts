
import { JobLocation } from "@/types/map";

/**
 * Creates HTML content for a job popup
 * @param job The job location data
 * @returns HTML string for the popup
 */
export const createJobPopupHtml = (job: JobLocation): string => {
  const matchHtml = job.matchPercentage 
    ? `<div class="match-percentage mt-1 font-medium text-emerald-600">${job.matchPercentage}% Match</div>` 
    : '';

  return `
    <div class="job-popup p-2">
      <h3 class="text-lg font-bold">${job.title}</h3>
      <div class="company text-sm text-gray-600">${job.company}</div>
      <div class="address text-xs text-gray-500 mt-1">${job.location.address}</div>
      ${matchHtml}
      <div class="mt-2 pt-2 border-t border-gray-200">
        <a href="/job-detail/${job.id}" class="text-sm text-blue-600 hover:underline">View Details</a>
      </div>
    </div>
  `;
};

/**
 * Creates HTML content for a career path popup
 * @param job The career path location data
 * @returns HTML string for the popup
 */
export const createCareerPathPopupHtml = (job: JobLocation): string => {
  if (!job.careerPathPin) {
    return createJobPopupHtml(job);
  }

  return `
    <div class="career-path-popup p-3">
      <div class="flex items-center mb-2">
        <div class="w-6 h-6 rounded-full mr-2" style="background-color: ${job.careerPathPin.color}"></div>
        <h3 class="text-lg font-bold">${job.title}</h3>
      </div>
      <div class="company text-sm font-medium">${job.company}</div>
      <div class="career-type text-xs py-1 px-2 bg-gray-100 rounded mt-1 inline-block">
        ${job.careerPathPin.type} Career Path
      </div>
      <div class="address text-xs text-gray-500 mt-2">${job.location.address}</div>
      <div class="match-percentage mt-2 text-sm font-medium text-emerald-600">
        ${job.matchPercentage || 85}% Career Match
      </div>
      <div class="mt-3 pt-2 border-t border-gray-200">
        <button class="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full w-full">
          Explore Career Path
        </button>
      </div>
    </div>
  `;
};
