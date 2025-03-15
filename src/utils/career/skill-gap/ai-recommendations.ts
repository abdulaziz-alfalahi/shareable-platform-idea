// This function calculates a cultural fit score based on location preferences
export function calculateCulturalFitScore(studentPreference: string, jobLocation: string): number {
  // Fix type comparison errors by using string equality checks
  if (studentPreference === "hybrid") {
    // Student prefers hybrid, which is flexible
    return 100; // Full match for any job location type
  } else if (studentPreference === "remote" && jobLocation === "remote") {
    // Student wants remote, job is remote
    return 100;
  } else if (studentPreference === "in-office" && jobLocation === "in-office") {
    // Student wants in-office, job is in-office
    return 100;
  } else if (studentPreference === "remote" && jobLocation === "hybrid") {
    // Student wants remote, job offers hybrid (partial match)
    return 75;
  } else if (studentPreference === "in-office" && jobLocation === "hybrid") {
    // Student wants in-office, job offers hybrid (partial match)
    return 75;
  } else {
    // Complete mismatch
    return 0;
  }
}

// Calculate skill match score between student skills and job requirements
export function calculateSkillMatchScore(studentSkills: string[], jobSkills: string[]): number {
  if (!studentSkills.length || !jobSkills.length) return 0;
  
  // Count matching skills
  const matchingSkills = studentSkills.filter(skill => 
    jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
  );
  
  // Calculate percentage match
  return (matchingSkills.length / jobSkills.length) * 100;
}

// Calculate experience level match
export function calculateExperienceMatch(studentExperience: number, jobRequiredExperience: number): number {
  if (studentExperience >= jobRequiredExperience) {
    return 100; // Full match
  } else if (studentExperience >= jobRequiredExperience * 0.75) {
    return 75; // Good match
  } else if (studentExperience >= jobRequiredExperience * 0.5) {
    return 50; // Partial match
  } else {
    return 25; // Poor match but not zero to allow for potential
  }
}

// Calculate education level match
export function calculateEducationMatch(studentEducationLevel: string, jobRequiredEducation: string): number {
  const educationLevels = [
    "high school",
    "associate's degree",
    "bachelor's degree",
    "master's degree",
    "doctorate"
  ];
  
  const studentLevel = educationLevels.indexOf(studentEducationLevel.toLowerCase());
  const jobLevel = educationLevels.indexOf(jobRequiredEducation.toLowerCase());
  
  if (studentLevel === -1 || jobLevel === -1) return 0;
  
  if (studentLevel >= jobLevel) {
    return 100; // Student meets or exceeds required education
  } else {
    // Partial match based on how close they are
    return Math.max(0, (studentLevel / jobLevel) * 100);
  }
}

// Generate AI recommendations based on skill gaps
export function generateSkillGapRecommendations(
  studentSkills: string[], 
  jobSkills: string[],
  studentInterests: string[]
): string[] {
  // Find missing skills
  const missingSkills = jobSkills.filter(skill => 
    !studentSkills.some(studentSkill => 
      studentSkill.toLowerCase() === skill.toLowerCase()
    )
  );
  
  if (missingSkills.length === 0) {
    return ["Your skills match all the requirements for this position!"];
  }
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  // Add general recommendation
  recommendations.push(
    `Consider developing these ${missingSkills.length} skills to improve your match: ${missingSkills.join(', ')}.`
  );
  
  // Add specific recommendations based on interests
  const interestRelatedSkills = missingSkills.filter(skill => 
    studentInterests.some(interest => 
      skill.toLowerCase().includes(interest.toLowerCase()) || 
      interest.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  if (interestRelatedSkills.length > 0) {
    recommendations.push(
      `Based on your interests, focus first on: ${interestRelatedSkills.join(', ')}.`
    );
  }
  
  // Add learning resource recommendation
  recommendations.push(
    "Check online learning platforms like Coursera, Udemy, or LinkedIn Learning for courses on these skills."
  );
  
  return recommendations;
}

// Calculate overall job match score
export function calculateOverallJobMatch(
  skillScore: number,
  experienceScore: number,
  educationScore: number,
  culturalFitScore: number
): number {
  // Weighted average
  return (
    (skillScore * 0.4) +
    (experienceScore * 0.25) +
    (educationScore * 0.2) +
    (culturalFitScore * 0.15)
  );
}

// Generate personalized job application tips
export function generateApplicationTips(
  matchScore: number,
  studentSkills: string[],
  jobSkills: string[],
  jobTitle: string
): string[] {
  const tips: string[] = [];
  
  if (matchScore >= 80) {
    tips.push(`You're a strong match for this ${jobTitle} position! Highlight your relevant experience.`);
  } else if (matchScore >= 60) {
    tips.push(`You're a good match for this ${jobTitle} role. Focus on transferable skills in your application.`);
  } else {
    tips.push(`This ${jobTitle} position may be a stretch, but don't be discouraged. Emphasize your learning potential.`);
  }
  
  // Find matching skills to highlight
  const matchingSkills = studentSkills.filter(skill => 
    jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
  );
  
  if (matchingSkills.length > 0) {
    tips.push(`Highlight these relevant skills in your resume: ${matchingSkills.join(', ')}.`);
  }
  
  // Add general application tips
  tips.push("Tailor your resume and cover letter specifically for this position.");
  tips.push("Research the company before your interview to demonstrate genuine interest.");
  
  return tips;
}
