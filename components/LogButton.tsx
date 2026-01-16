

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// GearButton component with a gear icon that triggers onPress when tapped
type Props = {
    onPress?: () => void; // Optional onPress handler
};

export default function LogButton({ onPress }: Props) {
    // Mica's teil
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 16,
    },
    buttonText: {
        fontSize: 40,
    },
});