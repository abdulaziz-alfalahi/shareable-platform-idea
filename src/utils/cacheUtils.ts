
/**
 * Simple in-memory cache implementation for the Career Passport data
 * In a production environment, this would be replaced with Redis, Supabase Edge Functions, 
 * or another distributed caching solution.
 */

interface CacheItem<T> {
  data: T;
  expiry: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in seconds
}

class PassportCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL: number = 3600; // Default 1 hour in seconds

  /**
   * Get data from cache
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    // Return null if not found or expired
    if (!item || item.expiry < Date.now()) {
      if (item) {
        this.cache.delete(key); // Clean up expired item
      }
      return null;
    }
    
    return item.data as T;
  }

  /**
   * Set data in cache
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || this.defaultTTL;
    const expiry = Date.now() + (ttl * 1000);
    
    this.cache.set(key, {
      data,
      expiry
    });
  }

  /**
   * Delete item from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get or set cache with a loader function
   * This implements the "cache-aside" pattern
   */
  async getOrSet<T>(key: string, loader: () => Promise<T>, options: CacheOptions = {}): Promise<T> {
    const cachedData = this.get<T>(key);
    
    if (cachedData) {
      return cachedData;
    }
    
    const data = await loader();
    this.set(key, data, options);
    return data;
  }
}

// Singleton instance
export const passportCache = new PassportCache();

// Helper functions
export const getCachedPassportData = async (studentId: number) => {
  return passportCache.getOrSet(
    `passport:${studentId}`, 
    async () => {
      // In a real application, this would be a call to the database
      // For this demo, we'll simulate a delay
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(300); // Simulate database latency
      
      // Fetch from our mock data source
      // In production, this would be a call to Supabase or another data source
      const { fetchStudentPassportData } = await import('./careerUtils');
      return fetchStudentPassportData(studentId);
    },
    { ttl: 600 } // Cache for 10 minutes
  );
};

// Helper to check if we should notify about near milestones
export const checkAndNotifyNearMilestone = (progress: number, milestoneTitle: string) => {
  if (progress >= 90 && progress < 100) {
    const { notifyNearMilestone } = require('./notification');
    notifyNearMilestone({
      title: "Almost there!",
      description: `You're ${progress}% of the way to your "${milestoneTitle}" milestone!`
    });
    return true;
  }
  return false;
};
