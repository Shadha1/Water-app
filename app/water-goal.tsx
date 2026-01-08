import { UserProfileInput } from "@/constants/water-core/userProfile";
import { calculateDailyWaterMl } from "@/constants/water-core/water-formula";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WaterGoal() {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const calData = async () => {
      const stored = await AsyncStorage.getItem("userProfile");
      if (!stored) return;
      const profile: UserProfileInput = JSON.parse(stored);

      const waterMl = calculateDailyWaterMl(profile);
      setResult(waterMl);
    };
    calData();
  }, []);

  if (!result) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        You should drink {(result / 1000).toFixed(1)} L / day 💧
      </Text>

      {/* <Button title="Next" onPress={() => router.replace("/(tabs)/home")} />
        <Text style={styles.buttonText}>Confirm</Text> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      {/* <Button title="Back" onPress={() => router.replace("/")} /> */}
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>←</Text>
        {/* statt "Back" */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e6f0f2",
  },
  title: {
    fontSize: 24,
    marginTop: 60,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#27598E",//"#2c5f7c",
    paddingVertical: 6, // altura (antes 12)
    paddingHorizontal: 12,   // ancho controlado
    borderRadius: 14,//20
    alignItems: "center",
    alignSelf: "center", //clave
  },
  buttonBack: {
    marginTop: 20,
    backgroundColor: "#27598E",//"#2c5f7c",
    paddingVertical: 6, // altura (antes 12)
    paddingHorizontal: 12,   // ancho controlado
    borderRadius: 100,//20
    alignItems: "center",
    alignSelf: "center", //clave
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,//16,
    fontFamily: "sans-serif",
    fontWeight: "400", //600 needed?
  },
  label: {
    fontSize: 24,
    marginBottom: 4,
    color: "#27598E",//"#2c5f7c",
    fontFamily: "serif",
  },

});
