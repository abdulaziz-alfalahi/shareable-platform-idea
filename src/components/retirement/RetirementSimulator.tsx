
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PiggyBank, Calculator, TrendingUp, Calendar } from "lucide-react";
import RetirementInputForm from "./RetirementInputForm";
import RetirementResults from "./RetirementResults";
import { simulateRetirement } from "@/utils/career/retirementSimulation";
import { RetirementSimulationResult } from "@/utils/career/retirementTypes";

const RetirementSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("input-form");
  const [simulationResult, setSimulationResult] = useState<RetirementSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulation = async (formData: {
    currentAge: number;
    retirementAge: number;
    currentSalary: number;
    monthlySavings: number;
    currentSavings: number;
    investmentStyle: 'conservative' | 'moderate' | 'aggressive';
    postRetirementWork: boolean;
  }) => {
    setIsSimulating(true);
    try {
      const result = await simulateRetirement(formData);
      setSimulationResult(result);
      setActiveTab("results");
    } catch (error) {
      console.error("Retirement simulation error:", error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <Card className="border-emirati-sandBeige">
      <CardHeader className="border-b border-emirati-sandBeige/20 bg-emirati-sandBeige/10">
        <CardTitle className="text-2xl font-bold text-emirati-desertRed">
          Retirement Planning Simulator
        </CardTitle>
        <CardDescription>
          Plan your journey from career to retirement with our interactive simulator
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-emirati-sandBeige/20 grid grid-cols-2">
            <TabsTrigger
              value="input-form"
              className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
            >
              <Calculator size={16} className="mr-2" /> Input Parameters
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
              disabled={!simulationResult}
            >
              <TrendingUp size={16} className="mr-2" /> Simulation Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input-form">
            <RetirementInputForm 
              onSimulate={handleSimulation} 
              isSimulating={isSimulating} 
            />
          </TabsContent>

          <TabsContent value="results">
            {simulationResult && (
              <RetirementResults 
                simulationResult={simulationResult}
                onModifyParams={() => setActiveTab("input-form")}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RetirementSimulator;
