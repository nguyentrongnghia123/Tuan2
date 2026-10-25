import React, { useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { PHONES } from "./src/data/phones";
import { colors } from "./src/theme";

const ITEMS: { title: string; sub: string; render: () => React.ReactElement }[] = [
  { title: "Bài 1", sub: "Select Phone (dữ liệu mẫu)", render: () => <SelectPhoneApp phone={PHONES[0]} /> },
  { title: "Bài 2", sub: "Select Phone + API", render: () => <SelectPhoneApi /> },
  { title: "Bài 3", sub: "Bottom Tab", render: () => <BottomTabApp /> },
  { title: "Bài 4", sub: "Stack + Tab + Params", render: () => <StackTabApp /> },
  { title: "Bài 5", sub: "Drawer", render: () => <DrawerApp /> },
];

export default function App() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {index === null ? (
        <SafeAreaView style={s.menu}>
          <Text style={s.title}>Lab 6 — Navigation</Text>
          {ITEMS.map((it, i) => (
            <Pressable key={it.title} style={s.item} onPress={() => setIndex(i)}>
              <Text style={s.itemTitle}>{it.title}</Text>
              <Text style={s.itemSub}>{it.sub}</Text>
            </Pressable>
          ))}
        </SafeAreaView>
      ) : (
        <View style={{ flex: 1 }}>
          <SafeAreaView edges={["top"]} style={s.bar}>
            <Pressable onPress={() => setIndex(null)} hitSlop={10}>
              <Text style={s.back}>← Menu · {ITEMS[index].title}</Text>
            </Pressable>
          </SafeAreaView>
          {/* SafeAreaProvider lồng nhau: các màn con không cộng thêm inset phía trên */}
          <SafeAreaProvider style={{ flex: 1 }}>{ITEMS[index].render()}</SafeAreaProvider>
        </View>
      )}
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  menu: { flex: 1, backgroundColor: colors.bg, padding: 20, gap: 12 },
  title: { fontSize: 26, fontWeight: "800", color: colors.navy, marginVertical: 16 },
  item: { backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: colors.line },
  itemTitle: { fontSize: 18, fontWeight: "700", color: colors.text },
  itemSub: { color: colors.muted, marginTop: 2 },
  bar: { backgroundColor: colors.navy, paddingHorizontal: 16, paddingBottom: 10 },
  back: { color: "#fff", fontWeight: "700", fontSize: 15, paddingTop: 6 },
});
