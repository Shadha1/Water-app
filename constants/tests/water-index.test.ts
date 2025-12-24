
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async () => null),
  setItem: jest.fn(async () => undefined),
}));

import { mockUserProfile } from '../../mocks/mockUserProfile';
import { calculateDailyWaterMl, createTrackerFromProfile } from '../water-core/water-index';


test('createTrackerFromProfile sets goal correctly', () => {
  const expectedGoal = calculateDailyWaterMl(mockUserProfile);
  const tracker = createTrackerFromProfile(mockUserProfile);
  expect(tracker.getSnapshot().goalMl).toBe(expectedGoal);
});
