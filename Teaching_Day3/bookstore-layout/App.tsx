// App.tsx — BÀI TỔNG HỢP Giờ 1 + 2 + 3
// Ráp khớp đúng props thực tế: Header, CategoryChips không nhận props (tự đọc data
// bên trong); BookGrid cần { books, onPressBook }; FloatingCartButton cần { count, onPress }.

import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Header } from "./src/components/Header";
import { CategoryChips } from "./src/components/Categorychips";
import { BookGrid } from "./src/components/Bookgrid";
import { FloatingCartButton } from "./src/components/Floatingcartbutton";
import { BOOKS } from "./data";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  // Bài học chưa đụng tới navigation, nên khi bấm vào 1 cuốn sách trong lưới,
  // tạm thời coi như "thêm vào giỏ" — chỉ để có tương tác demo cho FloatingCartButton.
  const handlePressBook = (_id: number) => {
    setCartCount((c) => c + 1);
  };

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng — nằm NGOÀI ScrollView nên không cuộn theo */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid
          paddingBottom = 100 để FloatingCartButton (cao 56 + bottom 24) không che sách cuối */}
      <ScrollView contentContainerStyle={styles.content}>
        <CategoryChips />

        <View style={styles.gridSpacing}>
          <BookGrid books={BOOKS} onPressBook={handlePressBook} />
        </View>
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView, neo theo screen (đã có flex:1) */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => alert(`Giỏ hàng: ${cartCount} sản phẩm`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 16, paddingBottom: 100 },
  gridSpacing: { marginTop: 16 },
});
