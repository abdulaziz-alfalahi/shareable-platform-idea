import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Student } from "@/types/student";
import { 
  BarChart, 
  TrendingUp, 
  BookOpen, 
  Search,
  ChevronRight,
  Calendar,
  Clock,
  GraduationCap,
  Globe,
  Users,
  MapPin,
  LayoutGrid
} from "lucide-react";
import { 
  analyzeSkillGaps, 
  getTopSkillRecommendations,
  searchTrainingPrograms,
  enrollInTraining,
  SkillGap,
  TrainingRecommendation
} from "@/utils/career/skillGapAnalysis";
import { Input } from "@/components/ui/input";

interface SkillGapAnalysisProps {
  student: Student;
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ student }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("recommendations");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  
  // Get skill gaps and recommendations
  const skillGaps = analyzeSkillGaps(student);
  const topRecommendations = getTopSkillRecommendations(student);
  
  // Get search results
  const searchResults = searchTerm.length > 2 
    ? searchTrainingPrograms(searchTerm)
    : [];
  
  // Handle enrollment in a training program
  const handleEnroll = async (trainingId: string, trainingTitle: string) => {
    setIsEnrolling(true);
    setEnrollingId(trainingId);
    
    try {
      await enrollInTraining(student.id, trainingId, trainingTitle);
    } finally {
      setIsEnrolling(false);
      setEnrollingId(null);
    }
  };
  
  // Get demand level badge color
  const getDemandLevelColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return "bg-red-100 text-red-800";
      case 'medium': return "bg-orange-100 text-orange-800";
      case 'low': return "bg-blue-100 text-blue-800";
    }
  };
  
  // Get format icon
  const getFormatIcon = (format: 'online' | 'in-person' | 'hybrid'): React.ReactNode => {
    switch (format) {
      case 'online': return <Globe className="h-4 w-4" />;
      case 'in-person': return <Users className="h-4 w-4" />;
      case 'hybrid': return <LayoutGrid className="h-4 w-4" />;
    }
  };
  
  // Render a training card
  const renderTrainingCard = (training: TrainingRecommendation) => (
    <div 
      key={training.id} 
      className="border rounded-lg p-4 hover:border-primary/40 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{training.title}</h4>
          <p className="text-sm text-muted-foreground">{training.provider}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="text-xs flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {training.duration}
            </div>
            <div className="text-xs flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" />
              {training.level.charAt(0).toUpperCase() + training.level.slice(1)}
            </div>
            <div className="text-xs flex items-center gap-1">
              {format === 'online' ? <Globe className="h-3.5 w-3.5" /> : 
               format === 'in-person' ? <MapPin className="h-3.5 w-3.5" /> : 
               <LayoutGrid className="h-3.5 w-3.5" />}
              {training.format.charAt(0).toUpperCase() + training.format.slice(1)}
            </div>
          </div>
        </div>
        
        <Button 
          size="sm" 
          className="whitespace-nowrap"
          onClick={() => handleEnroll(training.id, training.title)}
          disabled={isEnrolling}
        >
          {isEnrolling && enrollingId === training.id ? "Enrolling..." : "Enroll"}
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <BarChart className="h-6 w-6 mr-2" />
          Skill Gap Analysis
        </CardTitle>
        <CardDescription>
          Discover in-demand skills to increase your employability in the UAE job market
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="recommendations">
              <TrendingUp className="h-4 w-4 mr-2" />
              Top Recommendations
            </TabsTrigger>
            <TabsTrigger value="all-gaps">
              <BarChart className="h-4 w-4 mr-2" />
              All Skill Gaps
            </TabsTrigger>
            <TabsTrigger value="training">
              <BookOpen className="h-4 w-4 mr-2" />
              Training Programs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            {topRecommendations.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Based on your profile and UAE job market trends, here are your top skill recommendations:
                </p>
                
                {topRecommendations.map((gap) => (
                  <div key={gap.skill} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium capitalize">{gap.skill}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getDemandLevelColor(gap.demandLevel)}`}>
                            {gap.demandLevel} demand
                          </span>
                        </div>
                        
                        <div className="mt-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span>Relevance to Your Profile</span>
                            <span>{gap.relevanceScore}%</span>
                          </div>
                          <Progress value={gap.relevanceScore} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    {gap.suggestedTraining.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">Recommended Training:</h4>
                        <div className="space-y-2">
                          {gap.suggestedTraining.slice(0, 2).map(training => renderTrainingCard(training))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => setActiveTab("all-gaps")}>
                    View All Skill Gaps
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No Skill Gaps Found</h3>
                <p className="text-muted-foreground">
                  Your profile already matches well with current job market demands.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all-gaps" className="space-y-4">
            {skillGaps.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Here are all identified skill gaps based on the current UAE job market:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillGaps.map((gap) => (
                    <div key={gap.skill} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium capitalize">{gap.skill}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getDemandLevelColor(gap.demandLevel)}`}>
                          {gap.demandLevel}
                        </span>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Relevance</span>
                          <span>{gap.relevanceScore}%</span>
                        </div>
                        <Progress value={gap.relevanceScore} className="h-1.5 mt-1" />
                      </div>
                      
                      {gap.suggestedTraining.length > 0 ? (
                        <Button 
                          variant="link" 
                          className="p-0 h-auto mt-2 text-xs"
                          onClick={() => {
                            setSearchTerm(gap.skill);
                            setActiveTab("training");
                          }}
                        >
                          View {gap.suggestedTraining.length} training options
                        </Button>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-2">No specific training available</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <BarChart className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No Skill Gaps Found</h3>
                <p className="text-muted-foreground">
                  Your profile already matches well with current job market demands.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="training" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for training programs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {searchTerm.length > 2 ? (
              searchResults.length > 0 ? (
                <div className="space-y-3 mt-4">
                  {searchResults.map(training => renderTrainingCard(training))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Results Found</h3>
                  <p className="text-muted-foreground">
                    Try different keywords or browse all training programs.
                  </p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">Search for Training Programs</h3>
                <p className="text-muted-foreground">
                  Enter a skill or keyword to find relevant training programs.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalysis;
