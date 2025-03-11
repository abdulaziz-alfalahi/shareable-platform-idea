
import React from "react";

interface LocationSuggestionsProps {
  suggestions: string[];
  isVisible: boolean;
  onSelect: (location: string) => void;
}

const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({
  suggestions,
  isVisible,
  onSelect,
}) => {
  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-gray-700"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSuggestions;
