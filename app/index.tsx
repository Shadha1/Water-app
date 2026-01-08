
//Shadha:
import { UserProfileInput } from "@/constants/water-core/userProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
//I need:
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// No mostrar Header "index":
export const unstable_settings = {
  headerShown: false, // nunca muestra el header
};


const Index = () => {
  const [loading, setLoading] = useState(true);

  //Temporär: Nur um die Registration Seite sehen su können:
  useEffect(() => {
    AsyncStorage.clear();
  }, []);


  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState<
    "low" | "moderate" | "high"
  >("moderate");

  const [climate, setClimate] = useState<"cold" | "temperate" | "hot">(
    "temperate"

    // const [name, setName] = useState("");
    // const [gender, setGender] = useState("");
    // const [age, setAge] = useState("");
    // const [weight, setWeight] = useState("");
    //const [weather, setWeather] = useState(""); Este no
  );

  // const handleConfirm = async (
  //   name?: string,
  //   gender?: string,
  //   age?: string,
  //   weight?: string
  // ) => {
  //   try {
  //     const data = { name, gender, age, weight /*weather*/ };
  //     await AsyncStorage.setItem("userInfo", JSON.stringify(data));
  //     Alert.alert("Success", "User information saved locally");
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to save data");
  //   }
  // };

  useEffect(() => {
    const checkProfile = async () => {
      const stored = await AsyncStorage.getItem("userProfile");

      if (stored) {
        router.replace("/water-goal"); // or /(tabs)/home
        return;
      }

      setLoading(false);
    };

    checkProfile();
  }, []);


  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem("userProfile");

      if (stored) {
        const profile: UserProfileInput = JSON.parse(stored);

        setName(profile.name);
        setGender(profile.gender);
        setAge(String(profile.ageYears));
        setWeight(String(profile.weightKg));
        setActivityLevel(profile.activityLevel);
        setClimate(profile.climate);
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) {
    return null; // or a splash/loading indicator
  }
  const saveData = async () => {
    if (!name || !gender || !age || !weight) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    // const saveData = () => {
    //   setName(name);
    //   handleConfirm(name, gender, age, weight);
    //   router.replace("/(tabs)/home");
    // };

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
      router.replace("/water-goal"); //router.replace("/(tabs)/home");
    } catch {
      Alert.alert("Error", "Failed to save profile");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/gif_standard.gif")}
        style={styles.gif}
      />
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

        {/* Nuevo: */}
        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={activityLevel}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
            style={{ color: "#27598E" }} // Mica
          >
            <Picker.Item label="Low (little movement)" value="low" color="#27598E" />
            <Picker.Item label="Moderate (daily activity)" value="moderate" color="#27598E" />
            <Picker.Item label="High (sports / hard work)" value="high" color="#27598E" />
          </Picker>
        </View>


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
    fontSize: 20,
    marginBottom: 4,
    color: "#27598E",//"#2c5f7c",
    fontFamily: "serif",
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
    paddingVertical: 6, // altura (antes 12)
    paddingHorizontal: 12,   // ancho controlado
    borderRadius: 14,//20
    alignItems: "center",
    alignSelf: "center", //clave
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,//16,
    fontFamily: "sans-serif",
    fontWeight: "400", //600 needed?
  },
  title: {
    fontSize: 40,
    fontFamily: "serif", // Jacques Francois Shadow real
    textAlign: "center",
    color: "#27598E",//#D6E4E5

    marginBottom: 30,
    textShadowColor: "#00001c",//sombra
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
  },
  gif: {
    position: "absolute", //así no afecta lo demás
    top: 20,        // ajustar según notch. Mas pequeno, más pegado al borde.
    left: 10,
    width: 100,
    height: 100,
  },

});