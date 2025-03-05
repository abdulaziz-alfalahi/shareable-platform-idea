
export const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "On Track": return "default";
    case "Needs Attention": return "secondary";
    case "At Risk": return "destructive";
    default: return "default";
  }
};

export const getRiskBadgeVariant = (risk: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (risk) {
    case "Low": return "outline";
    case "Medium": return "secondary";
    case "High": return "destructive";
    default: return "outline";
  }
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getEducationLevel = (gradeLevel: string): "school" | "university" => {
  if (gradeLevel.startsWith("grade")) {
    return "school";
  } else {
    return "university";
  }
};

export const getGradeLevelDisplay = (gradeLevel: string): string => {
  switch (gradeLevel) {
    case "grade-10": return "Grade 10";
    case "grade-11": return "Grade 11";
    case "grade-12": return "Grade 12";
    case "university-1": return "University Year 1";
    case "university-2": return "University Year 2";
    case "university-3": return "University Year 3";
    case "university-4": return "University Year 4";
    default: return gradeLevel;
  }
};
