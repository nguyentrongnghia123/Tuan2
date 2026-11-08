import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { useWishlist } from "../store/hooks";
import { colors } from "../theme";

interface Props { bookId: number; size?: number; style?: StyleProp<ViewStyle> }

// BT8.8a — đọc từ store wishlist nên mọi nơi luôn khớp nhau
export function HeartButton({ bookId, size = 34, style }: Props) {
  const { isFavorite, toggle } = useWishlist();
  const fav = isFavorite(bookId);
  return (
    <Pressable
      onPress={() => toggle(bookId)}
      accessibilityLabel={fav ? "Bỏ yêu thích" : "Yêu thích"}
      hitSlop={6}
      style={[s.btn, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      <Text style={{ fontSize: size * 0.58, color: fav ? colors.heart : colors.muted }}>{fav ? "♥" : "♡"}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({
  btn: { backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center" },
});
