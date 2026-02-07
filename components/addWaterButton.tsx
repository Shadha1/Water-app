// addWaterButton.tsx
import { useState } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { updateHydrationNotifications } from "@/constants/notifications";
import type { WaterSnapshot } from "@/constants/water-core/water-tracker";
import {
  drink,
  tryGetWaterSnapshot,
} from "@/constants/water-core/waterService";

type Props = {
  ml: number;
  onSnapshot: (snap: WaterSnapshot) => void; // UI sofort aktualisieren
  onAfterChange?: (snap: WaterSnapshot) => void | Promise<void>; // Notification-Update
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  selected?: boolean; //Mica
};

export default function AddWaterButton({
  ml,
  onSnapshot,
  onAfterChange,
  label,
  disabled,
  style,
  selected,
}: Props) {
  const [busy, setBusy] = useState(false);

  async function onPress() {
    if (busy || disabled) return;

    // Wenn Water noch nicht initialisiert ist, nicht crashen
    if (!tryGetWaterSnapshot()) return;

    setBusy(true);
    try {
      const next = await drink(ml); // erhöht + speichert + Snapshot zurück
      onSnapshot(next); // UI updaten

      // Update Notification Settings
      await updateHydrationNotifications();
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
        selected && styles.buttonSelected, //Mica
        style,
        (disabled || busy) && styles.buttonDisabled,
        pressed && !disabled && !busy && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label ?? `+ ${ml} ml`}
        {busy ? " …" : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "transparent",
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
  buttonSelected: {
    backgroundColor: "#27598E",
    borderColor: "#27598E",
  },
  textSelected: {
    color: "#ffffff",
  },
});
