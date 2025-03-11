
import React from "react";
import { Link } from "react-router-dom";
import { Map, User, Search, Briefcase, GraduationCap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
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
          <Button variant="ghost" size="icon">
            <Briefcase className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <GraduationCap className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="hidden md:flex items-center">
            <User className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
