
import { JobLocation } from "@/types/map";

/**
 * Creates HTML content for a regular job marker popup
 */
export const createJobPopupHtml = (job: JobLocation): string => {
  return `
    <div class="popup-content">
      <h3 class="text-lg font-semibold">${job.title}</h3>
      <p class="text-sm font-medium">${job.company}</p>
      <p class="text-xs text-gray-500">${job.location.address}</p>
      ${job.matchPercentage ? 
        `<div class="mt-2">
          <span class="text-xs font-medium ${job.matchPercentage > 80 ? 'text-green-600' : 'text-amber-600'}">
            ${job.matchPercentage}% match
          </span>
        </div>` : ''
      }
    </div>
  `;
};

/**
 * Creates HTML content for a career path pin popup
 */
export const createCareerPathPopupHtml = (job: JobLocation): string => {
  if (!job.careerPathPin) return createJobPopupHtml(job);
  
  return `
    <div class="popup-content">
      <div class="flex items-center gap-2 mb-1">
        <span class="inline-block w-3 h-3 rounded-full" style="background-color: ${job.careerPathPin.color}"></span>
        <span class="text-xs font-medium uppercase">${job.careerPathPin.type} Career Path</span>
      </div>
      <h3 class="text-lg font-semibold">${job.title}</h3>
      <p class="text-sm font-medium">${job.company}</p>
      <p class="text-xs text-gray-500">${job.location.address}</p>
      ${job.matchPercentage ? 
        `<div class="mt-2">
          <span class="text-xs font-medium ${job.matchPercentage > 80 ? 'text-green-600' : 'text-amber-600'}">
            ${job.matchPercentage}% match with your profile
          </span>
        </div>` : ''
      }
      <div class="mt-2">
        <button class="text-xs text-white bg-emirati-oasisGreen px-2 py-1 rounded">
          Explore Career Path
        </button>
      </div>
    </div>
  `;
};

/**
 * Creates HTML content for the workplace marker popup
 */
export const createWorkplacePopupHtml = (job: JobLocation): string => {
  return `
    <div class="popup-content">
      <h3 class="text-lg font-semibold">${job.title}</h3>
      <p class="text-sm">${job.company}</p>
      <p class="text-xs text-gray-500">${job.location.address}</p>
      <div class="mt-2 text-xs text-gray-600">
        <p>Drag this marker to set your interview location</p>
      </div>
    </div>
  `;
};
