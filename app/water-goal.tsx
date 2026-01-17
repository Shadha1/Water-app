import BackButton from "@/components/BackButton";
import ConfirmButton from "@/components/ConfirmButton";
import { calculateDailyWaterMl } from "@/constants/water-core/water-index";
import useUserData from "@/hooks/loadUser";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

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
      <Image
        source={require("../assets/images/gif_standard.gif")}
        style={styles.gif}
      />
      <Text style={styles.label}>
        You should drink {(dailyMl / 1000).toFixed(1)} L / day 💧
      </Text>

      {/* Botones en fila */}
      <View style={styles.buttonRow}>
        <BackButton onPress={() => router.back()} />
        <ConfirmButton onPress={() => router.replace("./(tabs)/home")} />
      </View>
    </View>
  );
}

// Mica's teil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0f2",
    paddingHorizontal: 20,
    paddingTop: 200, //bajar el texto (antes 80)
    justifyContent: "flex-start", //"space-between", // espacio entre texto y botones
  },

  label: {
    fontSize: 20,
    top: 250,
    // marginBottom: 20,
    //marginTop: 180,
    color: "#27598E", //"#2c5f7c",
    fontFamily: "serif",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row", // botones en fila
    justifyContent: "space-between", // flecha a la izquierda, confirm a la derecha
    alignItems: "center",
    marginTop: 400, // espacio desde el texto/GIF
    marginBottom: 40, // separa los botones del borde inferior
  },
  gif: {
    position: "absolute", //así no afecta lo demás
    //top: 300, // ajustar según notch. Mas pequeno, más pegado al borde.
    //left: 200,
    //alignItems: "center",
    //marginTop: -80,       // baja el GIF respecto al texto
    //marginBottom: 40, // espacio entre GIF y botones
    top: 200,
    alignSelf: "center", // centra horizontalmente
    width: 300,
    height: 300,
  },
});
