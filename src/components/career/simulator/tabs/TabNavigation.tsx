
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, TrendingUp } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  hasSimulationResults: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  hasSimulationResults 
}) => {
  return (
    <TabsList className="mb-6 bg-emirati-sandBeige/20 grid grid-cols-2">
      <TabsTrigger
        value="path-selection"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
      >
        <Briefcase size={16} className="mr-2" /> Path Selection
      </TabsTrigger>
      <TabsTrigger
        value="simulation-results"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
        disabled={!hasSimulationResults}
      >
        <TrendingUp size={16} className="mr-2" /> Simulation Results
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
