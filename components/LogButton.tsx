

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

    buttonText: {
        fontSize: 50,
        color: "#fff",

        textAlign: "center",
        lineHeight: 60,
    },
    button: {
        position: "absolute",
        bottom: 40,
        left: "55%",
        transform: [{ translateX: -30 }],
        backgroundColor: "#27598E",

        width: 60,      // más pequeño
        height: 60,     // más pequeño
        borderRadius: 30, // mitad del width/height → círculo perfecto


    },
});
