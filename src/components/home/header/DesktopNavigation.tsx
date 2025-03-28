
import React from "react";
import { Link } from "react-router-dom";
import { Home, Map, Database, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
interface DesktopNavigationProps {
  handleHomeClick: () => void;
}
const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  handleHomeClick
}) => {
  return <nav className="hidden md:flex items-center space-x-6">
      <Button variant="ghost" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center" onClick={handleHomeClick}>
        <Home className="w-4 h-4 mr-1" /> Home
      </Button>
      <Link to="/student-dashboard" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        Dashboard
      </Link>
      <Link to="/career-passport" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        Career Passport
      </Link>
      <Link to="/job-applications" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        Jobs
      </Link>
      <Link to="/job-location-matching" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center">
        <MapPin className="w-4 h-4 mr-1" /> Job Map
      </Link>
      <Link to="/training-centers" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        Training
      </Link>
      <Link to="/resume-builder" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center">
        <FileText className="w-4 h-4 mr-1" /> Resume Builder
      </Link>
      <Link to="/data-entry" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center">
        <Database className="w-4 h-4 mr-1" /> Data Entry
      </Link>
    </nav>;
};
export default DesktopNavigation;
