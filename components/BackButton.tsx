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
  buttonBack: {
    marginTop: 20,
    backgroundColor: "#27598E", //"#2c5f7c",
    paddingVertical: 10, //6, // altura (antes 12)
    paddingHorizontal: 20, //12, // ancho controlado
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
});
