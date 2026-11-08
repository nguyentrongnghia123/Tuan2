import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TabScreenProps } from "../navigation/types";
import { useAuth, useCart } from "../store/hooks";
import { CartItemRow } from "../components/CartItemRow";
import { EmptyState } from "../components/EmptyState";
import { confirmDialog } from "../utils/dialog";
import { formatPrice } from "../utils/format";
import { colors } from "../theme";

// BT8.C2 — mã giảm giá cố định ở phía client
const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000 đ", discount: (s) => Math.min(50000, s) },
};

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, totalQuantity, setQty, remove } = useCart();
  const { isLoggedIn } = useAuth();

  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const discount = coupon ? COUPONS[coupon].discount(totalPrice) : 0;
  const finalTotal = totalPrice - discount;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setCoupon(code);
      setCouponMsg({ text: `Đã áp dụng ${code}: ${COUPONS[code].label}`, ok: true });
    } else {
      setCoupon(null);
      setCouponMsg({ text: "Mã giảm giá không hợp lệ", ok: false });
    }
  };

  // BT8.7a — xóa có xác nhận
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog("Xóa sản phẩm", `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`, () => remove(bookId));
  };

  // BT8.4 — chặn Thanh toán khi chưa đăng nhập
  const goCheckout = () => {
    if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
    else navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  };

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top"]} style={s.header}><Text style={s.title}>🛒 Giỏ hàng</Text></SafeAreaView>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        contentContainerStyle={{ padding: 16, gap: 10, flexGrow: 1 }}
        ListEmptyComponent={<EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy thêm vài cuốn sách yêu thích." />}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        ListFooterComponent={
          items.length > 0 ? (
            <View style={s.summary}>
              <View style={s.couponRow}>
                <TextInput
                  value={couponInput} onChangeText={setCouponInput} placeholder="Nhập mã giảm giá"
                  placeholderTextColor={colors.muted} autoCapitalize="characters" style={s.couponInput}
                />
                <Pressable style={s.applyBtn} onPress={applyCoupon}><Text style={s.applyText}>Áp dụng</Text></Pressable>
              </View>
              {couponMsg && <Text style={{ color: couponMsg.ok ? "#1B9C5A" : colors.red, fontSize: 12 }}>{couponMsg.text}</Text>}
              <Line label="Tạm tính" value={formatPrice(totalPrice)} />
              <Line label="Giảm giá" value={discount > 0 ? `− ${formatPrice(discount)}` : formatPrice(0)} />
              <Line label="Tổng cộng" value={formatPrice(finalTotal)} bold />
            </View>
          ) : null
        }
      />
      <View style={s.footer}>
        <View>
          <Text style={s.totalLabel}>Tổng ({totalQuantity} cuốn)</Text>
          <Text style={s.total}>{formatPrice(finalTotal)}</Text>
        </View>
        <Pressable style={[s.pay, items.length === 0 && { opacity: 0.4 }]} disabled={items.length === 0} onPress={goCheckout}>
          <Text style={s.payText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Line({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={s.line}>
      <Text style={[s.lineText, bold && s.lineBold]}>{label}</Text>
      <Text style={[s.lineText, bold && s.lineBold]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, paddingHorizontal: 16, paddingBottom: 12 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800", paddingTop: 8 },
  summary: { backgroundColor: "#fff", borderRadius: 16, padding: 14, gap: 8, marginTop: 6 },
  couponRow: { flexDirection: "row", gap: 8 },
  couponInput: { flex: 1, borderWidth: 1, borderColor: colors.line, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, color: colors.text },
  applyBtn: { backgroundColor: colors.cyan, borderRadius: 10, paddingHorizontal: 16, justifyContent: "center" },
  applyText: { color: "#fff", fontWeight: "800" },
  line: { flexDirection: "row", justifyContent: "space-between" },
  lineText: { color: colors.muted },
  lineBold: { color: colors.text, fontWeight: "800", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 16 },
  totalLabel: { color: colors.muted, fontSize: 12 },
  total: { fontSize: 20, fontWeight: "800", color: colors.text },
  pay: { backgroundColor: colors.indigo, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 },
  payText: { color: "#fff", fontWeight: "800" },
});
