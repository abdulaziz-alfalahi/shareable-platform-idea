
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface TokenInputProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  setTokenSubmitted: (submitted: boolean) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  mapboxToken,
  setMapboxToken,
  setTokenSubmitted,
}) => {
  const [error, setError] = useState<string | null>(null);
  
  // Demo token for testing purposes - limited usage
  const demoToken = 'pk.eyJ1IjoicHVibGljLWRlbW8iLCJhIjoiY2xveXJlYnhnMGR3ejJrcnZ1eDU1ZHRreiJ9.aaSWOeic-trFn3kq2lXyEg';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mapboxToken && !demoToken) {
      setError('Please enter a Mapbox token');
      return;
    }
    
    // Use the provided token or the demo token
    const tokenToUse = mapboxToken || demoToken;
    
    if (!tokenToUse.startsWith('pk.')) {
      setError('Invalid token format. Mapbox tokens should start with "pk."');
      return;
    }
    
    setMapboxToken(tokenToUse);
    setTokenSubmitted(true);
    setError(null);
  };

  const useDemoToken = () => {
    setMapboxToken(demoToken);
    setTokenSubmitted(true);
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Mapbox Access Token</h3>
      
      <Alert className="mb-4 bg-blue-50">
        <InfoIcon className="h-4 w-4 mr-2" />
        <AlertDescription>
          You need a Mapbox token to display the map. Get your free token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline font-medium">mapbox.com</a>.
        </AlertDescription>
      </Alert>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="Enter your Mapbox token (starts with pk.)"
            className="mb-2"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        
        <div className="flex space-x-4">
          <Button type="submit">
            Submit Token
          </Button>
          <Button type="button" variant="outline" onClick={useDemoToken}>
            Use Demo Token
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          The demo token has usage limits. For production use, provide your own token.
        </p>
      </form>
    </div>
  );
};

export default TokenInput;
