import { useState, useEffect } from 'react';
import { CareerPath, SimulationResult, getCareerPaths, getCareerPathById, simulateCareerPath } from '@/utils/career/pathway';
import { Student } from '@/types/student';

export const usePathwaySimulator = (student: Student, toast: any) => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

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

  return {
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
  };
};
