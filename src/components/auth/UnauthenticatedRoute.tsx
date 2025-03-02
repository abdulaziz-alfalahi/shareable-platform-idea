
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface UnauthenticatedRouteProps {
  children: React.ReactNode;
}

const UnauthenticatedRoute = ({ children }: UnauthenticatedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from || '/';

  // Show nothing while checking authentication
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If already authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    // Get the destination from state or default based on role
    let destination = '/';
    
    switch (user.role) {
      case 'student':
        destination = '/student-dashboard';
        break;
      case 'advisor':
        destination = '/advisor-dashboard';
        break;
      case 'recruiter':
        destination = '/recruiter-dashboard';
        break;
      case 'admin':
        destination = '/admin-dashboard';
        break;
    }
    
    return <Navigate to={destination} replace />;
  }

  // Not authenticated, show the children (login/register forms)
  return <>{children}</>;
};

export default UnauthenticatedRoute;
