import { Stack } from "expo-router";
import { useEffect } from "react"; //Shadha
import { askNotificationPermission, setupNotificationChannel, setupNotificationHandler } from "./notifications";

export default function RootLayout() {
  useEffect(() => {
  setupNotificationHandler();
  askNotificationPermission();
  setupNotificationChannel();
  
}, []);
return <Stack screenOptions={{ headerShown: false }} />;

}

