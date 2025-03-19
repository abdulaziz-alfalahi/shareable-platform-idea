
import React from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Building2, 
  Map,
  Award,
  X 
} from "lucide-react";
import { Button } from "../ui/button";
import { navItems } from "./header/DesktopNavigation";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center p-3 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            {item.icon && <item.icon className="h-5 w-5 mr-3 text-emirati-desertRed" />}
            <span>{item.label}</span>
          </Link>
        ))}
        
        <div className="pt-4 mt-4 border-t">
          <Link
            to="/student-dashboard"
            className="flex items-center p-3 rounded-md bg-emirati-oasisGreen text-white"
            onClick={onClose}
          >
            <GraduationCap className="h-5 w-5 mr-3" />
            <span>Student Dashboard</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
