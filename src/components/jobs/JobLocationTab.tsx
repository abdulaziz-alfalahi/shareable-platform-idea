
import React, { useState, useEffect } from 'react';
import { JobLocation } from '@/types/map';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  BriefcaseIcon, 
  UserCheckIcon, 
  DatabaseIcon,
  Award
} from "lucide-react";
import JobMap from '@/components/JobMap';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import NearbyJobsList from '@/components/map/NearbyJobsList';
import { careerLocationPins } from './mock/careerLocationPins';

interface JobLocationTabProps {
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
}

export const JobLocationTab = ({ jobs: initialJobs, onLocationUpdate }: JobLocationTabProps) => {
  const [activeLocationFilter, setActiveLocationFilter] = useState<'ai-top-10' | 'portfolio-match' | 'all' | 'career-pins'>('career-pins');
  const [nearbyJobs, setNearbyJobs] = useState<JobLocation[]>([]);
  const [searchRadius, setSearchRadius] = useState(5);
  const [currentJobsDisplay, setCurrentJobsDisplay] = useState<JobLocation[]>([]);
  
  console.log(`JobLocationTab initial render with ${initialJobs.length} jobs`); 
  console.log('Career path pins available:', careerLocationPins.length, careerLocationPins);
  
  // Handle nearby jobs updates
  const handleNearbyJobsUpdate = (jobs: JobLocation[]) => {
    console.log('JobLocationTab received nearby jobs:', jobs.length);
    setNearbyJobs(jobs);
  };

  // Handle radius change from the map component
  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
  };

  // Get filtered jobs based on the selected filter
  useEffect(() => {
    let filteredJobs: JobLocation[] = [];
    
    switch (activeLocationFilter) {
      case 'ai-top-10':
        filteredJobs = [...initialJobs]
          .sort((a, b) => {
            const aMatch = a.matchPercentage || Math.floor(Math.random() * 40) + 60;
            const bMatch = b.matchPercentage || Math.floor(Math.random() * 40) + 60;
            return bMatch - aMatch;
          })
          .slice(0, 10);
        break;
      case 'portfolio-match':
        filteredJobs = initialJobs.filter(job => 
          job.portfolioMatch === true || Math.random() > 0.7
        );
        break;
      case 'career-pins':
        // Make sure we always have a fresh copy of the career pins
        filteredJobs = JSON.parse(JSON.stringify(careerLocationPins));
        console.log('Switched to career pins tab, showing pins:', filteredJobs);
        break;
      case 'all':
      default:
        filteredJobs = initialJobs;
        break;
    }
    
    console.log(`Filtered to ${filteredJobs.length} jobs with filter: ${activeLocationFilter}`);
    setCurrentJobsDisplay(filteredJobs);
    
    // Force a small timeout to ensure UI updates before map renders
    if (activeLocationFilter === 'career-pins') {
      setTimeout(() => {
        console.log('Re-rendering map with career pins after filter change');
      }, 300);
    }
  }, [activeLocationFilter, initialJobs]);

  // Initialize with career pins on first render
  useEffect(() => {
    if (careerLocationPins.length > 0) {
      console.log('Initializing with career path pins');
      setCurrentJobsDisplay(JSON.parse(JSON.stringify(careerLocationPins)));
    }
  }, []);

  return (
    <Card className="border shadow-sm p-4">
      <div className="mb-6">
        <Tabs 
          defaultValue="career-pins" 
          value={activeLocationFilter}
          onValueChange={(value) => setActiveLocationFilter(value as 'ai-top-10' | 'portfolio-match' | 'all' | 'career-pins')} 
          className="w-full"
        >
          <TabsList className="mb-4 bg-emirati-sandBeige/20 w-full justify-start">
            <TabsTrigger value="ai-top-10" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <BriefcaseIcon size={16} className="mr-2" /> AI Top 10 Matchings
            </TabsTrigger>
            <TabsTrigger value="portfolio-match" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <UserCheckIcon size={16} className="mr-2" /> Matching My Portfolio
            </TabsTrigger>
            <TabsTrigger value="career-pins" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <Award size={16} className="mr-2" /> Career Path Locations
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <DatabaseIcon size={16} className="mr-2" /> All Vacancies
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="rounded-md bg-slate-50 p-3 text-sm">
          <p className="font-medium mb-1">
            {activeLocationFilter === 'ai-top-10' && 'Showing top 10 job matches based on your profile and skills'}
            {activeLocationFilter === 'portfolio-match' && 'Showing vacancies that align with your portfolio and experience'}
            {activeLocationFilter === 'career-pins' && 'Showing career path opportunity locations around Al Fahidi Fort'}
            {activeLocationFilter === 'all' && 'Showing all available job vacancies'}
          </p>
          <p className="text-muted-foreground">
            {currentJobsDisplay.length} locations found
          </p>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] border rounded-lg">
        <ResizablePanel defaultSize={60} minSize={40}>
          <div className="h-full p-4">
            <JobMap 
              jobs={currentJobsDisplay} 
              onLocationUpdate={onLocationUpdate} 
              onNearbyJobsUpdate={handleNearbyJobsUpdate}
              onRadiusChange={handleRadiusChange}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full p-4 overflow-auto">
            <NearbyJobsList 
              jobs={nearbyJobs.length > 0 ? nearbyJobs : currentJobsDisplay} 
              searchRadius={searchRadius} 
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Card>
  );
};

export default JobLocationTab;
