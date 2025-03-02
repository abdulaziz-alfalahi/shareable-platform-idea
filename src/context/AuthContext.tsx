
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  // Login function - will be replaced with actual API call
  const login = async (email: string, password: string, role?: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // If role is specified, check if user has that role
      if (role && foundUser.role !== role) {
        throw new Error(`You don't have access as a ${role}`);
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      notifySuccess({ 
        title: 'Login successful', 
        description: `Welcome back, ${foundUser.name}!` 
      });
      
      // Redirect based on role
      navigateByRole(foundUser.role);
    } catch (error) {
      notifyError({ 
        title: 'Login failed', 
        description: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Register function - will be replaced with actual API call
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userExists = MOCK_USERS.some(u => u.email === email);
      if (userExists) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in a real app, this would be done on the server)
      const newUser = {
        id: `${role}-${MOCK_USERS.length + 1}`,
        email,
        name,
        role,
        isVerified: false,
        avatarUrl: `https://i.pravatar.cc/150?u=${email}`
      };
      
      // In a real application, we'd make an API call here
      // For now, we'll just simulate a successful registration
      
      notifySuccess({ 
        title: 'Registration successful', 
        description: 'Your account has been created. You can now log in.' 
      });
      
      navigate('/login');
    } catch (error) {
      notifyError({ 
        title: 'Registration failed', 
        description: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    notifySuccess({ title: 'Logged out successfully' });
    navigate('/');
  };

  // Helper function to navigate based on user role
  const navigateByRole = (role: UserRole) => {
    switch (role) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'advisor':
        navigate('/advisor-dashboard');
        break;
      case 'recruiter':
        navigate('/recruiter-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  // Check if user has a specific role or one of many roles
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
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
