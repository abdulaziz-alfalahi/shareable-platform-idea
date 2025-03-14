
import React from "react";
import { UaeDivider } from "@/components/ui/uae";
import RetirementFinancialMetrics from "../RetirementFinancialMetrics";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";

interface DetailedRecommendationsProps {
  results: RetirementSimulationResults;
}

const DetailedRecommendations: React.FC<DetailedRecommendationsProps> = ({ results }) => {
  return (
    <div>
      <RetirementFinancialMetrics simulationResult={results} />
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold">Additional Recommendations</h3>
        <UaeDivider variant="dotted" />
        
        <div className="space-y-2">
          {results.recommendations && results.recommendations.map((recommendation, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <p className="text-gray-800">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedRecommendations;
