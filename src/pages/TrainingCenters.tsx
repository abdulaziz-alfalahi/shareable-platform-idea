
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { 
  fetchTrainingCenters, 
  fetchProgramsByCenter
} from "@/utils/trainingCentersService";
import TrainingCenterList from "@/components/training/TrainingCenterList";
import ProgramsList from "@/components/training/ProgramsList";

const TrainingCenters = () => {
  const { toast } = useToast();
  const [centers, setCenters] = useState([]);
  const [activeCenter, setActiveCenter] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrainingCenters();
  }, []);

  const loadTrainingCenters = async () => {
    try {
      setIsLoading(true);
      const result = await fetchTrainingCenters();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setCenters(result.data);
    } catch (error) {
      console.error("Error loading training centers:", error);
      toast({
        title: "Error",
        description: "Failed to load training centers",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCenterPrograms = async (centerId) => {
    try {
      const result = await fetchProgramsByCenter(centerId);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setPrograms(result.data);
      setActiveCenter(centerId);
    } catch (error) {
      console.error("Error loading programs:", error);
      toast({
        title: "Error",
        description: "Failed to load training programs",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emirati-deepBlue mb-2">Training Centers Directory</h1>
        <p className="text-gray-600">
          Explore available training centers and programs to enhance your skills and qualifications.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <TrainingCenterList 
            centers={centers}
            isLoading={isLoading}
            searchTerm={searchTerm}
            activeCenter={activeCenter}
            onSearchChange={setSearchTerm}
            onCenterSelect={loadCenterPrograms}
          />
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/data-entry'}
          >
            Go to Data Entry
          </Button>
        </div>
        
        <div className="md:w-2/3">
          <ProgramsList 
            programs={programs}
            activeCenter={activeCenter}
            centers={centers}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingCenters;
