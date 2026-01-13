import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// GearButton component with a gear icon that triggers onPress when tapped
type Props = {
  onPress?: () => void; // Optional onPress handler
};

export default function GearButton({ onPress }: Props) {
  // Mica's teil
  return (
    <TouchableOpacity style={styles.gear} onPress={onPress}>
      <Text style={styles.gearText}>⚙️</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gear: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  gearText: {
    fontSize: 35,
  },
});
