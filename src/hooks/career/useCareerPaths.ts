
import { useState, useEffect } from 'react';
import { CareerPath, getCareerPaths } from '@/utils/career/pathway';

export const useCareerPaths = (toast: any) => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        setIsLoading(true);
        const paths = await getCareerPaths();
        setCareerPaths(paths);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching career paths:', error);
        toast({
          title: "Failed to load career paths",
          description: "Please try again later",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchPaths();
  }, [toast]);

  return { careerPaths, isLoading };
};
