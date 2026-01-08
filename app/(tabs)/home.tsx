import { UserProfileInput } from "@/constants/water-core/userProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem("userProfile");
      if (!stored) return;
      const profile: UserProfileInput = JSON.parse(stored);
      setName(profile.name);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {name}</Text>
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
