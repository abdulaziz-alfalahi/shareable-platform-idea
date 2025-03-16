
import React from "react";
import { useParams } from "react-router-dom";
import { vacanciesData } from "@/components/jobs/mock";
import { students } from "@/data/mockData";
import AiSkillRecommendations from "@/components/jobs/AiSkillRecommendations";
import CulturalFitAssessment from "@/components/jobs/CulturalFitAssessment";
import JobDetailHeader from "@/components/jobs/JobDetailHeader";
import QuickApplicationCard from "@/components/jobs/QuickApplicationCard";
import JobDetailCard from "@/components/jobs/JobDetailCard";
import { useJobDetail } from "@/hooks/jobs/useJobDetail";
import { useIsMobile } from "@/hooks/use-mobile";

const JobDetails = () => {
  const { id } = useParams();
  const student = students[0]; // First student for demo
  const isMobile = useIsMobile();
  
  const companyValues = [
    "Innovation", "Teamwork", "Excellence", "Integrity", "Customer Focus"
  ];

  const {
    vacancy,
    matchDetails,
    activeTab,
    setActiveTab,
    hasApplied,
    isSubmitting,
    handleApply
  } = useJobDetail({
    vacancyId: id,
    vacanciesData, // Pass the raw vacanciesData, our hook will enrich it
    student
  });

  if (!vacancy) {
    return (
      <div className="container mx-auto py-6 px-4">
        <JobDetailHeader vacancy={null} />
        <p>The job listing you're looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <JobDetailHeader vacancy={vacancy} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <JobDetailCard
            vacancy={vacancy}
            matchDetails={matchDetails}
            student={student}
            companyValues={companyValues}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            hasApplied={hasApplied}
            isSubmitting={isSubmitting}
            onApply={handleApply}
          />
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {isMobile && hasApplied === false && (
            <QuickApplicationCard 
              matchDetails={matchDetails}
              vacancy={vacancy}
              hasApplied={hasApplied}
              isSubmitting={isSubmitting}
              onApply={handleApply}
            />
          )}
          
          {(!isMobile || !hasApplied) && (
            <>
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
            </>
          )}
          
          {!isMobile && (
            <QuickApplicationCard 
              matchDetails={matchDetails}
              vacancy={vacancy}
              hasApplied={hasApplied}
              isSubmitting={isSubmitting}
              onApply={handleApply}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
