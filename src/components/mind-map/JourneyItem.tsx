
import React from "react";

interface JourneyStep {
  title: string;
  items: string[];
}

interface JourneyItemProps {
  step: JourneyStep;
  index: number;
}

const JourneyItem: React.FC<JourneyItemProps> = ({ step, index }) => {
  return (
    <div className="border border-emirati-sandBeige rounded-lg p-6 shadow-sm bg-white">
      <div className="flex items-start gap-4">
        <div className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {index + 1}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-emirati-deepBlue">{step.title}</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {step.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JourneyItem;
