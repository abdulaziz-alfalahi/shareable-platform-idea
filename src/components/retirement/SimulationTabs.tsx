
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp } from "lucide-react";

interface SimulationTabsProps {
  activeTab: string;
  hasResults: boolean;
}

const SimulationTabs: React.FC<SimulationTabsProps> = ({ activeTab, hasResults }) => {
  return (
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
        disabled={!hasResults}
      >
        <TrendingUp size={16} className="mr-2" /> Simulation Results
      </TabsTrigger>
    </TabsList>
  );
};

export default SimulationTabs;
