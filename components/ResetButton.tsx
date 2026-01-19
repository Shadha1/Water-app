import React, { useState } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import type { WaterSnapshot } from "@/constants/water-core/water-tracker";
import { edit, tryGetWaterSnapshot } from "@/constants/water-core/waterService";

type Props = {
  ml: number;
  onSnapshot: (snap: WaterSnapshot) => void; // UI sofort aktualisieren
  onAfterChange?: (snap: WaterSnapshot) => void | Promise<void>; // Notification-Update
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function ResetWaterButton({
  ml,
  onSnapshot,
  onAfterChange,
  label,
  disabled,
  style,
}: Props) {
  const [busy, setBusy] = useState(false);

  async function onPress() {
    if (busy || disabled) return;

    // Wenn Water noch nicht initialisiert ist, nicht crashen
    if (!tryGetWaterSnapshot()) return;

    setBusy(true);
    try {
      const next = await edit(ml); // Wasserstand anpassen
      onSnapshot(next); // UI updaten

      // Trigger für Notifications
      if (onAfterChange) await onAfterChange(next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || busy}
      style={({ pressed }) => [
        styles.button,
        style,
        (disabled || busy) && styles.buttonDisabled,
        pressed && !disabled && !busy && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>
        {label ?? `Reset to ${ml} ml`}
        {busy ? " …" : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 200, // distancia desde la parte inferior
    left: 60,   // distancia desde la izquierda
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});
