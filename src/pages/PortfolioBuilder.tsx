
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import PortfolioIntroCard from "@/components/portfolio/PortfolioIntroCard";
import DashboardTab from "@/components/portfolio/tabs/DashboardTab";
import ProjectsTab from "@/components/portfolio/tabs/ProjectsTab";
import CertificationsTab from "@/components/portfolio/tabs/CertificationsTab";
import AchievementsTab from "@/components/portfolio/tabs/AchievementsTab";
import SettingsTab from "@/components/portfolio/tabs/SettingsTab";
import { initialPortfolioItems } from "@/components/portfolio/portfolioData";

const PortfolioBuilder = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [portfolioItems, setPortfolioItems] = useState(initialPortfolioItems);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <PortfolioHeader />

      {/* Introduction Card */}
      <PortfolioIntroCard />

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
          <DashboardTab portfolioItems={portfolioItems} />
        </TabsContent>
        
        <TabsContent value="projects">
          <ProjectsTab portfolioItems={portfolioItems} />
        </TabsContent>
        
        <TabsContent value="certifications">
          <CertificationsTab portfolioItems={portfolioItems} />
        </TabsContent>
        
        <TabsContent value="achievements">
          <AchievementsTab portfolioItems={portfolioItems} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioBuilder;
