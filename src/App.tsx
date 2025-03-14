
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import JobApplications from './pages/JobApplications';
import { ThemeProvider } from "./components/ui/theme-provider";
import { NotificationsMenu } from "./components/notifications/NotificationsMenu";
import CareerNotifications from "./components/notifications/CareerNotifications";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="app">
      {/* Add the notifications component near the header */}
      <header className="app-header">
        {/* Your existing header content */}
        <div className="notification-area">
          <NotificationsMenu />
        </div>
      </header>
      
      {/* Add the career notifications component that will trigger toast notifications */}
      <CareerNotifications studentId="mock-student-id" />
      
      {/* Add the Sonner Toaster component for toast notifications */}
      <Toaster position="top-right" />
      
      <ThemeProvider defaultTheme="light" storageKey="vite-react-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/JobApplications" element={<JobApplications />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
