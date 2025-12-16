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
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
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
    color: "#2c5f7c",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2c5f7c",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
