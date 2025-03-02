
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeaturedResourceProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeaturedResource = ({ icon: Icon, title, description }: FeaturedResourceProps) => {
  return (
    <Card className="hover:shadow-md transition-all duration-300 border-emirati-desertGold/30 hover:border-emirati-desertGold">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Icon className="text-emirati-oasisGreen h-6 w-6" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeaturedResource;
