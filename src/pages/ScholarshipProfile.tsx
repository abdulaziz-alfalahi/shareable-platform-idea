
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchStudentProfile, saveStudentProfile } from "@/services/scholarship/profileService";
import { StudentScholarshipProfile } from "@/types/scholarship";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Check, X } from "lucide-react";

const ScholarshipProfile = () => {
  const [profile, setProfile] = useState<StudentScholarshipProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("academic");
  const [newAchievement, setNewAchievement] = useState("");
  const [newInterest, setNewInterest] = useState("");

  // Academic information
  const academicForm = useForm({
    defaultValues: {
      school: "",
      degree: "",
      major: "",
      gpa: "",
      graduationYear: ""
    }
  });

  // Financial information
  const financialForm = useForm({
    defaultValues: {
      householdIncome: "",
      dependents: "",
      currentEmployment: "",
      financialNeed: ""
    }
  });

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const data = await fetchStudentProfile();
      setProfile(data);
      
      if (data) {
        // Set academic form values
        if (data.academic_info) {
          academicForm.reset({
            school: data.academic_info.school || "",
            degree: data.academic_info.degree || "",
            major: data.academic_info.major || "",
            gpa: data.academic_info.gpa || "",
            graduationYear: data.academic_info.graduationYear || ""
          });
        }
        
        // Set financial form values
        if (data.financial_info) {
          financialForm.reset({
            householdIncome: data.financial_info.householdIncome || "",
            dependents: data.financial_info.dependents || "",
            currentEmployment: data.financial_info.currentEmployment || "",
            financialNeed: data.financial_info.financialNeed || ""
          });
        }
      }
      
      setIsLoading(false);
    };
    
    loadProfile();
  }, []);

  const saveAcademicInfo = async (data: any) => {
    const currentProfile = profile || { user_id: "", id: "" };
    const updatedProfile = {
      ...currentProfile,
      academic_info: data
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
      toast.success("Academic information saved successfully");
    }
  };

  const saveFinancialInfo = async (data: any) => {
    const currentProfile = profile || { user_id: "", id: "" };
    const updatedProfile = {
      ...currentProfile,
      financial_info: data
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
      toast.success("Financial information saved successfully");
    }
  };

  const addAchievement = async () => {
    if (!newAchievement.trim()) return;
    
    const currentProfile = profile || { user_id: "", id: "", achievements: [] };
    const achievements = [...(currentProfile.achievements || []), newAchievement];
    
    const updatedProfile = {
      ...currentProfile,
      achievements
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
      setNewAchievement("");
      toast.success("Achievement added successfully");
    }
  };

  const removeAchievement = async (index: number) => {
    if (!profile || !profile.achievements) return;
    
    const achievements = [...profile.achievements];
    achievements.splice(index, 1);
    
    const updatedProfile = {
      ...profile,
      achievements
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
      toast.success("Achievement removed");
    }
  };

  const addInterest = async () => {
    if (!newInterest.trim()) return;
    
    const currentProfile = profile || { user_id: "", id: "", areas_of_interest: [] };
    const areas_of_interest = [...(currentProfile.areas_of_interest || []), newInterest];
    
    const updatedProfile = {
      ...currentProfile,
      areas_of_interest
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
      setNewInterest("");
      toast.success("Interest added successfully");
    }
  };

  const removeInterest = async (index: number) => {
    if (!profile || !profile.areas_of_interest) return;
    
    const areas_of_interest = [...profile.areas_of_interest];
    areas_of_interest.splice(index, 1);
    
    const updatedProfile = {
      ...profile,
      areas_of_interest
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
      toast.success("Interest removed");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <Button variant="ghost" asChild className="mb-2 -ml-4">
            <Link to="/scholarships" className="flex items-center text-gray-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scholarships
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-emirati-deepBlue">Scholarship Profile</h1>
          <p className="text-gray-600 mt-2">
            Complete your profile to increase your chances of matching with scholarships.
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0 bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
          <Link to="/scholarships">Browse Scholarships</Link>
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="interests">Areas of Interest</TabsTrigger>
        </TabsList>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Provide details about your educational background.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={academicForm.handleSubmit(saveAcademicInfo)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="school">School/University</Label>
                    <Input
                      id="school"
                      placeholder="Enter your school or university"
                      {...academicForm.register("school")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Select
                      value={academicForm.watch("degree")}
                      onValueChange={(value) => academicForm.setValue("degree", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high_school">High School</SelectItem>
                        <SelectItem value="associate">Associate's Degree</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="doctoral">Doctoral Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Field of Study</Label>
                    <Input
                      id="major"
                      placeholder="Enter your major"
                      {...academicForm.register("major")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      placeholder="Enter your GPA"
                      {...academicForm.register("gpa")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      placeholder="Enter your graduation year"
                      {...academicForm.register("graduationYear")}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="submit" className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
                    Save Academic Information
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>
                Provide financial details to help match you with need-based scholarships.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={financialForm.handleSubmit(saveFinancialInfo)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="householdIncome">Annual Household Income</Label>
                    <Select
                      value={financialForm.watch("householdIncome")}
                      onValueChange={(value) => financialForm.setValue("householdIncome", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below_50k">Below 50,000 AED</SelectItem>
                        <SelectItem value="50k_100k">50,000 - 100,000 AED</SelectItem>
                        <SelectItem value="100k_150k">100,000 - 150,000 AED</SelectItem>
                        <SelectItem value="150k_200k">150,000 - 200,000 AED</SelectItem>
                        <SelectItem value="above_200k">Above 200,000 AED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dependents">Number of Dependents</Label>
                    <Input
                      id="dependents"
                      placeholder="Number of dependents"
                      type="number"
                      {...financialForm.register("dependents")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentEmployment">Current Employment Status</Label>
                    <Select
                      value={financialForm.watch("currentEmployment")}
                      onValueChange={(value) => financialForm.setValue("currentEmployment", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time_student">Full-time Student</SelectItem>
                        <SelectItem value="part_time_employed">Part-time Employed</SelectItem>
                        <SelectItem value="full_time_employed">Full-time Employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="financialNeed">Financial Need Statement</Label>
                  <Textarea
                    id="financialNeed"
                    placeholder="Briefly describe your financial need for scholarship support"
                    className="min-h-[120px]"
                    {...financialForm.register("financialNeed")}
                  />
                </div>
                <div className="mt-6">
                  <Button type="submit" className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
                    Save Financial Information
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Add your academic, extracurricular, and professional achievements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter an achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={addAchievement}
                    className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                <Separator className="my-4" />

                {profile?.achievements && profile.achievements.length > 0 ? (
                  <ul className="space-y-3">
                    {profile.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <span>{achievement}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAchievement(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No achievements added yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle>Areas of Interest</CardTitle>
              <CardDescription>
                Add subjects, fields, or careers you're interested in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter an area of interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={addInterest}
                    className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                <Separator className="my-4" />

                {profile?.areas_of_interest && profile.areas_of_interest.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.areas_of_interest.map((interest, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-emirati-sandBeige/20 text-emirati-deepBrown px-3 py-1 rounded-full"
                      >
                        <span>{interest}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInterest(index)}
                          className="ml-1 h-6 w-6 p-0 text-emirati-deepBrown hover:bg-emirati-sandBeige/40"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No areas of interest added yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScholarshipProfile;
