
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, TrendingUp } from 'lucide-react';
import PathSelection from './PathSelection';
import SimulationResults from './SimulationResults';
import { usePathwaySimulatorContext } from './PathwaySimulatorContext';

interface PathwaySimulatorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PathwaySimulatorTabs: React.FC<PathwaySimulatorTabsProps> = ({
  activeTab,
  setActiveTab
}) => {
  const {
    careerPaths,
    selectedPathId,
    selectedPath,
    selectedNodes,
    simulationResult,
    isLoading,
    isSimulating,
    canRunSimulation,
    handlePathChange,
    handleNodeToggle,
    canSelectNode,
    runSimulation
  } = usePathwaySimulatorContext();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          disabled={!simulationResult}
        >
          <TrendingUp size={16} className="mr-2" /> Simulation Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="path-selection">
        <PathSelection
          careerPaths={careerPaths}
          selectedPathId={selectedPathId}
          selectedPath={selectedPath}
          selectedNodes={selectedNodes}
          isLoading={isLoading}
          isSimulating={isSimulating}
          canRunSimulation={canRunSimulation}
          handlePathChange={handlePathChange}
          handleNodeToggle={handleNodeToggle}
          canSelectNode={canSelectNode}
          runSimulation={runSimulation}
        />
      </TabsContent>

      <TabsContent value="simulation-results">
        {simulationResult && (
          <SimulationResults 
            simulationResult={simulationResult}
            onModifyPath={() => setActiveTab('path-selection')}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default PathwaySimulatorTabs;
