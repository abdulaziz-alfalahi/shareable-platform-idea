
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin,
} from "lucide-react";
import { vacanciesData } from "@/components/jobs/mockData";
import { students } from "@/data/mockData";
import { Vacancy } from "@/types/jobs";
import { Student } from "@/types/student";
import SkillMatchVisualization from "@/components/jobs/SkillMatchVisualization";
import { getJobMatchDetails } from "@/utils/career/recommendations";
import AiSkillRecommendations from "@/components/jobs/AiSkillRecommendations";
import CulturalFitAssessment from "@/components/jobs/CulturalFitAssessment";
import { notifySuccess } from "@/utils/notification";
import JobDetailHeader from "@/components/jobs/JobDetailHeader";
import JobOverviewTab from "@/components/jobs/JobOverviewTab";
import CompanyTab from "@/components/jobs/CompanyTab";
import QuickApplicationCard from "@/components/jobs/QuickApplicationCard";

const enrichVacancy = (vacancy: any): Vacancy => {
  return {
    ...vacancy,
    matchedSkills: vacancy.matchedSkills || vacancy.requiredSkills.slice(0, Math.ceil(vacancy.requiredSkills.length * (vacancy.matchPercentage / 100))),
    missingSkills: vacancy.missingSkills || vacancy.requiredSkills.slice(Math.ceil(vacancy.requiredSkills.length * (vacancy.matchPercentage / 100))),
    culturalFit: vacancy.culturalFit || Math.round(65 + Math.random() * 25),
    careerPathAlignment: vacancy.careerPathAlignment || Math.round(60 + Math.random() * 30)
  };
};

const JobDetails = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [student, setStudent] = useState<Student>(students[0]); // First student for demo
  const [activeTab, setActiveTab] = useState("overview");
  const [hasApplied, setHasApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundVacancy = vacanciesData.find(v => v.id === id);
      if (foundVacancy) {
        setVacancy(enrichVacancy(foundVacancy));
        
        // Check if user has already applied (demo purposes)
        const randomApplied = Math.random() > 0.7;
        setHasApplied(randomApplied);
      }
    }
  }, [id]);

  const handleApply = () => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setHasApplied(true);
      notifySuccess({
        title: "Application Submitted",
        description: `Your application for ${vacancy?.title} at ${vacancy?.company} has been submitted.`,
      });
    }, 1500);
  };

  const companyValues = [
    "Innovation", "Teamwork", "Excellence", "Integrity", "Customer Focus"
  ];

  if (!vacancy) {
    return (
      <div className="container mx-auto py-10 px-4">
        <JobDetailHeader vacancy={null} />
        <p>The job listing you're looking for could not be found.</p>
      </div>
    );
  }

  // Get match details for this specific job
  const matchDetails = getJobMatchDetails(student, vacancy);

  return (
    <div className="container mx-auto py-10 px-4">
      <JobDetailHeader vacancy={vacancy} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">{vacancy.company}</CardTitle>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" /> {vacancy.location}
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-emirati-sandBeige/20">
                  {vacancy.salary}
                </Badge>
                <Badge className="bg-emirati-oasisGreen text-white">
                  {matchDetails.matchPercentage}% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 bg-emirati-sandBeige/20">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="match-details" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
                    Match Details
                  </TabsTrigger>
                  <TabsTrigger value="company" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
                    Company
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <JobOverviewTab 
                    vacancy={vacancy} 
                    matchDetails={matchDetails}
                    hasApplied={hasApplied}
                    isSubmitting={isSubmitting}
                    onApply={handleApply}
                  />
                </TabsContent>
                
                <TabsContent value="match-details" className="space-y-4">
                  <SkillMatchVisualization 
                    matchPercentage={matchDetails.matchPercentage}
                    matchedSkills={matchDetails.matchedSkills}
                    missingSkills={matchDetails.missingSkills}
                    careerPathAlignment={matchDetails.careerPathAlignment}
                    culturalFit={matchDetails.culturalFit}
                  />
                </TabsContent>
                
                <TabsContent value="company">
                  <CompanyTab 
                    vacancy={vacancy} 
                    companyValues={companyValues} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <QuickApplicationCard 
            matchDetails={matchDetails}
            vacancy={vacancy}
            hasApplied={hasApplied}
            isSubmitting={isSubmitting}
            onApply={handleApply}
          />
          
          <CulturalFitAssessment 
            student={student}
            employer={{
              name: vacancy.company,
              industry: "Technology", // This would come from real data
              values: companyValues,
              workStyle: "hybrid" // This would come from real data
            }}
          />
          
          <AiSkillRecommendations 
            student={student}
            targetJobTitle={vacancy.title}
            onViewTraining={(programId) => {
              // Navigate to training program details
              console.log("View training program:", programId);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
