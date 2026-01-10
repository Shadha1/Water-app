import { defaultForm, FormFields } from "@/constants/water-core/userForm";
import { saveUserProfile } from "@/constants/water-core/userStorage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  // Form state
  const [form, setForm] = useState<FormFields>(defaultForm); // Initializes the form state with default values

  // Updates the form state by setting the specified field to the given value
  const setField = <K extends keyof FormFields>(key: K, value: FormFields[K]) =>
    setForm((s) => ({ ...s, [key]: value }));

  /** Saves the form data to AsyncStorage and navigates to the water goal screen
   * Uses the storage service which validates the form and persists it.
   */
  const saveData = async () => {
    await saveUserProfile(form);
    router.replace("/water-goal");
  };

  // Mica's teil
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(text) => setField("name", text)}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.gender}
            onValueChange={(gender) => setField("gender", gender)}
          >
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={form.ageYears}
          onChangeText={(text) => setField("ageYears", text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={form.weightKg}
          onChangeText={(text) => setField("weightKg", text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.activityLevel}
            onValueChange={(activityLevel) =>
              setField("activityLevel", activityLevel)
            }
          >
            <Picker.Item label="Low (little movement)" value="low" />
            <Picker.Item label="Moderate (daily activity)" value="moderate" />
            <Picker.Item label="High (sports / hard work)" value="high" />
          </Picker>
        </View>

        <Text style={styles.label}>Climate</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.climate}
            onValueChange={(climate) => setField("climate", climate)}
          >
            <Picker.Item label="Cold" value="cold" />
            <Picker.Item label="Temperate" value="temperate" />
            <Picker.Item label="Hot" value="hot" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
