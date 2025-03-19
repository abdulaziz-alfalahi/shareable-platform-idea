
import React, { ReactNode } from "react";
import Header from "@/components/home/Header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/components/notifications/types";

interface DashboardLayoutProps {
  title?: string; // Make title optional
  children: ReactNode;
  tabs?: Array<{
    value: string;
    label: string;
  }>;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  role?: UserRole;
  stats?: Array<{
    label: string;
    value: string | number;
    change?: number;
    icon?: ReactNode;
  }>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title = "Dashboard", // Provide default value
  children,
  tabs,
  activeTab,
  onTabChange,
  role = "student",
  stats,
}) => {
  const renderStatCards = () => {
    if (!stats) return null;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                {stat.change !== undefined && (
                  <p className={`text-xs ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </p>
                )}
              </div>
              {stat.icon && (
                <div className="bg-emirati-sandBeige/20 p-2 rounded-full">
                  {stat.icon}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderTabs = () => {
    if (!tabs || tabs.length === 0) return null;
    
    return (
      <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-emirati-sandstone/20">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-emirati-desertRed">{title}</h1>
        </div>

        {renderStatCards()}
        {renderTabs()}

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
export type { DashboardLayoutProps };
