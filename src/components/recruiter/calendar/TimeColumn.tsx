
import React from "react";
import { TIME_SLOTS } from "@/utils/interviewUtils";

const TimeColumn: React.FC = () => {
  return (
    <div className="space-y-4 pt-10">
      {TIME_SLOTS.map((time, idx) => (
        <div
          key={idx}
          className="h-16 flex items-center justify-end pr-2 text-sm text-muted-foreground"
        >
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeColumn;
