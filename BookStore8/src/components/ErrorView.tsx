import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={s.box}>
      <Text style={s.emoji}>📡</Text>
      <Text style={s.title}>Có lỗi xảy ra</Text>
      <Text style={s.msg}>{message}</Text>
      <Pressable style={s.btn} onPress={onRetry}>
        <Text style={s.btnText}>Thử lại</Text>
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  emoji: { fontSize: 44 },
  title: { fontSize: 18, fontWeight: "700", color: colors.text },
  msg: { color: colors.muted, textAlign: "center" },
  btn: { backgroundColor: colors.indigo, borderRadius: 10, paddingHorizontal: 28, paddingVertical: 10, marginTop: 8 },
  btnText: { color: "#fff", fontWeight: "700" },
});
