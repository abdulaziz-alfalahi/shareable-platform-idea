
import { addDays, format, startOfWeek, addWeeks, subWeeks, isSameDay, isWithinInterval } from "date-fns";

// Sample interview data
// In a real application, this would come from your backend
export const SAMPLE_INTERVIEWS = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    position: "UI/UX Designer",
    date: new Date(2023, 11, 5, 10, 0),
    duration: 60, // in minutes
    status: "scheduled"
  },
  {
    id: 2,
    candidateName: "Mohammed Al Farsi",
    position: "Data Scientist",
    date: new Date(2023, 11, 7, 14, 30),
    duration: 45,
    status: "scheduled"
  },
  {
    id: 3,
    candidateName: "Priya Sharma",
    position: "Software Engineer",
    date: new Date(2023, 11, 8, 11, 0),
    duration: 60,
    status: "scheduled"
  },
  {
    id: 4,
    candidateName: "Alex Wong",
    position: "Project Manager",
    date: new Date(2023, 11, 12, 15, 0),
    duration: 45,
    status: "scheduled"
  }
];

export const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

export const getInterviewsForDay = (day: Date) => {
  return SAMPLE_INTERVIEWS.filter(interview => 
    isSameDay(interview.date, day)
  );
};

export const getInterviewsForTimeSlot = (day: Date, timeSlot: string) => {
  const [hourStr, minuteStr] = timeSlot.split(':');
  const isPM = timeSlot.includes('PM');
  let hour = parseInt(hourStr);
  
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  
  const minute = parseInt(minuteStr);
  
  const startTime = new Date(day);
  startTime.setHours(hour, minute, 0, 0);
  
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + 30);
  
  return SAMPLE_INTERVIEWS.filter(interview => {
    const interviewEnd = new Date(interview.date);
    interviewEnd.setMinutes(interviewEnd.getMinutes() + interview.duration);
    
    return isWithinInterval(startTime, {
      start: interview.date,
      end: interviewEnd
    }) || isWithinInterval(interview.date, {
      start: startTime,
      end: endTime
    });
  });
};
