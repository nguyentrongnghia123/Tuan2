import { CommonActions } from "@react-navigation/native";

// Về tab Home và dọn sạch các màn phía trên (Login, Checkout…). Chạy được cả React Navigation 6 và 7.
export const goHome = (navigation: { dispatch: (action: any) => void }) =>
  navigation.dispatch(
    CommonActions.reset({ index: 0, routes: [{ name: "Tabs", params: { screen: "Home" } }] })
  );
