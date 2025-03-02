
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: any; // Keep the prop for backward compatibility but ignore it
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  
  // Only check if user is authenticated, ignore role restrictions
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
