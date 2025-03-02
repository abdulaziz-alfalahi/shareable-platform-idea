
import React from 'react';

interface UnauthenticatedRouteProps {
  children: React.ReactNode;
}

const UnauthenticatedRoute = ({ children }: UnauthenticatedRouteProps) => {
  // Simply render children without any authentication checks
  return <>{children}</>;
};

export default UnauthenticatedRoute;
