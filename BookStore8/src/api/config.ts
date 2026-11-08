import { Platform } from "react-native";
import Constants from "expo-constants";

// Thứ tự ưu tiên: biến môi trường → IP máy tính đang chạy Metro (điện thoại thật) → emulator/web
function resolveBaseUrl(): string {
  const env = process.env.EXPO_PUBLIC_API_URL;
  if (env) return env.replace(/\/$/, "");
  if (Platform.OS === "web") return "http://localhost:3000";
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (host) return `http://${host}:3000`;
  return Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
}
export const API_URL = resolveBaseUrl();
