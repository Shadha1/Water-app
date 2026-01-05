import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem("userInfo");
      if (stored) {
        const user = JSON.parse(stored);
        setName(user.name);
      }
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {name}</Text>

      <Button title="Back" onPress={() => router.replace("/")} />
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
