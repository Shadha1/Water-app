// water-tracker.ts
// Speichert und verwaltet den aktuellen Wasserverbrauch
// während der Laufzeit der App (RAM, keine Persistenz)

import { addWaterMl, remainingToGoalMl, setConsumedMl } from "./water-progress";

export type WaterSnapshot = {
  consumedMl: number;
  goalMl: number;
  remainingMl: number;
};

// Erstellt einen neuen WaterTracker mit eigenem Zustand
export function createWaterTracker(goalMl: number) {
  // Zielwert einmal validieren, damit der Snapshot stabil bleibt
  const safeGoalMl =
    Number.isFinite(goalMl) && goalMl >= 0 ? Math.round(goalMl) : 0;

  // Interner Zustand für den Wasserverbrauch
  let consumedMl = 0;

  // Fügt eine Wassermenge zum aktuellen Verbrauch hinzu
  function drink(addedMl: number): WaterSnapshot {
    consumedMl = addWaterMl(consumedMl, addedMl);
    return getSnapshot();
  }

  // Setzt den Wasserverbrauch direkt (z. B. manuelle Korrektur)
  function edit(newValueMl: number): WaterSnapshot {
    consumedMl = setConsumedMl(newValueMl);
    return getSnapshot();
  }

  // Erstellt eine aktuelle Momentaufnahme des Zustands
  function getSnapshot(): WaterSnapshot {
    return {
      consumedMl,
      goalMl: safeGoalMl,
      remainingMl: remainingToGoalMl(consumedMl, safeGoalMl),
    };
  }

  // Öffentliche API des Trackers
  return { drink, edit, getSnapshot };
}
