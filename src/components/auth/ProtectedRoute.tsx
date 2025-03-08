
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Enums } from "@/integrations/supabase/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state if authentication is still being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-oasisGreen"></div>
      </div>
    );
  }

  // If not logged in, redirect to the login page with the current location in state
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have one of the required roles
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Access Restricted</h2>
          <p className="text-red-600">
            You don't have permission to access this page. This page requires one of the following roles: {requiredRoles.join(", ")}.
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
