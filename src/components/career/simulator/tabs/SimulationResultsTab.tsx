
import React from 'react';
import SimulationResults from '../SimulationResults';
import { usePathwaySimulatorContext } from '../PathwaySimulatorContext';

interface SimulationResultsTabProps {
  onModifyPath: () => void;
}

const SimulationResultsTab: React.FC<SimulationResultsTabProps> = ({
  onModifyPath
}) => {
  const { simulationResult } = usePathwaySimulatorContext();

  if (!simulationResult) {
    return null;
  }

  return (
    <SimulationResults 
      simulationResult={simulationResult}
      onModifyPath={onModifyPath}
    />
  );
};

export default SimulationResultsTab;
