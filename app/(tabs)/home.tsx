import GearButton from "@/components/GearButton";
import useUserData from "@/hooks/loadUser";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { profile, loading } = useUserData(); // get profile from hook
  if (loading || !profile) return null;

  // Mica's teil
  return (
    <View style={styles.container}>
      <GearButton onPress={() => router.push("/settings")} />

      <Text style={styles.title}>Hello {profile?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfeff0",
    alignItems: "center",
    paddingTop: 36,
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    color: "#0b3b4a",
  },
});
