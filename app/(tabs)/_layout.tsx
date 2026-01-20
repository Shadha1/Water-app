import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import useUserData from "@/hooks/loadUser";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import {
  initWater,
  tryGetWaterSnapshot,
} from "@/constants/water-core/waterService";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { profile, loading } = useUserData();

  useEffect(() => {
    if (loading) return;
    if (!profile) return;
    if (tryGetWaterSnapshot()) return; // schon initialisiert

    initWater(profile).catch(console.error);
  }, [loading, profile]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="debug-water"
        options={{
          /*title: "Debug Water",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),*/
          href: null,
        }}
      />
      {/**Hidden Screens */}
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="water-log"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
