
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Building, Calendar, GraduationCap, MapPin, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const internshipsData = [
  {
    id: 1,
    title: "Engineering Internship Program",
    company: "ADNOC",
    location: "Abu Dhabi",
    duration: "3 months",
    stipend: "AED 5,000/month",
    deadline: "June 15, 2023",
    requirements: "Engineering students in their 3rd or 4th year",
    description: "Gain hands-on experience in petroleum engineering, project management, and innovation at one of UAE's largest energy companies.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Finance Development Program",
    company: "Dubai Islamic Bank",
    location: "Dubai",
    duration: "6 months",
    stipend: "AED 4,500/month",
    deadline: "July 1, 2023",
    requirements: "Finance or Accounting majors with 3.0+ GPA",
    description: "Comprehensive rotation program across different financial departments including investment, retail banking, and Islamic finance principles.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Technology Innovation Internship",
    company: "Etisalat Digital",
    location: "Dubai",
    duration: "4 months",
    stipend: "AED 5,500/month",
    deadline: "June 30, 2023",
    requirements: "Computer Science or IT students with programming experience",
    description: "Work with cutting-edge technologies like AI, IoT, and 5G applications while developing solutions for real business challenges.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Healthcare Management Trainee",
    company: "Cleveland Clinic Abu Dhabi",
    location: "Abu Dhabi",
    duration: "6 months",
    stipend: "AED 4,800/month",
    deadline: "July 15, 2023",
    requirements: "Healthcare Management or related field students",
    description: "Learn about hospital administration, patient care coordination, and healthcare operations in a world-class medical facility.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Tourism & Hospitality Internship",
    company: "Jumeirah Group",
    location: "Dubai",
    duration: "3 months",
    stipend: "AED 4,000/month",
    deadline: "August 1, 2023",
    requirements: "Hospitality, Tourism or Business students",
    description: "Gain exposure to luxury hospitality operations, guest services, and event management in one of UAE's premier hotel chains.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Media & Communications Program",
    company: "MBC Group",
    location: "Dubai",
    duration: "4 months",
    stipend: "AED 4,200/month",
    deadline: "July 10, 2023",
    requirements: "Media, Communication or Journalism students",
    description: "Develop skills in content creation, digital media strategy, and broadcasting in the Arab world's largest media company.",
    image: "/placeholder.svg"
  }
];

const Internships = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emirati-deepBrown mb-2">Internship Programs</h1>
          <p className="text-emirati-deepBrown/70">
            Discover internship opportunities specifically designed for UAE nationals to gain practical experience and develop professional skills.
          </p>
        </div>

        <div className="bg-emirati-sandBeige/20 p-6 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-emirati-oasisGreen">Why Internships Matter</h2>
              <p className="text-emirati-deepBrown/80 mt-1">
                Internships provide valuable workplace experience and help bridge the gap between academic learning and professional practice.
              </p>
            </div>
            <Button className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
              Register for Alerts
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-emirati-deepBrown mb-6">Featured Opportunities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {internshipsData.map((internship) => (
            <Card key={internship.id} className="overflow-hidden hover:shadow-md transition-all border-emirati-sandBeige hover:border-emirati-oasisGreen/50">
              <CardHeader className="p-0">
                <div className="h-40 overflow-hidden bg-emirati-sandBeige/20">
                  <img 
                    src={internship.image} 
                    alt={internship.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-emirati-deepBrown">{internship.title}</h3>
                <p className="text-emirati-oasisGreen font-medium">{internship.company}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-emirati-camelBrown mr-1" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-emirati-camelBrown mr-1" />
                    <span>{internship.duration}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-3">{internship.description}</p>
                
                <div className="mt-3">
                  <div className="text-sm font-medium">Requirements:</div>
                  <div className="text-sm text-muted-foreground">{internship.requirements}</div>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-emirati-sandBeige/10 flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-medium">Deadline:</span> {internship.deadline}
                </div>
                <Button 
                  size="sm" 
                  className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                >
                  Apply <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-emirati-desertGold/10 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-emirati-deepBrown mb-3">How To Maximize Your Internship Experience</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emirati-oasisGreen/20 flex items-center justify-center text-emirati-oasisGreen">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Build Connections</h3>
                <p className="text-sm text-muted-foreground">Network with professionals to develop relationships that can benefit your future career.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emirati-oasisGreen/20 flex items-center justify-center text-emirati-oasisGreen">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Learn Continuously</h3>
                <p className="text-sm text-muted-foreground">Ask questions, take notes, and seek feedback to enhance your learning experience.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emirati-oasisGreen/20 flex items-center justify-center text-emirati-oasisGreen">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Understand the Culture</h3>
                <p className="text-sm text-muted-foreground">Observe and adapt to the company's culture to demonstrate your fit as a potential employee.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Internships;
