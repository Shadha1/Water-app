import type { UserProfileInput } from "./userProfile";
import { calculateDailyWaterMl } from "./water-formula";
import { loadConsumedMl, saveConsumedMl } from "./water-storage";
import { createWaterTracker } from "./water-tracker";

export function createTrackerFromProfile(profile: UserProfileInput) {
  const goalMl = calculateDailyWaterMl(profile);
  return createWaterTracker(goalMl);
}

// Session: lädt beim Start + speichert nach drink/edit
export async function createHydratedSessionFromProfile(
  profile: UserProfileInput
) {
  const tracker = createTrackerFromProfile(profile);

  const saved = await loadConsumedMl();
  tracker.edit(saved);

  async function drink(ml: number) {
    const snap = tracker.drink(ml);
    await saveConsumedMl(snap.consumedMl);
    return snap;
  }

  async function edit(ml: number) {
    const snap = tracker.edit(ml);
    await saveConsumedMl(snap.consumedMl);
    return snap;
  }

  return { tracker, drink, edit };
}

export {
  calculateDailyWaterMl,
  createWaterTracker,
  loadConsumedMl,
  saveConsumedMl,
};
export type { UserProfileInput };