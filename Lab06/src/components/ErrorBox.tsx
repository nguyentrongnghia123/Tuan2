import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={s.box}>
      <Text style={s.title}>Có lỗi xảy ra</Text>
      <Text style={s.msg}>{message}</Text>
      <Pressable style={s.btn} onPress={onRetry}>
        <Text style={s.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", color: colors.red },
  msg: { color: colors.muted, textAlign: "center" },
  btn: { backgroundColor: colors.blue, borderRadius: 6, paddingHorizontal: 24, paddingVertical: 10, marginTop: 6 },
  btnText: { color: "#fff", fontWeight: "700" },
});
