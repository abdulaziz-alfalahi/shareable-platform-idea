
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";

interface RecommendationsCardProps {
  results: RetirementSimulationResults;
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ results }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-emirati-desertGold" />
          <CardTitle>Recommended Actions</CardTitle>
        </div>
        <CardDescription>
          Suggestions to improve your retirement readiness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Recommended Training</h4>
          <div className="flex flex-wrap gap-2">
            {results.recommendedTraining.map((training, index) => (
              <Badge key={index} variant="outline" className="bg-emirati-sandBeige/20">
                {training}
              </Badge>
            ))}
          </div>
        </div>
        
        {!results.sufficientFunds && (
          <div className="bg-amber-50 p-3 rounded-md mt-2">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-amber-800">Attention Needed</h4>
                <p className="text-amber-700 text-sm mt-1">
                  Your projected retirement income is below your target. Consider increasing your savings rate,
                  adjusting your retirement age, or exploring investment alternatives.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {results.sufficientFunds && (
          <div className="bg-green-50 p-3 rounded-md mt-2">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-green-800">On Track</h4>
                <p className="text-green-700 text-sm mt-1">
                  Your retirement plan is well-funded. Consider fine-tuning your investment strategy 
                  and continue your current savings habits.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
