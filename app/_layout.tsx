import { Stack } from "expo-router";
import React from "react"; //Shadha

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}