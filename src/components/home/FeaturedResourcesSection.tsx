
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";

const FeaturedResourcesSection = () => {
  const resources = [
    {
      icon: <Users className="text-emirati-oasisGreen h-6 w-6" />,
      title: "Career Counseling",
      description: "Connect with experienced career counselors for personalized guidance and support."
    },
    {
      icon: <TrendingUp className="text-emirati-oasisGreen h-6 w-6" />,
      title: "Skills Training Programs",
      description: "Enhance your skills with industry-recognized training programs and workshops."
    }
  ];

  return (
    <section className="mt-16 text-center">
      <h2 className="text-3xl font-bold text-emirati-oasisGreen mb-4">
        Featured Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-300 border-emirati-desertGold/30 hover:border-emirati-desertGold">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                {resource.icon}
                <span>{resource.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {resource.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedResourcesSection;
