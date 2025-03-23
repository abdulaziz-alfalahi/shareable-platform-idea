
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Coffee, Palmtree, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedResourcesSection = () => {
  const resources = [
    {
      icon: <Users className="text-emirati-teal h-6 w-6" />,
      title: "Career Counseling",
      description: "Connect with experienced career counselors for personalized guidance and support.",
      tags: ["Personalized", "Expert Guidance"],
      link: "/student-dashboard"
    },
    {
      icon: <TrendingUp className="text-emirati-teal h-6 w-6" />,
      title: "Skills Training Programs",
      description: "Enhance your skills with industry-recognized training programs and workshops.",
      tags: ["Certification", "Hands-on"],
      link: "/training-centers"
    },
    {
      icon: <Compass className="text-emirati-teal h-6 w-6" />,
      title: "Cultural Competence",
      description: "Learn about UAE business etiquette and cultural norms for professional success.",
      tags: ["UAE Culture", "Professional"],
      link: "/educational-resources"
    },
    {
      icon: <Palmtree className="text-emirati-teal h-6 w-6" />,
      title: "Local Industry Insights",
      description: "Stay updated with UAE's growing industries and emerging opportunities.",
      tags: ["Local Market", "Trends"],
      link: "/industry-guides"
    }
  ];

  return (
    <section className="mt-16 text-center">
      <h2 className="text-3xl font-bold text-emirati-navy mb-4 font-display">
        Featured Resources
      </h2>
      
      {/* Arabic-inspired decorative element */}
      <div className="flex justify-center mb-8">
        <div className="relative h-16 w-32">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-emirati-gold"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-emirati-gold"></div>
          <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-emirati-teal"></div>
          <div className="absolute left-3/4 top-1/4 h-1 w-1 rounded-full bg-emirati-teal"></div>
          <div className="absolute left-1/4 top-3/4 h-1 w-1 rounded-full bg-emirati-teal"></div>
          <div className="absolute left-3/4 top-3/4 h-1 w-1 rounded-full bg-emirati-teal"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="transition-all duration-300 border-emirati-gold/30 hover:border-emirati-gold group overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-emirati-teal/5 to-transparent pointer-events-none"></div>
            <CardHeader>
              <div className="flex items-center justify-center bg-emirati-teal/10 w-12 h-12 rounded-full mx-auto mb-2 group-hover:scale-110 transition-transform group-hover:bg-emirati-teal/20">
                {resource.icon}
              </div>
              <CardTitle className="flex flex-col items-center justify-center gap-2">
                <span className="font-display">{resource.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                {resource.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {resource.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="bg-emirati-sandstone/50 text-emirati-deepBrown border-emirati-gold/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="w-full rounded-full border-emirati-teal text-emirati-teal hover:bg-emirati-teal/10 hover:text-emirati-teal" asChild>
                <Link to={resource.link}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedResourcesSection;
