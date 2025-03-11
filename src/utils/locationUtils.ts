
// Common UAE locations for suggestions
export const uaeLocations = [
  "Abu Dhabi, UAE",
  "Dubai, UAE",
  "Sharjah, UAE",
  "Ajman, UAE",
  "Umm Al Quwain, UAE",
  "Ras Al Khaimah, UAE",
  "Fujairah, UAE",
  "Dubai Media City, UAE",
  "Dubai Internet City, UAE",
  "Dubai Academic City, UAE",
  "Masdar City, Abu Dhabi, UAE",
  "Al Ain, UAE",
  "Jebel Ali Free Zone, Dubai, UAE",
  "Abu Dhabi Global Market, UAE",
  "Dubai International Financial Centre, UAE",
  "Saadiyat Island, Abu Dhabi, UAE",
  "Dubai Silicon Oasis, UAE",
  "Khalifa City, Abu Dhabi, UAE",
  "Dubai Knowledge Park, UAE",
  "Downtown Dubai, UAE"
];

// Filter locations based on input query
export const filterLocationSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return [];
  
  const lowerCaseQuery = query.toLowerCase();
  return uaeLocations.filter(location => 
    location.toLowerCase().includes(lowerCaseQuery)
  ).slice(0, 5); // Limit to 5 suggestions
};
