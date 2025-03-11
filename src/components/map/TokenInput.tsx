
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface TokenInputProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  setTokenSubmitted: (submitted: boolean) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  mapboxToken,
  setMapboxToken,
  setTokenSubmitted
}) => {
  const handleTokenSubmit = () => {
    if (!mapboxToken) {
      toast({
        title: "Token Required",
        description: "Please enter your Mapbox token",
        variant: "destructive"
      });
      return;
    }
    setTokenSubmitted(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapbox Integration</CardTitle>
        <CardDescription>
          To use the map feature, please enter your Mapbox token. 
          You can get a free token at <a href="https://www.mapbox.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input 
            placeholder="Enter your Mapbox token" 
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleTokenSubmit}>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenInput;
