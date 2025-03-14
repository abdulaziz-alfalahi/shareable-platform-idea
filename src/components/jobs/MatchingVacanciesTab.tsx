
import { Button } from "@/components/ui/button";
import { notifySuccess } from "@/utils/notification";
import { JobApplication } from "./MyApplicationsTab";
import JobVacancyCard from "./JobVacancyCard";

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
          <JobVacancyCard 
            key={vacancy.id} 
            vacancy={vacancy} 
            onApply={handleApplyToJob} 
          />
        ))}
      </div>
    </div>
  );
};

export default MatchingVacanciesTab;
