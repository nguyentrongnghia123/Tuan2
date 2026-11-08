import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import type { Book, Review } from "../types";
import { getBookById, getBooks } from "../services/bookService";
import { addReview, getReviews } from "../services/reviewService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { RatingStars } from "../components/RatingStars";
import { HeartButton } from "../components/HeartButton";
import { BookCard } from "../components/BookCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { formatPrice } from "../utils/format";
import { colors } from "../theme";

export function BookDetailScreen({ route, navigation }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { user, isLoggedIn } = useAuth();
  const { add, items } = useCart();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form đánh giá
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [b, r] = await Promise.all([getBookById(bookId), getReviews(bookId)]);
      setBook(b); setReviews(r);
      // BT8.C1 — sách liên quan cùng danh mục
      const sameCategory = await getBooks({ categoryId: b.categoryId });
      setRelated(sameCategory.filter((x) => x.id !== b.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);
  useEffect(() => { load(); }, [load]);

  // BT8.5b — điểm trung bình tính từ mảng reviews
  const average = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews]
  );

  // BT8.5c — gửi đánh giá
  const submitReview = async () => {
    if (!user) return;
    if (rating === 0) return setFormError("Vui lòng chọn số sao");
    if (!comment.trim()) return setFormError("Vui lòng nhập bình luận");
    setFormError(null);
    setSending(true);
    try {
      const created = await addReview({ bookId, userId: user.id, userName: user.name, rating, comment: comment.trim() });
      setReviews((prev) => [created, ...prev]);
      setRating(0);
      setComment("");
    } catch (e) {
      setFormError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
  };

  if (loading) return <LoadingView />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  const inCart = items.find((i) => i.bookId === book.id)?.quantity ?? 0;

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <View style={[s.cover, { backgroundColor: book.color }]}>
        <Text style={s.emoji}>{book.emoji}</Text>
        <HeartButton bookId={book.id} style={s.heart} />
      </View>

      <View style={s.card}>
        <Text style={s.title}>{book.title}</Text>
        <Text style={s.author}>{book.author}</Text>
        <View style={s.ratingRow}>
          <RatingStars value={average} size={20} />
          <Text style={s.ratingText}>
            {reviews.length ? `${average.toFixed(1)} (${reviews.length} đánh giá)` : "Chưa có đánh giá"}
          </Text>
        </View>
        <Text style={s.price}>{formatPrice(book.price)}</Text>
        <Text style={s.stock}>Còn {book.stock} cuốn trong kho{inCart > 0 ? ` · Đã có ${inCart} trong giỏ` : ""}</Text>
        <Text style={s.desc}>{book.description}</Text>
      </View>

      <PrimaryButton
        title="Thêm vào giỏ"
        onPress={() => add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock })}
      />

      <View style={s.card}>
        <Text style={s.section}>Đánh giá</Text>
        {isLoggedIn ? (
          <View style={{ gap: 8 }}>
            <Text style={s.muted}>Chọn số sao:</Text>
            <RatingStars value={rating} size={30} onChange={setRating} />
            <TextInput
              value={comment} onChangeText={setComment} placeholder="Chia sẻ cảm nhận của bạn…"
              placeholderTextColor={colors.muted} multiline style={s.commentInput}
            />
            {!!formError && <Text style={s.formError}>{formError}</Text>}
            <PrimaryButton title="Gửi đánh giá" onPress={submitReview} loading={sending} />
          </View>
        ) : (
          <Pressable style={s.loginBox} onPress={() => navigation.navigate("Login")}>
            <Text style={s.loginText}>Đăng nhập để viết đánh giá</Text>
          </Pressable>
        )}

        {reviews.map((r) => (
          <View key={r.id} style={s.review}>
            <View style={s.reviewHead}>
              <Text style={s.reviewName}>{r.userName}</Text>
              <RatingStars value={r.rating} size={14} />
            </View>
            <Text style={s.reviewText}>{r.comment}</Text>
            <Text style={s.reviewDate}>{new Date(r.createdAt).toLocaleDateString("vi-VN")}</Text>
          </View>
        ))}
      </View>

      {related.length > 0 && (
        <View style={{ gap: 8 }}>
          <Text style={s.section}>Sách liên quan</Text>
          <FlatList
            horizontal showsHorizontalScrollIndicator={false}
            data={related} keyExtractor={(b) => String(b.id)} contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <View style={{ width: 150 }}>
                <BookCard book={item} onPress={(b) => navigation.push("BookDetail", { bookId: b.id })} />
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content: { padding: 16, gap: 14 },
  cover: { height: 200, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  heart: { position: "absolute", top: 12, right: 12 },
  emoji: { fontSize: 88 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, gap: 6 },
  title: { fontSize: 20, fontWeight: "800", color: colors.text },
  author: { color: colors.muted },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  ratingText: { color: colors.muted, fontSize: 13 },
  price: { fontSize: 22, fontWeight: "800", color: colors.indigo, marginTop: 4 },
  stock: { color: colors.muted, fontSize: 12 },
  desc: { color: colors.text, lineHeight: 21, marginTop: 8 },
  section: { fontSize: 17, fontWeight: "800", color: colors.text },
  muted: { color: colors.muted },
  commentInput: {
    minHeight: 80, borderWidth: 1, borderColor: colors.line, borderRadius: 12, padding: 12,
    textAlignVertical: "top", color: colors.text,
  },
  formError: { color: colors.red, fontSize: 12 },
  loginBox: { borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.indigo, borderRadius: 12, padding: 14, alignItems: "center" },
  loginText: { color: colors.indigo, fontWeight: "700" },
  review: { borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 10, marginTop: 6, gap: 4 },
  reviewHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewName: { fontWeight: "700", color: colors.text },
  reviewText: { color: colors.text },
  reviewDate: { color: colors.muted, fontSize: 11 },
});
