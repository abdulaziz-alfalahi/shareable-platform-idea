
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, ChevronRight } from "lucide-react";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import RetirementForm, { RetirementFormValues } from "./RetirementForm";
import RetirementResults from "../RetirementResults";

interface RetirementTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSubmit: (values: RetirementFormValues) => void;
  isCalculating: boolean;
  simulationResults: RetirementSimulationResults | null;
  resetCalculator: () => void;
}

const RetirementTabs: React.FC<RetirementTabsProps> = ({
  activeTab,
  setActiveTab,
  onSubmit,
  isCalculating,
  simulationResults,
  resetCalculator
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="form" disabled={isCalculating}>
          <Calculator className="mr-2 h-4 w-4" />
          Input Details
        </TabsTrigger>
        <TabsTrigger value="results" disabled={!simulationResults || isCalculating}>
          <ChevronRight className="mr-2 h-4 w-4" />
          View Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="form">
        <RetirementForm onSubmit={onSubmit} isCalculating={isCalculating} />
      </TabsContent>

      <TabsContent value="results">
        {simulationResults && (
          <RetirementResults results={simulationResults} onRestart={resetCalculator} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default RetirementTabs;
