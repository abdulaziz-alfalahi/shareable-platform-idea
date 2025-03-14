
import React, { useState } from "react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { UaeDecoContainer } from "@/components/ui/uae";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import { simulateRetirement } from "@/utils/career/retirementSimulation";
import RetirementHeader from "./RetirementHeader";
import RetirementTabs from "./RetirementTabs";
import { RetirementFormValues } from "./RetirementForm";
import { convertFormToSimulationParams } from "./utils";

const EnhancedRetirementCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("form");
  const [simulationResults, setSimulationResults] = useState<RetirementSimulationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const onSubmit = async (values: RetirementFormValues) => {
    setIsCalculating(true);
    try {
      // Convert form values to simulation parameters
      const simulationParams = convertFormToSimulationParams(values);
      
      // Run the simulation
      const results = await simulateRetirement(simulationParams);
      setSimulationResults(results);
      setActiveTab("results");
    } catch (error) {
      console.error("Error simulating retirement:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetCalculator = () => {
    setSimulationResults(null);
    setActiveTab("form");
  };

  return (
    <UaeDecoContainer variant="desert" decoration="corners" className="max-w-5xl mx-auto">
      <CardHeader>
        <RetirementHeader />
      </CardHeader>

      <CardContent>
        <RetirementTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSubmit={onSubmit}
          isCalculating={isCalculating}
          simulationResults={simulationResults}
          resetCalculator={resetCalculator}
        />
      </CardContent>
    </UaeDecoContainer>
  );
};

export default EnhancedRetirementCalculator;
