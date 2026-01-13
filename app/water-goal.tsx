import { calculateDailyWaterMl } from "@/constants/water-core/water-index";
import useUserData from "@/hooks/loadUser";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/** Water Goal Screen
 * Fetches the user profile from AsyncStorage, calculates the daily water intake,
 * and displays it to the user. Provides navigation to the Home screen and back to the profile screen.
 */

export default function WaterGoal() {
  const { profile, loading } = useUserData(); // get profile from hook

  if (loading || !profile) return null; // while loading or no profile, render nothing

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

      {/* router.back() instead of router.replace to allow going back to the profile screen */}
      <TouchableOpacity style={styles.buttonBack} onPress={() => router.back()}>
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
    backgroundColor: "#27598E", //"#2c5f7c",
    paddingVertical: 6, // altura (antes 12)
    paddingHorizontal: 12, // ancho controlado
    borderRadius: 14, //20
    alignItems: "center",
    alignSelf: "center", //clave
  },
  buttonBack: {
    marginTop: 20,
    backgroundColor: "#27598E", //"#2c5f7c",
    paddingVertical: 6, // altura (antes 12)
    paddingHorizontal: 12, // ancho controlado
    borderRadius: 100, //20
    alignItems: "center",
    alignSelf: "center", //clave
  },
  buttonText: {
    color: "#fff",
    fontSize: 20, //16,
    fontFamily: "sans-serif",
    fontWeight: "400", //600 needed?
  },
  label: {
    fontSize: 24,
    marginBottom: 4,
    color: "#27598E", //"#2c5f7c",
    fontFamily: "serif",
  },
});