// Mock user profile inputs used to drive hydration calculations during development.
// Replace with real form data once available.
// 

export type ActivityLevel = 'low' | 'moderate' | 'high';
export type Climate = 'cold' | 'temperate' | 'hot';
export type Gender = 'male' | 'female';

export interface UserProfileInput {
  weightKg: number;
  ageYears: number;
  gender: Gender;     // statt sex
  activityLevel: ActivityLevel;
  climate: Climate;
}


export const mockUserProfile: UserProfileInput = {
  weightKg: 72,
  ageYears: 30,
  gender: "male",
  activityLevel: 'moderate',
  climate: 'temperate',
};
