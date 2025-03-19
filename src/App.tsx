
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/home/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./App.routes";
import { Suspense } from "react";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
