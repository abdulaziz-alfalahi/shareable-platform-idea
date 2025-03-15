
import React, { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Calendar, 
  ExternalLink, 
  Download, 
  Play, 
  CheckCircle2,
  BookText,
  Globe,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/toast";

const EducationalResources = () => {
  const [activeTab, setActiveTab] = useState<string>("early-career");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleResourceAction = (action: string, resourceName: string) => {
    toast({
      title: `${action} ${resourceName}`,
      description: `You have successfully ${action.toLowerCase()}ed ${resourceName}`,
    });
  };

  // Educational resources for different career stages
  const careerStageResources = {
    "early-career": [
      {
        id: "cv-building",
        title: "CV Building for UAE Market",
        description: "Learn how to create a CV that stands out in the UAE job market, with cultural considerations and best practices.",
        type: "Workshop",
        format: "Video + Interactive",
        duration: "2 hours",
        level: "Beginner",
        tags: ["job search", "career development", "resume"],
        instructor: "Fatima Al Mansouri",
        icon: <BookText className="h-5 w-5" />
      },
      {
        id: "career-discovery",
        title: "Career Discovery Workshop",
        description: "Explore different career paths available in the UAE's growing economy and identify your strengths.",
        type: "Interactive Workshop",
        format: "Live Online Session",
        duration: "3 hours",
        level: "Beginner",
        tags: ["self-discovery", "career planning", "skills assessment"],
        instructor: "Ahmed Al Zaabi",
        icon: <Globe className="h-5 w-5" />
      },
      {
        id: "internship-guide",
        title: "UAE Internship Guide",
        description: "Comprehensive guide to finding, applying for, and succeeding in internships across the UAE's key industries.",
        type: "Guide",
        format: "PDF + Resources",
        duration: "Self-paced",
        level: "Beginner",
        tags: ["internship", "practical experience", "job application"],
        instructor: "Dubai Youth Council",
        icon: <GraduationCap className="h-5 w-5" />
      },
      {
        id: "digital-skills",
        title: "Essential Digital Skills",
        description: "Master the fundamental digital skills required for entry-level positions in the UAE job market.",
        type: "Course",
        format: "Online Self-paced",
        duration: "4 weeks",
        level: "Beginner",
        tags: ["digital literacy", "office software", "communication tools"],
        instructor: "UAE Digital Academy",
        icon: <Briefcase className="h-5 w-5" />
      }
    ],
    "mid-career": [
      {
        id: "leadership-multicultural",
        title: "Leadership in Multicultural Teams",
        description: "Develop skills to effectively lead diverse teams in the UAE's multicultural work environment.",
        type: "Course",
        format: "Blended Learning",
        duration: "6 weeks",
        level: "Intermediate",
        tags: ["leadership", "cultural intelligence", "team management"],
        instructor: "Dr. Sara Al Marzooqi",
        icon: <Briefcase className="h-5 w-5" />
      },
      {
        id: "industry-transition",
        title: "Industry Transition Masterclass",
        description: "Strategic approach to transitioning between industries in the UAE economy while leveraging existing skills.",
        type: "Masterclass",
        format: "Live Workshop",
        duration: "1 day",
        level: "Intermediate",
        tags: ["career transition", "skill transfer", "networking"],
        instructor: "Emirates Professional Development",
        icon: <Award className="h-5 w-5" />
      },
      {
        id: "emerging-tech",
        title: "Emerging Technologies in UAE",
        description: "Overview of emerging technologies being adopted across UAE industries and the skills needed to work with them.",
        type: "Webinar Series",
        format: "Video Recordings",
        duration: "5 sessions x 1 hour",
        level: "Intermediate",
        tags: ["technology", "AI", "blockchain", "future skills"],
        instructor: "Tech Innovation UAE",
        icon: <BookOpen className="h-5 w-5" />
      }
    ],
    "late-career": [
      {
        id: "executive-leadership",
        title: "Executive Leadership Program",
        description: "Advanced leadership development for senior professionals, focusing on strategic thinking and organizational transformation.",
        type: "Program",
        format: "In-person + Coaching",
        duration: "3 months",
        level: "Advanced",
        tags: ["executive skills", "strategic leadership", "organizational change"],
        instructor: "UAE Leadership Institute",
        icon: <Award className="h-5 w-5" />
      },
      {
        id: "mentorship-excellence",
        title: "Mentorship Excellence",
        description: "Develop skills to effectively mentor the next generation of UAE professionals and leaders.",
        type: "Workshop",
        format: "Interactive Sessions",
        duration: "2 days",
        level: "Advanced",
        tags: ["mentoring", "knowledge transfer", "leadership development"],
        instructor: "Dr. Khalid Al Hashimi",
        icon: <GraduationCap className="h-5 w-5" />
      },
      {
        id: "retirement-planning",
        title: "Comprehensive Retirement Planning",
        description: "Financial, social, and wellness planning for UAE professionals approaching retirement.",
        type: "Course",
        format: "Online + Consultations",
        duration: "8 weeks",
        level: "Advanced",
        tags: ["retirement", "financial planning", "life transition"],
        instructor: "UAE Retirement Council",
        icon: <BookText className="h-5 w-5" />
      }
    ],
    "specialized": [
      {
        id: "uae-cultural-intelligence",
        title: "UAE Cultural Intelligence",
        description: "Develop a deep understanding of UAE business culture, customs, and communication styles.",
        type: "Course",
        format: "Online + Field Trips",
        duration: "4 weeks",
        level: "All Levels",
        tags: ["cultural awareness", "business etiquette", "communication"],
        instructor: "Emirates Cultural Foundation",
        icon: <Globe className="h-5 w-5" />
      },
      {
        id: "entrepreneurship-uae",
        title: "Entrepreneurship in the UAE",
        description: "Guide to starting and growing a business in the UAE, including legal requirements and funding opportunities.",
        type: "Program",
        format: "Workshop Series",
        duration: "10 weeks",
        level: "All Levels",
        tags: ["entrepreneurship", "business development", "startup"],
        instructor: "Dubai Entrepreneurship Academy",
        icon: <Briefcase className="h-5 w-5" />
      }
    ]
  };

  // Filter resources based on search query
  const filteredResources = careerStageResources[activeTab as keyof typeof careerStageResources]?.filter(
    resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-3">Educational Resources</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access specialized learning resources tailored to your career stage in the UAE, from early career
            foundations to advanced leadership development.
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Showing:</span>
            <Badge variant="outline" className="bg-primary/5">
              {filteredResources.length} resources
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="early-career" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="early-career" className="flex items-center gap-2 text-xs md:text-sm">
              <GraduationCap className="h-4 w-4" /> Early Career
            </TabsTrigger>
            <TabsTrigger value="mid-career" className="flex items-center gap-2 text-xs md:text-sm">
              <Briefcase className="h-4 w-4" /> Mid Career
            </TabsTrigger>
            <TabsTrigger value="late-career" className="flex items-center gap-2 text-xs md:text-sm">
              <Award className="h-4 w-4" /> Late Career
            </TabsTrigger>
            <TabsTrigger value="specialized" className="flex items-center gap-2 text-xs md:text-sm">
              <BookOpen className="h-4 w-4" /> Specialized
            </TabsTrigger>
          </TabsList>

          {Object.keys(careerStageResources).map((stageKey) => (
            <TabsContent key={stageKey} value={stageKey} className="space-y-6">
              {searchQuery && filteredResources.length === 0 ? (
                <div className="text-center py-10">
                  <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No resources found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try adjusting your search query
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 bg-emirati-oasisGreen/10 p-1.5 rounded-full">
                              {resource.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <CardDescription className="line-clamp-2 mt-1">
                                {resource.description}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4 pt-2">
                        <div className="flex flex-wrap gap-1 mb-3">
                          <Badge className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen border-none">
                            {resource.type}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/5">
                            {resource.level}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-1 text-sm mb-3">
                          <div className="text-muted-foreground">Format:</div>
                          <div>{resource.format}</div>
                          <div className="text-muted-foreground">Duration:</div>
                          <div>{resource.duration}</div>
                          <div className="text-muted-foreground">Instructor:</div>
                          <div>{resource.instructor}</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resource.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-muted text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1" 
                          onClick={() => handleResourceAction("Access", resource.title)}
                        >
                          <Play className="h-3 w-3 mr-1" /> Start Learning
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1" 
                          onClick={() => handleResourceAction("Save", resource.title)}
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Save for Later
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default EducationalResources;
