
import React from 'react';
import { CareerPath } from '@/utils/career/pathwayTypes';

interface NodeConnectionProps {
  path: CareerPath;
  selectedNodes: string[];
}

const NodeConnection: React.FC<NodeConnectionProps> = ({ path, selectedNodes }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {path.nodes.map(node => {
          if (!node.prerequisites?.length) return null;
          
          return node.prerequisites.map(prereqId => {
            const prereqNode = path.nodes.find(n => n.id === prereqId);
            if (!prereqNode) return null;
            
            const isSelected = selectedNodes.includes(node.id) && 
                              selectedNodes.includes(prereqId);
            
            return (
              <line 
                key={`${node.id}-${prereqId}`}
                x1="10%" 
                y1="50%" 
                x2="90%" 
                y2="50%"
                stroke={isSelected ? '#16a34a' : '#e5e7eb'}
                strokeWidth={isSelected ? 2 : 1}
                strokeDasharray={isSelected ? "0" : "4"}
              />
            );
          });
        })}
      </svg>
    </div>
  );
};

export default NodeConnection;
