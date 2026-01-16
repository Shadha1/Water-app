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

  //Berechtigung für Notifications abfragen
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  //Berechtigung für Notifications anfordern, wenn nicht vorhanden
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
      seconds: 60,
      repeats: true,
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    },
  });
}

export async function clearNotifications() {
  return Notifications.cancelAllScheduledNotificationsAsync();
}

// Funktion zum aktivieren oder deaktivieren der Notifications, abhängig davon ob das Ziel erreicht ist
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
  else{
    clearNotifications;
  }
}
