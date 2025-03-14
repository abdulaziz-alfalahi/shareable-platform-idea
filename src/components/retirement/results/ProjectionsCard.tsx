
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";

interface ProjectionsCardProps {
  results: RetirementSimulationResults;
}

const ProjectionsCard: React.FC<ProjectionsCardProps> = ({ results }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-emirati-oasisGreen" />
          <CardTitle>Long-Term Projections</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <p className="text-gray-600 mb-4">
            Based on your current plan, your retirement savings should last approximately:
          </p>
          <p className="text-3xl font-bold text-emirati-oasisGreen">
            {results.fundSustainability ? `${results.fundSustainability} years` : "25+ years"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This projection assumes an annual withdrawal rate of 4% of your retirement savings
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectionsCard;
