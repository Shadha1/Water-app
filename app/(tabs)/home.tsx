import GearButton from "@/components/GearButton";
import useUserData from "@/hooks/loadUser";
import { router, useFocusEffect } from "expo-router";
//import React from "react";
import LogButton from "@/components/LogButton";
import { WaterSnapshot } from "@/constants/water-core/water-tracker";
import { tryGetWaterSnapshot } from "@/constants/water-core/waterService";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { profile, loading } = useUserData(); // get profile from hook

  const [snapshot, setSnapshot] = useState<WaterSnapshot | null>(null);

  // Load snapshot when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (loading || !profile) return;

      // Load the current snapshot from Water service
      const updateSnapshot = () => {
        const snap = tryGetWaterSnapshot();
        if (snap) {
          console.log("Snapshot loaded:", snap);
          setSnapshot(snap);
        } else {
          // If snapshot not ready, try again after a short delay
          setTimeout(updateSnapshot, 100);
        }
      };

      updateSnapshot();
    }, [loading, profile]),
  );

  const progress =
    snapshot && snapshot.goalMl > 0
      ? Math.min(1, snapshot.consumedMl / snapshot.goalMl)
      : 0;

  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: progress * 300,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  if (loading || !profile) return null;

  const now = new Date();
  const isEndOfDay = now.getHours() >= 23 && now.getMinutes() >= 59; // Beispiel: nach 23:00

  const selectGif = () => {
    if (progress >= 1) {
      return require("../../assets/images/gif_success.gif"); // Ziel erreicht
    }
    if (isEndOfDay) {
      return require("../../assets/images/gif_fail.gif"); // Tagesende ohne Ziel
    }
    return require("../../assets/images/gif_standard.gif"); // Rest des Tages
  };

  // Wasser-Text
  const formatWaterAmount = (ml: number) => {
    if (ml >= 1000) return `${(ml / 1000).toFixed(2)} L`; // Liter mit 2 Dezimalstellen
    return `${ml} ml`; // ml wenn weniger als 1L
  };

  const consumedText = snapshot
    ? `${formatWaterAmount(snapshot.consumedMl)} / ${formatWaterAmount(snapshot.goalMl)}`
    : `0 ml / 0 ml`;

  // Micas Teil

  return (
    <View style={styles.container}>
      {/* GIF links */}
      <Image source={selectGif()} style={styles.gif} />

      <GearButton onPress={() => router.push("./settings")} />
      <LogButton onPress={() => router.push("./water-log")} />

      <Text style={styles.title}>Hello {profile?.name}</Text>

      <View style={styles.barWrapper}>
        {/* Vertikale Leiste + Text darunter */}
        {/* Vertikale Leiste rechts */}
        <View style={styles.barContainer}>
          <Animated.View style={[styles.barFill, { height: animatedHeight }]} />
        </View>
        {/* Fortschrittstext unter der Leiste */}
        <Text style={styles.progressText}>{consumedText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // GIF a la izquierda, barra a la derecha
    backgroundColor: "#dfeff0",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    //paddingTop: 36,
  },
  gif: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginLeft: -60,
    position: "absolute",
  },
  barFill: {
    width: "100%",
    backgroundColor: "#27598E",
    position: "absolute",
    bottom: 0,
  },
  progressText: {
    marginTop: 8,
    fontSize: 20,
    color: "#27598E",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "serif",
  },
  barWrapper: {
    width: 60, // espacio para la barra y texto
    alignItems: "center", // centrar barra y texto
    marginLeft: 240,
  },
  barContainer: {
    width: 40,
    height: 300,
    backgroundColor: "#ccc",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end", // relleno desde abajo
    //marginLeft: 240,
    marginTop: 8,
  },

  title: {
    position: "absolute",
    fontSize: 24,
    marginTop: 50,
    marginLeft: 30,
    color: "#27598E",
    fontFamily: "serif",
    textAlign: "left",
    alignSelf: "flex-start", // mueve el text al inicio horizontal del container
  },
});
