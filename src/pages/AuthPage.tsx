import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/toast";
import { Loader2, Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToastType } from "@/hooks/toast/types";

const AuthPage = () => {
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState("register");  // Default to register tab
  const navigate = useNavigate();

  // State for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // State for registration
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerRole, setRegisterRole] = useState<string>("school_student");
  const [registerLoading, setRegisterLoading] = useState(false);

  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        type: "error",
      });
      return;
    }
    
    setLoginLoading(true);
    
    try {
      await signIn(loginEmail, loginPassword);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        type: "success"
      });
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Invalid email or password.";
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid login credentials. Make sure you've registered this account first.";
      }
      
      toast({
        title: "Sign in failed",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !registerName) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        type: "error",
      });
      return;
    }
    
    setRegisterLoading(true);
    
    try {
      // Log what we're sending for debugging
      console.log("Registering with data:", {
        email: registerEmail,
        name: registerName,
        role: registerRole
      });
      
      // Pass the role as a plain string to avoid type issues
      await signUp(
        registerEmail, 
        registerPassword,
        registerName,
        registerRole
      );
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now sign in.",
        type: "success"
      });
      
      // Pre-fill login fields and switch to login tab
      setLoginEmail(registerEmail);
      setLoginPassword(registerPassword);
      setActiveTab("login");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      
      let errorMessage = "Unable to create account.";
      if (error.message?.includes("already registered")) {
        errorMessage = "This email is already registered. Please try signing in instead.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const fillTestAccount = (type: string) => {
    switch(type) {
      case "student":
        setRegisterEmail("student@example.com");
        setRegisterPassword("password123");
        setRegisterName("Test Student");
        setRegisterRole("school_student");
        break;
      case "advisor":
        setRegisterEmail("advisor@example.com");
        setRegisterPassword("password123");
        setRegisterName("Test Advisor");
        setRegisterRole("advisor");
        break;
      case "recruiter":
        setRegisterEmail("recruiter@example.com");
        setRegisterPassword("password123");
        setRegisterName("Test Recruiter");
        setRegisterRole("recruiter");
        break;
      case "admin":
        setRegisterEmail("admin@example.com");
        setRegisterPassword("password123");
        setRegisterName("Test Admin");
        setRegisterRole("administrator");
        break;
      default:
        break;
    }
    
    // Make sure we're on the register tab since these are test accounts that need to be created first
    setActiveTab("register");
    
    toast({
      title: "Test account filled",
      description: "Please register this account by clicking 'Create Account' to set it up.",
      type: "info",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emirati-sandBeige/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-emirati-oasisGreen">
            UAE Career Platform
          </CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login" 
              ? "Sign in to access your account" 
              : "Create an account to get started"}
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="p-6">
            <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                <strong>You must register an account first before you can log in.</strong> There are no pre-created accounts in the system.
              </AlertDescription>
            </Alert>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loginLoading || authLoading}>
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-red-600 font-semibold mb-2">
                  Don't have an account yet? Switch to the Register tab!
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("register")}
                  className="w-full"
                >
                  Go to Registration
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input 
                    id="register-name" 
                    placeholder="Your Name" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-role">Role</Label>
                  <Select 
                    value={registerRole} 
                    onValueChange={setRegisterRole}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school_student">School Student</SelectItem>
                      <SelectItem value="university_student">University Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="internship_coordinator">Internship Coordinator</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="training_center_rep">Training Provider</SelectItem>
                      <SelectItem value="assessment_center_rep">Assessment Provider</SelectItem>
                      <SelectItem value="advisor">Career Advisor</SelectItem>
                      <SelectItem value="coach">Coach</SelectItem>
                      <SelectItem value="jobseeker">Job Seeker</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={registerLoading || authLoading}>
                  {registerLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : "Create Account"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Quick-fill test account details:</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillTestAccount("student")}
                  >
                    Student
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillTestAccount("advisor")}
                  >
                    Advisor
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillTestAccount("recruiter")}
                  >
                    Recruiter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillTestAccount("admin")}
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex justify-center p-6 pt-0">
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
