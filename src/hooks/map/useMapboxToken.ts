
import { useState } from 'react';

export const useMapboxToken = () => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenSubmitted, setTokenSubmitted] = useState<boolean>(false);

  // Reset the tokenSubmitted state if the token is cleared
  const handleTokenChange = (token: string) => {
    setMapboxToken(token);
    if (!token && tokenSubmitted) {
      setTokenSubmitted(false);
    }
  };

  return {
    mapboxToken,
    setMapboxToken: handleTokenChange,
    tokenSubmitted,
    setTokenSubmitted
  };
};
