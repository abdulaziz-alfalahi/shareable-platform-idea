
import React from "react";
import { Check, Save } from "lucide-react";

interface AutosaveIndicatorProps {
  isSaving: boolean;
  lastSaved: Date | null;
}

const AutosaveIndicator: React.FC<AutosaveIndicatorProps> = ({ isSaving, lastSaved }) => {
  if (!lastSaved && !isSaving) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center text-xs text-muted-foreground">
      {isSaving ? (
        <>
          <Save className="h-3 w-3 mr-1 animate-pulse" />
          <span>Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <Check className="h-3 w-3 mr-1 text-green-500" />
          <span>Saved at {formatTime(lastSaved)}</span>
        </>
      ) : null}
    </div>
  );
};

export default AutosaveIndicator;
