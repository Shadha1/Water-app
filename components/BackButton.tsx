import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// GearButton component with a gear icon that triggers onPress when tapped
type Props = {
  onPress?: () => void; // Optional onPress handler
};

export default function BackButton({ onPress }: Props) {
  // Mica's teil
  return (
    <TouchableOpacity style={styles.buttonBack} onPress={onPress}>
      <Text style={styles.buttonText}>←</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  buttonText: {
    fontSize: 45,
    color: "#fff",

    textAlign: "center",
    lineHeight: 40,
    // color: "#fff",
    // fontSize: 30, //16,
    fontFamily: "sans-serif",
    transform: [{ translateY: -10 }],

    // //fontWeight: "400", //600 needed?
    // textAlign: "center",

    // lineHeight: 34,            // 👈 mayor que fontSize
    // includeFontPadding: false // 👈 CLAVE Android

  },
  buttonBack: {

    alignItems: "center",
    justifyContent: "center",
    //position: "absolute",
    //bottom: 80,
    //left: "52%",
    transform: [{ translateX: -30 }],

    backgroundColor: "#27598E",

    width: 40,      // más pequeño
    height: 40,     // más pequeño
    borderRadius: 20, // mitad del width/height :círculo perfecto   

  },
});

