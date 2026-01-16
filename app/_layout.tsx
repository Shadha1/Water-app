import { Stack } from "expo-router";
import React, { useEffect } from "react"; //Shadha
import { askNotificationPermission, setupNotificationHandler } from "./notifications";

export default function RootLayout() {
  notificationSetup;
  return <Stack screenOptions={{ headerShown: false }} />;
}

export function notificationSetup({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    setupNotificationHandler();
    askNotificationPermission();
  }, []);

}