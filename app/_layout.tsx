import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { askNotificationPermission, clearNotifications, setupNotificationHandler } from "./notifications";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export function notificationSetup({ children }: { children: React.ReactNode }) {
  const [reminderEnabled, setReminderEnabled] = useState(true); 

  useEffect(() => {
    setupNotificationHandler();
    askNotificationPermission();
  }, []);

  useEffect(() => {
    async function updateNotifications() {
      await clearNotifications();

    }
    updateNotifications();
  }, [reminderEnabled]);
}