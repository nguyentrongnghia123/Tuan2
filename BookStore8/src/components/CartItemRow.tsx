import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { formatPrice } from "../utils/format";
import { colors } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // BT8.6 — state cục bộ để nút phản hồi ngay, "lắng" 300 ms mới đẩy lên store
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setQty(item.quantity); }, [item.quantity]); // store đổi từ nơi khác thì đồng bộ lại

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={s.item}>
      <View style={[s.thumb, { backgroundColor: item.color }]}><Text style={{ fontSize: 28 }}>{item.emoji}</Text></View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.name} numberOfLines={2}>{item.title}</Text>
        <Text style={s.price}>{formatPrice(item.price)}</Text>
        <View style={s.qtyRow}>
          <Pressable
            style={[s.qtyBtn, !canDec && s.off]} disabled={!canDec}
            onPress={() => setQty((q) => q - 1)} accessibilityLabel="Giảm"
          >
            <Text style={s.qtyText}>−</Text>
          </Pressable>
          <Text style={s.qty}>{qty}</Text>
          <Pressable
            style={[s.qtyBtn, !canInc && s.off]} disabled={!canInc}
            onPress={() => setQty((q) => q + 1)} accessibilityLabel="Tăng"
          >
            <Text style={s.qtyText}>+</Text>
          </Pressable>
          <Text style={s.stock}>Còn {item.stock}</Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={10} accessibilityLabel="Xóa">
        <Text style={s.del}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  item: { flexDirection: "row", gap: 12, backgroundColor: "#fff", borderRadius: 16, padding: 12, alignItems: "center" },
  thumb: { width: 64, height: 76, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  name: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" },
  off: { opacity: 0.35 },
  qtyText: { fontSize: 18, fontWeight: "700", color: colors.text },
  qty: { minWidth: 20, textAlign: "center", fontWeight: "700" },
  stock: { color: colors.muted, fontSize: 12 },
  del: { fontSize: 20 },
});
