import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TabScreenProps } from "../navigation/types";
import type { Book, Category } from "../types";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { useCart } from "../store/hooks";
import { filterBooks, PriceRange } from "../utils/filters";
import { BookGrid } from "../components/BookGrid";
import { SearchBar } from "../components/SearchBar";
import { PriceFilter } from "../components/PriceFilter";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { colors } from "../theme";

type Sort = "asc" | "desc" | null;

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  // BT7.5b — state + gọi API song song
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b); setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  // bộ lọc
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<Sort>(null); // câu hỏi bổ sung số 5

  const debouncedKeyword = useDebounce(keyword, 400); // BT7.7a

  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange }); // BT7.7c
    if (sort === null) return filtered;
    return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  }, [books, debouncedKeyword, categoryId, priceRange, sort]);

  // BT7.8b — nhận categoryId từ tab Danh mục rồi xoá params
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null; // BT7.7e
  const clearFilters = () => { setKeyword(""); setCategoryId(null); setPriceRange(null); setSort(null); };

  const { totalQuantity } = useCart(); // BT7.3d

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top"]} style={s.header}>
        <View style={s.headerRow}>
          <Text style={s.title}>📚 BookStore</Text>
          <Pressable onPress={() => setShowSearch((v) => !v)} hitSlop={10}>
            <Text style={s.searchIcon}>🔍</Text>
          </Pressable>
        </View>
        {showSearch && <SearchBar value={keyword} onChangeText={setKeyword} />}
      </SafeAreaView>

      {loading ? (
        <LoadingView label="Đang tải sách…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <>
          <View style={s.filters}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
              <Chip label="Tất cả" active={categoryId === null} onPress={() => setCategoryId(null)} />
              {categories.map((c) => (
                <Chip key={c.id} label={`${c.emoji} ${c.name}`} active={categoryId === c.id}
                  onPress={() => setCategoryId(categoryId === c.id ? null : c.id)} />
              ))}
            </ScrollView>
            <View style={s.row2}>
              <PriceFilter value={priceRange} onChange={setPriceRange} />
            </View>
            <View style={s.row2}>
              <Text style={s.sortLabel}>Sắp xếp:</Text>
              <Chip label="Giá ↑" active={sort === "asc"} onPress={() => setSort(sort === "asc" ? null : "asc")} small />
              <Chip label="Giá ↓" active={sort === "desc"} onPress={() => setSort(sort === "desc" ? null : "desc")} small />
              {hasFilter && (
                <Pressable onPress={clearFilters} style={{ marginLeft: "auto" }}>
                  <Text style={s.clear}>✕ Xóa bộ lọc</Text>
                </Pressable>
              )}
            </View>
          </View>

          <BookGrid
            data={visibleBooks}
            onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })} // BT7.2a
            ListEmptyComponent={
              <EmptyState emoji="🔎" title="Không tìm thấy sách phù hợp"
                message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
                actionLabel="Xóa bộ lọc" onAction={clearFilters} />
            }
          />
        </>
      )}

      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

function Chip({ label, active, onPress, small }: { label: string; active: boolean; onPress: () => void; small?: boolean }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, small && s.chipSmall, active && s.chipActive]}>
      <Text style={[s.chipText, small && { fontSize: 12 }, active && s.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 8 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  searchIcon: { fontSize: 22 },
  filters: { paddingTop: 10, gap: 8 },
  chips: { paddingHorizontal: 16, gap: 8 },
  row2: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16 },
  sortLabel: { color: colors.muted, fontSize: 12 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipSmall: { paddingHorizontal: 10, paddingVertical: 5 },
  chipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { color: colors.text, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  clear: { color: colors.red, fontWeight: "700", fontSize: 12 },
});
