
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/home/theme";
import { routes } from "./App.routes";
import { Suspense } from "react";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={<route.element />} 
                errorElement={route.errorElement && <route.errorElement />} 
              />
            ))}
          </Routes>
        </Suspense>
        <Toaster richColors position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
