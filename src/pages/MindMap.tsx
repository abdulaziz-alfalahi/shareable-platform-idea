
import React, { useState, useEffect } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  GraduationCap, 
  Building, 
  Compass, 
  Lightbulb, 
  Map
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CareerExplorationContent from "@/components/mind-map/CareerExplorationContent";
import MindMapContent from "@/components/mind-map/MindMapContent";
import PathwaySimulator from "@/components/career/PathwaySimulator";
import { studentData } from "@/data/studentMockData";

const MindMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("exploration");

  // Check URL parameters for tab selection
  useEffect(() => {
    const tabParam = new URLSearchParams(location.search).get("tab");
    if (tabParam === "exploration" || tabParam === "mindmap" || tabParam === "simulator") {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Update URL when tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/mindmap?tab=${newTab}`, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emirati-deepBrown mb-2">Career Exploration</h1>
          <p className="text-emirati-deepBrown/70">
            Discover your potential career paths and explore the possibilities that match your skills and interests.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="bg-emirati-sandBeige/20 p-1 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3">
            <TabsTrigger 
              value="exploration" 
              className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
            >
              <Compass className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Career</span> Exploration
            </TabsTrigger>
            
            <TabsTrigger 
              value="mindmap" 
              className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
            >
              <Map className="mr-2 h-4 w-4" />
              Mind Map
            </TabsTrigger>
            
            <TabsTrigger 
              value="simulator" 
              className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Pathway Simulator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exploration" className="pt-4">
            <CareerExplorationContent />
          </TabsContent>
          
          <TabsContent value="mindmap" className="pt-4">
            <MindMapContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="simulator" className="pt-4">
            <PathwaySimulator student={studentData} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MindMap;
