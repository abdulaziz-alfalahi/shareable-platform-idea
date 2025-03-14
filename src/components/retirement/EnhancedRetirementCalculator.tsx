
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { simulateRetirement } from "@/utils/career/retirementSimulation";
import { RetirementFormValues } from "./calculator/RetirementForm";
import { convertFormToSimulationParams } from "./calculator/utils";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import RetirementTabs from "./calculator/RetirementTabs";
import RetirementHeader from "./calculator/RetirementHeader";
import { useToast } from "@/hooks/toast";

const EnhancedRetirementCalculator: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("form");
  const [isCalculating, setIsCalculating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<RetirementSimulationResults | null>(null);

  const handleFormSubmit = async (values: RetirementFormValues) => {
    setIsCalculating(true);
    
    try {
      // Convert form values to simulation parameters
      const simulationParams = convertFormToSimulationParams(values);
      
      // Run the simulation
      const results = await simulateRetirement(simulationParams);
      
      // Update state with results
      setSimulationResults(results);
      
      // Switch to results tab
      setActiveTab("results");
      
      // Show success toast
      toast({
        title: "Simulation Complete",
        description: "Your retirement plan has been calculated successfully.",
        variant: "success"
      });
    } catch (error) {
      console.error("Error in retirement simulation:", error);
      
      // Show error toast
      toast({
        title: "Simulation Error",
        description: "There was a problem calculating your retirement plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const resetCalculator = () => {
    setSimulationResults(null);
    setActiveTab("form");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <RetirementHeader />
        
        <div className="mt-6">
          <RetirementTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSubmit={handleFormSubmit}
            isCalculating={isCalculating}
            simulationResults={simulationResults}
            resetCalculator={resetCalculator}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedRetirementCalculator;
