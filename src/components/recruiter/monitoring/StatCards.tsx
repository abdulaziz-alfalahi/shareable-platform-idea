
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Calendar, UserCheck } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  description: string;
}

interface StatCardsProps {
  stats: StatCard[];
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className={`ml-2 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
