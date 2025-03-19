
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emirati-sandBeige/10 px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-emirati-oasisGreen">Page Not Found</h1>
        <p className="text-lg mb-8 text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <Home size={18} />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
