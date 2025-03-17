
import React from 'react';
import { CareerPath, CareerNode } from '@/utils/career/pathwayTypes';

interface NodeConnectionProps {
  path: CareerPath;
  selectedNodes: string[];
}

const NodeConnection: React.FC<NodeConnectionProps> = ({ path, selectedNodes }) => {
  // Find the element positions based on node levels
  const getNodePosition = (node: CareerNode) => {
    // Map level to column position (0-3)
    const levelToColumn = {
      'entry': 0,
      'mid': 1,
      'senior': 2,
      'expert': 3
    };
    
    // Get all nodes with the same level to determine vertical position
    const nodesInSameLevel = path.nodes.filter(n => n.level === node.level);
    const nodeIndex = nodesInSameLevel.findIndex(n => n.id === node.id);
    
    // Calculate position percentage
    const columnPercentage = 12.5 + (levelToColumn[node.level] * 25); // 12.5%, 37.5%, 62.5%, 87.5%
    const rowSpacing = 100 / (nodesInSameLevel.length + 1);
    const rowPercentage = (nodeIndex + 1) * rowSpacing;
    
    return { x: columnPercentage, y: rowPercentage };
  };

  // Create connection lines between nodes
  const renderConnections = () => {
    return path.nodes.flatMap(node => {
      if (!node.prerequisites?.length) return [];
      
      return node.prerequisites.map(prereqId => {
        const prereqNode = path.nodes.find(n => n.id === prereqId);
        if (!prereqNode) return null;
        
        const isSelected = selectedNodes.includes(node.id) && 
                          selectedNodes.includes(prereqId);
        
        const startPos = getNodePosition(prereqNode);
        const endPos = getNodePosition(node);
        
        return (
          <line 
            key={`${node.id}-${prereqId}`}
            x1={`${startPos.x}%`} 
            y1={`${startPos.y}%`} 
            x2={`${endPos.x}%`} 
            y2={`${endPos.y}%`}
            stroke={isSelected ? '#16a34a' : '#e5e7eb'}
            strokeWidth={isSelected ? 2 : 1}
            strokeDasharray={isSelected ? "0" : "4"}
          />
        );
      });
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {renderConnections()}
      </svg>
    </div>
  );
};

export default NodeConnection;
