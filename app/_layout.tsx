import { Stack } from "expo-router";
import React, { useEffect } from "react"; //Shadha
import { askNotificationPermission, setupNotificationHandler } from "./notifications";

export default function RootLayout() {
  useEffect(() => {
  setupNotificationHandler();
  askNotificationPermission();
  
}, []);
return <Stack screenOptions={{ headerShown: false }} />;

}

