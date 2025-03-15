
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, BarChart, BookOpen, LineChart, LayoutDashboard } from "lucide-react";
import { Student } from "@/types/student";
import TopRecommendationsTab from "./TopRecommendationsTab";
import AllSkillGapsTab from "./AllSkillGapsTab";
import TrainingProgramsTab from "./TrainingProgramsTab";
import SkillGapVisualization from "./SkillGapVisualization";
import SkillProgressTracker from "./SkillProgressTracker";
import { searchTrainingPrograms, analyzeSkillGaps, extractStudentSkills } from "@/utils/career/skill-gap";

export interface SkillGapTabsProps {
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
  
  const searchResults = searchTerm.length > 2 
    ? searchTrainingPrograms(searchTerm)
    : [];
  
  // Get all skill gaps
  const allSkillGaps = analyzeSkillGaps(student);
  
  // Get current student skills
  const studentSkills = extractStudentSkills(student);
  
  // Mock data for the progress tracker - in a real app, this would come from a database
  const inProgressSkills = [
    {
      skill: "Data Analysis",
      trainingTitle: "Data Analysis Fundamentals",
      progress: 65,
      estimatedCompletion: "2 weeks"
    },
    {
      skill: "Cloud Computing",
      trainingTitle: "AWS Essentials",
      progress: 30,
      estimatedCompletion: "5 weeks"
    }
  ];
  
  const completedSkills = ["Leadership", "Strategic Planning", "Project Management"];
    
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="recommendations">
          <TrendingUp className="h-4 w-4 mr-2" />
          Top Recommendations
        </TabsTrigger>
        <TabsTrigger value="all-gaps">
          <BarChart className="h-4 w-4 mr-2" />
          All Skill Gaps
        </TabsTrigger>
        <TabsTrigger value="progress">
          <LineChart className="h-4 w-4 mr-2" />
          Progress
        </TabsTrigger>
        <TabsTrigger value="training">
          <BookOpen className="h-4 w-4 mr-2" />
          Training Programs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillGapVisualization 
            skillGaps={allSkillGaps} 
            studentSkills={studentSkills}
          />
          <SkillProgressTracker
            inProgressSkills={inProgressSkills}
            completedSkills={completedSkills}
            recommendedSkills={allSkillGaps}
            onViewTraining={() => onTabChange("training")}
          />
        </div>
      </TabsContent>
      
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
      
      <TabsContent value="progress">
        <div className="space-y-6">
          <SkillProgressTracker
            inProgressSkills={inProgressSkills}
            completedSkills={completedSkills}
            recommendedSkills={allSkillGaps}
            onViewTraining={() => onTabChange("training")}
          />
          
          <div className="p-4 bg-emirati-sandBeige/10 rounded-lg border border-emirati-sandBeige/30">
            <h3 className="font-medium mb-2">Track Your Progress</h3>
            <p className="text-sm text-muted-foreground">
              This dashboard shows your current skill development progress. As you complete training programs and assessments, your progress will be automatically updated.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              The recommended skills are based on UAE job market analysis and your career goals.
            </p>
          </div>
        </div>
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
