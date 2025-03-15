
/**
 * Utility functions for handling network connections and related errors
 */

/**
 * Creates a WebSocket connection with automatic reconnection logic
 * 
 * @param url WebSocket URL to connect to
 * @param options Configuration options
 * @returns WebSocket instance
 */
export const createReliableWebSocket = (
  url: string, 
  options: {
    onOpen?: (event: Event) => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    maxReconnectAttempts?: number;
    reconnectDelay?: number;
  } = {}
) => {
  const {
    onOpen,
    onMessage,
    onError,
    onClose,
    maxReconnectAttempts = 5,
    reconnectDelay = 1000
  } = options;

  let ws: WebSocket | null = null;
  let reconnectAttempts = 0;
  let reconnectTimeout: number | null = null;

  const connect = () => {
    // Clear any existing reconnect timeouts
    if (reconnectTimeout) {
      window.clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    try {
      ws = new WebSocket(url);

      ws.onopen = (event) => {
        console.log(`WebSocket connected to ${url}`);
        reconnectAttempts = 0;
        if (onOpen) onOpen(event);
      };

      ws.onmessage = (event) => {
        if (onMessage) onMessage(event);
      };

      ws.onerror = (event) => {
        console.warn(`WebSocket error:`, event);
        if (onError) onError(event);
      };

      ws.onclose = (event) => {
        console.log(`WebSocket connection closed`, event);
        
        if (onClose) onClose(event);
        
        // Attempt to reconnect if not closed cleanly and we haven't exceeded max attempts
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log(`Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})...`);
          
          reconnectTimeout = window.setTimeout(() => {
            connect();
          }, reconnectDelay * reconnectAttempts); // Exponential backoff
        } else {
          console.warn(`Max reconnect attempts (${maxReconnectAttempts}) reached. Giving up.`);
        }
      };
    } catch (error) {
      console.error("Error creating WebSocket:", error);
    }

    return {
      send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(data);
          return true;
        }
        return false;
      },
      close: () => {
        if (reconnectTimeout) {
          window.clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }
        
        if (ws) {
          ws.close();
          ws = null;
        }
      }
    };
  };

  return connect();
};

/**
 * Checks if the browser is online and network connectivity is available
 */
export const checkNetworkConnectivity = () => {
  return {
    isOnline: navigator.onLine,
    checkConnection: () => {
      return new Promise<boolean>((resolve) => {
        // Try to fetch a small resource to verify actual connectivity
        fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
          .then(() => resolve(true))
          .catch(() => resolve(false));
      });
    }
  };
};

/**
 * Global error handler for unhandled promise rejections
 */
export const setupGlobalErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Prevent default browser behavior
    event.preventDefault();
    
    // Return false to indicate we've handled the error
    return false;
  });
};
