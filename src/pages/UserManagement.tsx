
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Plus, RefreshCw } from "lucide-react";
import { personas } from "@/components/home/header/PersonaSwitcher";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Map persona IDs to role enum in the database
const personaToRoleMap: Record<string, string> = {
  student: "school_student",
  parent: "parent",
  advisor: "career_advisor",
  recruiter: "recruiter",
  school: "school_admin",
  university: "university_admin",
  training: "training_provider",
  assessment: "assessment_provider",
  admin: "administrator",
};

const UserManagement = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    role: "student",
  });

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Check if the current user is an admin
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in to access this page");
        navigate("/");
        return;
      }
      
      // Get the user's role
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();
      
      if (error || !profile || profile.role !== "administrator") {
        toast.error("You don't have permission to access this page");
        navigate("/");
      }
    };
    
    checkAdminAccess();
    fetchUsers();
  }, [navigate, refreshTrigger]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get all users from the profiles table
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, role: value }));
  };

  const createTestUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.email || !newUser.password || !newUser.name || !newUser.role) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      // 1. Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            name: newUser.name,
            role: personaToRoleMap[newUser.role] || newUser.role,
          },
        },
      });
      
      if (authError) throw authError;
      
      toast.success(`Test user created: ${newUser.email}`, {
        description: `Role: ${newUser.role}`,
      });
      
      // Reset form
      setNewUser({
        email: "",
        password: "",
        name: "",
        role: "student",
      });
      
      // Refresh user list
      setRefreshTrigger(prev => prev + 1);
      
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    setLoading(true);
    try {
      // Delete from Auth (this should cascade to profiles due to references)
      const { error } = await supabase.functions.invoke("delete-user", {
        body: { userId },
      });
      
      if (error) throw error;
      
      toast.success("User deleted successfully");
      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="User Management">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-emirati-deepBlue mb-8">
          User Management
        </h1>
        
        <Tabs defaultValue="create">
          <TabsList className="mb-6">
            <TabsTrigger value="create">Create Test Users</TabsTrigger>
            <TabsTrigger value="manage">Manage Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Create Test User</h2>
              <form onSubmit={createTestUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <Input
                      name="password"
                      type="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      placeholder="•••••••••"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <Select
                      value={newUser.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {personas.map((persona) => (
                          <SelectItem key={persona.id} value={persona.id}>
                            {persona.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Test User
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Users</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setRefreshTrigger(prev => prev + 1)}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          {loading ? "Loading users..." : "No users found"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteUser(user.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
