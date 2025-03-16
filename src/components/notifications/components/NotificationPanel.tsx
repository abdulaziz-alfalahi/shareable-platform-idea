
import React from "react";
import { UserRole } from "../types";
import NotificationsList from "./NotificationsList";

interface NotificationPanelProps {
  role: UserRole;
  filteredToasts: Array<{
    id: string;
    title: string;
    description?: string;
    read?: boolean;
    type?: string;
  }>;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ role, filteredToasts }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md border z-50">
      <div className="p-3 border-b">
        <h3 className="font-medium">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <NotificationsList role={role} filteredToasts={filteredToasts} />
      </div>
    </div>
  );
};

export default NotificationPanel;
