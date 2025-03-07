
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, TrendingUp } from 'lucide-react';
import { CareerPath, SimulationResult } from '@/utils/career/pathwayTypes';
import { getCareerPaths, getCareerPathById } from '@/utils/career/pathwayDataService';
import { simulateCareerPath } from '@/utils/career/pathwaySimulation';
import { Student } from '@/types/student';
import { useToast } from '@/hooks/toast';
import PathSelection from './PathSelection';
import SimulationResults from './SimulationResults';

interface PathwaySimulatorProps {
  student: Student;
}

const PathwaySimulator: React.FC<PathwaySimulatorProps> = ({ student }) => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [activeTab, setActiveTab] = useState('path-selection');
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        setIsLoading(true);
        const paths = await getCareerPaths();
        setCareerPaths(paths);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching career paths:', error);
        toast({
          title: "Failed to load career paths",
          description: "Please try again later",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchPaths();
  }, [toast]);

  const handlePathChange = async (pathId: string) => {
    setSelectedPathId(pathId);
    setSelectedNodes([]);
    setSimulationResult(null);
    
    try {
      const path = await getCareerPathById(pathId);
      setSelectedPath(path);
      
      if (path) {
        const entryNode = path.nodes.find(node => node.level === 'entry');
        if (entryNode) {
          setSelectedNodes([entryNode.id]);
        }
      }
    } catch (error) {
      console.error('Error fetching career path details:', error);
      toast({
        title: "Failed to load path details",
        description: "Please select another path or try again later",
        variant: "destructive"
      });
    }
  };

  const handleNodeToggle = (nodeId: string) => {
    const node = selectedPath?.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    if (selectedNodes.includes(nodeId)) {
      const dependentNodes = selectedPath?.nodes
        .filter(n => n.prerequisites?.includes(nodeId))
        .map(n => n.id) || [];
      
      setSelectedNodes(prev => 
        prev.filter(id => id !== nodeId && !dependentNodes.includes(id))
      );
    } else {
      const nodesToAdd: string[] = [nodeId];
      
      const addPrerequisites = (id: string) => {
        const node = selectedPath?.nodes.find(n => n.id === id);
        if (node?.prerequisites && node.prerequisites.length > 0) {
          node.prerequisites.forEach(prereq => {
            if (!nodesToAdd.includes(prereq) && !selectedNodes.includes(prereq)) {
              nodesToAdd.push(prereq);
              addPrerequisites(prereq);
            }
          });
        }
      };
      
      addPrerequisites(nodeId);
      
      setSelectedNodes(prev => [...prev, ...nodesToAdd.filter(id => !prev.includes(id))]);
    }
  };

  const runSimulation = async () => {
    if (!selectedPathId || selectedNodes.length === 0) return;
    
    setIsSimulating(true);
    try {
      const result = await simulateCareerPath(student, selectedPathId, selectedNodes);
      setSimulationResult(result);
      setActiveTab('simulation-results');
      
      // Show success toast if user is logged in and simulation was likely saved
      if (student.id) {
        toast({
          title: "Simulation saved",
          description: "Your career pathway simulation has been saved to your profile",
        });
      }
    } catch (error) {
      console.error("Simulation error:", error);
      toast({
        title: "Simulation failed",
        description: "Please try again or select a different path",
        variant: "destructive"
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const canRunSimulation = selectedPathId && selectedNodes.length > 0 && !isSimulating;

  const canSelectNode = (node: any): boolean => {
    if (!node.prerequisites || node.prerequisites.length === 0) return true;
    return node.prerequisites.every(prereq => selectedNodes.includes(prereq));
  };

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
