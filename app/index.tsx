import ConfirmButton from "@/components/ConfirmButton";
import { defaultForm, FormFields } from "@/constants/water-core/userForm";
import useUserData from "@/hooks/loadUser";
import { saveUserProfile } from "@/hooks/userStorage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  /*Temporär: Nur um die Registration Seite sehen su können:
  useEffect(() => {
    AsyncStorage.clear();
  }, []);*/

  //Initializes the form state with default values
  const [form, setForm] = useState<FormFields>(defaultForm);
  // Updates the form state by setting the specified field to the given value
  const setField = <K extends keyof FormFields>(key: K, value: FormFields[K]) =>
    setForm((s) => ({ ...s, [key]: value }));

  // Saves the form data to AsyncStorage and navigates to the water goal screen
  const saveData = async () => {
    try {
      await saveUserProfile(form);
      router.push("./water-goal"); // router.push instead of router.replace to allow going back and forth between screens
    } catch (err) {
      Alert.alert("Could not save profile", (err as Error).message);
    }
  };

  // If a profile already exists, go straight to Home (tabs) to avoid showing form again.
  const { profile, loading } = useUserData();

  useEffect(() => {
    if (!loading && profile) {
      router.replace("./(tabs)/home");
    }
  }, [loading, profile]);

  if (loading) return null; // While the profile is loading, avoid rendering the form (prevents flicker)

  // Mica's teil
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/gif_standard.gif")}
        style={styles.gif}
      />
      <Text style={styles.title}>WaterMe</Text>

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
            style={{ color: "#27598E" }} // Mica
          >
            <Picker.Item
              label="Low (little movement)"
              value="low"
              color="#27598E"
            />
            <Picker.Item
              label="Moderate (daily activity)"
              value="moderate"
              color="#27598E"
            />
            <Picker.Item
              label="High (sports / hard work)"
              value="high"
              color="#27598E"
            />
          </Picker>
        </View>

        <Text style={styles.label}>Climate</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.climate}
            onValueChange={(climate) => setField("climate", climate)}
            style={{ color: "#27598E" }}
          >
            <Picker.Item label="Cold" value="cold" color="#27598E" />
            <Picker.Item label="Temperate" value="temperate" color="#27598E" />
            <Picker.Item label="Hot" value="hot" color="#27598E" />
          </Picker>
        </View>

        <ConfirmButton onPress={saveData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    height: 40, //altura de los campos de selección
    justifyContent: "center", // centra el texto
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
    fontSize: 20,
    marginBottom: 4,
    color: "#27598E", //"#2c5f7c",
    fontFamily: "serif",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 4, // reduce el padding vertical osea los kasten de inputs
    paddingHorizontal: 10,
    //padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    //Mica:
    fontSize: 20,
    fontFamily: "sans-serif", //"Inder"
    color: "#27598E",
  },

  title: {
    fontSize: 40,
    fontFamily: "serif", // Jacques Francois Shadow real
    textAlign: "center",
    color: "#27598E", //#D6E4E5
    marginBottom: 30,
    textShadowColor: "#00001c", //sombra
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
  },
  gif: {
    position: "absolute", //así no afecta lo demás
    top: 20, // ajustar según notch. Mas pequeno, más pegado al borde.
    left: 10,
    width: 100,
    height: 100,
  },
});
