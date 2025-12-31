import { calculateDailyWaterMl, getActivityLevelValue, getAgeValue, getClimateValue, getGenderValue } from '@/constants/water-core/water-formula';
import { mockUserProfile } from '@/mocks/mockUserProfile';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { runWaterTrackerDebug } from '../../debug/testWaterTracker';

export default function DebugWaterScreen() {
  const genderValue = getGenderValue(mockUserProfile.gender);
  const ageValue = getAgeValue(mockUserProfile.ageYears);

  useEffect(() => {
    runWaterTrackerDebug();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Debug Water Screen</Text>
      <Text style={styles.textSmall}>genderValue: {genderValue}</Text>
      <Text style={styles.textSmall}>ageValue: {ageValue}</Text>
      <Text style={styles.textSmall}>activityLevelValue: {getActivityLevelValue(mockUserProfile.activityLevel)}</Text>
      <Text style={styles.textSmall}>climateValue: {getClimateValue(mockUserProfile.climate)}</Text>
      <Text style={styles.textSmall}>calculateDailyWaterMl: {calculateDailyWaterMl(mockUserProfile)}</Text>

      <View>
        <Text>Water Tracker Debug</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { color: '#fff', fontSize: 16 },
  textSmall: { color: '#fff', fontSize: 12, marginTop: 8 }
});
