
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
import { UaeGeometricPattern } from "@/components/ui/uae";

interface SkillGapAnalysisProps {
  student: Student;
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <Card className="border-none shadow-sm relative overflow-hidden">
      <UaeGeometricPattern 
        type="geometric" 
        position="corner" 
        opacity={0.05} 
        className="absolute top-0 right-0 w-64 h-64"
      />
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <BarChart className="h-6 w-6 mr-2 text-emirati-oasisGreen" />
          Skill Gap Analysis
        </CardTitle>
        <CardDescription>
          Discover in-demand skills to increase your employability in the UAE job market
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
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
