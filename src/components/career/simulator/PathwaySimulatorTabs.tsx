
import React from 'react';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import TabNavigation from './tabs/TabNavigation';
import PathSelectionTab from './tabs/PathSelectionTab';
import SimulationResultsTab from './tabs/SimulationResultsTab';
import { usePathwaySimulatorContext } from './PathwaySimulatorContext';

interface PathwaySimulatorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PathwaySimulatorTabs: React.FC<PathwaySimulatorTabsProps> = ({
  activeTab,
  setActiveTab
}) => {
  const { simulationResult } = usePathwaySimulatorContext();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabNavigation 
        activeTab={activeTab}
        hasSimulationResults={!!simulationResult} 
      />
      
      <TabsContent value="path-selection">
        <PathSelectionTab />
      </TabsContent>

      <TabsContent value="simulation-results">
        {simulationResult && (
          <SimulationResultsTab onModifyPath={() => setActiveTab('path-selection')} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default PathwaySimulatorTabs;
