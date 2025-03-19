
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import { PortfolioItem } from "../PortfolioItemCard";
import UaeGeometricPattern from "@/components/ui/uae/UaeGeometricPattern";
import { Briefcase } from "lucide-react";

interface ProjectsTabProps {
  portfolioItems: PortfolioItem[];
  onAddItem: (newItem: PortfolioItem) => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ portfolioItems, onAddItem }) => {
  return (
    <div className="relative">
      <UaeGeometricPattern 
        type="geometric" 
        position="corner" 
        className="absolute top-0 right-0" 
        opacity={0.05} 
      />
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-emirati-oasisGreen/10 p-2 rounded-full">
          <Briefcase className="h-5 w-5 text-emirati-oasisGreen" />
        </div>
        <h2 className="text-2xl font-bold text-emirati-deepBrown">Your Projects</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Showcase your professional projects and achievements. Add details about your role, technologies used, and outcomes.
      </p>
      
      <PortfolioItemsGrid items={portfolioItems} filterType="project" onAddItem={onAddItem} />
    </div>
  );
};

export default ProjectsTab;
