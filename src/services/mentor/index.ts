
// Re-export everything from all service files
export * from './types';
export * from './eligibilityService';
export * from './profileService';
export * from './requestService';

// Export the main MentorService class as a namespace
import { EligibilityService, eligibilityService } from './eligibilityService';
import { ProfileService, profileService } from './profileService';
import { RequestService, requestService } from './requestService';

/**
 * Combined MentorService namespace for backward compatibility
 */
export class MentorService {
  // Combine methods from eligibility service
  checkMentorEligibility = eligibilityService.checkMentorEligibility;
  findPotentialMentors = eligibilityService.findPotentialMentors;
  
  // Combine methods from profile service
  getAvailableMentors = profileService.getAvailableMentors;
  registerAsMentor = profileService.registerAsMentor;
  
  // Combine methods from request service
  sendMentorshipRequest = requestService.sendMentorshipRequest;
  getStudentMentorshipRequests = requestService.getStudentMentorshipRequests;
  connectWithMentor = requestService.connectWithMentor;
}

// Export a singleton instance for backward compatibility
export const mentorService = new MentorService();
