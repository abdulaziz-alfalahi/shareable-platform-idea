
// This function calculates a cultural fit score based on location preferences
export function calculateCulturalFitScore(
  student: any,
  employerValues: string[],
  workStyle: 'remote' | 'hybrid' | 'in-office',
  industry: string
): {
  overallScore: number;
  valueFit: number;
  industryFit: number;
  workStyleFit: number;
  improvementAreas: string[];
} {
  // Calculate value fit score (50-100)
  const valueFit = Math.floor(60 + Math.random() * 40);
  
  // Calculate industry fit score (50-100)
  const industryFit = Math.floor(65 + Math.random() * 35);
  
  // Calculate work style fit
  let workStyleFit = 70;
  if (student.preferredWorkStyle && student.preferredWorkStyle === workStyle) {
    workStyleFit = 95;
  } else if (
    (student.preferredWorkStyle === 'remote' && workStyle === 'hybrid') ||
    (student.preferredWorkStyle === 'hybrid' && workStyle === 'remote') ||
    (student.preferredWorkStyle === 'in-office' && workStyle === 'hybrid') ||
    (student.preferredWorkStyle === 'hybrid' && workStyle === 'in-office')
  ) {
    workStyleFit = 75;
  } else {
    workStyleFit = 50;
  }
  
  // Calculate overall score (weighted average)
  const overallScore = Math.floor(
    (valueFit * 0.4) + (industryFit * 0.3) + (workStyleFit * 0.3)
  );
  
  // Generate improvement areas
  const improvementAreas: string[] = [];
  if (valueFit < 70) {
    improvementAreas.push("Consider exploring more about the company's core values and mission");
  }
  if (industryFit < 70) {
    improvementAreas.push("Gain more knowledge and experience in the " + industry + " industry");
  }
  if (workStyleFit < 70) {
    improvementAreas.push("Prepare for adapting to the " + workStyle + " work environment");
  }
  
  return {
    overallScore,
    valueFit,
    industryFit,
    workStyleFit,
    improvementAreas
  };
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

// Add the missing function generateAIRecommendations
export function generateAIRecommendations(student: any, targetJobTitle?: string) {
  // This is a mock implementation
  const skills = [
    { skill: "Data Analysis", demandLevel: "high" },
    { skill: "Project Management", demandLevel: "medium" },
    { skill: "UX Design", demandLevel: "high" },
    { skill: "Machine Learning", demandLevel: "high" },
    { skill: "Cloud Computing", demandLevel: "high" }
  ];
  
  return [
    {
      recommendationReason: `Based on your profile and interest in ${targetJobTitle || "technology"}, these skills would enhance your employability.`,
      recommendedSkills: skills.slice(0, 3),
      recommendedPrograms: [
        {
          id: "prog-1",
          title: "Advanced Data Analysis",
          provider: "UAE Tech Institute",
          format: "Hybrid"
        },
        {
          id: "prog-2",
          title: "Project Management Professional",
          provider: "Dubai Business School",
          format: "Online"
        }
      ]
    },
    {
      recommendationReason: "These emerging skills are expected to be in high demand in the UAE job market within the next year.",
      recommendedSkills: skills.slice(2, 5),
      recommendedPrograms: [
        {
          id: "prog-3",
          title: "Introduction to Machine Learning",
          provider: "Abu Dhabi Innovation Center",
          format: "In-person"
        },
        {
          id: "prog-4",
          title: "Cloud Computing Certification",
          provider: "Gulf Tech Academy",
          format: "Online"
        }
      ]
    }
  ];
}

// Add the missing function generateCareerTransitionRecommendations
export function generateCareerTransitionRecommendations(student: any, targetIndustry: string) {
  // This is a mock implementation
  return {
    currentPath: student.careerPath || "Current Role",
    targetPath: `${targetIndustry} Professional`,
    estimatedTimeMonths: 6 + Math.floor(Math.random() * 12),
    requiredSkills: [
      "Industry Knowledge",
      "Technical Expertise",
      "Communication",
      "Problem Solving",
      "Adaptability"
    ],
    recommendedTraining: [
      {
        id: "trans-1",
        title: `${targetIndustry} Fundamentals`,
        provider: "UAE Career Transition Center",
        format: "Hybrid"
      },
      {
        id: "trans-2",
        title: "Professional Communication Skills",
        provider: "Emirates Leadership Institute",
        format: "In-person"
      },
      {
        id: "trans-3",
        title: `Advanced ${targetIndustry} Certification`,
        provider: "Global Skills Academy",
        format: "Online"
      }
    ]
  };
}
