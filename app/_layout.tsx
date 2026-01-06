import { Stack } from "expo-router";

export default function RootLayout() {
  return (<Stack
    screenOptions={{
      headerShown: false, // oculta el header en TODAS las pantallas
    }}
  />
  );
}