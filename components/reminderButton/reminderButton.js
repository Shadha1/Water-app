import { Button } from "react-native";

export default function ReminderButton({ enabled, onToggle }) {
  return (
    <Button
      title={
        enabled
          ? "Stündliche Notifications deaktivieren"
          : "Stündliche Notifications aktivieren"
      }
      onPress={onToggle}
    />
  );
}
