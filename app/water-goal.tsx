import { calculateDailyWaterMl } from "@/constants/water-core/water-index";
import useUserData from "@/hooks/loadUser";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";

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
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

// Mica's teil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0f2",
    paddingHorizontal: 20,
    paddingTop: 200, //bajar el texto (antes 80)
    justifyContent: "space-between", // espacio entre texto y botones
  },
  title: {
    fontSize: 24,
    marginTop: 60,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#27598E", //"#2c5f7c",
    paddingVertical: 10,// 6, // altura (antes 12)
    paddingHorizontal: 20,//12, // ancho controlado
    borderRadius: 14, //20
    alignItems: "center",
    alignSelf: "center", //clave
  },
  buttonBack: {
    marginTop: 20,
    backgroundColor: "#27598E", //"#2c5f7c",
    paddingVertical: 10,//6, // altura (antes 12)
    paddingHorizontal: 20,//12, // ancho controlado
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