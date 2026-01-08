import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage-Key für den aktuellen Wasserverbrauch (ml)
const KEY_CONSUMED_ML = "water:consumedMl";

// Lädt den zuletzt gespeicherten Wasserverbrauch.
// Gibt 0 zurück, wenn kein gültiger Wert vorhanden ist.
export async function loadConsumedMl(): Promise<number> {
  const raw = await AsyncStorage.getItem(KEY_CONSUMED_ML);

  // Kein gespeicherter Wert vorhanden
  if (raw === null) return 0;

  const value = Number(raw);

  // Defensiver Fallback bei korrupten oder ungültigen Daten
  if (!Number.isFinite(value) || value < 0) return 0;

  return Math.round(value);
}

// Speichert den aktuellen Wasserverbrauch persistent.
// Ungültige Werte werden defensiv auf 0 gesetzt.
export async function saveConsumedMl(value: number): Promise<void> {
  const safeValue =
    Number.isFinite(value) && value >= 0 ? Math.round(value) : 0;

  await AsyncStorage.setItem(KEY_CONSUMED_ML, String(safeValue));
}
