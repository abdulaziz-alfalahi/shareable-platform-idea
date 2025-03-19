
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SettingsTab: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Portfolio Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Visibility Settings</CardTitle>
          <CardDescription>Control who can see your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Your portfolio is currently set to <strong>Private</strong>. Only you can view it.
          </p>
          <Button>Make Public</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsTab;
