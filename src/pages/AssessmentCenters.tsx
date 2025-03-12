
import React, { useState, useEffect } from "react";
import { ClipboardCheck, Search, MapPin, Phone, Mail, Info, Clock, Layers, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { fetchAssessmentCenters, fetchAssessmentTypes, AssessmentCenter, AssessmentType } from "@/utils/assessmentCentersService";

const AssessmentCenters = () => {
  const { toast } = useToast();
  const [centers, setCenters] = useState<AssessmentCenter[]>([]);
  const [activeCenter, setActiveCenter] = useState<string | null>(null);
  const [assessments, setAssessments] = useState<AssessmentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssessmentCenters();
  }, []);

  const loadAssessmentCenters = async () => {
    try {
      setIsLoading(true);
      const result = await fetchAssessmentCenters();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setCenters(result.data);
    } catch (error) {
      console.error("Error loading assessment centers:", error);
      toast({
        title: "Error",
        description: "Failed to load assessment centers",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCenterAssessments = async (centerId: string) => {
    try {
      const result = await fetchAssessmentTypes(centerId);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setAssessments(result.data);
      setActiveCenter(centerId);
    } catch (error) {
      console.error("Error loading assessments:", error);
      toast({
        title: "Error",
        description: "Failed to load assessment types",
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
        <h1 className="text-3xl font-bold text-emirati-deepBlue mb-2">Assessment Centers Directory</h1>
        <p className="text-gray-600">
          Discover assessment centers that evaluate and certify skills across various domains.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-emirati-sandGold" />
                Assessment Centers
              </CardTitle>
              <CardDescription>
                Explore accredited assessment and certification centers
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
                  <p className="text-gray-500">Loading assessment centers...</p>
                </div>
              ) : filteredCenters.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No assessment centers found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCenters.map((center) => (
                    <div 
                      key={center.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        activeCenter === center.id ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => loadCenterAssessments(center.id)}
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
                  <ClipboardCheck className="mr-2 h-5 w-5 text-emirati-sandGold" />
                  Available Assessments
                </CardTitle>
                <CardDescription>
                  {centers.find(c => c.id === activeCenter)?.name || "Assessment Center"} offers the following assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No assessment types available for this center</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {assessments.map((assessment) => (
                      <div key={assessment.id} className="border rounded-md p-4">
                        <h3 className="text-lg font-medium mb-2">{assessment.name}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-3">
                          {assessment.duration && (
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Duration: {assessment.duration}</span>
                            </div>
                          )}
                          
                          {assessment.certification_level && (
                            <div className="flex items-center text-sm">
                              <Layers className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Level: {assessment.certification_level}</span>
                            </div>
                          )}
                          
                          {assessment.cost !== undefined && assessment.cost !== null && (
                            <div className="flex items-center text-sm">
                              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Cost: {assessment.cost} AED</span>
                            </div>
                          )}
                        </div>
                        
                        {assessment.skill_areas && assessment.skill_areas.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Skill Areas:</p>
                            <div className="flex flex-wrap gap-2">
                              {assessment.skill_areas.map((skill, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {assessment.description && (
                          <p className="text-sm text-gray-600 mt-3">{assessment.description}</p>
                        )}
                        
                        <div className="mt-4 flex justify-end">
                          <Button>
                            Schedule Assessment
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
                <ClipboardCheck className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">Select an Assessment Center</h3>
                <p className="mt-2 text-gray-500">
                  Choose an assessment center from the left to view available assessment types
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCenters;
