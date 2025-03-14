
import React, { useState, useEffect } from "react";
import { 
  Bell, 
  BellDot,
  Briefcase, 
  GraduationCap, 
  Award,
  Target,
  Sparkles,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/toast";

type NotificationType = 'job' | 'training' | 'mentor' | 'achievement' | 'skill';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'job':
      return <Briefcase className="h-4 w-4 text-blue-500" />;
    case 'training':
      return <GraduationCap className="h-4 w-4 text-green-500" />;
    case 'mentor':
      return <Award className="h-4 w-4 text-purple-500" />;
    case 'achievement':
      return <Target className="h-4 w-4 text-amber-500" />;
    case 'skill':
      return <Sparkles className="h-4 w-4 text-pink-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

// Mock notification data (in a real app, this would come from an API)
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Job Match',
    description: 'AI Developer position at Emirates Group matches your skills.',
    type: 'job',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: '2',
    title: 'Recommended Training',
    description: 'Enhance your React skills with our new course.',
    type: 'training',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: '3',
    title: 'Mentor Match',
    description: 'Ahmed from Dubai Technology has accepted your mentorship request.',
    type: 'mentor',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
  {
    id: '4',
    title: 'Achievement Unlocked',
    description: 'You\'ve earned the "Tech Explorer" badge!',
    type: 'achievement',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
  },
  {
    id: '5',
    title: 'Skill Gap Identified',
    description: 'Adding Python to your skills could increase job matches by 20%.',
    type: 'skill',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
  }
];

export const NotificationsMenu = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { toast, markAsRead } = useToast();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Function to mark a notification as read
  const handleReadNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Function to format the timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {unreadCount > 0 ? <BellDot className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200">
              {unreadCount} unread
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <DropdownMenuGroup>
              {notifications.map(notification => (
                <DropdownMenuItem 
                  key={notification.id}
                  className={`p-3 cursor-pointer flex flex-col items-start ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                  onClick={() => handleReadNotification(notification.id)}
                >
                  <div className="flex w-full justify-between items-start">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-2">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full text-sm">
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
