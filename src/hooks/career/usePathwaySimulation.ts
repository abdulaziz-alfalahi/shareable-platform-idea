
import { useState } from 'react';
import { Student } from '@/types/student';
import { SimulationResult, simulateCareerPath } from '@/utils/career/pathway';

export const usePathwaySimulation = (student: Student, toast: any) => {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async (selectedPathId: string, selectedNodes: string[]) => {
    if (!selectedPathId || selectedNodes.length === 0) return null;
    
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
      
      return result;
    } catch (error) {
      console.error("Simulation error:", error);
      toast({
        title: "Simulation failed",
        description: "Please try again or select a different path",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSimulating(false);
    }
  };

  return {
    simulationResult,
    isSimulating,
    runSimulation
  };
};
