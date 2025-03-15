import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FileText, 
  MapPin, 
  Bookmark,
  Palmtree,
  Bird,
  Landmark 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/student";
import { useCareerProgress } from "@/hooks/useCareerProgress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CulturalAchievementsGuideProps {
  student: Student;
}

const CulturalAchievementsGuide: React.FC<CulturalAchievementsGuideProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState<"achievements" | "guides" | "resources">("achievements");
  const { stamps } = useCareerProgress(student.id);

  const industryGuides = [
    {
      id: "tourism",
      title: "Tourism & Hospitality",
      description: "Dubai and Abu Dhabi are global tourism hubs, offering careers in hotel management, event planning, and cultural tourism.",
      icon: <MapPin className="h-5 w-5" />,
      level: "Early Career",
      resources: ["Hotel management certification", "Cultural tourism training", "Customer service excellence"],
      keySkills: ["Languages", "Cultural awareness", "Customer service", "Event management"]
    },
    {
      id: "energy",
      title: "Energy & Sustainability",
      description: "From traditional oil & gas to renewable energy initiatives like Masdar City, the energy sector offers diverse opportunities.",
      icon: <Palmtree className="h-5 w-5" />,
      level: "Mid Career",
      resources: ["Renewable energy courses", "Project management certification", "Sustainability analysis"],
      keySkills: ["Technical knowledge", "Project management", "Environmental awareness", "Data analysis"]
    },
    {
      id: "finance",
      title: "Finance & FinTech",
      description: "Financial centers in Dubai and Abu Dhabi offer roles in banking, investment, and emerging financial technologies.",
      icon: <Landmark className="h-5 w-5" />,
      level: "Advanced Career",
      resources: ["Financial analysis certification", "Islamic banking courses", "FinTech innovation"],
      keySkills: ["Financial analysis", "Regulatory knowledge", "Technology aptitude", "Risk management"]
    },
    {
      id: "ai",
      title: "AI & Technology",
      description: "The UAE's strategy for artificial intelligence creates opportunities in government, healthcare, and education sectors.",
      icon: <Bird className="h-5 w-5" />,
      level: "All Stages",
      resources: ["AI fundamentals course", "Data science specialization", "Technology ethics"],
      keySkills: ["Programming", "Data analysis", "Problem-solving", "Ethics"]
    }
  ];

  const educationalResources = [
    {
      id: "early-career",
      title: "Early Career Resources",
      description: "Foundation skills and guidance for students and recent graduates entering the workforce.",
      icon: <GraduationCap className="h-5 w-5" />,
      resources: [
        {
          title: "CV & Interview Preparation",
          type: "Workshop",
          duration: "3 hours",
          format: "Interactive online session"
        },
        {
          title: "Digital Skills Foundation",
          type: "Course",
          duration: "4 weeks",
          format: "Self-paced online"
        },
        {
          title: "UAE Workplace Culture",
          type: "Guide",
          duration: "1 hour",
          format: "Downloadable PDF"
        }
      ]
    },
    {
      id: "mid-career",
      title: "Mid-Career Development",
      description: "Advanced skills and leadership development for professionals looking to advance their careers.",
      icon: <Briefcase className="h-5 w-5" />,
      resources: [
        {
          title: "Leadership in Multicultural Teams",
          type: "Workshop",
          duration: "2 days",
          format: "In-person training"
        },
        {
          title: "Project Management Professional",
          type: "Certification",
          duration: "3 months",
          format: "Blended learning"
        },
        {
          title: "Industry Transition Guide",
          type: "Toolkit",
          duration: "Self-paced",
          format: "Interactive online resources"
        }
      ]
    },
    {
      id: "late-career",
      title: "Senior Career & Transition",
      description: "Strategic guidance for experienced professionals focusing on leadership, mentorship, and knowledge transfer.",
      icon: <Award className="h-5 w-5" />,
      resources: [
        {
          title: "Executive Leadership Program",
          type: "Program",
          duration: "6 months",
          format: "Cohort-based learning"
        },
        {
          title: "Mentorship Excellence",
          type: "Workshop",
          duration: "1 day",
          format: "In-person training"
        },
        {
          title: "Retirement Planning",
          type: "Consultation",
          duration: "Ongoing",
          format: "One-on-one sessions"
        }
      ]
    }
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <BookOpen className="h-6 w-6 mr-2" />
          UAE Career Development Resources
        </CardTitle>
        <CardDescription>
          Explore achievements, industry guides, and resources tailored to your career stage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" /> Cultural Achievements
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Industry Guides
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Educational Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <Alert className="bg-emirati-sandBeige/10 border-emirati-oasisGreen">
              <Award className="h-5 w-5 text-emirati-oasisGreen" />
              <AlertTitle>Cultural Achievement System</AlertTitle>
              <AlertDescription>
                Earn special badges that reflect UAE heritage and values by completing activities
                and demonstrating skills important to the UAE's cultural identity.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {[
                {
                  id: "bedouin-resilience",
                  title: "Bedouin Resilience",
                  description: "Display remarkable persistence by completing 10 challenges, embodying the resilience of Bedouin ancestors.",
                  icon: <Palmtree className="h-5 w-5" />,
                  progress: "2/10 challenges",
                  level: "Silver"
                },
                {
                  id: "falcon-vision",
                  title: "Falcon Vision",
                  description: "Demonstrate exceptional mentorship by guiding 5 peers, honoring the UAE's reverence for falcons.",
                  icon: <Bird className="h-5 w-5" />,
                  progress: "1/5 mentorships",
                  level: "Gold"
                },
                {
                  id: "majlis-wisdom",
                  title: "Majlis Wisdom",
                  description: "Share knowledge in discussion forums, continuing the tradition of the majlis as a place of community learning.",
                  icon: <Landmark className="h-5 w-5" />,
                  progress: "2/3 discussions",
                  level: "Bronze"
                },
                {
                  id: "pearl-diver",
                  title: "Pearl Diver",
                  description: "Discover valuable opportunities by completing assessment challenges, embodying the spirit of traditional pearl divers.",
                  icon: <MapPin className="h-5 w-5" />,
                  progress: "3/5 assessments",
                  level: "Silver"
                }
              ].map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden border-emirati-sandBeige hover:border-emirati-oasisGreen transition-colors">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center gap-4">
                    <div className="bg-emirati-sandBeige/20 p-2 rounded-full">
                      {achievement.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge variant="outline" className={
                        achievement.level === "Gold" ? "bg-yellow-50 text-yellow-800 border-yellow-300" :
                        achievement.level === "Silver" ? "bg-slate-50 text-slate-800 border-slate-300" :
                        "bg-amber-50 text-amber-800 border-amber-300"
                      }>
                        {achievement.level} Level
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="mt-3 text-xs font-medium">Progress: {achievement.progress}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <Alert className="bg-emirati-sandBeige/10 border-emirati-oasisGreen">
              <FileText className="h-5 w-5 text-emirati-oasisGreen" />
              <AlertTitle>UAE Industry Guides</AlertTitle>
              <AlertDescription>
                Explore comprehensive guides to key industries in the UAE economy, with insights into career paths,
                required skills, and growth opportunities.
              </AlertDescription>
            </Alert>

            <div className="space-y-4 mt-4">
              {industryGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden border-emirati-sandBeige hover:border-emirati-oasisGreen transition-colors">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-emirati-sandBeige/20 p-2 rounded-full">
                        {guide.icon}
                      </div>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen border-emirati-oasisGreen/30">
                      {guide.level}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Key Skills:</h4>
                      <div className="flex flex-wrap gap-1">
                        {guide.keySkills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="bg-muted">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-1">Recommended Resources:</h4>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {guide.resources.map((resource, i) => (
                          <li key={i}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button variant="outline" size="sm">
                      Explore Guide
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Alert className="bg-emirati-sandBeige/10 border-emirati-oasisGreen">
              <BookOpen className="h-5 w-5 text-emirati-oasisGreen" />
              <AlertTitle>Educational Resources by Career Stage</AlertTitle>
              <AlertDescription>
                Access tailored learning resources appropriate for your current career stage, from 
                foundational skills to executive leadership development.
              </AlertDescription>
            </Alert>

            <div className="space-y-6 mt-4">
              {educationalResources.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-emirati-oasisGreen/10 p-1.5 rounded-full">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-medium">{category.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  
                  <div className="grid gap-3 md:grid-cols-3">
                    {category.resources.map((resource, i) => (
                      <Card key={i} className="border-emirati-sandBeige">
                        <CardHeader className="p-3 pb-1">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{resource.title}</CardTitle>
                            <Badge variant="outline" className="bg-emirati-sandBeige/10 text-emirati-sandBeige">
                              {resource.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-1">
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <div className="text-muted-foreground">Format:</div>
                            <div>{resource.format}</div>
                            <div className="text-muted-foreground">Duration:</div>
                            <div>{resource.duration}</div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            <Bookmark className="h-3 w-3 mr-1" /> Save Resource
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CulturalAchievementsGuide;
