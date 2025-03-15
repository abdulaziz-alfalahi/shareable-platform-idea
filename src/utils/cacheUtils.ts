
/**
 * Simple client-side cache utility
 * Used for storing temporal data like recently viewed items
 */

interface CacheOptions {
  ttl?: number; // Time to live in seconds
}

class ClientCache {
  private cache: Map<string, any>;
  private expiry: Map<string, number>;

  constructor() {
    this.cache = new Map();
    this.expiry = new Map();
  }

  /**
   * Set a value in the cache
   */
  set<T>(key: string, value: T, options: CacheOptions = {}): void {
    this.cache.set(key, value);
    
    if (options.ttl) {
      const expiryTime = Date.now() + options.ttl * 1000;
      this.expiry.set(key, expiryTime);
    }
  }

  /**
   * Get a value from the cache
   */
  get<T>(key: string): T | null {
    // Check if expired
    const expiryTime = this.expiry.get(key);
    if (expiryTime && Date.now() > expiryTime) {
      this.delete(key);
      return null;
    }
    
    const value = this.cache.get(key);
    return value !== undefined ? value : null;
  }

  /**
   * Delete a key from the cache
   */
  delete(key: string): void {
    this.cache.delete(key);
    this.expiry.delete(key);
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
    this.expiry.clear();
  }
}

// Export singleton instances for different types of cached data
export const passportCache = new ClientCache();
export const gamificationCache = new ClientCache();
