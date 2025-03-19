
import React, { useState } from "react";
import { CareerStage } from "./types";
import { services } from "./serviceData";
import ServiceFilterBar from "./ServiceFilterBar";
import ServiceGrid from "./ServiceGrid";
import DecorativeElement from "./DecorativeElement";

const ServicesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CareerStage>("all");

  // Map services to ServiceData format expected by ServiceGrid
  const serviceDataItems = services.map(service => ({
    icon: service.icon,
    title: service.title,
    description: service.description,
    link: service.href, // Map href to link
    stage: "all" as CareerStage, // Default to "all" for now
    iconBg: "bg-emirati-oasisGreen/10"
  }));

  return (
    <div>
      <DecorativeElement />
      
      {/* Filter buttons */}
      <ServiceFilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      {/* Service cards grid */}
      <ServiceGrid services={serviceDataItems} activeFilter={activeFilter} />
      
      <DecorativeElement />
    </div>
  );
};

export default ServicesSection;
