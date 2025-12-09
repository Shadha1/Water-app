// Mock user profile inputs used to drive hydration calculations during development.
// Replace with real form data once available.
// 

export type ActivityLevel = 'low' | 'moderate' | 'high';
export type Climate = 'cold' | 'temperate' | 'hot';

export interface UserProfileInput {
  weightKg: number;
  ageYears: number;
  activityLevel: ActivityLevel;
  climate: Climate;
  avgTemperatureC?: number;
}

export const mockUserProfile: UserProfileInput = {
  weightKg: 72,
  ageYears: 30,
  activityLevel: 'moderate',
  climate: 'temperate',
  avgTemperatureC: 21,
};
