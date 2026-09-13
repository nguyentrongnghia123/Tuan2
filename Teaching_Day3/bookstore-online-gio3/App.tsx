import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    // flex:1 -> containing block cho FloatingCartButton (position:'absolute') bên dưới
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <BookGrid books={BOOKS} onPressBook={(id) => console.log('Mở sách', id)} />
      </ScrollView>

      {/* Nằm NGOÀI ScrollView, cùng cấp với nó -> không bị cuộn theo nội dung */}
      <FloatingCartButton count={cartCount} onPress={() => setCartCount((n) => n + 1)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
});
