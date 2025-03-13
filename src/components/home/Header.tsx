
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Map, User, Search, Briefcase, GraduationCap, Database, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-emirati-sandBeige/20 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-emirati-desertRed">
            Emirati Journey
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/student-dashboard" className="text-gray-700 hover:text-emirati-oasisGreen transition">
            Dashboard
          </Link>
          <Link to="/career-passport" className="text-gray-700 hover:text-emirati-oasisGreen transition">
            Career Passport
          </Link>
          <Link to="/job-applications" className="text-gray-700 hover:text-emirati-oasisGreen transition">
            Jobs
          </Link>
          <Link to="/training-centers" className="text-gray-700 hover:text-emirati-oasisGreen transition">
            Training
          </Link>
          <Link to="/mindmap" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center">
            <Map className="w-4 h-4 mr-1" /> Mindmap
          </Link>
          <Link to="/data-entry" className="text-gray-700 hover:text-emirati-oasisGreen transition flex items-center">
            <Database className="w-4 h-4 mr-1" /> Data Entry
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Briefcase className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>
                <Link to="/job-applications" className="w-full">My Applications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/job-location-matching" className="w-full">Job Locations</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <GraduationCap className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>
                <Link to="/training-centers" className="w-full">Training Programs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/assessment-centers" className="w-full">Assessment Centers</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="hidden md:flex items-center">
            <User className="mr-2 h-4 w-4" /> Sign In
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white border-t border-gray-100">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/student-dashboard" 
              className="text-gray-700 hover:text-emirati-oasisGreen transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/career-passport" 
              className="text-gray-700 hover:text-emirati-oasisGreen transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Career Passport
            </Link>
            <Link 
              to="/job-applications" 
              className="text-gray-700 hover:text-emirati-oasisGreen transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/training-centers" 
              className="text-gray-700 hover:text-emirati-oasisGreen transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Training
            </Link>
            <Link 
              to="/mindmap" 
              className="text-gray-700 hover:text-emirati-oasisGreen transition py-2 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map className="w-4 h-4 mr-1" /> Mindmap
            </Link>
            <Link 
              to="/data-entry" 
              className="text-gray-700 hover:text-emirati-oasisGreen transition py-2 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Database className="w-4 h-4 mr-1" /> Data Entry
            </Link>
            <Button variant="outline" className="flex items-center justify-center w-full mt-2">
              <User className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
