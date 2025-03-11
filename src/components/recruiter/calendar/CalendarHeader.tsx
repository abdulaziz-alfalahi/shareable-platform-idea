
import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

interface CalendarHeaderProps {
  currentWeekStart: Date;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentWeekStart,
  handlePreviousWeek,
  handleNextWeek,
}) => {
  return (
    <div className="flex items-center justify-between pb-2">
      <CardTitle>Week of {format(currentWeekStart, "MMMM d, yyyy")}</CardTitle>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
