
import React from "react";

const DecorativeElement: React.FC = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="h-px w-40 bg-emirati-desertGold relative">
        <div className="absolute -bottom-2 h-1 w-full bg-emirati-oasisGreen"></div>
        <div className="absolute -top-2 h-1 w-full bg-emirati-oasisGreen"></div>
      </div>
    </div>
  );
};

export default DecorativeElement;
