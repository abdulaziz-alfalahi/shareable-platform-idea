
import React, { useState, useEffect } from "react";
import { Building, GraduationCap, Search, MapPin, Phone, Mail, Info, Calendar, Users, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { fetchTrainingCenters, fetchTrainingPrograms, TrainingCenter, TrainingProgram } from "@/utils/trainingCentersService";

const TrainingCenters = () => {
  const { toast } = useToast();
  const [centers, setCenters] = useState<TrainingCenter[]>([]);
  const [activeCenter, setActiveCenter] = useState<string | null>(null);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
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

  const loadCenterPrograms = async (centerId: string) => {
    try {
      const result = await fetchTrainingPrograms(centerId);
      
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

  const filteredCenters = centers.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (center.location && center.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
                Training Centers
              </CardTitle>
              <CardDescription>
                Browse accredited training centers
              </CardDescription>
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search centers..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading training centers...</p>
                </div>
              ) : filteredCenters.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No training centers found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCenters.map((center) => (
                    <div 
                      key={center.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        activeCenter === center.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => loadCenterPrograms(center.id)}
                    >
                      <h3 className="font-medium text-base">{center.name}</h3>
                      {center.location && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {center.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/data-entry'}
          >
            Go to Data Entry
          </Button>
        </div>
        
        <div className="md:w-2/3">
          {activeCenter ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
                  Available Programs
                </CardTitle>
                <CardDescription>
                  {centers.find(c => c.id === activeCenter)?.name || "Training Center"} offers the following programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {programs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No programs available for this center</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {programs.map((program) => (
                      <div key={program.id} className="border rounded-md p-4">
                        <h3 className="text-lg font-medium mb-2">{program.name}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-3">
                          {program.duration && (
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Duration: {program.duration}</span>
                            </div>
                          )}
                          
                          {program.skill_level && (
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Level: {program.skill_level}</span>
                            </div>
                          )}
                          
                          {program.cost !== undefined && program.cost !== null && (
                            <div className="flex items-center text-sm">
                              <Info className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Cost: {program.cost} AED</span>
                            </div>
                          )}
                          
                          {program.certification_offered && (
                            <div className="flex items-center text-sm">
                              <Award className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Certification Available</span>
                            </div>
                          )}
                        </div>
                        
                        {program.description && (
                          <p className="text-sm text-gray-600 mt-2">{program.description}</p>
                        )}
                        
                        <div className="mt-4 flex justify-end">
                          <Button>
                            Apply for Program
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-10 text-center">
                <Building className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">Select a Training Center</h3>
                <p className="mt-2 text-gray-500">
                  Choose a training center from the left to view available programs
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingCenters;
