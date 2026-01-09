import { UserProfileInput } from "@/constants/water-core/userProfile";
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
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState<
    "low" | "moderate" | "high"
  >("moderate");

  const [climate, setClimate] = useState<"cold" | "temperate" | "hot">(
    "temperate"
  );

  const saveData = async () => {
    if (!name || !gender || !age || !weight) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const profile: UserProfileInput = {
      name,
      gender,
      ageYears: Number(age),
      weightKg: Number(weight),
      activityLevel,
      climate,
    };

    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
      router.replace("/water-goal");
    } catch {
      Alert.alert("Error", "Failed to save profile");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={setGender}>
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
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

        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={activityLevel}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
          >
            <Picker.Item label="Low (little movement)" value="low" />
            <Picker.Item label="Moderate (daily activity)" value="moderate" />
            <Picker.Item label="High (sports / hard work)" value="high" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
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

  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
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
