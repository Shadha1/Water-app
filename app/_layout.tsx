import { remainingToGoalMl } from "@/constants/water-core/water-progress";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react"; //Shadha
import { askNotificationPermission, clearNotifications, scheduleHourlyNotification, setupNotificationHandler } from "./notifications";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export function notificationSetup({ children }: { children: React.ReactNode }) {
  const [reminderEnabled, setReminderEnabled] = useState(true); // Standard: aktiv

  useEffect(() => {
    setupNotificationHandler();
    askNotificationPermission();
  }, []);

  useEffect(() => {
    async function updateNotifications() {
      await clearNotifications();
      if (remainingToGoalMl > 0) {
        await scheduleHourlyNotification();
      }
    }
    updateNotifications();
  }, [reminderEnabled]);
}