
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

          {/* Nodes by level */}
          <div className="grid grid-cols-4 gap-4 relative z-10">
            {Object.entries(nodesByLevel).map(([level, nodes]) => (
              <div key={level} className="space-y-4">
                {nodes.map(node => {
                  const isSelected = selectedNodes.includes(node.id);
                  const isSelectable = canSelectNode(node);
                  
                  return (
                    <motion.div
                      key={node.id}
                      whileHover={{ scale: 1.02 }}
                      className={`
                        relative rounded-lg border p-4 transition-all cursor-pointer
                        ${isSelected 
                          ? 'border-emirati-oasisGreen bg-emirati-oasisGreen/10' 
                          : isSelectable
                            ? 'border-emirati-sandBeige hover:border-emirati-oasisGreen/60' 
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        }
                      `}
                      onClick={()=>onNodeSelect(node.id)}
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium">{node.title}</h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {node.timeToAchieve}
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-muted-foreground" />
                            {node.salary.min.toLocaleString()} - {node.salary.max.toLocaleString()} {node.salary.currency}
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3 text-muted-foreground" />
                            {node.education[0]}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-muted-foreground" />
                            {node.certifications ? node.certifications[0] : 'No certification required'}
                          </div>
                        </div>
                      </div>

                      {/* Prerequisites indicator */}
                      {node.prerequisites && node.prerequisites.length > 0 && !isSelectable && (
                        <div className="absolute -top-2 right-2">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Prerequisites needed
                          </Badge>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayVisualization;
