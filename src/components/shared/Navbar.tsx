
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getDashboardByRole = (role: string) => {
    switch (role) {
      case "student":
      case "school_student":
      case "university_student":
        return "/student-dashboard";
      case "advisor":
      case "coach":
        return "/advisor-dashboard";
      case "recruiter":
      case "internship_coordinator":
        return "/recruiter-dashboard";
      case "admin":
      case "leadership":
        return "/admin-dashboard";
      case "jobseeker":
        return "/job-applications";
      default:
        return "/";
    }
  };

  return (
    <header className="bg-emirati-oasisGreen text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              UAE Career Platform
            </Link>
          </div>

          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="px-3 py-2 hover:text-opacity-75 transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link 
                  to={getDashboardByRole(user.role)} 
                  className="px-3 py-2 hover:text-opacity-75 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/job-applications" 
                  className="px-3 py-2 hover:text-opacity-75 transition-colors"
                >
                  Jobs
                </Link>
                <Link 
                  to={`/career-passport/${user.id}`} 
                  className="px-3 py-2 hover:text-opacity-75 transition-colors"
                >
                  Career Passport
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {!user ? (
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-emirati-oasisGreen"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="p-0 bg-transparent hover:bg-white/10 text-white"
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-emirati-turquoise text-white">
                        {user.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="mr-1">{user.name}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`/career-passport/${user.id}`)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Career Passport</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
