
import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderActions: React.FC = () => {
  return (
    <>
      <Button variant="ghost" size="icon" className="hidden sm:flex">
        <Search className="h-5 w-5" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
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
          <Button variant="ghost" size="icon" className="hidden sm:flex">
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
    </>
  );
};

export default HeaderActions;
