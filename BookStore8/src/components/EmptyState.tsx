import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props { emoji: string; title: string; message?: string; actionLabel?: string; onAction?: () => void }

export function EmptyState({ emoji, title, message, actionLabel, onAction }: Props) {
  return (
    <View style={s.box}>
      <Text style={s.emoji}>{emoji}</Text>
      <Text style={s.title}>{title}</Text>
      {!!message && <Text style={s.msg}>{message}</Text>}
      {!!actionLabel && (
        <Pressable style={s.btn} onPress={onAction}>
          <Text style={s.btnText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
const s = StyleSheet.create({
  box: { alignItems: "center", gap: 8, padding: 32 },
  emoji: { fontSize: 48 },
  title: { fontSize: 17, fontWeight: "700", color: colors.text, textAlign: "center" },
  msg: { color: colors.muted, textAlign: "center" },
  btn: { backgroundColor: colors.indigo, borderRadius: 10, paddingHorizontal: 22, paddingVertical: 10, marginTop: 8 },
  btnText: { color: "#fff", fontWeight: "700" },
});
