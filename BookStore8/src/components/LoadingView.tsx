import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function LoadingView({ label = "Đang tải…" }: { label?: string }) {
  return (
    <View style={s.box}>
      <ActivityIndicator size="large" color={colors.indigo} />
      <Text style={s.text}>{label}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  text: { color: colors.muted },
});
