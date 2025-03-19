
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import { PortfolioItem } from "../PortfolioItemCard";

interface ProjectsTabProps {
  portfolioItems: PortfolioItem[];
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ portfolioItems }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
      <PortfolioItemsGrid items={portfolioItems} filterType="project" />
    </>
  );
};

export default ProjectsTab;
