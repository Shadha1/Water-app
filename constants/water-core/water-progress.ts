// Wasser hinzufügen
export function addWaterMl(currentMl: number, addedMl: number): number {
  if (!Number.isFinite(currentMl) || currentMl < 0) currentMl = 0;
  if (!Number.isFinite(addedMl) || addedMl <= 0) return Math.round(currentMl);
  return Math.round(Math.round(currentMl) + Math.round(addedMl));
}

// Wasser subtrahieren
export function diffWaterMl(currentMl: number, diffMl: number): number {
  if (!Number.isFinite(currentMl) || currentMl < 0) currentMl = 0;
  if (!Number.isFinite(diffMl) || diffMl <= 0) return Math.round(currentMl);
  return Math.max(0, Math.round(Math.round(currentMl) - Math.round(diffMl)));
}

// Setzen des konsumierten Wassers
export function setConsumedMl(valueMl: number): number {
  if (!Number.isFinite(valueMl) || valueMl < 0) return 0;
  return Math.round(valueMl);
}

// Berechnung des verbleibenden Wassers bis zum Ziel
export function remainingToGoalMl(currentMl: number, goalMl: number): number {
  if (!Number.isFinite(currentMl) || currentMl < 0) currentMl = 0;
  if (!Number.isFinite(goalMl) || goalMl <= 0) return 0;
  return Math.max(0, Math.round(Math.round(goalMl) - Math.round(currentMl)));
}