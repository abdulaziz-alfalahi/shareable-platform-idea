
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchStudentProfile, saveStudentProfile } from "@/services/scholarship/profileService";
import { StudentScholarshipProfile } from "@/types/scholarship";
import { toast } from "sonner";

export const useScholarshipProfile = () => {
  const [profile, setProfile] = useState<StudentScholarshipProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("academic");

  // Academic information form
  const academicForm = useForm({
    defaultValues: {
      school: "",
      degree: "",
      major: "",
      gpa: "",
      graduationYear: ""
    }
  });

  // Financial information form
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

  const addAchievement = async (achievement: string) => {
    if (!achievement.trim()) return;
    
    const currentProfile = profile || { user_id: "", id: "", achievements: [] };
    const achievements = [...(currentProfile.achievements || []), achievement];
    
    const updatedProfile = {
      ...currentProfile,
      achievements
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
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

  const addInterest = async (interest: string) => {
    if (!interest.trim()) return;
    
    const currentProfile = profile || { user_id: "", id: "", areas_of_interest: [] };
    const areas_of_interest = [...(currentProfile.areas_of_interest || []), interest];
    
    const updatedProfile = {
      ...currentProfile,
      areas_of_interest
    };
    
    const success = await saveStudentProfile(updatedProfile);
    if (success) {
      setProfile(updatedProfile as StudentScholarshipProfile);
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

  return {
    profile,
    isLoading,
    academicForm,
    financialForm,
    activeTab,
    setActiveTab,
    saveAcademicInfo,
    saveFinancialInfo,
    addAchievement,
    removeAchievement,
    addInterest,
    removeInterest
  };
};
