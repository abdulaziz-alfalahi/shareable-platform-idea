
import React from "react";
import { useScholarshipProfile } from "@/hooks/scholarship/useScholarshipProfile";
import ProfileHeader from "@/components/scholarship/profile/ProfileHeader";
import ProfileTabs from "@/components/scholarship/profile/ProfileTabs";

const ScholarshipProfile = () => {
  const {
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
  } = useScholarshipProfile();

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
      <ProfileHeader />
      
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        academicForm={academicForm}
        financialForm={financialForm}
        profile={profile}
        saveAcademicInfo={saveAcademicInfo}
        saveFinancialInfo={saveFinancialInfo}
        addAchievement={addAchievement}
        removeAchievement={removeAchievement}
        addInterest={addInterest}
        removeInterest={removeInterest}
      />
    </div>
  );
};

export default ScholarshipProfile;
