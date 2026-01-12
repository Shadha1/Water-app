import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Goal = () => {
  const [savedName, setSavedName] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // value previously stored
        setSavedName(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} onLayout={getData}>
        Hello {savedName}
      </Text>

      <Button title="Back" onPress={() => router.replace("/")} />
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  Input: {
    fontSize: 18,
    height: 40,
    width: 200,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
  },
});

{
  /*import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Index = () => {
  const [name, setName] = useState("");

  const storeName = async (name: string) => {
    try {
      await AsyncStorage.setItem("user", name);
    } catch (e) {
      // saving error
    }
  };

  const [gender, setGender] = useState("");

  const storeGender = async (gender: any) => {
    try {
      await AsyncStorage.setItem("gender", gender);
    } catch (e) {
      // saving error
    }
  };

  const [age, setAge] = useState(0);
  const storeAge = async (age: any) => {
    try {
      await AsyncStorage.setItem("age", age);
    } catch (e) {
      // saving error
    }
  };
  const [weight, setWeight] = useState(0.0);
  //const [climate, setClimate] = useState("");

  const saveData = () => {
    setName(name);
    storeName(name);

    setGender(gender);
    storeGender(gender);

    setAge(age);
    storeAge(age);
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      {/*Drop down options male/female 
      <Text style={styles.title}>Gender</Text>
      <View style={styles.input}>
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>
      

      <Text style={styles.title}>Gender</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <Text style={styles.title}>Age</Text>
      <TextInput style={styles.input} />

      <Text style={styles.title}>Weight</Text>
      <TextInput style={styles.input} />
      {/*
      <Text style={styles.title}>Weather</Text>
      <TextInput style={styles.input} />
      
      <Button title="Next" onPress={saveData} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 60,
    alignItems: "stretch",
  },
  title: {
    textAlign: "left",
    fontSize: 24,
    margin: 5,
  },
  input: {
    alignContent: "space-around",
    fontSize: 16,
    height: 40,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
});
*/
}
