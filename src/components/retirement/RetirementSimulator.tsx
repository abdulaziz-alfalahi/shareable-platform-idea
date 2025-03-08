
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Banknote, Calculator, TrendingUp, Calendar } from "lucide-react";
import RetirementInputForm from "./RetirementInputForm";
import RetirementResults from "./RetirementResults";
import { simulateRetirement } from "@/utils/career/retirementSimulation";
import { RetirementSimulationResult } from "@/utils/career/retirementTypes";
import { getUserRetirementPlan, saveRetirementPlan, saveRetirementSimulation } from "@/services/retirement/retirementService";
import { useToast } from "@/hooks/toast";

const RetirementSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("input-form");
  const [simulationResult, setSimulationResult] = useState<RetirementSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 60,
    currentSalary: 25000,
    monthlySavings: 5000,
    currentSavings: 100000,
    investmentStyle: 'moderate' as 'conservative' | 'moderate' | 'aggressive',
    postRetirementWork: false
  });
  
  const { toast } = useToast();
  
  // Load user's saved retirement plan when component mounts
  useEffect(() => {
    const loadUserPlan = async () => {
      try {
        const savedPlan = await getUserRetirementPlan();
        if (savedPlan) {
          setFormData(savedPlan);
          toast({
            title: "Saved plan loaded",
            description: "Your previously saved retirement plan has been loaded.",
            variant: "default"
          });
        }
      } catch (error) {
        console.error("Error loading retirement plan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserPlan();
  }, [toast]);

  const handleSimulation = async (formInput: typeof formData) => {
    setIsSimulating(true);
    try {
      // First save the retirement plan
      const plan = await saveRetirementPlan(formInput);
      
      // Then run the simulation
      const result = await simulateRetirement(formInput);
      
      // Save the simulation result
      if (plan && plan.id) {
        await saveRetirementSimulation(plan.id, result);
      }
      
      setSimulationResult(result);
      setActiveTab("results");
      
      toast({
        title: "Retirement Plan Saved",
        description: "Your retirement plan and simulation results have been saved successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error("Retirement simulation error:", error);
      toast({
        title: "Error",
        description: "There was an error saving your retirement plan. Please try again.",
        variant: "destructive"
      });
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
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emirati-oasisGreen mb-4"></div>
                  <p className="text-gray-500">Loading your retirement plan...</p>
                </div>
              </div>
            ) : (
              <RetirementInputForm 
                onSimulate={handleSimulation}
                isSimulating={isSimulating}
                initialFormData={formData}
              />
            )}
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
