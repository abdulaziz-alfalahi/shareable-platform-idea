
export const getStatusBadgeVariant = (status: string): string => {
  switch (status) {
    case "On Track": return "default";
    case "Needs Attention": return "secondary";
    case "At Risk": return "destructive";
    default: return "default";
  }
};

export const getRiskBadgeVariant = (risk: string): string => {
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
