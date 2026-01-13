import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildProfile, FormFields } from "../constants/water-core/userForm";
import { UserProfileInput } from "../constants/water-core/userProfile";
const PROFILE_KEY = "userProfile";

/**
 * Save a profile to AsyncStorage.
 * Throws an error if saving fails or if the profile is invalid.
 */

export async function saveUserProfile(
  fields: FormFields
): Promise<UserProfileInput> {
  const profile = buildProfile(fields);
  if (!profile) {
    throw new Error("Please fill in all fields with valid values");
  }

  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return profile;
  } catch (err) {
    // bubble up a friendly error
    throw new Error("Failed to save profile");
  }
}

/**
 * Load a saved profile from AsyncStorage.
 * Returns the parsed UserProfileInput or null if not present.
 */
export async function loadUserProfile(): Promise<UserProfileInput | null> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  return raw ? (JSON.parse(raw) as UserProfileInput) : null;
}

// Delete the saved user profile.

export async function deleteUserProfile(): Promise<void> {
  await AsyncStorage.removeItem(PROFILE_KEY);
}
export { PROFILE_KEY };
