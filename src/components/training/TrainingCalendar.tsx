
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Info, TreePalm, Flag, Ship, Book } from "lucide-react";
import { UaeGeometricPattern } from "@/components/ui/uae";

interface TrainingEvent {
  id: string;
  title: string;
  centerName: string;
  date: Date;
  type: "class" | "assessment" | "deadline";
  culturalTheme?: string;
}

// Mock data enhanced with cultural themes
const mockEvents: TrainingEvent[] = [
  {
    id: "1",
    title: "Digital Marketing Introduction",
    centerName: "Emirates Skills Hub",
    date: new Date(2023, 10, 15),
    type: "class",
    culturalTheme: "Desert Innovation"
  },
  {
    id: "2",
    title: "Project Management Assessment",
    centerName: "UAE Career Development Center",
    date: new Date(2023, 10, 20),
    type: "assessment",
    culturalTheme: "Pearl Diving Tradition"
  },
  {
    id: "3",
    title: "Data Science Assignment Due",
    centerName: "Emirates Skills Hub",
    date: new Date(2023, 10, 25),
    type: "deadline",
    culturalTheme: "Falcon Precision"
  }
];

const TrainingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<TrainingEvent[]>(mockEvents);

  // Get events for selected date
  const eventsForSelectedDate = selectedDate 
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  // Create a function to get className for dates with events
  const getDayClassName = (date: Date) => {
    const hasEvent = events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
    
    return hasEvent ? "bg-emirati-oasisGreen/20 text-emirati-deepBrown font-medium rounded-full" : "";
  };

  // Get the cultural theme icon based on the theme name
  const getCulturalThemeIcon = (themeName?: string) => {
    if (!themeName) return <Info className="h-3 w-3" />;
    
    switch (themeName.toLowerCase()) {
      case "desert innovation":
        return <TreePalm className="h-3 w-3" />;
      case "pearl diving tradition":
        return <Ship className="h-3 w-3" />;
      case "falcon precision":
        return <Flag className="h-3 w-3" />;
      default:
        return <Book className="h-3 w-3" />;
    }
  };

  return (
    <Card className="w-full border-emirati-desertGold/20 relative overflow-hidden">
      <UaeGeometricPattern type="geometric" position="corner" opacity={0.05} />
      
      <CardHeader className="pb-3 border-b border-emirati-desertGold/20">
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
          Training Calendar
        </CardTitle>
        <CardDescription>View your upcoming classes, assessments, and deadlines</CardDescription>
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
              modifiers={{
                event: (date) => events.some(
                  (event) => 
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear()
                )
              }}
              modifiersStyles={{
                event: { fontWeight: 'bold' }
              }}
              components={{
                DayContent: ({ date }) => (
                  <div className={getDayClassName(date)}>
                    {date.getDate()}
                  </div>
                ),
              }}
            />
            
            {/* Islamic lunar calendar note - cultural enhancement */}
            <div className="mt-4 p-3 bg-emirati-sandBeige/30 rounded-md text-xs text-center border border-emirati-desertGold/10">
              <p className="text-emirati-deepBrown">
                <span className="font-medium">Cultural Note:</span> Traditional Emirati calendar followed lunar cycles, with the new moon marking the beginning of each month.
              </p>
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
              
              {eventsForSelectedDate.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-3 opacity-20">
                    <UaeGeometricPattern type="arabesque" className="w-full h-full" />
                  </div>
                  <p className="text-gray-500">No events scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {eventsForSelectedDate.map(event => (
                    <div 
                      key={event.id} 
                      className="border-l-4 pl-3 py-2 mb-2 bg-white shadow-sm rounded-r-md transition-all hover:translate-x-1" 
                      style={{ 
                        borderLeftColor: 
                          event.type === "class" ? "#10b981" : 
                          event.type === "assessment" ? "#f59e0b" : 
                          "#ef4444" 
                      }}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        {event.culturalTheme && (
                          <div className="bg-emirati-sandBeige/30 px-2 py-0.5 rounded text-xs text-emirati-deepBrown flex items-center">
                            {getCulturalThemeIcon(event.culturalTheme)}
                            <span className="ml-1">{event.culturalTheme}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{event.centerName}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full" 
                          style={{ 
                            background: 
                              event.type === "class" ? "rgba(16, 185, 129, 0.1)" : 
                              event.type === "assessment" ? "rgba(245, 158, 11, 0.1)" : 
                              "rgba(239, 68, 68, 0.1)",
                            color: 
                              event.type === "class" ? "rgb(16, 185, 129)" : 
                              event.type === "assessment" ? "rgb(245, 158, 11)" : 
                              "rgb(239, 68, 68)"
                          }}
                        >
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Cultural proverb at the bottom */}
              {eventsForSelectedDate.length > 0 && (
                <div className="mt-6 pt-4 border-t border-emirati-sandBeige text-center">
                  <p className="text-xs italic text-emirati-deepBrown/60">
                    "Time is like a sword, if you don't cut it, it will cut you." - Arabic proverb
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingCalendar;
