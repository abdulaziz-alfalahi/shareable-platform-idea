
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Menu, X, Home, Briefcase, GraduationCap, Building, Map, Database, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./theme/ThemeToggle";

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, setIsOpen }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/student-dashboard", label: "Dashboard", icon: <Home className="h-5 w-5 mr-3" /> },
    { to: "/career-passport", label: "Career Passport", icon: <GraduationCap className="h-5 w-5 mr-3" /> },
    { to: "/job-applications", label: "Jobs", icon: <Briefcase className="h-5 w-5 mr-3" /> },
    { to: "/training-centers", label: "Training", icon: <Building className="h-5 w-5 mr-3" /> },
    { to: "/student-dashboard?tab=mentors", label: "Mentors", icon: <User className="h-5 w-5 mr-3" /> },
    { to: "/mindmap", label: "Mindmap", icon: <Map className="h-5 w-5 mr-3" /> },
    { to: "/data-entry", label: "Data Entry", icon: <Database className="h-5 w-5 mr-3" /> },
  ];

  if (!isMobile) return null;

  const handleNavLinkClick = (to: string) => {
    navigate(to);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] max-w-[300px] pt-10 bg-white">
        <div className="flex flex-col h-full">
          <div className="absolute right-4 top-4">
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>

          <div className="text-2xl font-bold text-emirati-desertRed mb-8">
            <div onClick={() => handleNavLinkClick('/')} className="cursor-pointer">
              Emirati Journey
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <div 
                key={link.to}
                className="flex items-center text-gray-700 hover:text-emirati-oasisGreen hover:bg-emirati-sandBeige/10 transition py-3 px-3 rounded-md cursor-pointer"
                onClick={() => handleNavLinkClick(link.to)}
              >
                {link.icon}
                {link.label}
              </div>
            ))}
          </nav>

          <div className="mt-10 px-3">
            <ThemeToggle />
          </div>

          <div className="mt-auto mb-6">
            <p className="text-sm text-emirati-deepBrown/60">
              Emirati Journey © 2024
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
