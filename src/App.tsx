import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "@/pages/StudentDashboard";
import TrainingStudentDashboard from "@/pages/TrainingStudentDashboard";
import Achievements from "@/pages/Achievements";
import GamificationDashboard from "@/pages/GamificationDashboard";
import { Toaster } from "sonner";

function App() {
  // State and other logic here
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/training" element={<TrainingStudentDashboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/gamification" element={<GamificationDashboard />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;
