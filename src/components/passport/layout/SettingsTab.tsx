
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";

interface SettingsTabProps {
  student: Student;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ student }) => {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center mb-6">
        <Settings className="h-5 w-5 mr-2" />
        <h2 className="text-xl font-semibold">Passport Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Public Profile URL</label>
          <div className="flex">
            <input 
              type="text" 
              value={`career-passport.ae/profile/${student.id}`} 
              readOnly
              className="flex-1 px-3 py-2 border rounded-l-md bg-muted"
            />
            <Button variant="outline" className="rounded-l-none">
              Copy
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Notification Preferences</label>
          <div className="flex items-center justify-between py-2">
            <span>New achievement notifications</span>
            <Button variant="outline" size="sm">Enabled</Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Profile view alerts</span>
            <Button variant="outline" size="sm">Disabled</Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Milestone reminders</span>
            <Button variant="outline" size="sm">Enabled</Button>
          </div>
        </div>
        
        <div className="pt-4">
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
