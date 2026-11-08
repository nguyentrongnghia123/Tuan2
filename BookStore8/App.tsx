import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { usePersistence } from "./src/hooks/usePersistence";
import { LoadingView } from "./src/components/LoadingView";

function Root() {
  const ready = usePersistence(); // false cho tới khi đọc xong AsyncStorage
  if (!ready) return <LoadingView label="Đang khởi động…" />;
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <Root />
      </SafeAreaProvider>
    </Provider>
  );
}
