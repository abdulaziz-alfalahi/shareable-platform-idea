
import { JobLocation } from '@/types/map';

// Map job locations mock data with Al Fahidi Fort as center point
export const jobLocationsData: JobLocation[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Dubai Tech Solutions',
    location: {
      latitude: 25.2635,
      longitude: 55.2972,
      address: 'Downtown Dubai, UAE'
    },
    matchPercentage: 92,
    portfolioMatch: true
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Abu Dhabi Marketing Group',
    location: {
      latitude: 25.2580,
      longitude: 55.3047,
      address: 'Bur Dubai, UAE'
    },
    matchPercentage: 78,
    portfolioMatch: false
  },
  {
    id: '3',
    title: 'Financial Analyst',
    company: 'Emirati Finance',
    location: {
      latitude: 25.2715,
      longitude: 55.3020,
      address: 'Dubai Creek, UAE'
    },
    matchPercentage: 85,
    portfolioMatch: true
  },
  {
    id: '4',
    title: 'HR Specialist',
    company: 'Global HR Solutions',
    location: {
      latitude: 25.2690,
      longitude: 55.2861,
      address: 'Al Fahidi Historical District, Dubai, UAE'
    },
    matchPercentage: 70,
    portfolioMatch: false
  },
  {
    id: '5',
    title: 'Project Manager',
    company: 'Construction UAE',
    location: {
      latitude: 25.2593,
      longitude: 55.2887,
      address: 'Al Seef, Dubai, UAE'
    },
    matchPercentage: 88,
    portfolioMatch: true
  },
  // Additional job listings at increasing distances from Al Fahidi Fort
  {
    id: '6',
    title: 'UI/UX Designer',
    company: 'Creative Solutions',
    location: {
      latitude: 0, // Will be calculated dynamically
      longitude: 0, // Will be calculated dynamically
      address: 'Approximately 5km from Al Fahidi Fort'
    },
    matchPercentage: 89,
    portfolioMatch: true,
    distanceFromUser: 5 // in km
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'Cloud Technologies',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 8km from Al Fahidi Fort'
    },
    matchPercentage: 75,
    portfolioMatch: false,
    distanceFromUser: 8
  }
];
