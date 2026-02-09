

import {
  ActivityLevelValue,
  AgeValue,
  calculateDailyWaterMl,
  ClimateValue,
  getGenderValue,
} from '../water-core/water-formula';

import { UserProfileInput } from '../water-core/userProfile';

describe('getGenderValue', () => {
  test('male → 35', () => {
    expect(getGenderValue('male')).toBe(35);
  });

  test('female → 31', () => {
    expect(getGenderValue('female')).toBe(31);
  });

  test('other → 33', () => {
    expect(getGenderValue('other' as any)).toBe(33);
  });
});

describe('getAgeValue', () => {
  test('17 → 100', () => {
    expect(AgeValue(17)).toBe(100);
  });

  test('30 → 0', () => {
    expect(AgeValue(30)).toBe(0);
  });

  test('31 → -100', () => {
    expect(AgeValue(31)).toBe(-100);
  });

  test('70 → -300', () => {
    expect(AgeValue(70)).toBe(-300);
  });
});

describe('getActivityLevelValue', () => {
  test('low → 0.3', () => {
    expect(ActivityLevelValue('low')).toBe(0.3);
  });

  test('moderate → 0.7', () => {
    expect(ActivityLevelValue('moderate')).toBe(0.7);
  });

  test('high → 1.0', () => {
    expect(ActivityLevelValue('high')).toBe(1.0);
  });
});

describe('getClimateValue', () => {
  test('cold → 0.5', () => {
    expect(ClimateValue('cold')).toBe(0.5);
  });

  test('temperate → 0.0', () => {
    expect(ClimateValue('temperate')).toBe(0.0);
  });

  test('hot → 1.0', () => {
    expect(ClimateValue('hot')).toBe(1.0);
  });
});

describe('calculateDailyWaterMl', () => {
  test('berechnet ein gerundetes Tagesziel', () => {
    const profile: UserProfileInput = {
      gender: 'male',
      ageYears: 25,
      weightKg: 80,
      activityLevel: 'low',
      climate: 'temperate',
    };

    const result = calculateDailyWaterMl(profile);

    expect(result).toBe(2800);
  });
});

// Tests für die Wasserformel-Funktionen 100% √ 