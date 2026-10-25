import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={s.row} onPress={onPress}>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.name}>{phone.name.split(" - ")[0]}</Text>
        <Stars value={phone.rating} size={13} />
      </View>
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff",
    padding: 14, borderRadius: 8, borderWidth: 1, borderColor: colors.line,
  },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  price: { fontWeight: "700", color: colors.red },
});
