import GearButton from "@/components/GearButton";
import useUserData from "@/hooks/loadUser";
import { router } from "expo-router";
//import React from "react";
import LogButton from "@/components/LogButton";
import { tryGetWaterSnapshot } from "@/constants/water-core/waterService";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { profile, loading } = useUserData(); // get profile from hook

  const snapshot = tryGetWaterSnapshot();

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
  const isEndOfDay = now.getHours() >= 23 && now.getMinutes() >= 59; // ejemplo: después de las 23:00

  const selectGif = () => {
    if (progress >= 1) {
      return require("../../assets/images/gif_success.gif"); // meta alcanzada
    }
    if (isEndOfDay) {
      return require("../../assets/images/gif_fail.gif"); // fin del día sin meta
    }
    return require("../../assets/images/gif_standard.gif"); // resto del día
  };
  //Wasser-text
  const formatWaterAmount = (ml: number) => {
    if (ml >= 1000) return `${(ml / 1000).toFixed(1)} L`; // litros con 1 decimal
    return `${ml} ml`; // ml si es menos de 1L
  };

  const consumedText = snapshot
    ? `${formatWaterAmount(snapshot.consumedMl)} / ${formatWaterAmount(snapshot.goalMl)}`
    : `0 ml / 0 ml`;
  // Mica's teil
  return (
    <View style={styles.container}>
      {/* GIF a la izquierda */}
      <Image source={selectGif()} style={styles.gif} />

      <GearButton onPress={() => router.push("./settings")} />
      <LogButton onPress={() => router.push("./water-log")} />

      <Text style={styles.title}>Hello {profile?.name}</Text>


      <View style={styles.barWrapper}>{/* Barra vertical + texto abajo */}
        {/* Barra vertical a la derecha */}
        <View style={styles.barContainer}>
          <Animated.View style={[styles.barFill, { height: animatedHeight }]} />
        </View>
        {/* Texto de progreso abajo de la barra */}
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
    width: 60,           // espacio para la barra y texto
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
