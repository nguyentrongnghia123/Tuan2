import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;                        // TODO 4
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {                                       // TODO 5
    return <View style={s.center}><Text>Không tìm thấy sản phẩm #{id}</Text></View>;
  }
  const saved = has(phone.id);

  return (                                            // TODO 6
    <ScrollView contentContainerStyle={s.wrap}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} resizeMode="contain" />
      <Text style={s.name}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.muted}>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text>

      {/* TODO 7 */}
      <Pressable style={[s.btn, saved && s.btnOn]} onPress={() => toggle(phone.id)}>
        <Text style={[s.btnText, saved && { color: "#fff" }]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  wrap: { padding: 16, gap: 10, alignItems: "center" },
  image: { width: 200, height: 280 },
  name: { fontSize: 18, fontWeight: "700", color: colors.text, textAlign: "center" },
  price: { fontSize: 22, fontWeight: "800", color: colors.red },
  muted: { color: colors.muted },
  bold: { fontWeight: "700", color: colors.text },
  btn: { borderWidth: 1.5, borderColor: colors.red, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginTop: 8 },
  btnOn: { backgroundColor: colors.red },
  btnText: { color: colors.red, fontWeight: "700", fontSize: 16 },
});
