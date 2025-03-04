
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook, Instagram, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emirati-deepBrown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold">Emirati Gateway</h3>
            </div>
            <p className="text-white/80 mb-4">
              Empowering Emiratis to achieve their career aspirations and professional development from school to retirement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-emirati-desertGold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-emirati-desertGold">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-emirati-desertGold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-emirati-desertGold">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/student-dashboard" className="text-white/80 hover:text-white">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/job-applications" className="text-white/80 hover:text-white">
                  Job Applications
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-white/80 hover:text-white">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/training-centers" className="text-white/80 hover:text-white">
                  Training Centers
                </Link>
              </li>
              <li>
                <Link to="/assessment-centers" className="text-white/80 hover:text-white">
                  Assessment Centers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Career Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Skills Assessment
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Mentorship Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  Webinars & Events
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-emirati-desertGold" />
                <span className="text-white/80">
                  Emirati Human Resources Development Council<br />
                  Abu Dhabi, United Arab Emirates
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-emirati-desertGold" />
                <span className="text-white/80">+971 2 xxx xxxx</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-emirati-desertGold" />
                <span className="text-white/80">info@emiratigateway.ae</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Emirati Employment Gateway. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-white/80 hover:text-white mx-3">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white mx-3">
                Terms of Service
              </a>
              <a href="#" className="text-white/80 hover:text-white mx-3">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
