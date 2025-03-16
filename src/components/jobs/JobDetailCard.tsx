
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Vacancy } from "@/types/jobs";
import { JobMatchDetails } from "@/utils/career/types";
import JobOverviewTab from "./JobOverviewTab";
import CompanyTab from "./CompanyTab";
import SkillMatchVisualization from "./SkillMatchVisualization";
import { Student } from "@/types/student";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobDetailCardProps {
  vacancy: Vacancy;
  matchDetails: JobMatchDetails;
  student: Student;
  companyValues: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  hasApplied: boolean;
  isSubmitting: boolean;
  onApply: () => void;
}

const JobDetailCard: React.FC<JobDetailCardProps> = ({
  vacancy,
  matchDetails,
  student,
  companyValues,
  activeTab,
  setActiveTab,
  hasApplied,
  isSubmitting,
  onApply
}) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle className="text-xl font-bold">{vacancy.company}</CardTitle>
          <div className="flex items-center mt-1 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" /> {vacancy.location}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
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
          <TabsList className={`mb-4 bg-emirati-sandBeige/20 ${isMobile ? 'grid grid-cols-3 w-full' : ''}`}>
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
              onApply={onApply}
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
  );
};

export default JobDetailCard;
