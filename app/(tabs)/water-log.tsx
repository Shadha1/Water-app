import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AddWaterButton from "@/components/addWaterButton";
import BackButton from "@/components/BackButton";
import ConfirmButton from "@/components/ConfirmButton";
import ResetWaterButton from "@/components/ResetButton";
import type { WaterSnapshot } from "@/constants/water-core/water-tracker";
import { tryGetWaterSnapshot } from "@/constants/water-core/waterService";
import useUserData from "@/hooks/loadUser";

export default function LogWater() {
  const { profile, loading } = useUserData();
  const [snap, setSnap] = useState<WaterSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMl, setSelectedMl] = useState<number | null>(null);

  useEffect(() => {
    setError(null);

    if (loading) return;

    if (!profile) {
      setSnap(null);
      return;
    }

    try {
      setSnap(tryGetWaterSnapshot());
    } catch (e: any) {
      setError(e?.message ?? String(e));
    }
  }, [loading, profile]);

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

          <ResetWaterButton ml={0} onSnapshot={() => { }} />
        </>
      )}
      <ConfirmButton onPress={() => router.replace("./home")} />
      <View style={styles.buttonback}>
        <BackButton onPress={() => router.replace("./home")} />
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
    bottom: 80, // más abajo o ajusta según quieras
    right: 130, // derecha
  },
});
