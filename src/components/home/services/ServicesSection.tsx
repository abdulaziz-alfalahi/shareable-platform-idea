
import React, { useState } from "react";
import { CareerStage } from "./types";
import { services } from "./serviceData";
import ServiceFilterBar from "./ServiceFilterBar";
import ServiceGrid from "./ServiceGrid";
import DecorativeElement from "./DecorativeElement";

const ServicesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CareerStage>("all");

  return (
    <div>
      <DecorativeElement />
      
      {/* Filter buttons */}
      <ServiceFilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      {/* Service cards grid */}
      <ServiceGrid services={services} activeFilter={activeFilter} />
      
      <DecorativeElement />
    </div>
  );
};

export default ServicesSection;
