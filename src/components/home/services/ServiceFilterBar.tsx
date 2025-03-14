
import React from "react";
import FilterButton from "./FilterButton";
import { CareerStage } from "./types";

interface ServiceFilterBarProps {
  activeFilter: CareerStage;
  setActiveFilter: (filter: CareerStage) => void;
}

const ServiceFilterBar: React.FC<ServiceFilterBarProps> = ({ 
  activeFilter, 
  setActiveFilter 
}) => {
  return (
    <div className="flex justify-center gap-4 mb-10">
      <FilterButton 
        active={activeFilter === "all"} 
        onClick={() => setActiveFilter("all")}
      >
        All Services
      </FilterButton>
      <FilterButton 
        active={activeFilter === "early"} 
        onClick={() => setActiveFilter("early")}
      >
        Early Career
      </FilterButton>
      <FilterButton 
        active={activeFilter === "mid"} 
        onClick={() => setActiveFilter("mid")}
      >
        Mid Career
      </FilterButton>
      <FilterButton 
        active={activeFilter === "late"} 
        onClick={() => setActiveFilter("late")}
      >
        Late Career
      </FilterButton>
    </div>
  );
};

export default ServiceFilterBar;
