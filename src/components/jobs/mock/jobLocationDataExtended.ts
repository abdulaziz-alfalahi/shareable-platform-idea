
import { JobLocation } from '@/types/map';

// Additional job listings at increasing distances from Al Fahidi Fort
export const extendedJobLocationsData: JobLocation[] = [
  {
    id: '8',
    title: 'Product Manager',
    company: 'Innovation Hub',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 11km from Al Fahidi Fort'
    },
    matchPercentage: 82,
    portfolioMatch: true,
    distanceFromUser: 11
  },
  {
    id: '9',
    title: 'Data Scientist',
    company: 'Analytics Solutions',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 14km from Al Fahidi Fort'
    },
    matchPercentage: 78,
    portfolioMatch: false,
    distanceFromUser: 14
  },
  {
    id: '10',
    title: 'Front-end Developer',
    company: 'Web Solutions',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 17km from Al Fahidi Fort'
    },
    matchPercentage: 91,
    portfolioMatch: true,
    distanceFromUser: 17
  },
  {
    id: '11',
    title: 'Backend Developer',
    company: 'Server Technologies',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 20km from Al Fahidi Fort'
    },
    matchPercentage: 88,
    portfolioMatch: true,
    distanceFromUser: 20
  },
  {
    id: '12',
    title: 'Systems Architect',
    company: 'Enterprise Solutions',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 23km from Al Fahidi Fort'
    },
    matchPercentage: 76,
    portfolioMatch: false,
    distanceFromUser: 23
  },
  {
    id: '13',
    title: 'Database Administrator',
    company: 'Data Systems Inc',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 26km from Al Fahidi Fort'
    },
    matchPercentage: 82,
    portfolioMatch: true,
    distanceFromUser: 26
  },
  {
    id: '14',
    title: 'AI Specialist',
    company: 'Future Technologies',
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Approximately 29km from Al Fahidi Fort'
    },
    matchPercentage: 95,
    portfolioMatch: true,
    distanceFromUser: 29
  }
];
