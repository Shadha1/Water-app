/*import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}*/
import { Stack } from "expo-router";
import React from "react";

const isLoggedIn = false;

export function AppLayout() {
  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="home" />
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Screen name="index" />
    </Stack>
  );
}
