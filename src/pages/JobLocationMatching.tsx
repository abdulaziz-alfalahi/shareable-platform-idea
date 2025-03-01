
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import JobMap from '@/components/JobMap';

// Sample job data with locations
const sampleJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Dubai Tech Solutions',
    location: {
      latitude: 25.2048,
      longitude: 55.2708,
      address: 'Downtown Dubai, UAE'
    }
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Abu Dhabi Marketing Group',
    location: {
      latitude: 24.4539,
      longitude: 54.3773,
      address: 'Al Reem Island, Abu Dhabi, UAE'
    }
  },
  {
    id: '3',
    title: 'Financial Analyst',
    company: 'Emirati Finance',
    location: {
      latitude: 25.0657,
      longitude: 55.1713,
      address: 'Dubai Marina, UAE'
    }
  },
  {
    id: '4',
    title: 'HR Specialist',
    company: 'Global HR Solutions',
    location: {
      latitude: 25.1123,
      longitude: 55.1862,
      address: 'Jumeirah, Dubai, UAE'
    }
  },
  {
    id: '5',
    title: 'Project Manager',
    company: 'Construction UAE',
    location: {
      latitude: 25.2744,
      longitude: 55.3032,
      address: 'Deira, Dubai, UAE'
    }
  }
];

const JobLocationMatching = () => {
  const navigate = useNavigate();
  const [jobs] = useState(sampleJobs);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">Job Location Matching</h1>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          Discover job opportunities near you! Enable location services to see jobs within your preferred radius.
        </p>
      </div>

      <JobMap jobs={jobs} />
    </div>
  );
};

export default JobLocationMatching;
