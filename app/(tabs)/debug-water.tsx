import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { WaterSnapshot } from "@/constants/water-core/water-tracker";
import { tryGetWaterSnapshot } from "@/constants/water-core/waterService";
import useUserData from "@/hooks/loadUser";

export default function DebugWater() {
  const { profile, loading } = useUserData();
  const [snap, setSnap] = useState<WaterSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    // Solange das Profil lädt, machen wir nichts.
    if (loading) return;

    // Wenn kein Profil existiert, ist Water erwartungsgemäß noch nicht initialisiert.
    if (!profile) {
      setSnap(null);
      return;
    }

    // Profil existiert -> TabLayout sollte initWater(profile) bereits gemacht haben.
    // Wir lesen nur den aktuellen Snapshot "safe".
    try {
      setSnap(tryGetWaterSnapshot());
    } catch (e: any) {
      setError(e?.message ?? String(e));
    }
  }, [loading, profile]);

  if (loading) return null;

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kein Profil gespeichert.</Text>
        <Text style={styles.textSmall}>Bitte zuerst im Onboarding anlegen.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.text}>Error: {error}</Text>}

      {!error && !snap && (
        <Text style={styles.text}>Water noch nicht initialisiert…</Text>
      )}

      {snap && (
        <>
          <Text style={styles.text}>goalMl: {snap.goalMl} ml</Text>
          <Text style={styles.text}>consumedMl: {snap.consumedMl} ml</Text>
          <Text style={styles.text}>remainingMl: {snap.remainingMl} ml</Text>

          <Text style={styles.textSmall}>
            Profil: {profile.name} ({profile.weightKg}kg, {profile.ageYears}y)
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6E4E5",
    gap: 10,
  },
  text: { color: "#27598E", fontSize: 24, fontFamily: "sans-serif" },
  textSmall: { color: "#27598E", fontSize: 20, marginTop: 8, fontFamily: "sans" },
});
