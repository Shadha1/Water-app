import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import useUserData from "@/hooks/loadUser";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";

import { initWater } from "@/constants/water-core/waterService";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { profile, loading } = useUserData();
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!profile) return;
    if (isInitializing) return;

    // Always reinitialize to load saved data from AsyncStorage
    setIsInitializing(true);
    initWater(profile)
      .catch(console.error)
      .finally(() => setIsInitializing(false));
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

      {/**Hidden Screens */}
      <Tabs.Screen
        name="debug-water"
        options={{
          href: null,
        }}
      />
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
