
import React from 'react';
import PathSelection from '../PathSelection';
import { usePathwaySimulatorContext } from '../PathwaySimulatorContext';

const PathSelectionTab: React.FC = () => {
  const {
    careerPaths,
    selectedPathId,
    selectedPath,
    selectedNodes,
    isLoading,
    isSimulating,
    canRunSimulation,
    handlePathChange,
    handleNodeToggle,
    canSelectNode,
    runSimulation
  } = usePathwaySimulatorContext();

  return (
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
  );
};

export default PathSelectionTab;
