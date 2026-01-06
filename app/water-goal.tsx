import { UserProfileInput } from "@/constants/water-core/userProfile";
import { calculateDailyWaterMl } from "@/constants/water-core/water-formula";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.title}>
        You should drink {(result / 1000).toFixed(1)} L / day 💧
      </Text>

      <Button title="Next" onPress={() => router.replace("/(tabs)/home")} />
      <Button title="Back" onPress={() => router.replace("/")} />
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
});
