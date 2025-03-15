import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building, 
  Users,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Share2
} from "lucide-react";
import { vacanciesData } from "@/components/jobs/mockData";
import { students } from "@/data/mockData";
import { Vacancy } from "@/components/jobs/MatchingVacanciesTab";
import { Student } from "@/types/student";
import SkillMatchVisualization from "@/components/jobs/SkillMatchVisualization";
import { getJobMatchDetails } from "@/utils/career/recommendations";
import AiSkillRecommendations from "@/components/jobs/AiSkillRecommendations";
import CulturalFitAssessment from "@/components/jobs/CulturalFitAssessment";
import { notifySuccess } from "@/utils/notification";

const enrichVacancy = (vacancy: any): Vacancy => {
  return {
    ...vacancy,
    matchedSkills: vacancy.matchedSkills || vacancy.requiredSkills.slice(0, Math.ceil(vacancy.requiredSkills.length * (vacancy.matchPercentage / 100))),
    missingSkills: vacancy.missingSkills || vacancy.requiredSkills.slice(Math.ceil(vacancy.requiredSkills.length * (vacancy.matchPercentage / 100))),
    culturalFit: vacancy.culturalFit || Math.round(65 + Math.random() * 25),
    careerPathAlignment: vacancy.careerPathAlignment || Math.round(60 + Math.random() * 30)
  };
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [student, setStudent] = useState<Student>(students[0]); // First student for demo
  const [activeTab, setActiveTab] = useState("overview");
  const [hasApplied, setHasApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundVacancy = vacanciesData.find(v => v.id === id);
      if (foundVacancy) {
        setVacancy(enrichVacancy(foundVacancy));
        
        // Check if user has already applied (demo purposes)
        const randomApplied = Math.random() > 0.7;
        setHasApplied(randomApplied);
      }
    }
  }, [id]);

  const handleApply = () => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setHasApplied(true);
      notifySuccess({
        title: "Application Submitted",
        description: `Your application for ${vacancy?.title} at ${vacancy?.company} has been submitted.`,
      });
    }, 1500);
  };

  const companyValues = [
    "Innovation", "Teamwork", "Excellence", "Integrity", "Customer Focus"
  ];

  if (!vacancy) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/jobs')}
            className="mr-4"
          >
            <ChevronLeft size={16} className="mr-1" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-emirati-oasisGreen">Job Not Found</h1>
        </div>
        <p>The job listing you're looking for could not be found.</p>
      </div>
    );
  }

  // Get match details for this specific job
  const matchDetails = getJobMatchDetails(student, vacancy);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/job-applications')}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">{vacancy.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">{vacancy.company}</CardTitle>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" /> {vacancy.location}
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-emirati-sandBeige/20">
                  {vacancy.salary}
                </Badge>
                <Badge className="bg-emirati-oasisGreen text-white">
                  {matchDetails.matchPercentage}% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 bg-emirati-sandBeige/20">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="match-details" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
                    Match Details
                  </TabsTrigger>
                  <TabsTrigger value="company" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
                    Company
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Job Description</h3>
                    <p className="text-sm text-muted-foreground">
                      This is an exciting opportunity to join {vacancy.company} as a {vacancy.title}. 
                      In this role, you will be responsible for various tasks and projects in a dynamic environment.
                      You will collaborate with other team members to achieve company goals and drive innovation.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Posted Date</h3>
                      <p className="text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        {vacancy.postedDate}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Salary Range</h3>
                      <p className="text-sm flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                        {vacancy.salary}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Location</h3>
                      <p className="text-sm flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {vacancy.location}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Company</h3>
                      <p className="text-sm flex items-center">
                        <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                        {vacancy.company}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {vacancy.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" 
                          className={matchDetails.matchedSkills.includes(skill) ? 
                            "bg-green-50 text-green-700 border-green-200" : 
                            "bg-slate-50 text-slate-700 border-slate-200"
                          }
                        >
                          {matchDetails.matchedSkills.includes(skill) && (
                            <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                          )}
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Button 
                      disabled={hasApplied || isSubmitting}
                      onClick={handleApply}
                      className="flex-1 bg-emirati-oasisGreen text-white hover:bg-emirati-oasisGreen/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : hasApplied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        <>
                          <Briefcase className="h-4 w-4 mr-2" />
                          Apply Now
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="match-details" className="space-y-4">
                  <SkillMatchVisualization 
                    matchPercentage={matchDetails.matchPercentage}
                    matchedSkills={matchDetails.matchedSkills}
                    missingSkills={matchDetails.missingSkills}
                    careerPathAlignment={matchDetails.careerPathAlignment}
                    culturalFit={matchDetails.culturalFit}
                  />
                </TabsContent>
                
                <TabsContent value="company" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">About {vacancy.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      {vacancy.company} is a leading organization in the industry, known for innovation and excellence.
                      The company has a strong presence in the UAE market and offers excellent opportunities for career growth.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Company Size</h3>
                    <p className="text-sm flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      500-1000 employees
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Company Values</h3>
                    <div className="flex flex-wrap gap-2">
                      {companyValues.map((value, index) => (
                        <Badge key={index} variant="outline" className="bg-emirati-sandBeige/10">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Work Environment</h3>
                    <p className="text-sm text-muted-foreground">
                      The company offers a hybrid work environment with 2-3 days in the office per week.
                      The office is located in a modern building with state-of-the-art facilities.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
                Quick Application
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  Your profile is <span className="font-medium">{matchDetails.matchPercentage}%</span> matched to this job.
                </p>
                
                {matchDetails.missingSkills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {matchDetails.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <XCircle className="h-3 w-3 mr-1 text-red-500" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button
                  disabled={hasApplied || isSubmitting}
                  onClick={handleApply}
                  className="w-full bg-emirati-oasisGreen text-white hover:bg-emirati-oasisGreen/90"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : hasApplied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Applied
                    </>
                  ) : (
                    <>
                      <Briefcase className="h-4 w-4 mr-2" />
                      Apply with Profile
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-muted-foreground">
                  Your profile will be shared with {vacancy.company} as part of your application.
                </div>
              </div>
            </CardContent>
          </Card>
          
          <CulturalFitAssessment 
            student={student}
            employer={{
              name: vacancy.company,
              industry: "Technology", // This would come from real data
              values: companyValues,
              workStyle: "hybrid" // This would come from real data
            }}
          />
          
          <AiSkillRecommendations 
            student={student}
            targetJobTitle={vacancy.title}
            onViewTraining={(programId) => {
              // Navigate to training program details
              console.log("View training program:", programId);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

