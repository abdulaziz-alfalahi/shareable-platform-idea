
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, School, Building, GraduationCap, Bell } from "lucide-react";
import { UaeGeometricPattern } from "@/components/ui/uae";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingCamp } from "@/components/career/simulator/recommendations";
import { notifyStudent, notifyRecruiter } from "@/utils/notification";

// Types for our summer camps
interface SummerCamp {
  id: string;
  name: string;
  provider: string;
  providerType: "school" | "university" | "company";
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  ageRange: string;
  skills: string[];
}

// Mock data for summer camps
const mockSummerCamps: SummerCamp[] = [
  {
    id: "1",
    name: "Coding Bootcamp for Kids",
    provider: "Al Najah School",
    providerType: "school",
    startDate: new Date(2023, 5, 10), // June 10
    endDate: new Date(2023, 5, 21), // June 21
    location: "Dubai",
    description: "Learn programming basics through fun interactive projects",
    ageRange: "8-12",
    skills: ["Programming", "Problem-solving", "Teamwork"]
  },
  {
    id: "2",
    name: "Robotics Summer Program",
    provider: "UAE University",
    providerType: "university",
    startDate: new Date(2023, 6, 1), // July 1
    endDate: new Date(2023, 6, 15), // July 15
    location: "Abu Dhabi",
    description: "Build and program robots while learning engineering principles",
    ageRange: "13-16",
    skills: ["Robotics", "Engineering", "Programming"]
  },
  {
    id: "3",
    name: "Young Entrepreneurs Workshop",
    provider: "Emirates NBD",
    providerType: "company",
    startDate: new Date(2023, 6, 20), // July 20
    endDate: new Date(2023, 7, 5), // August 5
    location: "Sharjah",
    description: "Learn business basics and develop entrepreneurial mindset",
    ageRange: "14-18",
    skills: ["Business", "Leadership", "Innovation"]
  },
  {
    id: "4",
    name: "Art & Design Summer Studio",
    provider: "Dubai Arts Academy",
    providerType: "school",
    startDate: new Date(2023, 7, 10), // August 10
    endDate: new Date(2023, 7, 24), // August 24
    location: "Dubai",
    description: "Explore various art forms and design techniques",
    ageRange: "10-15",
    skills: ["Creativity", "Design", "Visual Arts"]
  }
];

const SummerCampsCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [camps, setCamps] = useState<SummerCamp[]>(mockSummerCamps);
  const [activeFilter, setActiveFilter] = useState<"all" | "school" | "university" | "company">("all");

  // Filter camps by selected date
  const campsForSelectedDate = selectedDate 
    ? camps.filter(camp => 
        selectedDate >= camp.startDate &&
        selectedDate <= camp.endDate
      )
    : [];

  // Filter camps by provider type
  const filteredCamps = activeFilter === "all" 
    ? campsForSelectedDate 
    : campsForSelectedDate.filter(camp => camp.providerType === activeFilter);

  // Create a function to get className for dates with camps
  const getDayClassName = (date: Date) => {
    const hasCamp = camps.some(camp => 
      date >= camp.startDate &&
      date <= camp.endDate
    );
    
    return hasCamp ? "bg-emirati-oasisGreen/20 text-emirati-deepBrown font-medium rounded-full" : "";
  };

  // Simulate notifications for demo purpose
  useEffect(() => {
    setTimeout(() => {
      notifyStudent({
        title: "New Summer Camp Available",
        description: "Coding Bootcamp for Kids at Al Najah School",
      });
    }, 3000);
  }, []);

  const handleSubscribe = (campId: string) => {
    notifyStudent({
      title: "Successfully Subscribed",
      description: "You will receive updates about this summer camp",
    });
  };

  return (
    <Card className="w-full border-emirati-desertGold/20 relative overflow-hidden">
      <UaeGeometricPattern type="geometric" position="corner" opacity={0.05} />
      
      <CardHeader className="pb-3 border-b border-emirati-desertGold/20">
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
          Summer Knowledge Camps
        </CardTitle>
        <CardDescription>Explore summer learning opportunities for students offered by schools, universities, and companies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mt-4">
          <div className="md:col-span-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-3 border-emirati-sandBeige"
              modifiersClassNames={{
                selected: "bg-emirati-oasisGreen text-white",
              }}
              components={{
                DayContent: ({ date }) => (
                  <div className={getDayClassName(date)}>
                    {date.getDate()}
                  </div>
                ),
              }}
            />
            
            <div className="mt-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" onClick={() => setActiveFilter("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger value="school" onClick={() => setActiveFilter("school")}>
                  <School className="h-3 w-3 mr-1" />
                  Schools
                </TabsTrigger>
                <TabsTrigger value="university" onClick={() => setActiveFilter("university")}>
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Universities
                </TabsTrigger>
                <TabsTrigger value="company" onClick={() => setActiveFilter("company")}>
                  <Building className="h-3 w-3 mr-1" />
                  Companies
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className="border rounded-md h-full p-4 border-emirati-sandBeige relative">
              <div className="absolute top-3 right-3 opacity-5">
                <UaeGeometricPattern type="mashrabiya" size="sm" />
              </div>
              
              <h3 className="font-medium mb-4 font-serif text-emirati-deepBrown">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              </h3>
              
              {filteredCamps.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-3 opacity-20">
                    <UaeGeometricPattern type="arabesque" className="w-full h-full" />
                  </div>
                  <p className="text-gray-500">No summer camps available for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCamps.map((camp, index) => (
                    <div key={camp.id} className="bg-white rounded-md p-4 shadow-sm border border-emirati-sandBeige/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-emirati-deepBrown">{camp.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center">
                            {camp.providerType === "school" && <School className="h-3 w-3 mr-1" />}
                            {camp.providerType === "university" && <GraduationCap className="h-3 w-3 mr-1" />}
                            {camp.providerType === "company" && <Building className="h-3 w-3 mr-1" />}
                            {camp.provider} • {camp.location}
                          </p>
                        </div>
                        <span className="text-xs bg-emirati-sandBeige/50 px-2 py-1 rounded-full">
                          Ages {camp.ageRange}
                        </span>
                      </div>
                      
                      <p className="text-sm my-2">{camp.description}</p>
                      
                      <div className="flex flex-wrap gap-1 my-2">
                        {camp.skills.map(skill => (
                          <span key={skill} className="text-xs bg-emirati-oasisGreen/10 text-emirati-oasisGreen px-2 py-0.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-emirati-sandBeige/30">
                        <span className="text-xs text-muted-foreground">
                          {format(camp.startDate, "MMM d")} - {format(camp.endDate, "MMM d, yyyy")}
                        </span>
                        <Button size="sm" variant="outline" 
                          className="text-xs bg-emirati-oasisGreen/10 text-emirati-oasisGreen hover:bg-emirati-oasisGreen hover:text-white border-emirati-oasisGreen/30"
                          onClick={() => handleSubscribe(camp.id)}>
                          <Bell className="h-3 w-3 mr-1" />
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummerCampsCalendar;
