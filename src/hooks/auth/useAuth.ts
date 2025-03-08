
import { createContext, useContext } from "react";

// Define types for our context
type User = {
  id: string;
  email: string;
  name: string;
  role: string;
} | null;

export type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};

export { AuthContext };
