
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronRight, Briefcase } from 'lucide-react';
import { CareerPath } from '@/utils/career/pathwayTypes';
import PathwayVisualization from './PathwayVisualization';

interface PathSelectionProps {
  careerPaths: CareerPath[];
  selectedPathId: string;
  selectedPath: CareerPath | null;
  selectedNodes: string[];
  isLoading: boolean;
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
  canRunSimulation,
  handlePathChange,
  handleNodeToggle,
  canSelectNode,
  runSimulation
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select a Career Path</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select 
              value={selectedPathId}
              onValueChange={handlePathChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a career path" />
              </SelectTrigger>
              <SelectContent>
                {careerPaths.map(path => (
                  <SelectItem key={path.id} value={path.id}>
                    {path.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPath && (
            <div className="flex items-center justify-end space-x-2">
              <div className="text-sm rounded bg-emirati-sandBeige/20 px-2 py-1">
                <span className="font-medium">Demand:</span> {' '}
                {selectedPath.popularity >= 7 ? (
                  <span className="text-green-600 font-medium">High</span>
                ) : selectedPath.popularity >= 4 ? (
                  <span className="text-amber-600 font-medium">Medium</span>
                ) : (
                  <span className="text-red-600 font-medium">Low</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedPath && (
        <div className="mt-8 space-y-6">
          <PathwayVisualization
            path={selectedPath}
            selectedNodes={selectedNodes}
            onNodeSelect={handleNodeToggle}
            canSelectNode={canSelectNode}
          />
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={runSimulation}
              disabled={!canRunSimulation}
              className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
            >
              Run Simulation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathSelection;
