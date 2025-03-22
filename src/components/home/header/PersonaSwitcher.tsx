
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, GraduationCap, Briefcase, School, Building, Target, Database, ChevronDown, Home, Compass, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const personas = [
  { id: "student", name: "Student", path: "/student-dashboard", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { id: "parent", name: "Parent", path: "/parent-dashboard", icon: <User className="h-4 w-4 mr-2" /> },
  { id: "advisor", name: "Career Advisor", path: "/advisor-dashboard", icon: <User className="h-4 w-4 mr-2" /> },
  { id: "recruiter", name: "Recruiter", path: "/recruiter-dashboard", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { id: "school", name: "School Administrator", path: "/data-entry", icon: <School className="h-4 w-4 mr-2" /> },
  { id: "university", name: "University", path: "/data-entry", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { id: "training", name: "Training Center", path: "/training-centers", icon: <Building className="h-4 w-4 mr-2" /> },
  { id: "assessment", name: "Assessment Center", path: "/assessment-centers", icon: <Target className="h-4 w-4 mr-2" /> },
  { id: "admin", name: "System Administrator", path: "/admin-dashboard", icon: <Database className="h-4 w-4 mr-2" /> },
];

interface PersonaSwitcherProps {
  currentPersona: typeof personas[0];
  setCurrentPersona: (persona: typeof personas[0]) => void;
}

const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({ currentPersona, setCurrentPersona }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handlePersonaChange = (persona: typeof personas[0]) => {
    setCurrentPersona(persona);
    navigate(persona.path);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCareerPassportClick = () => {
    navigate('/career-passport');
  };

  const handleCareerExplorationClick = () => {
    navigate('/career-exploration');
  };
  
  const handleMentorsClick = () => {
    navigate('/student-dashboard?tab=mentors');
  };

  const handleResumeBuilderClick = () => {
    navigate('/resume-builder');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center">
          {currentPersona.icon}
          <span className="hidden sm:inline-block ml-1">{currentPersona.name}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white w-56">
        <DropdownMenuItem className="py-2 px-3 text-sm text-muted-foreground" disabled>
          Switch Persona
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          key="home" 
          className="py-2"
          onClick={handleHomeClick}
        >
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            <span>Home Page</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          key="career-passport" 
          className="py-2"
          onClick={handleCareerPassportClick}
        >
          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-2" />
            <span>Career Passport</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          key="career-exploration" 
          className="py-2"
          onClick={handleCareerExplorationClick}
        >
          <div className="flex items-center">
            <Compass className="h-4 w-4 mr-2" />
            <span>Career Exploration</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          key="resume-builder" 
          className="py-2"
          onClick={handleResumeBuilderClick}
        >
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            <span>Resume Builder</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          key="mentors" 
          className="py-2"
          onClick={handleMentorsClick}
        >
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>Mentors</span>
          </div>
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
  );
};

export default PersonaSwitcher;
export { personas };
