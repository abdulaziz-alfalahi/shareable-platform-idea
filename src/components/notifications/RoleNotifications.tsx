
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoleNotifications } from "./hooks/useRoleNotifications";
import NotificationPanel from "./components/NotificationPanel";
import { RoleNotificationsProps } from "./types";

const RoleNotifications: React.FC<RoleNotificationsProps> = ({
  role,
  showNotificationsPanel,
  setShowNotificationsPanel
}) => {
  const { filteredToasts, unreadNotificationsCount } = useRoleNotifications(role);

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
        <NotificationPanel 
          role={role} 
          filteredToasts={filteredToasts} 
        />
      )}
    </div>
  );
};

export default RoleNotifications;
