import { tryGetWaterSnapshot } from "@/constants/water-core/waterService";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export function setupNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function askNotificationPermission() {
  if (!Device.isDevice) return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function scheduleHourlyNotification() {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Erinnerung",
      body: "Du hast dein Tagesziel noch nicht erreicht.",
    },
    trigger: {
      seconds: 3600,
      repeats: true,
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    },
  });
}

export async function clearNotifications() {
  return Notifications.cancelAllScheduledNotificationsAsync();
}

/** Das ist die Funktion, die du “einbettest”: entscheidet anhand aktueller Werte */
export async function updateHydrationNotifications() {
  const snap = tryGetWaterSnapshot();

  // Wenn Water noch nicht initialisiert ist (kein Profil etc.), nichts planen
  if (!snap) return;

  await clearNotifications();

  // Bedingung: noch nicht genug getrunken
  if (snap.consumedMl < snap.goalMl) {
    await scheduleHourlyNotification();
  }
  // else: Ziel erreicht -> keine Notifications
}
