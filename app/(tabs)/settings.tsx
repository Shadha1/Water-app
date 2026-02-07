import BackButton from "@/components/BackButton";
import { clearNotifications } from "@/constants/notifications";
import { clearConsumedMl } from "@/constants/water-core/water-storage";
import { resetWater } from "@/constants/water-core/waterService";
import useUserData from "@/hooks/loadUser";
import { deleteUserProfile } from "@/hooks/userStorage";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { profile } = useUserData();

  // Handler to delete the user profile
  // Confirm deletion with an alert
  async function handleDeleteProfile() {
    Alert.alert(
      "Delete profile",
      "This will delete your profile and reset all water tracking data. This action cannot be undone.  Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await clearNotifications;
              // 1. Clear consumed water from storage first
              await clearConsumedMl();

              // 2. Delete user profile from storage
              await deleteUserProfile();

              // 3. Reset the in-memory water session (CRITICAL - do this BEFORE navigation)
              resetWater();

              // 4. Navigate back to registration screen
              router.replace("/");
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete profile.  Please try again.",
              );
              console.error("Delete profile error:", error);
            }
          },
        },
      ],
    );
  }

  // Mica's teil
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Profile</Text>
        <Text style={styles.value}>{profile?.name}</Text>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteProfile}
        >
          <Text style={[styles.buttonText, styles.deleteButtonText]}>
            Delete profile
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonback}>
        <BackButton onPress={() => router.replace("/(tabs)/home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0f2",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 18,
    color: "#27598E", //"#2c5f7c",
    fontFamily: "serif",
  },
  section: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 12,
    color: "#27598E",
    marginBottom: 6,
    fontFamily: "sans-serif",
  },
  value: {
    fontSize: 16,
    color: "#27598E",
    fontFamily: "sans-serif",
  },
  button: {
    width: "100%",
    backgroundColor: "#27598E",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "sans-serif",
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#b82b2b",
  },
  deleteButtonText: {
    paddingHorizontal: 10,
    color: "#b82b2b",
    fontFamily: "sans-serif",
  },
  buttonback: {
    position: "absolute",
    bottom: 80,
    right: 130,
  },
});
