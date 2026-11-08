import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import { goHome } from "../navigation/helpers";
import type { Book } from "../types";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useWishlist } from "../store/hooks";
import { BookGrid } from "../components/BookGrid";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { colors } from "../theme";

export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  const { ids } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setBooks(await getBooks()); }
    catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  // không lưu bản sao sách: lọc theo id trong store
  const favorites = useMemo(() => books.filter((b) => ids.includes(b.id)), [books, ids]);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <BookGrid
        data={favorites}
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        ListEmptyComponent={
          <EmptyState
            emoji="💔" title="Chưa có sách yêu thích" message="Nhấn ♡ trên mỗi cuốn sách để lưu lại ở đây."
            actionLabel="Khám phá sách" onAction={() => goHome(navigation)}
          />
        }
      />
    </View>
  );
}
