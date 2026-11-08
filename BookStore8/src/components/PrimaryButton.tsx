import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

interface Props { title: string; onPress: () => void; loading?: boolean; disabled?: boolean }

export function PrimaryButton({ title, onPress, loading, disabled }: Props) {
  const off = loading || disabled;
  return (
    <Pressable style={[s.btn, off && { opacity: 0.6 }]} onPress={onPress} disabled={off}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.text}>{title}</Text>}
    </Pressable>
  );
}
const s = StyleSheet.create({
  btn: { backgroundColor: colors.indigo, borderRadius: 14, paddingVertical: 14, alignItems: "center", justifyContent: "center", minHeight: 50 },
  text: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
