
import React from 'react';
import { motion } from 'framer-motion';
import { CareerPath, CareerNode } from '@/utils/career/pathwayTypes';
import { 
  Award, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  MapPin, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import NodeConnection from './NodeConnection';
import CareerLevelGroup from './CareerLevelGroup';

interface PathwayVisualizationProps {
  path: CareerPath;
  selectedNodes: string[];
  onNodeSelect: (nodeId: string) => void;
  canSelectNode: (node: CareerNode) => boolean;
}

const PathwayVisualization: React.FC<PathwayVisualizationProps> = ({
  path,
  selectedNodes,
  onNodeSelect,
  canSelectNode
}) => {
  // Group nodes by level
  const nodesByLevel = {
    entry: path.nodes.filter(node => node.level === 'entry'),
    mid: path.nodes.filter(node => node.level === 'mid'),
    senior: path.nodes.filter(node => node.level === 'senior'),
    expert: path.nodes.filter(node => node.level === 'expert')
  };

  const levelColors = {
    entry: 'bg-blue-100 border-blue-300 text-blue-700',
    mid: 'bg-green-100 border-green-300 text-green-700',
    senior: 'bg-purple-100 border-purple-300 text-purple-700',
    expert: 'bg-amber-100 border-amber-300 text-amber-700'
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        {/* Header with level labels */}
        <div className="grid grid-cols-4 mb-4">
          {Object.entries(nodesByLevel).map(([level, nodes]) => (
            <div key={level} className="text-center">
              <Badge variant="outline" className={`${levelColors[level as keyof typeof levelColors]} px-3 py-1`}>
                {level.charAt(0).toUpperCase() + level.slice(1)} Level
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">
                {nodes.length} position{nodes.length !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>

        {/* Visualization */}
        <div className="relative flex flex-col space-y-6">
          {/* Connect lines */}
          <NodeConnection path={path} selectedNodes={selectedNodes} />

          {/* Nodes by level */}
          <div className="grid grid-cols-4 gap-4 relative z-10">
            {Object.entries(nodesByLevel).map(([level, nodes]) => (
              <CareerLevelGroup 
                key={level}
                level={level as 'entry' | 'mid' | 'senior' | 'expert'}
                nodes={nodes}
                selectedNodes={selectedNodes}
                onNodeSelect={onNodeSelect}
                canSelectNode={canSelectNode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayVisualization;
