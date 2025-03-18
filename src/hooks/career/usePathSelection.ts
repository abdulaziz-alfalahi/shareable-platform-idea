
import { useState } from 'react';
import { CareerPath, getCareerPathById } from '@/utils/career/pathway';

export const usePathSelection = (toast: any) => {
  const [selectedPathId, setSelectedPathId] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const handlePathChange = async (pathId: string) => {
    setSelectedPathId(pathId);
    
    try {
      const path = await getCareerPathById(pathId);
      setSelectedPath(path);
      
      return path;
    } catch (error) {
      console.error('Error fetching career path details:', error);
      toast({
        title: "Failed to load path details",
        description: "Please select another path or try again later",
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    selectedPathId,
    selectedPath,
    handlePathChange
  };
};
