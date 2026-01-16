import GearButton from "@/components/GearButton";
import useUserData from "@/hooks/loadUser";
import { router } from "expo-router";
//import React from "react";
import LogButton from "@/components/LogButton";
import { tryGetWaterSnapshot } from "@/constants/water-core/water-tracker";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { profile, loading } = useUserData(); // get profile from hook

  const snapshot = tryGetWaterSnapshot();
  const progress =
    snapshot && snapshot.goalMl > 0 ? snapshot.consumedMl / snapshot.goalMl : 0;
  //const progress = snapshot ? snapshot.consumedMl / snapshot.goalMl : 0;
  const animatedHeight = useRef(new Animated.Value(0)).current;
  //progress * 200
  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: progress * 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  if (loading || !profile) return null;

  const now = new Date();
  const isEndOfDay = now.getHours() === 0 && now.getMinutes() === 0; // ejemplo: después de las 23:00
  // const [isEndOfDay, setIsEndOfDay] = useState(false);

  // función para seleccionar GIF según estado
  const selectGif = () => {
    if (!isEndOfDay) return require("../../assets/images/gif_standard.gif");
    return progress >= 1
      ? require("../../assets/images/gif_success.gif")
      : require("../../assets/images/gif_fail.gif");
  };

  // Mica's teil
  return (
    <View style={styles.container}>
      {/* GIF a la izquierda */}
      <Image source={selectGif()} style={styles.gif} />

      <GearButton onPress={() => router.push("./settings")} />
      <LogButton onPress={() => router.push("./water-log")} />
      <Text style={styles.title}>Hello {profile?.name}</Text>

      {/* Barra vertical a la derecha */}
      <View style={styles.barContainer}>
        <Animated.View style={[styles.barFill, { height: animatedHeight }]} />
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
  barContainer: {
    width: 30,
    height: 300,
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end", // relleno desde abajo
    marginLeft: 240,
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
