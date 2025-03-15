
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Info } from "lucide-react";

interface TrainingEvent {
  id: string;
  title: string;
  centerName: string;
  date: Date;
  type: "class" | "assessment" | "deadline";
}

// Mock data
const mockEvents: TrainingEvent[] = [
  {
    id: "1",
    title: "Digital Marketing Introduction",
    centerName: "Emirates Skills Hub",
    date: new Date(2023, 10, 15),
    type: "class"
  },
  {
    id: "2",
    title: "Project Management Assessment",
    centerName: "UAE Career Development Center",
    date: new Date(2023, 10, 20),
    type: "assessment"
  },
  {
    id: "3",
    title: "Data Science Assignment Due",
    centerName: "Emirates Skills Hub",
    date: new Date(2023, 10, 25),
    type: "deadline"
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
          Training Calendar
        </CardTitle>
        <CardDescription>View your upcoming classes, assessments, and deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          <div className="md:col-span-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-3"
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
          </div>
          
          <div className="md:col-span-4">
            <div className="border rounded-md h-full p-4">
              <h3 className="font-medium mb-4">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              </h3>
              
              {eventsForSelectedDate.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No events scheduled for this date</p>
              ) : (
                <div className="space-y-3">
                  {eventsForSelectedDate.map(event => (
                    <div key={event.id} className="border-l-4 pl-3 py-2 mb-2" 
                      style={{ 
                        borderLeftColor: 
                          event.type === "class" ? "#10b981" : 
                          event.type === "assessment" ? "#f59e0b" : 
                          "#ef4444" 
                      }}
                    >
                      <h4 className="font-medium">{event.title}</h4>
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingCalendar;
