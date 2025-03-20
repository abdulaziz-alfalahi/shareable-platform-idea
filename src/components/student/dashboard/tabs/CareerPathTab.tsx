
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, Compass, TrendingUp, MapPin, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CareerPathTab = () => {
  const [activeTab, setActiveTab] = useState<string>("fields");
  const navigate = useNavigate();

  // Sample data for career fields
  const careerFields = [
    {
      id: "stem",
      name: "Science & Technology",
      icon: <GraduationCap className="h-5 w-5 text-emirati-oasisGreen" />,
      specializations: [
        { name: "Computer Science", description: "Study algorithms, data structures, and computational systems", popularity: "High Demand" },
        { name: "Mechanical Engineering", description: "Design and analyze mechanical systems", popularity: "Medium Demand" },
        { name: "Biology", description: "Study living organisms and life processes", popularity: "Medium Demand" },
      ],
      pathways: [
        { title: "Software Development", salary: "25,000-45,000 AED", growth: "15%" },
        { title: "Biomedical Research", salary: "20,000-40,000 AED", growth: "8%" },
        { title: "Robotics Engineering", salary: "22,000-38,000 AED", growth: "12%" }
      ]
    },
    {
      id: "business",
      name: "Business & Finance",
      icon: <Briefcase className="h-5 w-5 text-emirati-oasisGreen" />,
      specializations: [
        { name: "Business Administration", description: "Learn to manage organizations and operations", popularity: "High Demand" },
        { name: "Finance", description: "Study financial systems, investments, and markets", popularity: "High Demand" },
        { name: "Marketing", description: "Learn strategies to promote products and services", popularity: "Medium Demand" },
      ],
      pathways: [
        { title: "Financial Analyst", salary: "20,000-35,000 AED", growth: "10%" },
        { title: "Business Consultant", salary: "25,000-50,000 AED", growth: "12%" },
        { title: "Marketing Manager", salary: "18,000-32,000 AED", growth: "8%" }
      ]
    },
    {
      id: "humanities",
      name: "Arts & Humanities",
      icon: <BookOpen className="h-5 w-5 text-emirati-oasisGreen" />,
      specializations: [
        { name: "International Relations", description: "Study international politics and diplomacy", popularity: "Medium Demand" },
        { name: "Communication", description: "Study media and communication strategies", popularity: "Medium Demand" },
        { name: "Art & Design", description: "Develop creative skills in various artistic mediums", popularity: "Moderate Demand" }
      ],
      pathways: [
        { title: "Diplomat", salary: "22,000-40,000 AED", growth: "5%" },
        { title: "Public Relations", salary: "18,000-30,000 AED", growth: "7%" },
        { title: "Digital Designer", salary: "15,000-28,000 AED", growth: "10%" }
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare & Medicine",
      icon: <TrendingUp className="h-5 w-5 text-emirati-oasisGreen" />,
      specializations: [
        { name: "Medicine", description: "Train to diagnose and treat patients", popularity: "High Demand" },
        { name: "Nursing", description: "Learn patient care and health management", popularity: "Very High Demand" },
        { name: "Pharmacy", description: "Study medications and their effects", popularity: "High Demand" },
      ],
      pathways: [
        { title: "Doctor", salary: "35,000-70,000 AED", growth: "12%" },
        { title: "Nurse Practitioner", salary: "15,000-30,000 AED", growth: "18%" },
        { title: "Pharmacist", salary: "20,000-35,000 AED", growth: "9%" }
      ]
    }
  ];

  // Render field card for the Fields tab
  const renderFieldCard = (field: any) => (
    <Card key={field.id} className="hover:shadow-md transition-shadow duration-300 border-emirati-sandBeige">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {field.icon}
          <CardTitle className="text-xl">{field.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">Popular specializations:</h4>
        <ul className="space-y-1 mb-4">
          {field.specializations.map((spec: any, index: number) => (
            <li key={index} className="text-sm">{spec.name} <span className="text-xs text-emirati-oasisGreen">({spec.popularity})</span></li>
          ))}
        </ul>
        <Button variant="outline" size="sm" className="w-full mt-2 border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10" onClick={() => {
          setActiveTab("specializations");
        }}>
          Explore Specializations <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  // Render specialization card for the Specializations tab
  const renderSpecializationCard = (specialization: any, field: string) => (
    <Card key={specialization.name} className="hover:shadow-md transition-shadow duration-300 border-emirati-sandBeige">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{specialization.name}</CardTitle>
        <CardDescription>{field}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{specialization.description}</p>
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <TrendingUp className="h-3.5 w-3.5 mr-1 text-emirati-oasisGreen" /> 
          <span>{specialization.popularity}</span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2 border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10" onClick={() => {
          setActiveTab("pathways");
        }}>
          See Career Paths <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  // Render pathway card for the Pathways tab
  const renderPathwayCard = (pathway: any) => (
    <Card key={pathway.title} className="hover:shadow-md transition-shadow duration-300 border-emirati-sandBeige">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{pathway.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-xs">
            <Briefcase className="h-3.5 w-3.5 mr-1 text-emirati-oasisGreen" />
            <span>Salary: {pathway.salary}</span>
          </div>
          <div className="flex items-center text-xs">
            <TrendingUp className="h-3.5 w-3.5 mr-1 text-emirati-oasisGreen" />
            <span>Growth: {pathway.growth}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2 border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10" onClick={() => {
          navigate("/mindmap?tab=simulator");
        }}>
          Simulate This Path <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-emirati-deepBlue">Career Pathway Exploration</h2>
        <Button 
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
          onClick={() => navigate("/mindmap")}
        >
          <Compass className="mr-2 h-4 w-4" />
          Full Career Explorer
        </Button>
      </div>
      
      <p className="text-muted-foreground">
        Explore different specializations and career paths to help decide your university focus.
        Choose a field of study to see specializations and where they can lead you professionally.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="fields">Fields of Study</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="pathways">Career Pathways</TabsTrigger>
        </TabsList>

        <TabsContent value="fields">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerFields.map(field => renderFieldCard(field))}
          </div>
        </TabsContent>

        <TabsContent value="specializations">
          <div className="flex items-center text-sm mb-4">
            <Button variant="ghost" size="sm" className="text-emirati-oasisGreen" onClick={() => setActiveTab("fields")}>
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Fields
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerFields.flatMap(field => 
              field.specializations.map(spec => renderSpecializationCard(spec, field.name))
            )}
          </div>
        </TabsContent>

        <TabsContent value="pathways">
          <div className="flex items-center text-sm mb-4">
            <Button variant="ghost" size="sm" className="text-emirati-oasisGreen" onClick={() => setActiveTab("specializations")}>
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Specializations
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerFields.flatMap(field => field.pathways.map(pathway => renderPathwayCard(pathway)))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerPathTab;
