
import React from 'react';
import { Loader2 } from 'lucide-react';

const PathSelectionLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <Loader2 className="h-8 w-8 animate-spin text-emirati-oasisGreen" />
      <span className="ml-2 text-lg">Loading career paths...</span>
    </div>
  );
};

export default PathSelectionLoading;
