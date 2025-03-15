
import { Button } from "@/components/ui/button";
import { notifySuccess } from "@/utils/notification";
import { JobApplication } from "./MyApplicationsTab";
import JobVacancyCard from "./JobVacancyCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  requiredSkills: string[];
  matchedSkills?: string[];
  missingSkills: string[];
  culturalFit?: number;
  careerPathAlignment?: number;
  salary: string;
  postedDate: string;
}

interface MatchingVacanciesTabProps {
  vacancies: Vacancy[];
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  applications: JobApplication[];
  matchType: string;
}

export const MatchingVacanciesTab = ({ 
  vacancies, 
  setApplications,
  applications,
  matchType = "skill-match"
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

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Alert className="bg-emirati-sandBeige/10 border-emirati-oasisGreen">
          <InfoIcon className="h-5 w-5 text-emirati-oasisGreen" />
          <AlertTitle>
            {matchType === "skill-match" 
              ? "Skill-Based Job Matching" 
              : "Career Path Aligned Jobs"}
          </AlertTitle>
          <AlertDescription>
            {matchType === "skill-match" 
              ? "These job vacancies are matched based on your current skills and experience profile. The match percentage indicates how well your skills align with the job requirements."
              : "These job vacancies are aligned with your long-term career path. They may require some additional skills development but are ideal for your career trajectory."}
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vacancies.map((vacancy) => (
          <JobVacancyCard 
            key={vacancy.id} 
            vacancy={vacancy} 
            onApply={handleApplyToJob} 
            matchType={matchType}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchingVacanciesTab;
