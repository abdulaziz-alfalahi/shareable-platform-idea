
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BriefcaseIcon, 
  UserCheckIcon, 
  DatabaseIcon
} from "lucide-react";
import JobMap, { JobLocation } from '@/components/JobMap';

interface JobLocationTabProps {
  jobs: JobLocation[];
}

export const JobLocationTab = ({ jobs }: JobLocationTabProps) => {
  const [activeLocationFilter, setActiveLocationFilter] = useState<'ai-top-10' | 'portfolio-match' | 'all'>('all');

  const getFilteredLocationJobs = () => {
    switch (activeLocationFilter) {
      case 'ai-top-10':
        return [...jobs]
          .sort((a, b) => {
            const aMatch = a.matchPercentage || Math.floor(Math.random() * 40) + 60;
            const bMatch = b.matchPercentage || Math.floor(Math.random() * 40) + 60;
            return bMatch - aMatch;
          })
          .slice(0, 10);
      case 'portfolio-match':
        return jobs.filter(job => 
          job.portfolioMatch === true || Math.random() > 0.7
        );
      case 'all':
      default:
        return jobs;
    }
  };

  const filteredLocationJobs = getFilteredLocationJobs();

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Discover job opportunities near you! Enable location services to see jobs within your preferred radius.
        </p>
      </div>

      <div className="mb-6">
        <Tabs 
          defaultValue="all" 
          onValueChange={(value) => setActiveLocationFilter(value as 'ai-top-10' | 'portfolio-match' | 'all')} 
          className="w-full"
        >
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
            {activeLocationFilter === 'ai-top-10' && 'Showing top 10 job matches based on your profile and skills'}
            {activeLocationFilter === 'portfolio-match' && 'Showing vacancies that align with your portfolio and experience'}
            {activeLocationFilter === 'all' && 'Showing all available job vacancies'}
          </p>
          <p className="text-muted-foreground">
            {filteredLocationJobs.length} vacancies found
          </p>
        </div>
      </div>

      <Card className="border-emirati-sandBeige mb-6">
        <CardContent className="p-6">
          <JobMap jobs={filteredLocationJobs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobLocationTab;
