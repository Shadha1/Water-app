//Before:
//import { Image } from "expo-image";
//import { Platform, StyleSheet } from "react-native";
//import { HelloWave } from "@/components/hello-wave";
//import ParallaxScrollView from "@/components/parallax-scroll-view";
//import { Link } from "expo-router";

//Mica:
//Shadha:
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  //const [weather, setWeather] = useState("");

  const handleConfirm = async (
    name?: string,
    gender?: string,
    age?: string,
    weight?: string
  ) => {
    try {
      const data = { name, gender, age, weight /*weather*/ };
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      Alert.alert("Success", "User information saved locally");
    } catch (error) {
      Alert.alert("Error", "Failed to save data");
    }
  };

  const saveData = () => {
    setName(name);
    handleConfirm(name, gender, age, weight);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>WaterMe</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={{ color: "#27598E" }} // Mica
          >
            <Picker.Item label="Select gender" value="" color="#27598E" />
            <Picker.Item label="Male" value="male" color="#27598E" />
            <Picker.Item label="Female" value="female" color="#27598E" />
          </Picker>
        </View>

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />

        {/*<Text style={styles.label}>Weather</Text>
        <TextInput
          style={styles.input}
          value={weather}
          onChangeText={setWeather}
        />*/}

        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#e6f0f2",
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#27598E",//"#2c5f7c",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    //Mica:
    fontSize: 20,
    fontFamily: "sans-serif", //"Inder"
    color: "#27598E",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#27598E",//"#2c5f7c",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,//16,
    fontFamily: "sans-serif",
    fontWeight: "600", //needed?
  },
  title: {
    fontSize: 40,
    fontFamily: "serif", // Jacques Francois Shadow real
    textAlign: "center",
    color: "#27598E",
    marginBottom: 30,
    textShadowColor: "#000000",//sombra
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
  },

});
