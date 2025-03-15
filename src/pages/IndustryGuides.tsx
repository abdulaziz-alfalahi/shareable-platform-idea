import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  BookOpen, 
  Globe, 
  Building, 
  Layers, 
  Palmtree, 
  Landmark, 
  Plane, 
  Briefcase,
  MapPin,
  FileText,
  Download,
  Share2,
  Bookmark,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/toast";

const IndustryGuides = () => {
  const [activeTab, setActiveTab] = useState<string>("tourism");
  const { toast } = useToast();

  const handleGuideAction = (action: string, guideName: string) => {
    toast({
      title: `${action} ${guideName}`,
      description: `You have successfully ${action.toLowerCase()}d the guide`,
    });
  };

  // Industry guides data
  const industryGuides = {
    "tourism": {
      title: "Tourism & Hospitality",
      description: "The UAE is a global tourism destination, with Dubai and Abu Dhabi ranking among the world's most visited cities. The hospitality sector is a cornerstone of the economy, offering diverse career paths.",
      icon: <Plane className="h-6 w-6" />,
      coverImage: "https://images.unsplash.com/photo-1546412414-8035e1776c9a?q=80&w=1600&auto=format&fit=crop",
      keyStats: [
        { label: "Contribution to GDP", value: "12%" },
        { label: "Annual Growth", value: "5.1%" },
        { label: "Employment", value: "330,000+" },
      ],
      careerPaths: [
        { title: "Hotel Management", level: "Entry to Executive", demand: "High" },
        { title: "Event Management", level: "Mid-Level", demand: "High" },
        { title: "Tourism Development", level: "Mid to Senior", demand: "Medium" },
        { title: "Customer Experience", level: "Entry to Mid", demand: "High" },
      ],
      skillsRequired: [
        { name: "Customer Service", importance: 90 },
        { name: "Cultural Awareness", importance: 85 },
        { name: "Languages (English, Arabic)", importance: 80 },
        { name: "Digital Marketing", importance: 70 },
        { name: "Revenue Management", importance: 65 },
      ],
      educationPaths: [
        { name: "Hospitality Management Degree", level: "Bachelor's", duration: "4 years" },
        { name: "Tourism Administration", level: "Diploma", duration: "2 years" },
        { name: "Event Management Certification", level: "Certificate", duration: "6 months" },
      ],
      keyChallenges: [
        "Seasonality of tourism demand",
        "Keeping pace with digital transformation",
        "Maintaining service standards during rapid growth",
        "Emiratization in customer-facing roles"
      ],
      sections: [
        { title: "Industry Overview", pages: 12 },
        { title: "Career Pathways", pages: 25 },
        { title: "Educational Requirements", pages: 18 },
        { title: "Emiratization Opportunities", pages: 15 },
        { title: "Future Trends", pages: 20 },
      ]
    },
    "finance": {
      title: "Finance & Banking",
      description: "The UAE has established itself as the Middle East's financial hub, with Dubai International Financial Centre (DIFC) and Abu Dhabi Global Market (ADGM) hosting major international banks and financial institutions.",
      icon: <Landmark className="h-6 w-6" />,
      coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1600&auto=format&fit=crop",
      keyStats: [
        { label: "Contribution to GDP", value: "10%" },
        { label: "Annual Growth", value: "3.8%" },
        { label: "Employment", value: "160,000+" },
      ],
      careerPaths: [
        { title: "Investment Banking", level: "Mid to Executive", demand: "High" },
        { title: "Financial Analysis", level: "Entry to Mid", demand: "High" },
        { title: "FinTech Development", level: "Mid-Level", demand: "Very High" },
        { title: "Wealth Management", level: "Mid to Senior", demand: "Medium" },
      ],
      skillsRequired: [
        { name: "Financial Analysis", importance: 95 },
        { name: "Risk Management", importance: 85 },
        { name: "Islamic Finance", importance: 75 },
        { name: "Programming/AI", importance: 70 },
        { name: "Regulatory Knowledge", importance: 90 },
      ],
      educationPaths: [
        { name: "Finance or Accounting Degree", level: "Bachelor's", duration: "4 years" },
        { name: "MBA with Finance Specialization", level: "Master's", duration: "2 years" },
        { name: "CFA Certification", level: "Professional", duration: "1.5-3 years" },
      ],
      keyChallenges: [
        "Keeping pace with financial technology innovation",
        "Adapting to evolving regulatory frameworks",
        "Increasing Emiratization in senior positions",
        "Balancing traditional and Islamic banking services"
      ],
      sections: [
        { title: "Industry Overview", pages: 15 },
        { title: "Career Pathways", pages: 28 },
        { title: "Educational Requirements", pages: 20 },
        { title: "Emiratization Opportunities", pages: 18 },
        { title: "Future Trends", pages: 22 },
      ]
    },
    "technology": {
      title: "Technology & Innovation",
      description: "The UAE has positioned itself as a regional technology hub with initiatives like Dubai Internet City, Hub71, and the UAE Artificial Intelligence Strategy that aims to make the UAE a leader in AI by 2031.",
      icon: <Globe className="h-6 w-6" />,
      coverImage: "https://images.unsplash.com/photo-1648134859311-209881605f91?q=80&w=1600&auto=format&fit=crop",
      keyStats: [
        { label: "Contribution to GDP", value: "5.1%" },
        { label: "Annual Growth", value: "7.3%" },
        { label: "Employment", value: "120,000+" },
      ],
      careerPaths: [
        { title: "AI & Machine Learning", level: "Mid to Senior", demand: "Very High" },
        { title: "Cybersecurity", level: "Entry to Executive", demand: "Very High" },
        { title: "Software Development", level: "Entry to Senior", demand: "High" },
        { title: "Smart City Solutions", level: "Mid-Level", demand: "Medium" },
      ],
      skillsRequired: [
        { name: "Programming", importance: 90 },
        { name: "AI/Machine Learning", importance: 85 },
        { name: "Cybersecurity", importance: 80 },
        { name: "Cloud Computing", importance: 75 },
        { name: "Project Management", importance: 70 },
      ],
      educationPaths: [
        { name: "Computer Science Degree", level: "Bachelor's", duration: "4 years" },
        { name: "Data Science MSc", level: "Master's", duration: "2 years" },
        { name: "Cybersecurity Certification", level: "Professional", duration: "6-12 months" },
      ],
      keyChallenges: [
        "Rapidly evolving technology landscape",
        "Need for continuous skills updating",
        "Developing local tech talent pipeline",
        "Integration with traditional industries"
      ],
      sections: [
        { title: "Industry Overview", pages: 14 },
        { title: "Career Pathways", pages: 30 },
        { title: "Educational Requirements", pages: 22 },
        { title: "Emiratization Opportunities", pages: 16 },
        { title: "Future Trends", pages: 25 },
      ]
    },
    "energy": {
      title: "Energy & Sustainability",
      description: "While traditionally strong in oil and gas, the UAE is diversifying its energy sector with major investments in renewable energy through initiatives like Masdar City and the Mohammed bin Rashid Al Maktoum Solar Park.",
      icon: <Palmtree className="h-6 w-6" />,
      coverImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1600&auto=format&fit=crop",
      keyStats: [
        { label: "Contribution to GDP", value: "30%" },
        { label: "Renewable Target", value: "44% by 2050" },
        { label: "Employment", value: "200,000+" },
      ],
      careerPaths: [
        { title: "Renewable Energy Engineer", level: "Mid to Senior", demand: "High" },
        { title: "Sustainability Manager", level: "Mid-Level", demand: "Medium" },
        { title: "Energy Policy Advisor", level: "Senior", demand: "Medium" },
        { title: "Oil & Gas Specialist", level: "Entry to Executive", demand: "Medium" },
      ],
      skillsRequired: [
        { name: "Engineering Fundamentals", importance: 90 },
        { name: "Renewable Technologies", importance: 85 },
        { name: "Environmental Management", importance: 75 },
        { name: "Project Management", importance: 80 },
        { name: "Policy & Regulation", importance: 70 },
      ],
      educationPaths: [
        { name: "Petroleum Engineering", level: "Bachelor's", duration: "4 years" },
        { name: "Renewable Energy MSc", level: "Master's", duration: "2 years" },
        { name: "Environmental Management", level: "Diploma", duration: "1 year" },
      ],
      keyChallenges: [
        "Balancing traditional energy with sustainability goals",
        "Developing expertise in emerging renewable technologies",
        "Transferring skills from oil & gas to renewables",
        "Meeting ambitious national renewable energy targets"
      ],
      sections: [
        { title: "Industry Overview", pages: 18 },
        { title: "Career Pathways", pages: 26 },
        { title: "Educational Requirements", pages: 20 },
        { title: "Emiratization Opportunities", pages: 15 },
        { title: "Future Trends", pages: 24 },
      ]
    }
  };

  const activeGuide = industryGuides[activeTab as keyof typeof industryGuides];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-3">UAE Industry Guides</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive guides to key industries in the UAE economy, with insights into career paths,
          required skills, and growth opportunities.
        </p>
      </div>

      <Tabs defaultValue="tourism" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="tourism" className="flex items-center gap-2">
            <Plane className="h-4 w-4" /> Tourism
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" /> Finance
          </TabsTrigger>
          <TabsTrigger value="technology" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Technology
          </TabsTrigger>
          <TabsTrigger value="energy" className="flex items-center gap-2">
            <Palmtree className="h-4 w-4" /> Energy
          </TabsTrigger>
        </TabsList>

        {Object.keys(industryGuides).map((industryKey) => (
          <TabsContent key={industryKey} value={industryKey}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <Card>
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${activeGuide.coverImage})` }}
                  >
                    <div className="h-full w-full bg-black/30 p-6 flex items-end">
                      <div>
                        <h1 className="text-3xl font-bold text-white">{activeGuide.title}</h1>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-white/20 text-white hover:bg-white/30">
                            Comprehensive Guide
                          </Badge>
                          <Badge variant="outline" className="text-white border-white/40 hover:bg-white/10">
                            PDF & Interactive
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">{activeGuide.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {activeGuide.keyStats.map((stat, i) => (
                        <Card key={i} className="bg-muted/50 border-none">
                          <CardContent className="p-4 text-center">
                            <p className="text-muted-foreground text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold text-primary">{stat.value}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Key Career Paths</h3>
                      <div className="space-y-3">
                        {activeGuide.careerPaths.map((path, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                            <div>
                              <p className="font-medium">{path.title}</p>
                              <p className="text-sm text-muted-foreground">{path.level}</p>
                            </div>
                            <Badge 
                              className={
                                path.demand === "Very High" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                                path.demand === "High" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" :
                                "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }
                            >
                              {path.demand} Demand
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Essential Skills</h3>
                      <div className="space-y-4">
                        {activeGuide.skillsRequired.map((skill, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span className="font-medium">{skill.importance}%</span>
                            </div>
                            <Progress value={skill.importance} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Educational Pathways</h3>
                      <div className="space-y-3">
                        {activeGuide.educationPaths.map((path, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                            <div>
                              <p className="font-medium">{path.name}</p>
                              <p className="text-sm text-muted-foreground">{path.level}</p>
                            </div>
                            <div className="text-sm text-right">
                              <p>{path.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Industry Challenges</h3>
                      <ul className="space-y-2">
                        {activeGuide.keyChallenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0 flex flex-wrap gap-3">
                    <Button 
                      onClick={() => handleGuideAction("Download", activeGuide.title)}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" /> Download Full Guide
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleGuideAction("Share", activeGuide.title)}
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-2" /> Share Guide
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleGuideAction("Bookmark", activeGuide.title)}
                      className="flex-1"
                    >
                      <Bookmark className="h-4 w-4 mr-2" /> Save for Later
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="lg:col-span-4 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Guide Contents</CardTitle>
                    <CardDescription>
                      Complete guide with {activeGuide.sections.reduce((acc, curr) => acc + curr.pages, 0)} pages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                      {activeGuide.sections.map((section, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span>{section.title}</span>
                          </div>
                          <Badge variant="outline">{section.pages} pages</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Key Organizations</CardTitle>
                    <CardDescription>
                      Important institutions in the {activeGuide.title} sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                      {[
                        "Department of Tourism and Commerce Marketing",
                        "Emirates Tourism Council",
                        "Dubai Tourism",
                        "Abu Dhabi Department of Culture and Tourism",
                        "UAE Hotel Association"
                      ].map((org, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{org}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-none">
                  <CardHeader className="pb-2">
                    <CardTitle>Emiratization Focus</CardTitle>
                    <CardDescription>
                      Opportunities for UAE nationals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-sm mb-4">
                      The {activeGuide.title} sector has identified several roles as 
                      priorities for Emiratization, with structured development programs and 
                      incentives available.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Priority Roles:</div>
                      <div className="space-y-1">
                        {["Management Trainee", "Customer Experience", "Marketing Specialist", "Tourism Development"].map((role, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-primary" />
                            <span className="text-sm">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default IndustryGuides;
