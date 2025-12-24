import {
  addWaterMl,
  diffWaterMl,
  remainingToGoalMl,
  setConsumedMl,
} from "../water-core/water-progress";

describe("addWaterMl", () => {
  test("addiert eine ganze Menge", () => {
    expect(addWaterMl(0, 40)).toBe(40);
    expect(addWaterMl(100, 50)).toBe(150);
  });

  test("rundet addedMl und das Gesamtergebnis", () => {
    // Math.round(49.6) = 50
    expect(addWaterMl(100, 49.6)).toBe(150);
    // Math.round(0.4) = 0 => +0
    expect(addWaterMl(100, 0.4)).toBe(100);
  });

  test("ignoriert ungültige addedMl Werte", () => {
    expect(addWaterMl(100, 0)).toBe(100);
    expect(addWaterMl(100, -10)).toBe(100);
    expect(addWaterMl(100, Number.NaN)).toBe(100);
    expect(addWaterMl(100, Number.POSITIVE_INFINITY)).toBe(100);
    expect(addWaterMl(100, Number.NEGATIVE_INFINITY)).toBe(100);
  });
});

describe("diffWaterMl", () => {
  test("subtrahiert eine ganze Menge", () => {
    expect(diffWaterMl(200, 40)).toBe(160);
  });

  test("rundet diffMl und das Gesamtergebnis", () => {
    // Math.round(49.6) = 50
    expect(diffWaterMl(200, 49.6)).toBe(150);
    // Math.round(0.4) = 0 => -0
    expect(diffWaterMl(200, 0.4)).toBe(200);
  });

  test("clamped auf 0, wenn das Ergebnis negativ wäre", () => {
    expect(diffWaterMl(30, 40)).toBe(0);
    expect(diffWaterMl(0, 10)).toBe(0);
  });

  test("ignoriert ungültige diffMl Werte", () => {
    expect(diffWaterMl(100, 0)).toBe(100);
    expect(diffWaterMl(100, -10)).toBe(100);
    expect(diffWaterMl(100, Number.NaN)).toBe(100);
    expect(diffWaterMl(100, Number.POSITIVE_INFINITY)).toBe(100);
    expect(diffWaterMl(100, Number.NEGATIVE_INFINITY)).toBe(100);
  });
});

describe("setConsumedMl", () => {
  test("setzt und rundet gültige Werte", () => {
    expect(setConsumedMl(0)).toBe(0);
    expect(setConsumedMl(12.4)).toBe(12);
    expect(setConsumedMl(12.6)).toBe(13);
    expect(setConsumedMl(999.9)).toBe(1000);
  });

  test("ungültig (NaN/Infinity/negativ) => 0", () => {
    expect(setConsumedMl(-1)).toBe(0);
    expect(setConsumedMl(Number.NaN)).toBe(0);
    expect(setConsumedMl(Number.POSITIVE_INFINITY)).toBe(0);
    expect(setConsumedMl(Number.NEGATIVE_INFINITY)).toBe(0);
  });
});

describe("remainingToGoalMl", () => {
  test("berechnet verbleibende Menge bis zum Ziel", () => {
    expect(remainingToGoalMl(200, 500)).toBe(300);
    expect(remainingToGoalMl(0, 500)).toBe(500);
  });

  test("wenn current über Ziel => 0", () => {
    expect(remainingToGoalMl(600, 500)).toBe(0);
    expect(remainingToGoalMl(500, 500)).toBe(0);
  });

  test("ungültiges Ziel (<=0, NaN, Infinity) => 0", () => {
    expect(remainingToGoalMl(200, 0)).toBe(0);
    expect(remainingToGoalMl(200, -500)).toBe(0);
    expect(remainingToGoalMl(200, Number.NaN)).toBe(0);
    expect(remainingToGoalMl(200, Number.POSITIVE_INFINITY)).toBe(0);
    expect(remainingToGoalMl(200, Number.NEGATIVE_INFINITY)).toBe(0);
  });
});
