
import { useCareerPaths } from './useCareerPaths';
import { usePathSelection } from './usePathSelection';
import { useNodeSelection } from './useNodeSelection';
import { usePathwaySimulation } from './usePathwaySimulation';
import { Student } from '@/types/student';
import { useCallback } from 'react';

export const usePathwaySimulator = (student: Student, toast: any) => {
  // Use the individual hooks
  const { careerPaths, isLoading } = useCareerPaths(toast);
  const { selectedPathId, selectedPath, handlePathChange } = usePathSelection(toast);
  const { selectedNodes, handleNodeToggle: baseHandleNodeToggle, canSelectNode: baseCanSelectNode, resetNodeSelection } = useNodeSelection();
  const { simulationResult, isSimulating, runSimulation: baseRunSimulation } = usePathwaySimulation(student, toast);

  // Wrap the individual hook methods to maintain the original API
  const handlePathChangeWrapper = useCallback(async (pathId: string) => {
    const path = await handlePathChange(pathId);
    resetNodeSelection(path);
  }, [handlePathChange, resetNodeSelection]);

  const handleNodeToggleWrapper = useCallback((nodeId: string) => {
    baseHandleNodeToggle(nodeId, selectedPath);
  }, [baseHandleNodeToggle, selectedPath]);

  const canSelectNodeWrapper = useCallback((node: any) => {
    return baseCanSelectNode(node, selectedNodes);
  }, [baseCanSelectNode, selectedNodes]);

  const runSimulationWrapper = useCallback(() => {
    return baseRunSimulation(selectedPathId, selectedNodes);
  }, [baseRunSimulation, selectedPathId, selectedNodes]);

  const canRunSimulation = selectedPathId && selectedNodes.length > 0 && !isSimulating;

  // Return the same interface as the original hook to maintain backward compatibility
  return {
    careerPaths,
    selectedPathId,
    selectedPath,
    selectedNodes,
    simulationResult,
    isLoading,
    isSimulating,
    canRunSimulation,
    handlePathChange: handlePathChangeWrapper,
    handleNodeToggle: handleNodeToggleWrapper,
    canSelectNode: canSelectNodeWrapper,
    runSimulation: runSimulationWrapper
  };
};
