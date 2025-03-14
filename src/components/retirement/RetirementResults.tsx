
import React, { useState } from "react";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart4 } from "lucide-react";
import ResultsSummary from "./results/ResultsSummary";
import DetailedRecommendations from "./results/DetailedRecommendations";
import RetirementVisualization from "./RetirementVisualization";

interface RetirementResultsProps {
  results: RetirementSimulationResults;
  onRestart: () => void;
}

const RetirementResults: React.FC<RetirementResultsProps> = ({ results, onRestart }) => {
  const [activeTab, setActiveTab] = useState("summary");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emirati-deepBlue">Retirement Simulation Results</h2>
        <Button 
          onClick={onRestart}
          variant="outline"
          className="border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10"
        >
          Run another simulation
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="visualization">
            <BarChart4 className="h-4 w-4 mr-2" />
            Visualizations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <ResultsSummary results={results} />
        </TabsContent>
        
        <TabsContent value="details">
          <DetailedRecommendations results={results} />
        </TabsContent>
        
        <TabsContent value="visualization">
          <RetirementVisualization results={results} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetirementResults;
