import { createWaterTracker } from "../constants/water-core/water-tracker";

export function runWaterTrackerDebug() {
  const tracker = createWaterTracker(2000);

  console.log("START", tracker.getSnapshot());
  console.log("DRINK 40", tracker.drink(40));
  console.log("DRINK 250", tracker.drink(250));
  console.log("EDIT 1200", tracker.edit(1200));
  console.log("DRINK 1000", tracker.drink(1000));
}
// das sind nur logs um zu sehen ob der tracker funktioniert