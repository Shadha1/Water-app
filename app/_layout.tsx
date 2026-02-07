import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  askNotificationPermission,
  setupNotificationHandler,
} from "../constants/notifications";

export default function RootLayout() {
  useEffect(() => {
    setupNotificationHandler();
    askNotificationPermission();
  }, []);
  return <Stack screenOptions={{ headerShown: false }} />;
}
