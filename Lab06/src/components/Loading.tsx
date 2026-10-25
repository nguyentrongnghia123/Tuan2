import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={s.box}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={s.text}>Đang tải...</Text>
    </View>
  );
}
const s = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#fff" },
  text: { color: colors.muted },
});
