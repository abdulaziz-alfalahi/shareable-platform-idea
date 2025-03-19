
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Briefcase, 
  GraduationCap, 
  Building, 
  TrendingUp, 
  Clock, 
  Heart 
} from "lucide-react";
import CareerCard from "./CareerCard";

// Sample career field data
const careerFields = [
  { id: "tech", name: "Technology", icon: <Briefcase className="h-5 w-5" />, color: "bg-blue-100 text-blue-700" },
  { id: "engineering", name: "Engineering", icon: <Building className="h-5 w-5" />, color: "bg-green-100 text-green-700" },
  { id: "healthcare", name: "Healthcare", icon: <Heart className="h-5 w-5" />, color: "bg-red-100 text-red-700" },
  { id: "education", name: "Education", icon: <GraduationCap className="h-5 w-5" />, color: "bg-yellow-100 text-yellow-700" },
  { id: "finance", name: "Finance", icon: <TrendingUp className="h-5 w-5" />, color: "bg-purple-100 text-purple-700" },
  { id: "government", name: "Government", icon: <Building className="h-5 w-5" />, color: "bg-gray-100 text-gray-700" },
];

// Sample career data
const careers = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Design, develop, and maintain software systems and applications.",
    field: "tech",
    growth: "15%",
    salary: "30,000-45,000 AED/month",
    education: "Bachelor's in Computer Science",
    skills: ["Programming", "Problem-solving", "Teamwork", "Communication"],
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "AI Specialist",
    description: "Develop and implement artificial intelligence algorithms and systems.",
    field: "tech",
    growth: "25%",
    salary: "35,000-55,000 AED/month",
    education: "Master's in AI or Computer Science",
    skills: ["Machine Learning", "Deep Learning", "Python", "Mathematics"],
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Civil Engineer",
    description: "Design, develop, and oversee construction projects and infrastructure systems.",
    field: "engineering",
    growth: "8%",
    salary: "25,000-40,000 AED/month",
    education: "Bachelor's in Civil Engineering",
    skills: ["Technical Design", "Project Management", "Mathematics", "Problem-solving"],
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Teacher",
    description: "Educate students and develop curriculum in schools and educational institutions.",
    field: "education",
    growth: "6%",
    salary: "18,000-30,000 AED/month",
    education: "Bachelor's in Education",
    skills: ["Communication", "Patience", "Creativity", "Organization"],
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Doctor",
    description: "Diagnose and treat patients in hospitals and medical facilities.",
    field: "healthcare",
    growth: "12%",
    salary: "40,000-80,000 AED/month",
    education: "Medical Degree (MD)",
    skills: ["Clinical Skills", "Empathy", "Decision Making", "Communication"],
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Financial Analyst",
    description: "Analyze financial data and provide investment recommendations.",
    field: "finance",
    growth: "10%",
    salary: "25,000-45,000 AED/month",
    education: "Bachelor's in Finance or Economics",
    skills: ["Financial Modeling", "Analysis", "Communication", "Mathematics"],
    image: "/placeholder.svg"
  },
];

const CareerExplorationContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);

  // Filter careers based on search query and selected field
  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesField = selectedField ? career.field === selectedField : true;
    return matchesSearch && matchesField;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search careers, skills, or interests..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-emirati-sandBeige focus:border-emirati-oasisGreen"
          />
        </div>
        <Button 
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 text-white"
        >
          Find Matches
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {careerFields.map(field => (
          <Badge 
            key={field.id}
            variant="outline"
            className={`py-2 px-3 cursor-pointer flex items-center gap-1.5 text-sm font-medium
                      ${selectedField === field.id ? 'bg-emirati-oasisGreen/10 border-emirati-oasisGreen text-emirati-deepBrown' : 'hover:bg-emirati-sandBeige/20'}`}
            onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
          >
            {field.icon}
            {field.name}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map(career => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <Card className="p-8 text-center bg-gray-50 border-dashed">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">No careers found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or explore different fields.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CareerExplorationContent;
