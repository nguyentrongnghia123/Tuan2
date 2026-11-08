import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Book } from "../types";
import { colors } from "../theme";
import { formatPrice } from "../utils/format";
import { HeartButton } from "./HeartButton";

export function BookCard({ book, onPress }: { book: Book; onPress: (b: Book) => void }) {
  return (
    <Pressable style={s.card} onPress={() => onPress(book)}>
      <View style={[s.cover, { backgroundColor: book.color }]}>
        <Text style={s.emoji}>{book.emoji}</Text>
        <HeartButton bookId={book.id} size={30} style={s.heart} />
      </View>
      <Text style={s.title} numberOfLines={2}>{book.title}</Text>
      <Text style={s.author} numberOfLines={1}>{book.author}</Text>
      <Text style={s.price}>{formatPrice(book.price)}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({
  card: { flex: 1, backgroundColor: colors.card, borderRadius: 16, padding: 10, gap: 4 },
  cover: { height: 120, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  heart: { position: "absolute", top: 8, right: 8 },
  emoji: { fontSize: 52 },
  title: { fontWeight: "700", color: colors.text, minHeight: 36 },
  author: { color: colors.muted, fontSize: 12 },
  price: { color: colors.indigo, fontWeight: "800", marginTop: 2 },
});
