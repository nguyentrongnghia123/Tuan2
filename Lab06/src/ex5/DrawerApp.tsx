import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

// TODO 3 (nâng cao): Context cho notify / dark
interface SettingsCtx { notify: boolean; setNotify: (v: boolean) => void; dark: boolean; setDark: (v: boolean) => void }
const SettingsContext = createContext<SettingsCtx | null>(null);
const useSettings = () => {
  const c = useContext(SettingsContext);
  if (!c) throw new Error("Thiếu SettingsContext");
  return c;
};

function useThemed() {
  const { dark } = useSettings();
  return { bg: dark ? "#111827" : "#fff", fg: dark ? "#F9FAFB" : colors.text, sub: dark ? "#9CA3AF" : colors.muted };
}

function HomeScreen() {
  const t = useThemed();
  return (
    <View style={[s.center, { backgroundColor: t.bg }]}>
      <Text style={[s.big, { color: t.fg }]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const t = useThemed();
  return (
    <View style={[s.center, { backgroundColor: t.bg }]}>
      <View style={s.avatar}><Text style={s.avatarText}>NA</Text></View>
      <Text style={[s.big, { color: t.fg }]}>Nguyễn Văn An</Text>
      <Text style={{ color: t.sub }}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const t = useThemed();
  return (
    <View style={[s.settings, { backgroundColor: t.bg }]}>
      <View style={s.row}>
        <Text style={{ color: t.fg, fontSize: 16 }}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} trackColor={{ true: colors.red }} />
      </View>
      <View style={s.row}>
        <Text style={{ color: t.fg, fontSize: 16 }}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} trackColor={{ true: colors.red }} />
      </View>
      <Text style={{ color: t.sub, marginTop: 16 }}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

function Navigation() {
  const { dark } = useSettings();
  return (
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// TODO 2
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <SettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      <Navigation />
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  big: { fontSize: 22, fontWeight: "800" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "700" },
  settings: { flex: 1, padding: 20, gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
});
