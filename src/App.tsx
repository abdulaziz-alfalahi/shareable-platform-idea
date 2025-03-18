
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/home/theme";
import { routes } from "./App.routes"; // Changed from 'routes' to { routes }

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={<route.element />} 
              errorElement={route.errorElement} 
            />
          ))}
        </Routes>
        <Toaster richColors position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
