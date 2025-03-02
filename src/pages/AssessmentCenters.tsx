
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Award, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  ArrowUpRight, 
  CheckCircle, 
  Flame,
  TestTube,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { notifySuccess } from "@/utils/notification";

// Mock data for assessment centers
const assessmentCenters = [
  {
    id: 1,
    name: "Emirates Skills Assessment Center",
    location: "Dubai",
    rating: 4.9,
    assessments: 18,
    participants: 2342,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Technical Skills", "Digital Literacy", "Professional Certification"],
    description: "Emirates Skills Assessment Center provides comprehensive skills evaluation for various technical and professional fields, helping candidates validate their expertise for the job market."
  },
  {
    id: 2,
    name: "Abu Dhabi Assessment Hub",
    location: "Abu Dhabi",
    rating: 4.7,
    assessments: 15,
    participants: 1876,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Leadership", "Management", "Executive Assessment"],
    description: "Specializing in leadership and management assessment, Abu Dhabi Assessment Hub offers evaluation programs for professionals advancing to executive and leadership positions."
  },
  {
    id: 3,
    name: "UAE Career Aptitude Center",
    location: "Sharjah",
    rating: 4.6,
    assessments: 12,
    participants: 1653,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Career Aptitude", "Personality Assessment", "Vocational Guidance"],
    description: "UAE Career Aptitude Center helps individuals identify their strengths, interests, and suitable career paths through scientific assessment methods and career counseling."
  },
  {
    id: 4,
    name: "Dubai Academic Assessment Institute",
    location: "Dubai",
    rating: 4.8,
    assessments: 20,
    participants: 2156,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Academic Evaluation", "Educational Testing", "University Preparation"],
    description: "Dubai Academic Assessment Institute conducts standardized testing and academic evaluations for students preparing for higher education and international university applications."
  },
  {
    id: 5,
    name: "Ajman Professional Certification Center",
    location: "Ajman",
    rating: 4.5,
    assessments: 10,
    participants: 975,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    categories: ["Industry Certification", "Professional Licensing", "Skills Validation"],
    description: "Ajman Professional Certification Center offers industry-recognized certification programs and skills validation services across multiple professional domains."
  }
];

const AssessmentCenters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [bookingDetails, setBookingDetails] = useState("");

  const filteredCenters = assessmentCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && center.categories.some(cat => cat.toLowerCase().includes(activeTab.toLowerCase()));
  });

  const handleBookAssessment = (centerId: number) => {
    notifySuccess({
      title: "Assessment Booked",
      description: "Your assessment booking request has been sent. You will receive a confirmation soon."
    });
    setBookingDetails("");
    setSelectedCenter(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center text-slate-900">
            <TestTube className="mr-2 h-8 w-8 text-teal-600" />
            Assessment Centers
          </h1>
          <p className="text-slate-600 mt-2">
            Evaluate your skills and get certified with our professional assessment centers
          </p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search centers, assessments..." 
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
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="certification">Certification</TabsTrigger>
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
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  {center.rating} ★
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">{center.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {center.categories.map((category, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-teal-50 text-teal-700 border-teal-100">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="text-sm text-slate-600">{center.assessments} Assessments</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-slate-400" />
                  <span className="text-sm text-slate-600">{center.participants.toLocaleString()} Participants</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedCenter(center.id)}>
                Book Assessment
              </Button>
              <Button className="gap-1 bg-teal-600 hover:bg-teal-700">
                View Details <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedCenter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Book Assessment</CardTitle>
              <CardDescription>
                Schedule an assessment at {assessmentCenters.find(c => c.id === selectedCenter)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Flame className="h-5 w-5" />
                  <span className="font-medium">Popular assessment center! Limited slots available.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-5 w-5" />
                  <span>Next available dates: Jun 15, Jun 22, Jun 29</span>
                </div>
                <Textarea 
                  placeholder="Additional details or special requirements..." 
                  className="min-h-32"
                  value={bookingDetails}
                  onChange={(e) => setBookingDetails(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCenter(null)}>
                Cancel
              </Button>
              <Button 
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => handleBookAssessment(selectedCenter)}
              >
                Book Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AssessmentCenters;
