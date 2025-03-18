
import React from 'react';
import { CareerPath } from '@/utils/career/pathway';
import PathwayVisualization from '../PathwayVisualization';
import PathSelectionHeader from './path-selection/PathSelectionHeader';
import PathSelectionLoading from './path-selection/PathSelectionLoading';
import SimulationButton from './path-selection/SimulationButton';

interface PathSelectionProps {
  careerPaths: CareerPath[];
  selectedPathId: string;
  selectedPath: CareerPath | null;
  selectedNodes: string[];
  isLoading: boolean;
  isSimulating: boolean;
  canRunSimulation: boolean;
  handlePathChange: (pathId: string) => void;
  handleNodeToggle: (nodeId: string) => void;
  canSelectNode: (node: any) => boolean;
  runSimulation: () => void;
}

const PathSelection: React.FC<PathSelectionProps> = ({
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
}) => {
  return (
    <div className="space-y-6">
      <PathSelectionHeader
        careerPaths={careerPaths}
        selectedPathId={selectedPathId}
        selectedPath={selectedPath}
        isLoading={isLoading}
        handlePathChange={handlePathChange}
      />

      {isLoading && <PathSelectionLoading />}

      {selectedPath && !isLoading && (
        <div className="mt-8 space-y-6">
          <PathwayVisualization
            path={selectedPath}
            selectedNodes={selectedNodes}
            onNodeSelect={handleNodeToggle}
            canSelectNode={canSelectNode}
          />
          
          <SimulationButton
            isSimulating={isSimulating}
            canRunSimulation={canRunSimulation}
            runSimulation={runSimulation}
          />
        </div>
      )}
    </div>
  );
};

export default PathSelection;
