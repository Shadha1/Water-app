import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// GearButton component with a gear icon that triggers onPress when tapped
type Props = {
  onPress?: () => void; // Optional onPress handler
};

export default function ConfirmButton({ onPress }: Props) {
  // Mica's teil
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Confirm</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: "#27598E", //"#2c5f7c",
    paddingVertical: 6, // altura (antes 12)
    paddingHorizontal: 12, // ancho controlado
    borderRadius: 14, //20
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
