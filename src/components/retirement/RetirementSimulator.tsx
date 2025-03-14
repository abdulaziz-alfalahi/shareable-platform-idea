
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp } from "lucide-react";
import RetirementInputForm from "./RetirementInputForm";
import RetirementResults from "./RetirementResults";
import RetirementPolicyInfo from "./RetirementPolicyInfo";
import SimulationTabs from "./SimulationTabs";
import { simulateRetirement } from "@/utils/career/retirementSimulation";
import { RetirementSimulationResults, RetirementSimulationParams } from "@/utils/career/retirementTypes";

const RetirementSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("input-form");
  const [simulationResult, setSimulationResult] = useState<RetirementSimulationResults | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulation = async (formData: RetirementSimulationParams) => {
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
        <RetirementPolicyInfo />
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <SimulationTabs activeTab={activeTab} hasResults={!!simulationResult} />

          <TabsContent value="input-form">
            <RetirementInputForm 
              onSimulate={handleSimulation} 
              isSimulating={isSimulating} 
            />
          </TabsContent>

          <TabsContent value="results">
            {simulationResult && (
              <RetirementResults 
                results={simulationResult}
                onRestart={() => setActiveTab("input-form")}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RetirementSimulator;
