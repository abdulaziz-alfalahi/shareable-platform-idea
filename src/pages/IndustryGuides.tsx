
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Book, Briefcase, Award, Globe, Users, Code, Shield, Navigation, Lightbulb } from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

const IndustryGuides = () => {
  const industries = [
    {
      icon: <Briefcase className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Government & Public Sector",
      description: "Explore opportunities in federal and local government entities, public policy, and diplomatic service.",
      skills: ["Public administration", "Policy analysis", "Diplomacy", "Strategic planning"],
      paths: ["Civil service", "Foreign affairs", "Public policy analyst", "Government relations"]
    },
    {
      icon: <Navigation className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Energy & Sustainability",
      description: "Discover careers in oil & gas, renewable energy, and environmental sustainability initiatives.",
      skills: ["Engineering", "Project management", "Sustainability planning", "Technical expertise"],
      paths: ["Petroleum engineer", "Renewable energy specialist", "Environmental analyst", "Energy policy advisor"]
    },
    {
      icon: <Globe className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Tourism & Hospitality",
      description: "Learn about the growing tourism industry and luxury hospitality management opportunities.",
      skills: ["Customer service", "Event management", "Cultural awareness", "Hospitality operations"],
      paths: ["Tourism development", "Hotel management", "Event planning", "Cultural tourism specialist"]
    },
    {
      icon: <Book className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Education & Research",
      description: "Explore careers in academic institutions, educational policy, and research centers.",
      skills: ["Teaching", "Research methodology", "Curriculum development", "Academic writing"],
      paths: ["Teacher", "Educational administrator", "Researcher", "Academic counselor"]
    },
    {
      icon: <Code className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Technology & Innovation",
      description: "Discover opportunities in AI, blockchain, smart city initiatives, and digital transformation.",
      skills: ["Programming", "Data analysis", "Digital literacy", "Innovation management"],
      paths: ["Software developer", "Digital strategist", "Data scientist", "IT project manager"]
    },
    {
      icon: <Shield className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Defense & Security",
      description: "Learn about careers in national security, defense technology, and cybersecurity.",
      skills: ["Security protocols", "Strategic planning", "Risk assessment", "Technical specializations"],
      paths: ["Defense analyst", "Cybersecurity specialist", "Intelligence officer", "Security consultant"]
    },
    {
      icon: <Bookmark className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Finance & Banking",
      description: "Explore the UAE's financial sector including Islamic banking, investment, and fintech.",
      skills: ["Financial analysis", "Investment management", "Islamic finance principles", "Regulatory compliance"],
      paths: ["Financial analyst", "Islamic banking specialist", "Investment manager", "Fintech developer"]
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Creative Industries",
      description: "Discover opportunities in media, design, film, and cultural heritage preservation.",
      skills: ["Creative thinking", "Cultural knowledge", "Digital media", "Project management"],
      paths: ["Media producer", "Heritage specialist", "Digital content creator", "Arts administrator"]
    },
    {
      icon: <Users className="h-8 w-8 text-emirati-oasisGreen" />,
      title: "Healthcare & Wellness",
      description: "Learn about careers in medical services, healthcare management, and wellness initiatives.",
      skills: ["Medical knowledge", "Patient care", "Healthcare administration", "Research"],
      paths: ["Medical professional", "Healthcare administrator", "Research scientist", "Public health specialist"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-emirati-desertRed mb-4">
            UAE Industry Guides
          </h1>
          <p className="text-lg text-gray-700">
            Explore detailed insights into key industries in the UAE, featuring career pathways, 
            required skills, and growth opportunities for Emirati professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {industries.map((industry, index) => (
            <Card key={index} className="hover:shadow-md transition-all border-emirati-sandBeige/30 group overflow-hidden">
              <CardHeader className="pb-2">
                <div className="mb-2 flex justify-center">
                  <div className="p-3 rounded-full bg-emirati-oasisGreen/10 group-hover:bg-emirati-oasisGreen/20 transition-colors">
                    {industry.icon}
                  </div>
                </div>
                <CardTitle className="text-center text-emirati-deepBrown group-hover:text-emirati-oasisGreen transition-colors">
                  {industry.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 text-gray-600">
                  {industry.description}
                </CardDescription>
                
                <div className="mb-3">
                  <h4 className="font-medium text-emirati-camelBrown mb-1">Key Skills:</h4>
                  <ul className="pl-5 text-sm list-disc text-gray-600 space-y-1">
                    {industry.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-emirati-camelBrown mb-1">Career Paths:</h4>
                  <ul className="pl-5 text-sm list-disc text-gray-600 space-y-1">
                    {industry.paths.map((path, i) => (
                      <li key={i}>{path}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IndustryGuides;
