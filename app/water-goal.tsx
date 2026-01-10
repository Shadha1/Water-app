import { UserProfileInput } from "@/constants/water-core/userProfile";
import { loadUserProfile } from "@/constants/water-core/userStorage";
import { calculateDailyWaterMl } from "@/constants/water-core/water-index";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

/** Water Goal Screen
 * Fetches the user profile from AsyncStorage, calculates the daily water intake,
 * and displays it to the user. Provides navigation to the reminder setup and back to the profile screen.
 */

export default function WaterGoal() {
  // State to hold the user profile
  const [profile, setProfile] = useState<UserProfileInput | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await loadUserProfile(); // Load the user profile from storage
      setProfile(stored);
    })();
  }, []);

  if (!profile) return null;

  const dailyMl = calculateDailyWaterMl(profile);

  // Mica's teil
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You should drink {(dailyMl / 1000).toFixed(1)} L / day 💧
      </Text>

      <Button title="Next" onPress={() => router.replace("/reminder")} />
      <Button title="Back" onPress={() => router.replace("/")} />
    </View>
  );
}

// Mica's teil
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
