import { createWaterTracker } from "../water-core/water-tracker";

describe("createWaterTracker", () => {
  test("initial snapshot: consumed=0, remaining=goal", () => {
    const tracker = createWaterTracker(2000);
    expect(tracker.getSnapshot()).toEqual({
      consumedMl: 0,
      goalMl: 2000,
      remainingMl: 2000,
    });
  });

  test("goal wird validiert und gerundet", () => {
    const t1 = createWaterTracker(2500.6);
    expect(t1.getSnapshot().goalMl).toBe(2501);

    const t2 = createWaterTracker(Number.NaN);
    expect(t2.getSnapshot().goalMl).toBe(0);

    const t3 = createWaterTracker(-5);
    expect(t3.getSnapshot().goalMl).toBe(0);
  });

  test("drink erhöht consumed und reduziert remaining", () => {
    const tracker = createWaterTracker(500);

    const s1 = tracker.drink(120);
    expect(s1).toEqual({ consumedMl: 120, goalMl: 500, remainingMl: 380 });

    const s2 = tracker.drink(80);
    expect(s2).toEqual({ consumedMl: 200, goalMl: 500, remainingMl: 300 });
  });

  test("drink ignoriert ungültige Werte (<=0, NaN, Infinity)", () => {
    const tracker = createWaterTracker(500);

    tracker.drink(100);
    expect(tracker.getSnapshot()).toEqual({
      consumedMl: 100,
      goalMl: 500,
      remainingMl: 400,
    });

    tracker.drink(0);
    tracker.drink(-10);
    tracker.drink(Number.NaN);
    tracker.drink(Number.POSITIVE_INFINITY);

    // sollte unverändert bleiben
    expect(tracker.getSnapshot()).toEqual({
      consumedMl: 100,
      goalMl: 500,
      remainingMl: 400,
    });
  });

  test("edit setzt consumed (inkl. Rundung) und aktualisiert remaining", () => {
    const tracker = createWaterTracker(1000);

    const s1 = tracker.edit(123.6);
    expect(s1).toEqual({ consumedMl: 124, goalMl: 1000, remainingMl: 876 });

    const s2 = tracker.edit(999.9);
    expect(s2).toEqual({ consumedMl: 1000, goalMl: 1000, remainingMl: 0 });
  });

  test("edit mit ungültigen Werten setzt consumed auf 0", () => {
    const tracker = createWaterTracker(800);

    tracker.edit(200);
    expect(tracker.getSnapshot()).toEqual({
      consumedMl: 200,
      goalMl: 800,
      remainingMl: 600,
    });

    const s = tracker.edit(-1);
    expect(s).toEqual({ consumedMl: 0, goalMl: 800, remainingMl: 800 });
  });

  test("Tracker-Instanzen sind unabhängig (eigener Zustand)", () => {
    const a = createWaterTracker(500);
    const b = createWaterTracker(500);

    a.drink(100);
    expect(a.getSnapshot().consumedMl).toBe(100);
    expect(b.getSnapshot().consumedMl).toBe(0);

    b.drink(50);
    expect(a.getSnapshot().consumedMl).toBe(100);
    expect(b.getSnapshot().consumedMl).toBe(50);
  });
});
