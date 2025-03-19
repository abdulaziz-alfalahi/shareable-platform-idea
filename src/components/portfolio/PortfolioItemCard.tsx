
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Award, Trophy } from "lucide-react";

export interface PortfolioItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

interface PortfolioItemCardProps {
  item: PortfolioItem;
}

const PortfolioItemCard: React.FC<PortfolioItemCardProps> = ({ item }) => {
  return (
    <Card className="border-l-4 border-l-emirati-oasisGreen">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.title}</CardTitle>
          {item.type === "project" && <Image className="h-5 w-5 text-emirati-desertGold" />}
          {item.type === "certification" && <Award className="h-5 w-5 text-emirati-desertGold" />}
          {item.type === "achievement" && <Trophy className="h-5 w-5 text-emirati-desertGold" />}
        </div>
        <CardDescription>{item.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span key={index} className="bg-emirati-sandBeige/30 text-emirati-deepBrown px-2 py-1 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="outline" size="sm" className="ml-2">View</Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioItemCard;
