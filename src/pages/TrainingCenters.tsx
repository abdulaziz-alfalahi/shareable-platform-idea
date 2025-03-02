
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Building, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  ArrowUpRight 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { notifySuccess } from "@/utils/notification";

// Mock data for training centers
const trainingCenters = [
  {
    id: 1,
    name: "Future Skills Academy",
    location: "Dubai",
    rating: 4.8,
    programs: 24,
    students: 1872,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Technology", "Business", "Design"],
    description: "The Future Skills Academy offers cutting-edge training programs designed to prepare Emirati students for careers in emerging technology fields including AI, blockchain, and data science."
  },
  {
    id: 2,
    name: "Emirates Institute",
    location: "Abu Dhabi",
    rating: 4.7,
    programs: 18,
    students: 1564,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Finance", "Management", "Leadership"],
    description: "Emirates Institute provides comprehensive training in financial services, management, and leadership, with specialized programs tailored to meet the needs of UAE's growing economy."
  },
  {
    id: 3,
    name: "UAE Digital Training",
    location: "Sharjah",
    rating: 4.6,
    programs: 15,
    students: 1342,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Digital Marketing", "E-commerce", "Social Media"],
    description: "UAE Digital Training focuses on digital skills including marketing, e-commerce strategies, and social media management, helping students thrive in the digital economy."
  },
  {
    id: 4,
    name: "Abu Dhabi Learning Hub",
    location: "Abu Dhabi",
    rating: 4.5,
    programs: 12,
    students: 1125,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Engineering", "Oil & Gas", "Renewable Energy"],
    description: "Abu Dhabi Learning Hub specializes in engineering and energy sector training, offering programs in traditional oil and gas as well as renewable energy technologies."
  },
  {
    id: 5,
    name: "Dubai Knowledge Park",
    location: "Dubai",
    rating: 4.4,
    programs: 20,
    students: 1680,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Education", "Teaching", "Languages"],
    description: "Dubai Knowledge Park provides training for education professionals, offering programs in teaching methodologies, curriculum development, and language instruction."
  }
];

const TrainingCenters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [inquiryText, setInquiryText] = useState("");

  const filteredCenters = trainingCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && center.categories.some(cat => cat.toLowerCase() === activeTab.toLowerCase());
  });

  const handleInquiry = (centerId: number) => {
    notifySuccess({
      title: "Inquiry Sent",
      description: "Your inquiry has been sent to the training center. They will contact you soon."
    });
    setInquiryText("");
    setSelectedCenter(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center text-slate-900">
            <GraduationCap className="mr-2 h-8 w-8 text-indigo-600" />
            Training Centers
          </h1>
          <p className="text-slate-600 mt-2">
            Discover specialized training programs to enhance your skills and career prospects
          </p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search centers, programs..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <Card key={center.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={center.image} 
                alt={center.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{center.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                    {center.location}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  {center.rating} ★
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">{center.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {center.categories.map((category, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="text-sm text-slate-600">{center.programs} Programs</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="text-sm text-slate-600">{center.students.toLocaleString()} Students</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedCenter(center.id)}>
                Contact Center
              </Button>
              <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700">
                View Programs <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedCenter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Send Inquiry</CardTitle>
              <CardDescription>
                Contact {trainingCenters.find(c => c.id === selectedCenter)?.name} about their training programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Write your inquiry here..." 
                className="min-h-32"
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCenter(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleInquiry(selectedCenter)}>
                Send Inquiry
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrainingCenters;
