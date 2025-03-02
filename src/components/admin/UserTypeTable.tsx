
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTypeData } from "@/types/admin";
import { Progress } from "@/components/ui/progress";

interface UserTypeTableProps {
  userData: UserTypeData[];
}

const UserTypeTable: React.FC<UserTypeTableProps> = ({ userData }) => {
  // Calculate total users for percentage
  const totalUsers = userData.reduce((sum, user) => sum + user.count, 0);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Users by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userData.map((user) => (
            <div key={user.type}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{user.type}</span>
                <div className="text-sm text-muted-foreground">
                  {user.count.toLocaleString()} users ({Math.round((user.count / totalUsers) * 100)}%)
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={(user.active / user.count) * 100} 
                  className="h-2 flex-1" 
                />
                <span className="text-xs text-muted-foreground w-24 text-right">
                  {Math.round((user.active / user.count) * 100)}% active
                </span>
              </div>
              <div className="mt-1 text-xs text-right text-muted-foreground">
                Growth: <span className={user.growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {user.growth > 0 ? '+' : ''}{user.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTypeTable;
