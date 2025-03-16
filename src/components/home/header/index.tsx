
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import HeaderActions from "./HeaderActions";
import PersonaSwitcher, { personas } from "./PersonaSwitcher";
import MobileNavigation from "../MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import RoleNotifications from "@/components/notifications/RoleNotifications";
import { UserRole } from "@/components/notifications/RoleNotifications";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPersona, setCurrentPersona] = useState(personas[0]);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Map persona ID to user role for notifications
  const getCurrentRole = (): UserRole => {
    const roleMap: Record<string, UserRole> = {
      "student": "student",
      "parent": "parent",
      "advisor": "advisor", 
      "recruiter": "recruiter",
      "school": "admin",
      "university": "admin",
      "training": "training",
      "assessment": "assessment",
      "admin": "admin"
    };
    
    return roleMap[currentPersona.id] || "student";
  };

  const handleHomeClick = () => {
    navigate('/');
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-emirati-sandBeige/20 py-4 sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        <DesktopNavigation handleHomeClick={handleHomeClick} />

        <div className="flex items-center space-x-2">
          <HeaderActions />
          
          {/* Role-based notifications */}
          <RoleNotifications
            role={getCurrentRole()}
            showNotificationsPanel={showNotificationsPanel}
            setShowNotificationsPanel={setShowNotificationsPanel}
          />
          
          {/* Persona Switcher */}
          <PersonaSwitcher 
            currentPersona={currentPersona}
            setCurrentPersona={setCurrentPersona}
          />
          
          {/* Mobile Navigation Trigger */}
          <MobileNavigation isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
