
import React, { ReactNode } from "react";
import Header from "@/components/home/Header";
import { UserRole } from "@/components/notifications/RoleNotifications";
import { UaeStatCard } from "@/components/ui/uae/UaeStatCard";
import { useNavigate } from "react-router-dom";
import RoleNotifications from "@/components/notifications/RoleNotifications";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
  description?: string;
}

export interface DashboardTab {
  value: string;
  label: string;
}

interface RoleDashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tabs?: DashboardTab[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  role: UserRole;
  metrics?: DashboardMetric[];
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
    icon?: React.ReactNode;
  }>;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({
  title,
  subtitle,
  children,
  tabs,
  activeTab,
  onTabChange,
  role,
  metrics,
  actions
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = React.useState(false);
  
  console.log("RoleDashboardLayout rendering with title:", title);

  const renderMetricCards = () => {
    if (!metrics || metrics.length === 0) return null;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <UaeStatCard
            key={index}
            variant={index % 2 === 0 ? "desert" : "oasis"}
            title={metric.label}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </div>
    );
  };

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;
    
    return (
      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action, index) => (
          <Button 
            key={index} 
            variant={action.variant || "default"} 
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-emirati-sandstone/10">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-emirati-desertRed">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <RoleNotifications
                role={role}
                showNotificationsPanel={showNotifications}
                setShowNotificationsPanel={setShowNotifications}
              />
              {renderActions()}
            </div>
          </div>

          {renderMetricCards()}

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default RoleDashboardLayout;
