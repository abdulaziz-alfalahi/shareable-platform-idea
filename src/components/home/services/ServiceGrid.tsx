
import React from "react";
import ServiceCard from "./ServiceCard";
import { ServiceData, CareerStage } from "./types";

interface ServiceGridProps {
  services: ServiceData[];
  activeFilter: CareerStage;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, activeFilter }) => {
  // Filter services based on active filter
  const filteredServices = services.filter(service => 
    activeFilter === "all" || 
    (Array.isArray(service.stage) 
      ? service.stage.includes(activeFilter)
      : service.stage === activeFilter)
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
        {filteredServices.map((service, index) => (
          <div 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
            key={index}
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              iconBg={service.iconBg}
              stage={service.stage}
              hoverInfo={service.hoverInfo}
            />
          </div>
        ))}
      </div>
      
      {/* Show a message when no services match the filter */}
      {filteredServices.length === 0 && (
        <div className="text-center py-10 animate-fade-in">
          <p className="text-lg text-emirati-deepBrown">No services available for this career stage.</p>
        </div>
      )}
    </>
  );
};

export default ServiceGrid;
