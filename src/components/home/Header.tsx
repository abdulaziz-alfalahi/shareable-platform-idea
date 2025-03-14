import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Map, User, Search, Briefcase, GraduationCap, Database, Menu, X, ChevronDown, School, Building, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

// Define our personas
const personas = [
  { id: "student", name: "Student", path: "/student-dashboard", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { id: "parent", name: "Parent", path: "/student-dashboard", icon: <User className="h-4 w-4 mr-2" /> },
  { id: "advisor", name: "Career Advisor", path: "/advisor-dashboard", icon: <User className="h-4 w-4 mr-2" /> },
  { id: "recruiter", name: "Recruiter", path: "/recruiter-dashboard", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { id: "school", name: "School Administrator", path: "/data-entry", icon: <School className="h-4 w-4 mr-2" /> },
  { id: "university", name: "University", path: "/data-entry", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { id: "training", name: "Training Center", path: "/training-centers", icon: <Building className="h-4 w-4 mr-2" /> },
  { id: "assessment", name: "Assessment Center", path: "/assessment-centers", icon: <Target className="h-4 w-4 mr-2" /> },
  { id: "admin", name: "System Administrator", path: "/admin-dashboard", icon: <Database className="h-4 w-4 mr-2" /> },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPersona, setCurrentPersona] = useState(personas[0]);
  const navigate = useNavigate();

  const handlePersonaChange = (persona) => {
    setCurrentPersona(persona);
    navigate(persona.path);
  };

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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                {currentPersona.icon}
                {currentPersona.name}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white w-56">
              <DropdownMenuItem className="py-2 px-3 text-sm text-muted-foreground" disabled>
                Switch Persona
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {personas.map((persona) => (
                <DropdownMenuItem 
                  key={persona.id} 
                  className={`py-2 ${currentPersona.id === persona.id ? 'bg-emirati-sandBeige/10' : ''}`}
                  onClick={() => handlePersonaChange(persona)}
                >
                  <div className="flex items-center">
                    {persona.icon}
                    <span>{persona.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
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
            
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-2">Switch Persona</p>
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  className={`flex items-center w-full text-left py-2 px-2 rounded-md ${
                    currentPersona.id === persona.id ? 'bg-emirati-sandBeige/20 text-emirati-oasisGreen' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    handlePersonaChange(persona);
                    setMobileMenuOpen(false);
                  }}
                >
                  {persona.icon}
                  <span>{persona.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
