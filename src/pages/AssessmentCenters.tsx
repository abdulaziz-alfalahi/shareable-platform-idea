
import React, { useState, useEffect } from "react";
import { Target, Map, User, Search, Phone, Mail, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";

// Mock data - would be replaced with API calls to backend
const mockAssessmentCenters = [
  {
    id: '1',
    name: 'Emirates Skills Assessment Center',
    location: 'Abu Dhabi',
    contact_email: 'contact@emiratesskills.ae',
    contact_phone: '+971-2-123-4567',
    description: 'The leading assessment center focusing on technical and vocational skills development.',
    assessments: [
      {
        id: '101',
        name: 'Engineering Aptitude Assessment',
        description: 'Comprehensive assessment of engineering skills and aptitude.',
        duration: '3 hours',
        skill_areas: ['Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
        certification_level: 'Professional',
        cost: 850
      },
      {
        id: '102',
        name: 'Digital Skills Assessment',
        description: 'Evaluation of digital literacy and technical skills.',
        duration: '2 hours',
        skill_areas: ['Programming', 'Data Analysis', 'Digital Marketing'],
        certification_level: 'Intermediate',
        cost: 650
      }
    ]
  },
  {
    id: '2',
    name: 'Career Readiness Center',
    location: 'Dubai',
    contact_email: 'info@career-readiness.ae',
    contact_phone: '+971-4-765-4321',
    description: 'Specialized in career readiness assessments and professional development evaluations.',
    assessments: [
      {
        id: '201',
        name: 'Leadership Assessment',
        description: 'Comprehensive assessment of leadership capabilities and potential.',
        duration: '4 hours',
        skill_areas: ['Team Leadership', 'Strategic Thinking', 'Change Management'],
        certification_level: 'Executive',
        cost: 1200
      },
      {
        id: '202',
        name: 'Business Communication Assessment',
        description: 'Evaluation of business communication skills.',
        duration: '2 hours',
        skill_areas: ['Written Communication', 'Presentation Skills', 'Negotiation'],
        certification_level: 'Professional',
        cost: 750
      }
    ]
  }
];

const AssessmentCenters = () => {
  const { toast } = useToast();
  const [centers, setCenters] = useState([]);
  const [activeCenter, setActiveCenter] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to load centers
    const loadCenters = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setCenters(mockAssessmentCenters);
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
    
    loadCenters();
  }, [toast]);

  const loadCenterAssessments = (centerId) => {
    const center = centers.find(c => c.id === centerId);
    if (center) {
      setAssessments(center.assessments || []);
      setActiveCenter(center);
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
          Explore assessment centers and their available assessment types to evaluate your skills and qualifications.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
                Assessment Centers
              </CardTitle>
              <CardDescription>
                Browse accredited assessment centers
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
                        activeCenter && activeCenter.id === center.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => loadCenterAssessments(center.id)}
                    >
                      <h3 className="font-medium text-base">{center.name}</h3>
                      {center.location && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Map className="h-3.5 w-3.5 mr-1" />
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
                  <Target className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
                  Available Assessments
                </CardTitle>
                <CardDescription>
                  {activeCenter.name} offers the following assessment types
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No assessments available for this center</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {assessments.map((assessment) => (
                      <div key={assessment.id} className="border rounded-md p-4">
                        <h3 className="text-lg font-medium mb-2">{assessment.name}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-3">
                          {assessment.duration && (
                            <div className="flex items-center text-sm">
                              <Info className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Duration: {assessment.duration}</span>
                            </div>
                          )}
                          
                          {assessment.certification_level && (
                            <div className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Level: {assessment.certification_level}</span>
                            </div>
                          )}
                          
                          {assessment.cost !== undefined && (
                            <div className="flex items-center text-sm">
                              <Info className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Cost: {assessment.cost} AED</span>
                            </div>
                          )}
                        </div>
                        
                        {assessment.skill_areas && assessment.skill_areas.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-500">Skill Areas:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {assessment.skill_areas.map((skill, index) => (
                                <span key={index} className="bg-emirati-sandBeige/10 text-xs rounded-full px-3 py-1">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {assessment.description && (
                          <p className="text-sm text-gray-600 mt-2">{assessment.description}</p>
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
                <Target className="mx-auto h-12 w-12 text-gray-300" />
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
