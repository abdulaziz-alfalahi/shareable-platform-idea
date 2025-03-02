
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ icon: Icon, title, description, link }: ServiceCardProps) => {
  return (
    <Link to={link} className="no-underline group">
      <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
        <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
          <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
            <Icon className="text-emirati-oasisGreen" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            {description}
          </p>
          <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
            <span>Explore</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
