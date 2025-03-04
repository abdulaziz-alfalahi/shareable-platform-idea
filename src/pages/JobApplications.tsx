
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BriefcaseIcon, 
  ChevronLeftIcon,
  CheckCircleIcon,
  ArrowUpCircleIcon,
  MapPinIcon
} from "lucide-react";
import { 
  initialApplications, 
  vacanciesData, 
  trainingProgramsData, 
  jobLocationsData 
} from "@/components/jobs/mockData";
import MyApplicationsTab, { JobApplication } from "@/components/jobs/MyApplicationsTab";
import MatchingVacanciesTab from "@/components/jobs/MatchingVacanciesTab";
import UpskillingTab from "@/components/jobs/UpskillingTab";
import JobLocationTab from "@/components/jobs/JobLocationTab";

const JobApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ChevronLeftIcon size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">Job Applications Tracker</h1>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="mb-6 bg-emirati-sandBeige/20">
          <TabsTrigger value="applications" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <BriefcaseIcon size={16} className="mr-2" /> My Applications
          </TabsTrigger>
          <TabsTrigger value="matching" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <CheckCircleIcon size={16} className="mr-2" /> Matching Vacancies
          </TabsTrigger>
          <TabsTrigger value="upskilling" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <ArrowUpCircleIcon size={16} className="mr-2" /> Upskilling Opportunities
          </TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <MapPinIcon size={16} className="mr-2" /> Job Locations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications">
          <MyApplicationsTab 
            applications={applications} 
            setApplications={setApplications} 
          />
        </TabsContent>

        <TabsContent value="matching">
          <MatchingVacanciesTab 
            vacancies={vacanciesData} 
            setApplications={setApplications}
            applications={applications}
          />
        </TabsContent>

        <TabsContent value="upskilling">
          <UpskillingTab trainingPrograms={trainingProgramsData} />
        </TabsContent>

        <TabsContent value="location">
          <JobLocationTab jobs={jobLocationsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobApplications;
