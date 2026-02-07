import type { Gender, UserProfileInput } from "./userProfile";

/** It's only used in the form and storage.
 *
 * Because AsyncStorage only stores strings, we need a separate type for the form data.
 * Numbers are stored as text, so they can be entered in input fields
 * Gender may be empty, as long as the user hasn't made a selection yet
 */

export type FormFields = Omit<
  UserProfileInput,
  "ageYears" | "weightKg" | "gender"
> & {
  ageYears: string;
  weightKg: string;
  gender: Gender | "";
};

/**  default values for the form */
export const defaultForm: FormFields = {
  name: "",
  gender: "",
  ageYears: "",
  weightKg: "",
  activityLevel: "moderate",
  climate: "temperate",
};

/** Builds a UserProfileInput from the form fields, or null if invalid
 * Validations:
 * required fields are filled
 * Returns null if any validation fails
 * Otherwise returns a UserProfileInput with correct types
 */

export function buildProfile(fields: FormFields): UserProfileInput | null {
  const { name, gender, ageYears, weightKg, activityLevel, climate } = fields;

  if (!name.trim() || !gender || !ageYears.trim() || !weightKg.trim())
    return null;

  // converts strings to numbers
  const age = Number(ageYears);
  const weight = Number(weightKg);
  //age and weight are valid positive numbers within reasonable human ranges
  if (!Number.isFinite(age) || !Number.isFinite(weight)) return null;
  if (age < 10 || age > 100) return null;
  if (weight < 20 || weight > 300) return null;

  return {
    name,
    gender: gender as Gender,
    ageYears: age,
    weightKg: weight,
    activityLevel,
    climate,
  };
}
