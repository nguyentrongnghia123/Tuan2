import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme";

interface Props { value: string; onChangeText: (t: string) => void; placeholder?: string }

export function SearchBar({ value, onChangeText, placeholder = "Tìm theo tên sách hoặc tác giả…" }: Props) {
  return (
    <View style={s.box}>
      <Text style={s.icon}>🔍</Text>
      <TextInput
        value={value} onChangeText={onChangeText} placeholder={placeholder}
        placeholderTextColor={colors.muted} style={s.input} autoFocus autoCorrect={false}
      />
      {value !== "" && (
        <Pressable onPress={() => onChangeText("")} hitSlop={8}><Text style={s.clear}>✕</Text></Pressable>
      )}
    </View>
  );
}
const s = StyleSheet.create({
  box: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 12, gap: 8 },
  icon: { fontSize: 16 },
  input: { flex: 1, paddingVertical: 10, color: colors.text },
  clear: { color: colors.muted, fontSize: 16 },
});
