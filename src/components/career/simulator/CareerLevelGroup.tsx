
import React from 'react';
import { motion } from 'framer-motion';
import { CareerNode } from '@/utils/career/pathwayTypes';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, GraduationCap, BookOpen } from 'lucide-react';

interface CareerLevelGroupProps {
  level: 'entry' | 'mid' | 'senior' | 'expert';
  nodes: CareerNode[];
  selectedNodes: string[];
  onNodeSelect: (nodeId: string) => void;
  canSelectNode: (node: CareerNode) => boolean;
}

const CareerLevelGroup: React.FC<CareerLevelGroupProps> = ({
  level,
  nodes,
  selectedNodes,
  onNodeSelect,
  canSelectNode
}) => {
  return (
    <div className="space-y-4">
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
            onClick={() => onNodeSelect(node.id)}
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
  );
};

export default CareerLevelGroup;
