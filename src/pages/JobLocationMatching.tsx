
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, BriefcaseIcon, UserCheckIcon, DatabaseIcon } from 'lucide-react';
import JobMap from '@/components/JobMap';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    },
    matchPercentage: 95,
    portfolioMatch: true
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Abu Dhabi Marketing Group',
    location: {
      latitude: 24.4539,
      longitude: 54.3773,
      address: 'Al Reem Island, Abu Dhabi, UAE'
    },
    matchPercentage: 78,
    portfolioMatch: false
  },
  {
    id: '3',
    title: 'Financial Analyst',
    company: 'Emirati Finance',
    location: {
      latitude: 25.0657,
      longitude: 55.1713,
      address: 'Dubai Marina, UAE'
    },
    matchPercentage: 88,
    portfolioMatch: true
  },
  {
    id: '4',
    title: 'HR Specialist',
    company: 'Global HR Solutions',
    location: {
      latitude: 25.1123,
      longitude: 55.1862,
      address: 'Jumeirah, Dubai, UAE'
    },
    matchPercentage: 65,
    portfolioMatch: false
  },
  {
    id: '5',
    title: 'Project Manager',
    company: 'Construction UAE',
    location: {
      latitude: 25.2744,
      longitude: 55.3032,
      address: 'Deira, Dubai, UAE'
    },
    matchPercentage: 92,
    portfolioMatch: true
  },
  {
    id: '6',
    title: 'UX Designer',
    company: 'Creative Solutions',
    location: {
      latitude: 25.0742,
      longitude: 55.1350,
      address: 'Al Quoz, Dubai, UAE'
    },
    matchPercentage: 86,
    portfolioMatch: true
  },
  {
    id: '7',
    title: 'IT Support Specialist',
    company: 'Tech Support UAE',
    location: {
      latitude: 25.3242,
      longitude: 55.3736,
      address: 'Al Qusais, Dubai, UAE'
    },
    matchPercentage: 70,
    portfolioMatch: false
  },
  {
    id: '8',
    title: 'Sales Manager',
    company: 'Retail Solutions',
    location: {
      latitude: 24.4839,
      longitude: 54.3504,
      address: 'Downtown Abu Dhabi, UAE'
    },
    matchPercentage: 75,
    portfolioMatch: false
  },
  {
    id: '9',
    title: 'Data Scientist',
    company: 'Data Analytics UAE',
    location: {
      latitude: 25.2362,
      longitude: 55.3009,
      address: 'Business Bay, Dubai, UAE'
    },
    matchPercentage: 91,
    portfolioMatch: true
  },
  {
    id: '10',
    title: 'Social Media Specialist',
    company: 'Digital Marketing UAE',
    location: {
      latitude: 25.0817,
      longitude: 55.1350,
      address: 'Al Barsha, Dubai, UAE'
    },
    matchPercentage: 83,
    portfolioMatch: true
  },
  {
    id: '11',
    title: 'Accountant',
    company: 'Financial Services LLC',
    location: {
      latitude: 25.2285,
      longitude: 55.3273,
      address: 'Al Garhoud, Dubai, UAE'
    },
    matchPercentage: 62,
    portfolioMatch: false
  },
  {
    id: '12',
    title: 'Content Writer',
    company: 'Media Productions',
    location: {
      latitude: 25.1124,
      longitude: 55.2341,
      address: 'Dubai Media City, UAE'
    },
    matchPercentage: 68,
    portfolioMatch: false
  }
];

type FilterType = 'ai-top-10' | 'portfolio-match' | 'all';

const JobLocationMatching = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  // Filter jobs based on selected filter
  const getFilteredJobs = () => {
    switch (activeFilter) {
      case 'ai-top-10':
        return [...sampleJobs]
          .sort((a, b) => b.matchPercentage - a.matchPercentage)
          .slice(0, 10);
      case 'portfolio-match':
        return sampleJobs.filter(job => job.portfolioMatch);
      case 'all':
      default:
        return sampleJobs;
    }
  };

  const filteredJobs = getFilteredJobs();

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

      <div className="mb-6">
        <Tabs defaultValue="all" onValueChange={(value) => setActiveFilter(value as FilterType)} className="w-full">
          <TabsList className="mb-4 bg-emirati-sandBeige/20 w-full justify-start">
            <TabsTrigger value="ai-top-10" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <BriefcaseIcon size={16} className="mr-2" /> AI Top 10 Matchings
            </TabsTrigger>
            <TabsTrigger value="portfolio-match" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <UserCheckIcon size={16} className="mr-2" /> Matching My Portfolio
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <DatabaseIcon size={16} className="mr-2" /> All Vacancies
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="rounded-md bg-slate-50 p-3 text-sm">
          <p className="font-medium mb-1">
            {activeFilter === 'ai-top-10' && 'Showing top 10 job matches based on your profile and skills'}
            {activeFilter === 'portfolio-match' && 'Showing vacancies that align with your portfolio and experience'}
            {activeFilter === 'all' && 'Showing all available job vacancies'}
          </p>
          <p className="text-muted-foreground">
            {filteredJobs.length} vacancies found
          </p>
        </div>
      </div>

      <JobMap jobs={filteredJobs} />
    </div>
  );
};

export default JobLocationMatching;
