
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CareerPath } from '@/utils/career/pathway';

interface PathSelectionHeaderProps {
  careerPaths: CareerPath[];
  selectedPathId: string;
  selectedPath: CareerPath | null;
  isLoading: boolean;
  handlePathChange: (pathId: string) => void;
}

const PathSelectionHeader: React.FC<PathSelectionHeaderProps> = ({
  careerPaths,
  selectedPathId,
  selectedPath,
  isLoading,
  handlePathChange
}) => {
  return (
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
              <SelectValue placeholder={isLoading ? "Loading paths..." : "Choose a career path"} />
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
  );
};

export default PathSelectionHeader;
