import { Alert, Platform } from "react-native";

// Alert.alert không chạy trên bản web nên dùng confirm/alert của trình duyệt
const g = globalThis as any;

export function confirmDialog(title: string, message: string, onConfirm: () => void) {
  if (Platform.OS === "web") {
    if (g.confirm?.(`${title}\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: "Hủy", style: "cancel" },
    { text: "Xóa", style: "destructive", onPress: onConfirm },
  ]);
}

export function notify(title: string, message: string) {
  if (Platform.OS === "web") { g.alert?.(`${title}\n${message}`); return; }
  Alert.alert(title, message);
}
