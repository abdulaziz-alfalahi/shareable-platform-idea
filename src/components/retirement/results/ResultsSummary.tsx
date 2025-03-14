
import React from "react";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import FinancialSummaryCard from "./FinancialSummaryCard";
import RecommendationsCard from "./RecommendationsCard";
import ProjectionsCard from "./ProjectionsCard";

interface ResultsSummaryProps {
  results: RetirementSimulationResults;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialSummaryCard results={results} />
        <RecommendationsCard results={results} />
      </div>
      <ProjectionsCard results={results} />
    </div>
  );
};

export default ResultsSummary;
