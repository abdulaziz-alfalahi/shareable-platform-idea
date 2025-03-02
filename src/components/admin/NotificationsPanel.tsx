
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";

interface NotificationsPanelProps {
  showNotificationsPanel: boolean;
  setShowNotificationsPanel: (show: boolean) => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  showNotificationsPanel,
  setShowNotificationsPanel
}) => {
  const { toasts, markAsRead } = useToast();
  const unreadNotificationsCount = toasts.filter(toast => !toast.read).length;

  return (
    <div className="relative">
      <Button 
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
      >
        <Bell className="h-5 w-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadNotificationsCount}
          </span>
        )}
      </Button>
      
      {showNotificationsPanel && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md border z-50">
          <div className="p-3 border-b">
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {toasts.length > 0 ? (
              <div className="divide-y">
                {toasts.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-center gap-2">
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-amber-500"></span>}
                      <h4 className="font-medium">{notification.title}</h4>
                    </div>
                    {notification.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
