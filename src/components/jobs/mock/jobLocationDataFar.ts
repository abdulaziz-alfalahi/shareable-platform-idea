
import { JobLocation } from '@/types/map';

// Additional job listings at greater distances from Al Fahidi Fort
export const farJobLocationsData: JobLocation[] = [
  {
    id: '15',
    title: 'Network Engineer',
    company: 'Connected Systems',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 32km from Al Fahidi Fort'
    },
    matchPercentage: 73,
    portfolioMatch: false,
    distanceFromUser: 32
  },
  {
    id: '16',
    title: 'Cloud Architect',
    company: 'Sky Computing',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 35km from Al Fahidi Fort'
    },
    matchPercentage: 85,
    portfolioMatch: true,
    distanceFromUser: 35
  },
  {
    id: '17',
    title: 'Cybersecurity Analyst',
    company: 'Security Solutions',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 38km from Al Fahidi Fort'
    },
    matchPercentage: 79,
    portfolioMatch: false,
    distanceFromUser: 38
  },
  {
    id: '18',
    title: 'Mobile App Developer',
    company: 'App Technologies',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 41km from Al Fahidi Fort'
    },
    matchPercentage: 87,
    portfolioMatch: true,
    distanceFromUser: 41
  },
  {
    id: '19',
    title: 'QA Engineer',
    company: 'Quality Systems',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 44km from Al Fahidi Fort'
    },
    matchPercentage: 81,
    portfolioMatch: true,
    distanceFromUser: 44
  },
  {
    id: '20',
    title: 'Technical Writer',
    company: 'Documentation Solutions',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 47km from Al Fahidi Fort'
    },
    matchPercentage: 72,
    portfolioMatch: false,
    distanceFromUser: 47
  }
];

// Additional workplace entry for Al Fahidi Fort
export const workplaceLocation: JobLocation = {
  id: 'workplace',
  title: 'Your Location',
  company: 'Al Fahidi Fort',
  location: {
    latitude: 25.2637,
    longitude: 55.2972,
    address: 'Al Fahidi Fort, Dubai, UAE'
  },
  matchPercentage: 100,
  portfolioMatch: true
};
