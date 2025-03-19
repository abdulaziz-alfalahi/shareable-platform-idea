
import { CareerPathPin } from "@/types/map";

/**
 * Creates an HTML element for a career path marker icon
 * @param iconName The name of the icon to use
 * @param color The background color for the marker
 * @returns An HTML div element styled as a marker icon
 */
export const createCareerPathIconElement = (iconName: string, color: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'career-path-marker';
  el.style.width = '36px';
  el.style.height = '36px';
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.backgroundColor = color;
  el.style.borderRadius = '50%';
  el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  
  // Create inline SVG icons using Lucide icon paths
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconSvg.setAttribute('width', '20');
  iconSvg.setAttribute('height', '20');
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
      iconPath = 'M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0-2-.9 2-2V6c0-1.1-.9-2-2-2zM9 16H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V6h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2z';
      break;
    case 'trending-up':
      iconPath = 'M23 6l-9.5 9.5-5-5L1 18';
      break;
    case 'activity':
      iconPath = 'M22 12h-4l-3 9L9 3l-3 9H2';
      break;
    case 'utensils':
      iconPath = 'M3 17h18M3 10h18M13 3l-2 3m6-3l-2 3M5 3a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z';
      break;
    case 'zap':
      iconPath = 'M13 2L3 14h9l-1 8 10-12h-9l1-8z';
      break;
    default:
      // Default icon is a map-pin
      iconPath = 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z';
  }
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', iconPath);
  iconSvg.appendChild(path);
  el.appendChild(iconSvg);
  
  return el;
};
