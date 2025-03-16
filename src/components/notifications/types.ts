
export type UserRole = "student" | "recruiter" | "advisor" | "admin" | "parent" | "training" | "assessment";

export interface RoleNotificationsProps {
  role: UserRole;
  showNotificationsPanel: boolean;
  setShowNotificationsPanel: (show: boolean) => void;
}

export interface NotificationStyles {
  bgClass: string;
  dotColor: string;
}
