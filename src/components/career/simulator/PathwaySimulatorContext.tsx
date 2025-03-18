
import React, { createContext, useContext, ReactNode } from 'react';
import { Student } from '@/types/student';
import { CareerPath, SimulationResult } from '@/utils/career/pathway';
import { usePathwaySimulator } from '@/hooks/career/usePathwaySimulator';
import { useToast } from '@/hooks/toast';

// Context type definition
interface PathwaySimulatorContextType {
  careerPaths: CareerPath[];
  selectedPathId: string;
  selectedPath: CareerPath | null;
  selectedNodes: string[];
  simulationResult: SimulationResult | null;
  isLoading: boolean;
  isSimulating: boolean;
  canRunSimulation: boolean;
  handlePathChange: (pathId: string) => void;
  handleNodeToggle: (nodeId: string) => void;
  canSelectNode: (node: any) => boolean;
  runSimulation: () => void;
}

// Create context with default values
const PathwaySimulatorContext = createContext<PathwaySimulatorContextType | undefined>(undefined);

export interface PathwaySimulatorProviderProps {
  student: Student;
  children: ReactNode;
}

export const PathwaySimulatorProvider: React.FC<PathwaySimulatorProviderProps> = ({ 
  student, 
  children 
}) => {
  const { toast } = useToast();
  
  const simulatorState = usePathwaySimulator(student, toast);
  
  return (
    <PathwaySimulatorContext.Provider value={simulatorState}>
      {children}
    </PathwaySimulatorContext.Provider>
  );
};

// Custom hook to use the context
export const usePathwaySimulatorContext = () => {
  const context = useContext(PathwaySimulatorContext);
  
  if (context === undefined) {
    throw new Error('usePathwaySimulatorContext must be used within a PathwaySimulatorProvider');
  }
  
  return context;
};
