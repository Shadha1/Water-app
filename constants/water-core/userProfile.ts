// src/domain/userProfile.ts
// Neutrale Domain-Typen für die Hydration-Logik.
// Keine Imports aus UI, Storage oder mocks!



export type ActivityLevel = "low" | "moderate" | "high";
export type Climate = "cold" | "temperate" | "hot";

// Falls du später "other" unterstützen willst, kannst du es hier erweitern.
// Im Mock hattest du aktuell nur male/female.
export type Gender = "male" | "female";

export interface UserProfileInput {
  name: string;
  weightKg: number;
  ageYears: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  climate: Climate;
}



// Wasserbedarf
//Noch zu trinken heute




