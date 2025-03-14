
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BuildingIcon, 
  CalendarIcon,
  MapPinIcon,
  SendIcon,
  ArrowUpCircleIcon,
  InfoIcon
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { notifySuccess } from "@/utils/notification";
import { JobApplication } from "./MyApplicationsTab";

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  requiredSkills: string[];
  missingSkills: string[];
  salary: string;
  postedDate: string;
}

interface MatchingVacanciesTabProps {
  vacancies: Vacancy[];
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  applications: JobApplication[];
}

export const MatchingVacanciesTab = ({ 
  vacancies, 
  setApplications,
  applications
}: MatchingVacanciesTabProps) => {
  
  const handleApplyToJob = (jobTitle: string, company: string) => {
    const application: JobApplication = {
      company,
      position: jobTitle,
      date: new Date().toISOString().split('T')[0],
      status: "applied",
      notes: "Applied through match recommendation",
      id: Date.now().toString()
    };
    
    setApplications([application, ...applications]);
    
    notifySuccess({
      title: "Application Submitted",
      description: `You've applied to ${jobTitle} at ${company}.`
    });
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-gray-600">
          Based on your skills and experience, here are the top job vacancies that match your profile.
          Our AI-powered matching algorithm considers your skills, experience, and career goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vacancies.map((vacancy) => (
          <Card key={vacancy.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-emirati-oasisGreen flex items-center">
                    {vacancy.title}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`ml-3 text-sm font-medium ${getMatchColor(vacancy.matchPercentage)} flex items-center`}>
                            {vacancy.matchPercentage}% Match
                            <InfoIcon size={14} className="ml-1 text-gray-400" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">This score is based on how well your skills match the job requirements</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <BuildingIcon size={16} className="mr-1" /> 
                    {vacancy.company}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon size={14} className="mr-1 text-emirati-camelBrown" /> 
                  {vacancy.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon size={14} className="mr-1 text-emirati-camelBrown" /> 
                  Posted: {vacancy.postedDate}
                </div>
                <div className="flex items-center text-sm font-medium">
                  {vacancy.salary}
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Required Skills:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {vacancy.requiredSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {vacancy.missingSkills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium flex items-center">
                      Skills to Develop
                      <ArrowUpCircleIcon size={14} className="ml-1 text-emirati-desertGold" />
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vacancy.missingSkills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <Button 
                className="w-full bg-emirati-oasisGreen hover:bg-emirati-desertGold"
                onClick={() => handleApplyToJob(vacancy.title, vacancy.company)}
              >
                <SendIcon size={14} className="mr-1" /> Apply Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchingVacanciesTab;
