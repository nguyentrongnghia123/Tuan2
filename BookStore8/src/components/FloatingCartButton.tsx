import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function FloatingCartButton({ count, onPress }: { count: number; onPress: () => void }) {
  return (
    <Pressable style={s.btn} onPress={onPress}>
      <Text style={s.emoji}>🛒</Text>
      {count > 0 && <View style={s.badge}><Text style={s.badgeText}>{count}</Text></View>}
    </Pressable>
  );
}
const s = StyleSheet.create({
  btn: {
    position: "absolute", right: 16, bottom: 16, width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.cyan, alignItems: "center", justifyContent: "center", elevation: 6,
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 },
  },
  emoji: { fontSize: 26 },
  badge: {
    position: "absolute", top: -2, right: -2, minWidth: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.red, alignItems: "center", justifyContent: "center", paddingHorizontal: 4,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
});
