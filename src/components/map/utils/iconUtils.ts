
import { CareerPathPin } from "@/types/map";

/**
 * Creates an HTML element for a career path marker icon
 * @param iconName The name of the icon to use
 * @param color The background color for the marker
 * @returns An HTML div element styled as a marker icon
 */
export const createCareerPathIconElement = (iconName: string, color: string): HTMLDivElement => {
  console.log(`Creating icon for ${iconName} with color ${color}`);
  const el = document.createElement('div');
  el.className = 'career-path-marker';
  el.style.width = '40px';
  el.style.height = '40px';
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.backgroundColor = color;
  el.style.borderRadius = '50%';
  el.style.boxShadow = '0 3px 6px rgba(0,0,0,0.3)';
  el.style.border = '2px solid white';
  el.style.cursor = 'pointer';
  el.style.position = 'relative'; // Ensure position is set
  el.style.zIndex = '10'; // Higher z-index to ensure visibility
  
  // Create inline SVG icons using Lucide icon paths
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconSvg.setAttribute('width', '24');
  iconSvg.setAttribute('height', '24');
  iconSvg.setAttribute('viewBox', '0 0 24 24');
  iconSvg.setAttribute('fill', 'none');
  iconSvg.setAttribute('stroke', 'white');
  iconSvg.setAttribute('stroke-width', '2');
  iconSvg.setAttribute('stroke-linecap', 'round');
  iconSvg.setAttribute('stroke-linejoin', 'round');
  
  // Add the appropriate path for the icon based on icon name
  let iconPath = '';
  switch (iconName) {
    case 'cpu':
      // Computer chip icon
      iconPath = 'M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm12 0v16M8 4v16m-4-4h16m-4-4h4m-4-4h4m-4-4h4';
      break;
    case 'trending-up':
      // Trending up chart icon
      iconPath = 'M23 6l-9.5 9.5-5-5L1 18';
      break;
    case 'activity':
      // Activity/healthcare icon
      iconPath = 'M22 12h-4l-3 9L9 3l-3 9H2';
      break;
    case 'utensils':
      // Food/hospitality icon
      iconPath = 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20m14-9v7a2 2 0 0 1-2 2H9M17 2v7a2 2 0 0 1-2 2h-.5';
      break;
    case 'zap':
      // Lightning/energy icon
      iconPath = 'M13 2L3 14h9l-1 8 10-12h-9l1-8z';
      break;
    default:
      // Default icon is a map-pin
      iconPath = 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z';
  }
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', iconPath);
  iconSvg.appendChild(path);
  el.appendChild(iconSvg);
  
  console.log('Created icon element:', el);
  return el;
};
