
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { CareerStage } from "./types";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  iconBg?: string;
  stage: CareerStage | CareerStage[];
  hoverInfo?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  link, 
  iconBg = "bg-emirati-oasisGreen/10",
  hoverInfo,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="bg-white rounded-lg shadow-md border border-emirati-sandstone/30 p-6 transition-all duration-300 
                      hover:shadow-lg hover:border-emirati-oasisGreen/30 group hover:-translate-y-1 
                      hover:shadow-emirati-oasisGreen/10">
          <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center text-emirati-oasisGreen mb-4 
                          group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-emirati-deepBrown mb-2 group-hover:text-emirati-oasisGreen transition-colors">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Link to={link}>
            <Button className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 w-full 
                             transform transition-transform group-hover:scale-[1.02]">
              Learn More
            </Button>
          </Link>
        </div>
      </HoverCardTrigger>
      {hoverInfo && (
        <HoverCardContent className="w-80 p-4 bg-white border border-emirati-sandBeige shadow-md">
          <p className="text-sm text-emirati-deepBrown">{hoverInfo}</p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default ServiceCard;
