
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Globe } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Globe className={`h-6 w-6 mr-2 ${isScrolled ? 'text-emirati-oasisGreen' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-emirati-oasisGreen' : 'text-white'}`}>
              Emirati Gateway
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`hover:underline ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              Home
            </Link>
            <Link to="/student-dashboard" className={`hover:underline ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              Students
            </Link>
            <Link to="/recruiter-dashboard" className={`hover:underline ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              Recruiters
            </Link>
            <Link to="/training-centers" className={`hover:underline ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              Training
            </Link>
            <Link to="/advisor-dashboard" className={`hover:underline ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              Advisors
            </Link>
          </nav>

          {/* Login/Signup Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className={`border ${
                isScrolled 
                  ? 'border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10' 
                  : 'border-white text-white hover:bg-white/10'
              }`}
            >
              Log In
            </Button>
            <Button 
              className={
                isScrolled 
                  ? 'bg-emirati-oasisGreen text-white hover:bg-emirati-oasisGreen/90' 
                  : 'bg-white text-emirati-oasisGreen hover:bg-white/90'
              }
            >
              <User className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-emirati-oasisGreen' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-emirati-oasisGreen' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`px-2 py-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/student-dashboard"
                className={`px-2 py-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Students
              </Link>
              <Link
                to="/recruiter-dashboard"
                className={`px-2 py-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Recruiters
              </Link>
              <Link
                to="/training-centers"
                className={`px-2 py-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Training
              </Link>
              <Link
                to="/advisor-dashboard"
                className={`px-2 py-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Advisors
              </Link>
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex-1 ${
                    isScrolled 
                      ? 'border-emirati-oasisGreen text-emirati-oasisGreen' 
                      : 'border-white text-white'
                  }`}
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  className={`flex-1 ${
                    isScrolled 
                      ? 'bg-emirati-oasisGreen text-white' 
                      : 'bg-white text-emirati-oasisGreen'
                  }`}
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
