
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BriefcaseIcon, 
  ChevronLeftIcon,
  CheckCircleIcon,
  ArrowUpCircleIcon,
  MapPinIcon,
  TrendingUpIcon
} from "lucide-react";
import { 
  initialApplications, 
  vacanciesData, 
  trainingProgramsData, 
  jobLocationsData 
} from "@/components/jobs/mockData";
import MyApplicationsTab, { JobApplication } from "@/components/jobs/MyApplicationsTab";
import MatchingVacanciesTab, { Vacancy } from "@/components/jobs/MatchingVacanciesTab";
import UpskillingTab from "@/components/jobs/UpskillingTab";
import JobLocationTab from "@/components/jobs/JobLocationTab";
import { students } from "@/data/mockData";
import { recommendJobs, recommendCareerAlignedJobs } from "@/utils/career/recommendations";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const JobApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [matchedVacancies, setMatchedVacancies] = useState<Vacancy[]>(vacanciesData);
  const [careerAlignedVacancies, setCareerAlignedVacancies] = useState<Vacancy[]>(vacanciesData);
  const [activeTab, setActiveTab] = useState("applications");
  const [matchingSubTab, setMatchingSubTab] = useState("skill-match"); // 'skill-match' or 'career-path'
  
  // Use the first student from mock data for demonstration
  const mockStudent = students[0];

  // Update matched vacancies based on student profile when it loads
  useEffect(() => {
    if (mockStudent) {
      // Get skill-based matches
      const skillRecommendedJobs = recommendJobs(mockStudent, vacanciesData);
      setMatchedVacancies(skillRecommendedJobs);
      
      // Get career path aligned matches
      const careerRecommendedJobs = recommendCareerAlignedJobs(mockStudent, vacanciesData);
      setCareerAlignedVacancies(careerRecommendedJobs);
    }
  }, [mockStudent]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleMatchingSubTabChange = (value: string) => {
    setMatchingSubTab(value);
  };

  // Get the appropriate vacancies based on the sub-tab
  const displayedVacancies = matchingSubTab === "skill-match" 
    ? matchedVacancies 
    : careerAlignedVacancies;

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

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
          <div className="mb-6">
            <Tabs value={matchingSubTab} onValueChange={handleMatchingSubTabChange} className="w-full">
              <TabsList className="bg-emirati-sandBeige/10 mb-4 w-full justify-start max-w-md">
                <TabsTrigger value="skill-match" className="data-[state=active]:bg-emirati-desertGold/30 data-[state=active]:text-emirati-oasisGreen">
                  <CheckCircleIcon size={14} className="mr-2" /> Skill-Based Matches
                </TabsTrigger>
                <TabsTrigger value="career-path" className="data-[state=active]:bg-emirati-desertGold/30 data-[state=active]:text-emirati-oasisGreen">
                  <TrendingUpIcon size={14} className="mr-2" /> Career Path Alignment
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <MatchingVacanciesTab 
            vacancies={displayedVacancies}
            setApplications={setApplications}
            applications={applications}
            matchType={matchingSubTab}
          />
        </TabsContent>

        <TabsContent value="upskilling">
          <UpskillingTab trainingPrograms={trainingProgramsData} />
        </TabsContent>

        <TabsContent value="location">
          <ErrorBoundary fallback={<div className="p-6 border rounded-md bg-red-50 text-red-800">
            There was an error loading the map. Please try again later.
          </div>}>
            <JobLocationTab jobs={jobLocationsData} />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobApplications;
