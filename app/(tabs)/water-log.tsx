import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import AddWaterButton from "@/components/addWaterButton";
import BackButton from "@/components/BackButton";
import ConfirmButton from "@/components/ConfirmButton";
import ResetWaterButton from "@/components/ResetButton";
import type { WaterSnapshot } from "@/constants/water-core/water-tracker";
import { edit, tryGetWaterSnapshot } from "@/constants/water-core/waterService";
import useUserData from "@/hooks/loadUser";

export default function LogWater() {
  const { profile, loading } = useUserData();

  // Track initial state when screen opens
  const [initialConsumedMl, setInitialConsumedMl] = useState<number>(0);

  const [snap, setSnap] = useState<WaterSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMl, setSelectedMl] = useState<number | null>(null);


  //  Use useFocusEffect to reset state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setError(null);
      setSelectedMl(null);

      if (loading) return;

      if (!profile) {
        setSnap(null);
        setInitialConsumedMl(0);
        return;
      }

      try {
        const currentSnap = tryGetWaterSnapshot();
        setSnap(currentSnap);

        // Save the initial value when screen loads
        if (currentSnap) {
          setInitialConsumedMl(currentSnap.consumedMl);
        }
      } catch (e: any) {
        setError(e?.message ?? String(e));
      }
    }, [loading, profile]),
  );

  // Handle Confirm - just go back (changes are already saved)
  const handleConfirm = () => {
    router.replace("./home");
  };

  // Handle Back - revert to initial value if changed
  const handleBack = async () => {
    if (!snap) {
      router.replace("./home");
      return;
    }

    // Check if water was added
    const hasChanges = snap.consumedMl !== initialConsumedMl;

    if (hasChanges) {
      Alert.alert(
        "Discard changes?",
        `You added ${snap.consumedMl - initialConsumedMl} ml. Discard these changes?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: async () => {
              try {
                // Revert to initial value
                await edit(initialConsumedMl);
                router.replace("./home");
              } catch (err) {
                console.error("Failed to revert:", err);
                router.replace("./home");
              }
            },
          },
        ],
      );
    } else {
      // No changes, just go back
      router.replace("./home");
    }
  };

  if (loading) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Water</Text>

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {!error && !snap && (
        <Text style={styles.text}>Water noch nicht initialisiert…</Text>
      )}

      {snap && (
        <>
          <AddWaterButton ml={50} selected={selectedMl === 50} onSnapshot={(next) => { setSelectedMl(50); setSnap(next); }} />
          <AddWaterButton ml={100} selected={selectedMl === 100} onSnapshot={(next) => { setSelectedMl(100); setSnap(next); }} />
          <AddWaterButton ml={250} selected={selectedMl === 250} onSnapshot={(next) => { setSelectedMl(250); setSnap(next); }} />
          <AddWaterButton ml={500} selected={selectedMl === 500} onSnapshot={(next) => { setSelectedMl(500); setSnap(next); }} />

          <ResetWaterButton ml={0} selected={selectedMl === 0} onSnapshot={(next) => { setSelectedMl(0); setSnap(next); }} />
        </>
      )}

      {/* Changed to use custom handlers */}
      <ConfirmButton onPress={handleConfirm} />
      <View style={styles.buttonback}>
        <BackButton onPress={handleBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#dfeff0",
  },
  title: {
    fontSize: 28,
    color: "#27598E",
    fontFamily: "serif",
    fontWeight: "bold",
    marginBottom: 30,
  },

  text: {
    color: "#000",
    fontSize: 16,
    marginVertical: 4,
  },

  error: {
    color: "#ff0000",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonback: {
    position: "absolute",
    bottom: 80,
    right: 130,
  },
});
