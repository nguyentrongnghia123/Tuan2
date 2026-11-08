import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

export interface TabItem { key: string; label: string; emoji: string; badge?: number }
interface Props { items: TabItem[]; activeKey: string; onPress: (key: string) => void }

// Thuần giao diện: không biết gì về thư viện điều hướng
export function TabBar({ items, activeKey, onPress }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {items.map((it) => {
        const active = it.key === activeKey;
        return (
          <Pressable key={it.key} style={s.item} onPress={() => onPress(it.key)}>
            <View>
              <Text style={[s.emoji, !active && { opacity: 0.55 }]}>{it.emoji}</Text>
              {!!it.badge && (
                <View style={s.badge}><Text style={s.badgeText}>{it.badge > 99 ? "99+" : it.badge}</Text></View>
              )}
            </View>
            <Text style={[s.label, active && s.labelActive]}>{it.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: { flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 8 },
  item: { flex: 1, alignItems: "center", gap: 2 },
  emoji: { fontSize: 22 },
  label: { fontSize: 11, color: colors.muted },
  labelActive: { color: colors.indigo, fontWeight: "700" },
  badge: {
    position: "absolute", top: -4, right: -10, minWidth: 18, height: 18, borderRadius: 9,
    backgroundColor: colors.red, alignItems: "center", justifyContent: "center", paddingHorizontal: 4,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
});
