import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import { goHome } from "../navigation/helpers";
import { useAuth, useCart } from "../store/hooks";
import { notify } from "../utils/dialog";
import { formatPrice } from "../utils/format";
import { colors } from "../theme";

export function CheckoutScreen({ navigation, route }: RootScreenProps<"Checkout">) {
  const { isLoggedIn, user } = useAuth();
  const { items, clear } = useCart();

  // BT8.4 — lớp chặn thứ hai: chưa đăng nhập thì chuyển sang Login (replace, bấm ← không quay lại)
  useEffect(() => {
    if (!isLoggedIn) navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total });
  }, [isLoggedIn, navigation, route.params.total]);
  if (!isLoggedIn) return null;

  const confirm = () => {
    clear();
    notify("Đặt hàng thành công", "Cảm ơn bạn đã mua sách tại BookStore!");
    goHome(navigation);
  };

  return (
    <View style={s.root}>
      <View style={s.card}>
        <Text style={s.label}>Người nhận</Text>
        <Text style={s.value}>{user?.name}</Text>
        <Text style={s.muted}>{user?.email}</Text>
        <Text style={[s.label, { marginTop: 16 }]}>Số mặt hàng</Text>
        <Text style={s.value}>{items.length}</Text>
        <Text style={[s.label, { marginTop: 16 }]}>Tổng thanh toán</Text>
        <Text style={s.total}>{formatPrice(route.params.total)}</Text>
      </View>
      <Pressable style={s.btn} onPress={confirm}>
        <Text style={s.btnText}>Xác nhận đặt hàng</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 20 },
  label: { color: colors.muted },
  value: { fontSize: 18, fontWeight: "700", color: colors.text },
  muted: { color: colors.muted },
  total: { fontSize: 30, fontWeight: "800", color: colors.indigo },
  btn: { backgroundColor: colors.indigo, borderRadius: 14, paddingVertical: 14, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
