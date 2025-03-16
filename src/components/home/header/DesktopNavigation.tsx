
import React from "react";
import { Link } from "react-router-dom";
import { Home, Map, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface DesktopNavigationProps {
  handleHomeClick: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ handleHomeClick }) => {
  const { t } = useLanguage();
  
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Button 
        variant="ghost" 
        className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center"
        onClick={handleHomeClick}
      >
        <Home className="w-4 h-4 mr-1" /> {t('home')}
      </Button>
      <Link to="/student-dashboard" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        {t('dashboard')}
      </Link>
      <Link to="/career-passport" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        {t('careerPassport')}
      </Link>
      <Link to="/job-applications" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        {t('jobs')}
      </Link>
      <Link to="/training-centers" className="text-gray-700 hover:text-emirati-oasisGreen transition">
        {t('training')}
      </Link>
      <Link to="/mindmap" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center">
        <Map className="w-4 h-4 mr-1" /> {t('mindmap')}
      </Link>
      <Link to="/data-entry" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center">
        <Database className="w-4 h-4 mr-1" /> {t('dataEntry')}
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
