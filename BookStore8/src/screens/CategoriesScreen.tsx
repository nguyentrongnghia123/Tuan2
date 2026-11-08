import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TabScreenProps } from "../navigation/types";
import type { Category } from "../types";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { colors } from "../theme";

export function CategoriesScreen({ navigation }: TabScreenProps<"Categories">) {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => { // BT7.6b
    setLoading(true); setError(null);
    try { setData(await getCategories()); }
    catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <View style={s.root}>
      <SafeAreaView edges={["top"]} style={s.header}><Text style={s.title}>🗂️ Danh mục</Text></SafeAreaView>
      {loading ? (
        <LoadingView label="Đang tải danh mục…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(c) => String(c.id)}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <Pressable style={s.row} onPress={() => navigation.navigate("Home", { categoryId: item.id })}>
              <Text style={s.emoji}>{item.emoji}</Text>
              <Text style={s.name}>{item.name}</Text>
              <Text style={s.chev}>›</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, paddingHorizontal: 16, paddingBottom: 12 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800", paddingTop: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#fff", borderRadius: 16, padding: 16 },
  emoji: { fontSize: 28 },
  name: { flex: 1, fontSize: 16, fontWeight: "700", color: colors.text },
  chev: { fontSize: 24, color: colors.muted },
});
