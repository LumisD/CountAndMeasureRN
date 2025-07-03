import {Alert} from "react-native";

type ShowAlertParams = {
  title: string;
  message: string;
  confirmText: string;
  onConfirm?: () => void;
  dismissText?: string;
  onDismiss?: () => void;
};

export function showAlert({
  title,
  message,
  confirmText,
  onConfirm,
  dismissText,
  onDismiss,
}: ShowAlertParams): void {
  const buttons = [];

  if (dismissText) {
    buttons.push({
      text: dismissText,
      onPress: onDismiss,
      style: "cancel" as const,
    });
  }

  buttons.push({
    text: confirmText,
    onPress: onConfirm,
  });

  Alert.alert(title, message, buttons, {cancelable: true});
}
