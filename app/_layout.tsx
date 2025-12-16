import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import 'react-native-reanimated';
import { askNotificationPermission, clearNotifications, scheduleHourlyNotification, setupNotificationHandler } from "./notifications";

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [reminderEnabled, setReminderEnabled] = useState(true); // Standard: aktiv

  useEffect(() => {
    setupNotificationHandler();
    askNotificationPermission();
  }, []);

  useEffect(() => {
    async function updateNotifications() {
      await clearNotifications();
      if (reminderEnabled) {
        await scheduleHourlyNotification();
      }
    }
    updateNotifications();
  }, [reminderEnabled]);


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}



