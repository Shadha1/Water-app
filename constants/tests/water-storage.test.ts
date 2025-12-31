import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadConsumedMl, saveConsumedMl } from "../water-core/water-storage";

// AsyncStorage mocken
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("water-storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loadConsumedMl", () => {
    test("gibt 0 zurück, wenn kein Wert gespeichert ist", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await loadConsumedMl();
      expect(result).toBe(0);
    });

    test("lädt und rundet einen gültigen gespeicherten Wert", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue("123.6");

      const result = await loadConsumedMl();
      expect(result).toBe(124);
    });

    test("gibt 0 zurück bei negativem Wert", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue("-5");

      const result = await loadConsumedMl();
      expect(result).toBe(0);
    });

    test("gibt 0 zurück bei ungültigem gespeicherten Wert", async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue("abc");

      const result = await loadConsumedMl();
      expect(result).toBe(0);
    });
  });

  describe("saveConsumedMl", () => {
    test("speichert einen gültigen Wert gerundet", async () => {
      await saveConsumedMl(42.4);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "water:consumedMl",
        "42"
      );
    });

    test("speichert 0 bei ungültigem Wert", async () => {
      await saveConsumedMl(-10);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "water:consumedMl",
        "0"
      );
    });

    test("speichert 0 bei NaN", async () => {
      await saveConsumedMl(Number.NaN);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "water:consumedMl",
        "0"
      );
    });
  });
});
