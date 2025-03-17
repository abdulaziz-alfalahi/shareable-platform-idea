
import React from "react";

interface PassportErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const PassportError: React.FC<PassportErrorProps> = ({ errorMessage, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
      <p className="text-red-700">{errorMessage}</p>
      <button 
        className="mt-2 bg-emirati-oasisGreen text-white px-4 py-2 rounded"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
};

export default PassportError;
