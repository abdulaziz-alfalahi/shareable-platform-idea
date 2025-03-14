
import React from "react";
import { Link } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./theme/ThemeToggle";

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navLinks = [
  { to: "/student-dashboard", label: "Dashboard" },
  { to: "/career-passport", label: "Career Passport" },
  { to: "/job-applications", label: "Jobs" },
  { to: "/training-centers", label: "Training" },
  { to: "/mindmap", label: "Mindmap" },
  { to: "/data-entry", label: "Data Entry" },
];

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, setIsOpen }) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

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
      <SheetContent side="left" className="w-[85%] max-w-[300px] pt-10">
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
            <Link to="/" onClick={() => setIsOpen(false)}>
              Emirati Journey
            </Link>
          </div>

          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.to}>
                <Link 
                  to={link.to} 
                  className="text-gray-700 hover:text-emirati-oasisGreen transition py-2 px-1 border-b border-emirati-sandBeige/20"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <div className="mt-10">
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
