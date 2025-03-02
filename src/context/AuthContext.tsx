import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifySuccess, notifyError } from '@/utils/notification';

// User roles
export type UserRole = 'student' | 'advisor' | 'recruiter' | 'admin';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isVerified: boolean;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

// Mock user data for development - will be replaced with actual API calls
const MOCK_USERS = [
  {
    id: 'student-1',
    email: 'student@example.com',
    password: 'password',
    name: 'Ahmed Student',
    role: 'student' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?u=student',
    isVerified: true
  },
  {
    id: 'advisor-1',
    email: 'advisor@example.com',
    password: 'password',
    name: 'Fatima Advisor',
    role: 'advisor' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?u=advisor',
    isVerified: true
  },
  {
    id: 'recruiter-1',
    email: 'recruiter@example.com',
    password: 'password',
    name: 'Omar Recruiter',
    role: 'recruiter' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?u=recruiter',
    isVerified: true
  }
];

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set a default mock user to bypass authentication
  const defaultUser: User = {
    id: 'default-user',
    email: 'default@example.com',
    name: 'Default User',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=default',
    isVerified: true
  };

  const [user, setUser] = useState<User | null>(defaultUser);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Login function - now just sets the user without authentication
  const login = async (email: string, password: string, role?: UserRole) => {
    setLoading(true);
    try {
      // Find a user matching the credentials or use default
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remove password before storing user
        const { password: _, ...userWithoutPassword } = foundUser;
        
        // Override the role to admin
        const adminUser = {
          ...userWithoutPassword,
          role: 'admin' as UserRole
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        notifySuccess({ 
          title: 'Login successful', 
          description: `Welcome back, ${foundUser.name}!` 
        });
        
        navigate('/admin-dashboard');
      } else {
        // Use default user if no matching user is found
        notifySuccess({ 
          title: 'Login successful', 
          description: `Welcome, ${defaultUser.name}!` 
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Register function - simplified to just notify success
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      notifySuccess({ 
        title: 'Registration successful', 
        description: 'Your account has been created. You can now log in.' 
      });
      
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function - now just resets to default user
  const logout = () => {
    setUser(defaultUser);
    localStorage.removeItem('user');
    notifySuccess({ title: 'Logged out successfully' });
    navigate('/');
  };

  // Helper function to navigate based on user role - now always navigates to admin dashboard
  const navigateByRole = (role: UserRole) => {
    navigate('/admin-dashboard');
  };

  // Check if user has a specific role - always returns true to grant access to all routes
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    return true; // Allow access to all roles
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: true, // Always authenticated
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
