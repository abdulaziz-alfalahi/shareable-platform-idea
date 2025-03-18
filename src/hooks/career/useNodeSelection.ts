
import { useState } from 'react';
import { CareerPath } from '@/utils/career/pathway';

export const useNodeSelection = () => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const resetNodeSelection = (path: CareerPath | null) => {
    setSelectedNodes([]);
    
    if (path) {
      const entryNode = path.nodes.find(node => node.level === 'entry');
      if (entryNode) {
        setSelectedNodes([entryNode.id]);
      }
    }
  };

  const handleNodeToggle = (nodeId: string, selectedPath: CareerPath | null) => {
    if (!selectedPath) return;
    
    const node = selectedPath.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    if (selectedNodes.includes(nodeId)) {
      const dependentNodes = selectedPath.nodes
        .filter(n => n.prerequisites?.includes(nodeId))
        .map(n => n.id) || [];
      
      setSelectedNodes(prev => 
        prev.filter(id => id !== nodeId && !dependentNodes.includes(id))
      );
    } else {
      const nodesToAdd: string[] = [nodeId];
      
      const addPrerequisites = (id: string) => {
        const node = selectedPath.nodes.find(n => n.id === id);
        if (node?.prerequisites && node.prerequisites.length > 0) {
          node.prerequisites.forEach(prereq => {
            if (!nodesToAdd.includes(prereq) && !selectedNodes.includes(prereq)) {
              nodesToAdd.push(prereq);
              addPrerequisites(prereq);
            }
          });
        }
      };
      
      addPrerequisites(nodeId);
      
      setSelectedNodes(prev => [...prev, ...nodesToAdd.filter(id => !prev.includes(id))]);
    }
  };

  const canSelectNode = (node: any, selectedNodes: string[]): boolean => {
    if (!node.prerequisites || node.prerequisites.length === 0) return true;
    return node.prerequisites.every(prereq => selectedNodes.includes(prereq));
  };

  return {
    selectedNodes,
    resetNodeSelection,
    handleNodeToggle,
    canSelectNode
  };
};
