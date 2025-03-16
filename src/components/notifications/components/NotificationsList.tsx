
import React from "react";
import { useToast } from "@/hooks/toast";
import { UserRole } from "../types";
import { getNotificationClass, getDotColor } from "../utils/notificationStyles";

interface NotificationsListProps {
  role: UserRole;
  filteredToasts: Array<{
    id: string;
    title: string;
    description?: string;
    read?: boolean;
  }>;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ role, filteredToasts }) => {
  const { markAsRead } = useToast();

  if (filteredToasts.length === 0) {
    return (
      <div className="p-3 text-center text-gray-500">
        No notifications
      </div>
    );
  }

  return (
    <div className="divide-y">
      {filteredToasts.map((notification) => (
        <div 
          key={notification.id} 
          className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${getNotificationClass(role, !!notification.read)}`}
          onClick={() => markAsRead(notification.id)}
        >
          <div className="flex items-center gap-2">
            {!notification.read && <span className={`h-2 w-2 rounded-full ${getDotColor(role)}`}></span>}
            <h4 className="font-medium">{notification.title}</h4>
          </div>
          {notification.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
