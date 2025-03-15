
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Lightbulb, Briefcase, BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { generateAIRecommendations, generateCareerTransitionRecommendations } from "@/utils/career/skill-gap/ai-recommendations";
import { Student } from "@/types/student";
import { Progress } from "@/components/ui/progress";

interface AiSkillRecommendationsProps {
  student: Student;
  targetJobTitle?: string;
  onViewTraining?: (programId: string) => void;
}

const AiSkillRecommendations: React.FC<AiSkillRecommendationsProps> = ({
  student,
  targetJobTitle,
  onViewTraining
}) => {
  const [activeTab, setActiveTab] = useState<string>("recommendations");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [transitionRecommendation, setTransitionRecommendation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    
    setTimeout(() => {
      const aiRecommendations = generateAIRecommendations(student, targetJobTitle);
      setRecommendations(aiRecommendations);
      
      if (student.careerPath) {
        const transition = generateCareerTransitionRecommendations(
          student, 
          "Tech Industry" // This would come from user selection in a real app
        );
        setTransitionRecommendation(transition);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [student, targetJobTitle]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
            AI Skill Recommendations
          </CardTitle>
          <CardDescription>Analyzing your profile and job market data...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-8 bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-24 bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-12 bg-slate-200 animate-pulse rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
          AI Skill Recommendations
        </CardTitle>
        <CardDescription>
          Personalized recommendations based on your profile and UAE job market trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-emirati-sandBeige/20">
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <Briefcase className="h-4 w-4 mr-2" /> Skill Recommendations
            </TabsTrigger>
            <TabsTrigger value="transition" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
              <ArrowRight className="h-4 w-4 mr-2" /> Career Transition
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-emirati-deepBlue">Learning Path {index + 1}</h3>
                    <Badge variant="outline" className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen">
                      {rec.recommendedSkills[0].demandLevel === 'high' ? 'High Demand' : 
                       rec.recommendedSkills[0].demandLevel === 'medium' ? 'Medium Demand' : 'Emerging'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{rec.recommendationReason}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recommended Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.recommendedSkills.map((skill: any, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-emirati-sandBeige/20">
                          {skill.skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recommended Programs:</h4>
                    <div className="space-y-2">
                      {rec.recommendedPrograms.map((program: any, i: number) => (
                        <div key={i} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                          <div>
                            <p className="text-sm font-medium">{program.title}</p>
                            <p className="text-xs text-muted-foreground">{program.provider} • {program.format}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onViewTraining && onViewTraining(program.id)}
                            className="text-emirati-oasisGreen hover:text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10"
                          >
                            <BookOpen className="h-4 w-4 mr-1" /> View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No Recommendations Available</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Complete your profile and skills assessment to get personalized recommendations.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="transition">
            {transitionRecommendation ? (
              <div className="space-y-4">
                <div className="flex items-center py-4">
                  <div className="w-1/3 text-center">
                    <div className="bg-emirati-sandBeige/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Briefcase className="h-8 w-8 text-emirati-desertGold" />
                    </div>
                    <p className="text-sm font-medium">{transitionRecommendation.currentPath}</p>
                    <p className="text-xs text-muted-foreground">Current Path</p>
                  </div>
                  
                  <div className="w-1/3 flex-1">
                    <div className="relative">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-emirati-desertGold/20 -translate-y-1/2"></div>
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-emirati-desertGold -translate-y-1/2" style={{width: `${Math.min(100, 15 + Math.random() * 30)}%`}}></div>
                      <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border border-emirati-desertGold/30">
                        <ArrowRight className="h-5 w-5 text-emirati-desertGold" />
                      </div>
                    </div>
                    <p className="text-center text-xs mt-6">
                      Estimated Time: <span className="font-medium">{transitionRecommendation.estimatedTimeMonths} months</span>
                    </p>
                  </div>
                  
                  <div className="w-1/3 text-center">
                    <div className="bg-emirati-oasisGreen/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Briefcase className="h-8 w-8 text-emirati-oasisGreen" />
                    </div>
                    <p className="text-sm font-medium">{transitionRecommendation.targetPath}</p>
                    <p className="text-xs text-muted-foreground">Target Path</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {transitionRecommendation.requiredSkills.map((skill: string, i: number) => (
                      <Badge key={i} variant="outline" className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">Recommended Training</h3>
                  <div className="space-y-2">
                    {transitionRecommendation.recommendedTraining.map((program: any, i: number) => (
                      <div key={i} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                        <div>
                          <p className="text-sm font-medium">{program.title}</p>
                          <p className="text-xs text-muted-foreground">{program.provider} • {program.format}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onViewTraining && onViewTraining(program.id)}
                          className="text-emirati-oasisGreen hover:text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10"
                        >
                          <BookOpen className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ArrowRight className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No Transition Data Available</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Complete your career profile to see transition recommendations.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-emirati-sandBeige/10 border-t">
        <p className="text-xs text-muted-foreground">
          Recommendations are based on UAE job market data and your profile. Update your skills regularly for better matches.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AiSkillRecommendations;
