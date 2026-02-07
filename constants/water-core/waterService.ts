import type { UserProfileInput } from "@/constants/water-core/userProfile";
import { createHydratedSessionFromProfile } from "@/constants/water-core/water-index";
import type { WaterSnapshot } from "@/constants/water-core/water-tracker";

let session: Awaited<
  ReturnType<typeof createHydratedSessionFromProfile>
> | null = null;

/** Initialisiert Water mit einem gültigen Profil (nur aufrufen, wenn profile != null). */
export async function initWater(
  profile: UserProfileInput,
): Promise<WaterSnapshot> {
  session = await createHydratedSessionFromProfile(profile);
  return session.tracker.getSnapshot();
}

/** Für UI: kein Crash, wenn Water noch nicht initialisiert ist */
export function tryGetWaterSnapshot(): WaterSnapshot | null {
  return session ? session.tracker.getSnapshot() : null;
}

/** Streng: nur nutzen, wenn du 100% initialisiert hast */
export function getWaterSnapshot(): WaterSnapshot {
  if (!session) throw new Error("Water not initialized.");
  return session.tracker.getSnapshot();
}

export async function drink(ml: number): Promise<WaterSnapshot> {
  if (!session) throw new Error("Water not initialized.");
  return await session.drink(ml);
}

export async function edit(ml: number): Promise<WaterSnapshot> {
  if (!session) throw new Error("Water not initialized.");
  return await session.edit(ml);
}

/** Resets the in-memory water session (used when deleting profile) */
export function resetWater(): void {
  session = null;
}
