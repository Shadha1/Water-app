import { UserProfileInput } from "@/constants/water-core/userProfile";
import { loadUserProfile } from "@/constants/water-core/userStorage";
import { calculateDailyWaterMl } from "@/constants/water-core/water-index";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      <Text style={styles.label}>
        You should drink {(dailyMl / 1000).toFixed(1)} L / day 💧
      </Text>

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
