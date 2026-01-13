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


// check if device allows notifications
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

//schedule notifications
export async function scheduleHourlyNotification() {
  //if (remainingToGoalMl > 0)
    return Notifications.scheduleNotificationAsync({
      content: {
        title: "Erinnerung",
        body: "Dies ist eine stündliche Notification!",
      },
      trigger: {
        seconds: 3600,
        repeats: true,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL
      },
    });
}

export async function clearNotifications() {
  return Notifications.cancelAllScheduledNotificationsAsync();
}