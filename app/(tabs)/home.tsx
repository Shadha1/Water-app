import { UserProfileInput } from "@/constants/water-core/userProfile";
import { loadUserProfile } from "@/constants/water-core/userStorage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const [profile, setProfile] = useState<UserProfileInput | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await loadUserProfile();
      if (stored) setProfile(stored);
    })();
  }, []);

  // Mica's teil
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {profile?.name}</Text>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text>Edit profile</Text>
      </TouchableOpacity>

      <Button title="Back" onPress={() => router.replace("/water-goal")} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e6f0f2",
  },
  title: {
    fontSize: 24,
    marginTop: 60,
    marginBottom: 20,
  },
});
