
import React from 'react';
import { UserRole } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole | UserRole[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Simply render children without any authentication or role checks
  return <>{children}</>;
};

export default ProtectedRoute;
