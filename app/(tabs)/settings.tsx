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
      "This will delete your profile and reset consumed water. This action cannot be undone. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteUserProfile();
            router.replace("/"); // Navigate back to the profile setup screen
          },
        },
      ]
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

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteProfile}
      >
        <Text style={[styles.buttonText, styles.deleteButtonText]}>
          Delete profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.smallLink} onPress={() => router.back()}>
        <Text style={styles.smallLinkText}>Back</Text>
      </TouchableOpacity>
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
    color: "#0b3b4a",
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
    color: "#2c5f7c",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: "#0b3b4a",
  },
  button: {
    width: "100%",
    backgroundColor: "#2c5f7c",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#b82b2b",
  },
  deleteButtonText: {
    color: "#b82b2b",
  },
  smallLink: {
    marginTop: 16,
  },
  smallLinkText: {
    color: "#0b5b77",
  },
});