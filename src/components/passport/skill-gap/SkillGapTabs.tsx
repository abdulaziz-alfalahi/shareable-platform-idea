
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, BarChart, BookOpen } from "lucide-react";
import { Student } from "@/types/student";
import TopRecommendationsTab from "./TopRecommendationsTab";
import AllSkillGapsTab from "./AllSkillGapsTab";
import TrainingProgramsTab from "./TrainingProgramsTab";
import { searchTrainingPrograms } from "@/utils/career/skillGapAnalysis";

interface SkillGapTabsProps {
  student: Student;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SkillGapTabs: React.FC<SkillGapTabsProps> = ({ 
  student, 
  activeTab, 
  onTabChange 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  
  // Get search results
  const searchResults = searchTerm.length > 2 
    ? searchTrainingPrograms(searchTerm)
    : [];
    
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="recommendations">
          <TrendingUp className="h-4 w-4 mr-2" />
          Top Recommendations
        </TabsTrigger>
        <TabsTrigger value="all-gaps">
          <BarChart className="h-4 w-4 mr-2" />
          All Skill Gaps
        </TabsTrigger>
        <TabsTrigger value="training">
          <BookOpen className="h-4 w-4 mr-2" />
          Training Programs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="recommendations">
        <TopRecommendationsTab 
          student={student}
          onViewAllGaps={() => onTabChange("all-gaps")} 
        />
      </TabsContent>
      
      <TabsContent value="all-gaps">
        <AllSkillGapsTab 
          student={student}
          onViewTraining={(skill) => {
            setSearchTerm(skill);
            onTabChange("training");
          }}
        />
      </TabsContent>
      
      <TabsContent value="training">
        <TrainingProgramsTab 
          searchTerm={searchTerm}
          searchResults={searchResults}
          onSearchTermChange={setSearchTerm}
          isEnrolling={isEnrolling}
          enrollingId={enrollingId}
          setIsEnrolling={setIsEnrolling}
          setEnrollingId={setEnrollingId}
          student={student}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SkillGapTabs;
