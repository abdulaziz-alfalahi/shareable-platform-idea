
import React from "react";

interface DecorativeElementProps {
  className?: string;
}

const DecorativeElement: React.FC<DecorativeElementProps> = ({ className }) => {
  return (
    <div className={`flex justify-center mb-8 decorative-element ${className || ""}`}>
      <div className="h-px w-40 bg-emirati-desertGold relative">
        <div className="absolute -bottom-2 h-1 w-full bg-emirati-oasisGreen"></div>
        <div className="absolute -top-2 h-1 w-full bg-emirati-oasisGreen"></div>
      </div>
    </div>
  );
};

export default DecorativeElement;
