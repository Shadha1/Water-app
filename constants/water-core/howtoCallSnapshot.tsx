import React, { useState } from "react";
import { Text, View } from "react-native";

import AddWaterButton from "@/components/addWaterButton";
import type { WaterSnapshot } from "@/constants/water-core/water-tracker";
import { tryGetWaterSnapshot } from "@/constants/water-core/waterService";

export default function WaterUI() {
  const [snap, setSnap] = useState<WaterSnapshot | null>(tryGetWaterSnapshot());

  let consumedMl = 0;
  let remainingMl = 0;

  if (snap) {
    consumedMl = snap.consumedMl;
    remainingMl = snap.remainingMl;
  }

  return (
    <View>
      <Text>Consumed: {consumedMl} ml</Text>
      <Text>Remaining: {remainingMl} ml</Text>

      <AddWaterButton ml={250} onSnapshot={setSnap} />
    </View>
  );
}
// der Wert wird jetzt sofort in der UI aktualisiert und wenn der button dann im Einsatz ist, zwingt er den code einen neuen snapshot zu holen