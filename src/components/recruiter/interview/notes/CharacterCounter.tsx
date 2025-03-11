
import React from "react";

interface CharacterCounterProps {
  current: number;
  maximum: number;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ current, maximum }) => {
  const isApproachingLimit = current > maximum * 0.8;
  const isAtLimit = current === maximum;

  return (
    <div className="flex justify-end text-xs">
      <span
        className={`
          ${isAtLimit ? "text-red-500 font-semibold" : ""}
          ${isApproachingLimit && !isAtLimit ? "text-amber-500" : ""}
          ${!isApproachingLimit && !isAtLimit ? "text-muted-foreground" : ""}
        `}
      >
        {current}/{maximum} characters
      </span>
    </div>
  );
};

export default CharacterCounter;
