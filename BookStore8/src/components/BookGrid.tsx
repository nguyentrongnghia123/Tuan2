import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import type { Book } from "../types";
import { BookCard } from "./BookCard";

interface Props {
  data: Book[];
  onPressBook: (b: Book) => void;
  ListEmptyComponent?: React.ReactElement;
}

export function BookGrid({ data, onPressBook, ListEmptyComponent }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(b) => String(b.id)}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={s.content}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}><BookCard book={item} onPress={onPressBook} /></View>
      )}
    />
  );
}
const s = StyleSheet.create({ content: { padding: 16, gap: 12, paddingBottom: 90, flexGrow: 1 } });
