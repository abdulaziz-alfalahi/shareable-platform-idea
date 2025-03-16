
/**
 * Calculates the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Calculates new coordinates given a starting point, distance, and bearing
 * @param lat Starting latitude in decimal degrees
 * @param lng Starting longitude in decimal degrees
 * @param distance Distance in kilometers
 * @param bearing Direction in degrees (0 = north, 90 = east, etc.)
 * @returns New coordinates {latitude, longitude}
 */
export const calculateDistanceCoordinates = (
  lat: number, 
  lng: number, 
  distance: number, 
  bearing: number
): {latitude: number, longitude: number} => {
  const R = 6371; // Earth's radius in km
  const bearingRad = bearing * Math.PI / 180; // Convert bearing to radians
  const latRad = lat * Math.PI / 180; // Current lat in radians
  const lngRad = lng * Math.PI / 180; // Current lng in radians
  
  // Calculate new latitude
  const newLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(distance / R) +
    Math.cos(latRad) * Math.sin(distance / R) * Math.cos(bearingRad)
  );
  
  // Calculate new longitude
  const newLngRad = lngRad + Math.atan2(
    Math.sin(bearingRad) * Math.sin(distance / R) * Math.cos(latRad),
    Math.cos(distance / R) - Math.sin(latRad) * Math.sin(newLatRad)
  );
  
  // Convert back to degrees
  const newLat = newLatRad * 180 / Math.PI;
  const newLng = newLngRad * 180 / Math.PI;
  
  return {
    latitude: newLat,
    longitude: newLng
  };
};
