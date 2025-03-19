
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, FileText, Image, Link2, ChevronLeft, Plus, ExternalLink, Trophy } from "lucide-react";
import { studentData } from "@/data/studentMockData";

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock portfolio items
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: "1",
      type: "project",
      title: "UAE Heritage Mobile App",
      description: "Designed and developed a mobile application showcasing UAE cultural heritage",
      date: "January 2023",
      tags: ["Mobile Development", "UI/UX", "Cultural Heritage"]
    },
    {
      id: "2",
      type: "certification",
      title: "Advanced Web Development",
      description: "Certification in modern web technologies and frameworks",
      date: "March 2023",
      tags: ["Web Development", "Frontend", "Backend"]
    },
    {
      id: "3",
      type: "achievement",
      title: "Innovation Hackathon Winner",
      description: "First place in the National Innovation Hackathon for sustainable technology",
      date: "June 2023",
      tags: ["Innovation", "Sustainability", "Teamwork"]
    }
  ]);

  const renderPortfolioItems = (items) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.map((item) => (
          <Card key={item.id} className="border-l-4 border-l-emirati-oasisGreen">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {item.type === "project" && <Image className="h-5 w-5 text-emirati-desertGold" />}
                {item.type === "certification" && <Award className="h-5 w-5 text-emirati-desertGold" />}
                {item.type === "achievement" && <Trophy className="h-5 w-5 text-emirati-desertGold" />}
              </div>
              <CardDescription>{item.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="bg-emirati-sandBeige/30 text-emirati-deepBrown px-2 py-1 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="outline" size="sm" className="ml-2">View</Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add new item card */}
        <Card className="border-dashed border-2 flex items-center justify-center h-[240px] cursor-pointer hover:bg-gray-50">
          <div className="text-center p-6">
            <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500 font-medium">Add New Item</p>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">
          Portfolio Builder
        </h1>
      </div>

      {/* Introduction Card */}
      <Card className="mb-8 bg-gradient-to-r from-emirati-sandBeige/30 to-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Welcome to Your Digital Portfolio</h2>
              <p className="text-gray-600 mb-4">
                Showcase your skills, projects, certifications, and achievements to stand out to potential employers.
                A well-crafted portfolio highlights your capabilities beyond what a traditional resume can convey.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <FileText className="mr-2 h-4 w-4" /> Export as PDF
                </Button>
                <Button variant="outline">
                  <Link2 className="mr-2 h-4 w-4" /> Share Portfolio
                </Button>
                <Button variant="secondary">
                  <ExternalLink className="mr-2 h-4 w-4" /> Preview Public View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <h2 className="text-2xl font-bold mb-4">Your Portfolio Overview</h2>
          {renderPortfolioItems(portfolioItems)}
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Completion Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emirati-oasisGreen mb-2">75%</div>
                  <p className="text-sm text-gray-500">Add a bio and professional photo to reach 100%</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Projects Added</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emirati-oasisGreen mb-2">1</div>
                  <p className="text-sm text-gray-500">We recommend adding at least 3 projects</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Portfolio Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emirati-oasisGreen mb-2">12</div>
                  <p className="text-sm text-gray-500">In the last 30 days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
          {renderPortfolioItems(portfolioItems.filter(item => item.type === "project"))}
        </TabsContent>
        
        <TabsContent value="certifications">
          <h2 className="text-2xl font-bold mb-4">Your Certifications</h2>
          {renderPortfolioItems(portfolioItems.filter(item => item.type === "certification"))}
        </TabsContent>
        
        <TabsContent value="achievements">
          <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
          {renderPortfolioItems(portfolioItems.filter(item => item.type === "achievement"))}
        </TabsContent>
        
        <TabsContent value="settings">
          <h2 className="text-2xl font-bold mb-4">Portfolio Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Visibility Settings</CardTitle>
              <CardDescription>Control who can see your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Your portfolio is currently set to <strong>Private</strong>. Only you can view it.
              </p>
              <Button>Make Public</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioBuilder;
