import {
  calculateDailyWaterMl,
  getActivityLevelValue,
  getAgeValue,
  getClimateValue,
  getGenderValue,
} from "@/constants/water-core/water-formula";
import useUserData from "@/hooks/loadUser";
import { StyleSheet, Text, View } from "react-native";
//import { mockUserProfile } from '@/mocks/mockUserProfile';

/** Debug Water Screen
 * Fetches the user profile from AsyncStorage and displays various calculated values for debugging purposes.
 */

export default function DebugWaterScreen() {
  /**  const genderValue = getGenderValue(mockUserProfile.gender);
   *   const ageValue = getAgeValue(mockUserProfile.ageYears);
   *   runWaterTrackerDebug();*/

  // Get user profile from hook
  const { profile, loading } = useUserData();
  if (loading || !profile) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Debug Water Screen</Text>
      <Text style={styles.textSmall}>
        genderValue: {getGenderValue(profile.gender)}
      </Text>
      <Text style={styles.textSmall}>
        ageValue: {getAgeValue(profile.ageYears)}
      </Text>
      <Text style={styles.textSmall}>
        activityLevelValue:{getActivityLevelValue(profile.activityLevel)}
      </Text>
      <Text style={styles.textSmall}>
        climateValue: {getClimateValue(profile.climate)}
      </Text>
      <Text style={styles.textSmall}>
        calculateDailyWaterMl: {calculateDailyWaterMl(profile)}
      </Text>
      <View>
        <Text>Water Tracker Debug</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: { color: "#fff", fontSize: 16 },
  textSmall: { color: "#fff", fontSize: 12, marginTop: 8 },
});