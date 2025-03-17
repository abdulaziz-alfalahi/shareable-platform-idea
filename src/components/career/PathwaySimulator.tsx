
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, TrendingUp } from 'lucide-react';
import { Student } from '@/types/student';
import PathSelection from './simulator/PathSelection';
import SimulationResults from './simulator/SimulationResults';
import { usePathwaySimulator } from '@/hooks/career/usePathwaySimulator';
import { useToast } from '@/hooks/toast';

interface PathwaySimulatorProps {
  student: Student;
}

const PathwaySimulator: React.FC<PathwaySimulatorProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState('path-selection');
  const { toast } = useToast();
  
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
  } = usePathwaySimulator(student, toast);

  return (
    <Card className="border-emirati-sandBeige">
      <CardHeader className="border-b border-emirati-sandBeige/20 bg-emirati-sandBeige/10">
        <CardTitle className="text-2xl font-bold text-emirati-desertRed">
          Career Pathway Simulator
        </CardTitle>
        <CardDescription>
          Explore different career paths and visualize your journey to success
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
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
      </CardContent>
    </Card>
  );
};

export default PathwaySimulator;
