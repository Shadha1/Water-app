// quelle: https://www.science.org/action/downloadSupplement?doi=10.1126%2Fscience.abm8668&file=science.abm8668_sm.pdf

import type {
  Gender,
  UserProfileInput,
} from "@/constants/water-core/userProfile";

// Gender bestimmen
export function getGenderValue(gender: Gender): number {
  if (gender === "male") {
    return 35;
  } else if (gender === "female") {
    return 31;
  } else {
    return 33;
  }
}

//Bedarf nach alter anpassen
export function getAgeValue(ageYears: number): number {
  if (ageYears <= 17) {
    return 100;
  } else if (ageYears <= 30) {
    return 0;
  } else if (ageYears <= 49) {
    return -100;
  } else if (ageYears < 59) {
    return -100;
  } else if (ageYears <= 69) {
    return -200;
  } else {
    return -300;
  }
}

// return werte müssen noch angepasst werden
export function getActivityLevelValue(
  activityLevel: "low" | "moderate" | "high"
): number {
  if (activityLevel === "low") {
    return 0.3;
  } else if (activityLevel === "moderate") {
    return 0.7;
  } else {
    return 1.0;
  }
}

export function getClimateValue(climate: "cold" | "temperate" | "hot"): number {
  if (climate === "cold") {
    return 0.5;
  } else if (climate === "temperate") {
    return 0.0;
  } else {
    return 1.0;
  }
}

// Hauptfunktion zur Berechnung der täglichen Wasseraufnahme in ml noch unvollständig

export function calculateDailyWaterMl(profile: UserProfileInput): number {
  const genderValue = getGenderValue(profile.gender);
  const ageValue = getAgeValue(profile.ageYears);
  const weightKg = profile.weightKg;
  const activityMultiplier = getActivityLevelValue(profile.activityLevel);
  const climateMultiplier = getClimateValue(profile.climate);

  const baseMl = profile.weightKg * genderValue;

  const totalMl = baseMl + ageValue + activityMultiplier + climateMultiplier;
  const roundedMl = Math.round(totalMl / 100) * 100;

  return roundedMl;
}
