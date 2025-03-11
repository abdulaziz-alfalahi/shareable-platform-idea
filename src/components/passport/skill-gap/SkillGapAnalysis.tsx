
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { Student } from "@/types/student";
import SkillGapTabs from "./SkillGapTabs";

interface SkillGapAnalysisProps {
  student: Student;
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState("recommendations");
  
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <BarChart className="h-6 w-6 mr-2" />
          Skill Gap Analysis
        </CardTitle>
        <CardDescription>
          Discover in-demand skills to increase your employability in the UAE job market
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SkillGapTabs 
          student={student} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalysis;
