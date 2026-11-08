import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors } from "../theme";

// BT7.C2 — 3 nút, bấm lần nữa để bỏ chọn
export function PriceFilter({ value, onChange }: { value: PriceRange; onChange: (v: PriceRange) => void }) {
  return (
    <View style={s.row}>
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;
        return (
          <Pressable key={r.key} onPress={() => onChange(active ? null : r.key)} style={[s.btn, active && s.btnActive]}>
            <Text style={[s.text, active && s.textActive]}>{r.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const s = StyleSheet.create({
  row: { flexDirection: "row", gap: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: "#fff" },
  btnActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  text: { fontSize: 12, color: colors.text },
  textActive: { color: "#fff", fontWeight: "700" },
});
