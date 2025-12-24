// src/mocks/mockUserProfile.ts
// Mock user profile inputs used to drive hydration calculations during development.
// Replace with real form data once available.

import type { UserProfileInput } from '@/constants/water-core/userProfile';

export const mockUserProfile: UserProfileInput = {
  weightKg: 72,          // no function needed
  ageYears: 30,          // done
  gender: 'male',        // done
  activityLevel: 'moderate', // done
  climate: 'temperate',  // done
};
