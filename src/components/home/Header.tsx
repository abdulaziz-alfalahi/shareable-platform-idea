
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageToggle from "@/components/i18n/LanguageToggle";
import { useLanguage } from "@/components/i18n/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emirati-oasisGreen">
            {t('app.title')}
          </Link>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            <div className="hidden md:flex items-center space-x-4">
              <nav className={`flex gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Link to="/" className="text-gray-600 hover:text-emirati-oasisGreen">
                  {t('nav.home')}
                </Link>
                <Link to="/student-dashboard" className="text-gray-600 hover:text-emirati-oasisGreen">
                  {t('nav.dashboard')}
                </Link>
                <Link to="/job-applications" className="text-gray-600 hover:text-emirati-oasisGreen">
                  {t('nav.jobs')}
                </Link>
                <Link to="/training-centers" className="text-gray-600 hover:text-emirati-oasisGreen">
                  {t('nav.training')}
                </Link>
                <Link to="/career-passport" className="text-gray-600 hover:text-emirati-oasisGreen">
                  {t('nav.passport')}
                </Link>
                <Link to="/mind-map" className="text-gray-600 hover:text-emirati-oasisGreen">
                  {t('nav.mindmap')}
                </Link>
              </nav>
            </div>

            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className={`flex flex-col gap-2 ${language === 'ar' ? 'items-end' : ''}`}>
              <Link 
                to="/" 
                className="block py-2 text-gray-600 hover:text-emirati-oasisGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/student-dashboard" 
                className="block py-2 text-gray-600 hover:text-emirati-oasisGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.dashboard')}
              </Link>
              <Link 
                to="/job-applications" 
                className="block py-2 text-gray-600 hover:text-emirati-oasisGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.jobs')}
              </Link>
              <Link 
                to="/training-centers" 
                className="block py-2 text-gray-600 hover:text-emirati-oasisGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.training')}
              </Link>
              <Link 
                to="/career-passport" 
                className="block py-2 text-gray-600 hover:text-emirati-oasisGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.passport')}
              </Link>
              <Link 
                to="/mind-map" 
                className="block py-2 text-gray-600 hover:text-emirati-oasisGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.mindmap')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
