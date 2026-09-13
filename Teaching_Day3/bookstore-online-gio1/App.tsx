// GIỜ 1 — Nền tảng Flexbox & Layout đơn giản
// Minh hoạ riêng: Bài 1 (Header) + Bài 2 (BookRowCard) + Thử thách giờ 1
// (Header cố định trên cùng + danh sách Book Card xếp chồng theo cột bên dưới).
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { BookRowCard } from './components/BookRowCard';
import { BOOKS } from './data';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header />
      {/* flex:1 cho vùng nội dung -> chiếm hết phần còn lại của màn hình sau Header,
          đúng yêu cầu "Thử thách giờ 1". */}
      <ScrollView contentContainerStyle={styles.list}>
        {BOOKS.map((book) => (
          <BookRowCard key={book.id} book={book} />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 12, gap: 10 },
});
