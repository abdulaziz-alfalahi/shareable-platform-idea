
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RetirementInputForm from "@/components/retirement/RetirementInputForm";
import RetirementResults from "@/components/retirement/RetirementResults";
import { RetirementSimulationParams, RetirementSimulationResults } from "@/utils/career/retirementTypes";
import { runRetirementSimulation } from "@/utils/career/retirementService";
import { useToast } from "@/hooks/toast";

const RetirementPlanningPage = () => {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<RetirementSimulationResults | null>(null);

  const handleSimulate = async (formData: RetirementSimulationParams) => {
    setIsSimulating(true);
    
    try {
      // In a real app, we would get the userId from auth context
      const userId = undefined;
      const simulationResults = await runRetirementSimulation(userId, formData);
      setResults(simulationResults);
    } catch (error) {
      console.error("Error running retirement simulation:", error);
      toast({
        title: "Simulation Error",
        description: "There was a problem running the retirement simulation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const resetSimulation = () => {
    setResults(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-emirati-deepBlue mb-6">Retirement Planning</h1>
      
      {results ? (
        <RetirementResults results={results} onRestart={resetSimulation} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Retirement Simulator</CardTitle>
            <CardDescription>
              Plan your retirement by entering your current financial details and preferences below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RetirementInputForm onSimulate={handleSimulate} isSimulating={isSimulating} />
          </CardContent>
        </Card>
      )}
      
      <div className="mt-10 bg-emirati-sandBeige/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-emirati-deepBlue mb-4">About Retirement Planning for Emiratis</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            The UAE has a robust pension system for Emirati nationals, administered through the General Pension and Social Security Authority (GPSSA). 
            Emirati citizens employed in the public and private sectors are entitled to pension benefits after completing minimum service periods.
          </p>
          <p>
            The standard retirement age in the UAE is 60 years for men and 55 years for women in government sectors, but many Emiratis choose to 
            supplement their pension with additional savings and investments to maintain their lifestyle in retirement.
          </p>
          <p>
            This retirement simulator helps you visualize how your current savings and contributions can grow over time, and how they might 
            translate into monthly income during your retirement years.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanningPage;
