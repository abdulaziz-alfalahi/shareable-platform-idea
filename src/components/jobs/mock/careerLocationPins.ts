
import { JobLocation } from '@/types/map';

// Career path location pins data with Al Fahidi Fort as center point
export const careerLocationPins: JobLocation[] = [
  {
    id: 'career-1',
    title: 'Technology Hub',
    company: 'UAE Tech Innovation Center',
    location: {
      latitude: 25.2680,
      longitude: 55.3080,
      address: 'Dubai Digital Park, UAE'
    },
    matchPercentage: 95,
    portfolioMatch: true,
    careerPathPin: {
      type: 'technology',
      icon: 'cpu',
      color: '#3b82f6'
    }
  },
  {
    id: 'career-2',
    title: 'Finance District',
    company: 'UAE Financial Center',
    location: {
      latitude: 25.2550,
      longitude: 55.2850,
      address: 'Financial District, Dubai, UAE'
    },
    matchPercentage: 88,
    portfolioMatch: true,
    careerPathPin: {
      type: 'finance',
      icon: 'trending-up',
      color: '#10b981'
    }
  },
  {
    id: 'career-3',
    title: 'Healthcare Innovation',
    company: 'Emirates Medical Research',
    location: {
      latitude: 25.2750,
      longitude: 55.3100,
      address: 'Healthcare City, Dubai, UAE'
    },
    matchPercentage: 82,
    portfolioMatch: false,
    careerPathPin: {
      type: 'healthcare',
      icon: 'activity',
      color: '#ef4444'
    }
  },
  {
    id: 'career-4',
    title: 'Hospitality Excellence',
    company: 'UAE Hospitality Group',
    location: {
      latitude: 25.2600,
      longitude: 55.3150,
      address: 'Hotel District, Dubai, UAE'
    },
    matchPercentage: 76,
    portfolioMatch: false,
    careerPathPin: {
      type: 'hospitality',
      icon: 'utensils',
      color: '#f59e0b'
    }
  },
  {
    id: 'career-5',
    title: 'Sustainable Energy',
    company: 'UAE Green Energy Initiative',
    location: {
      latitude: 25.2700,
      longitude: 55.2800,
      address: 'Sustainable City, Dubai, UAE'
    },
    matchPercentage: 91,
    portfolioMatch: true,
    careerPathPin: {
      type: 'energy',
      icon: 'zap',
      color: '#84cc16'
    }
  }
];
