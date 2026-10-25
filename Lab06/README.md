# Lab 06 – Navigation

## Cách chạy
```bash
npx create-expo-app@latest Lab06 --template blank-typescript
cd Lab06
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
  @react-navigation/drawer react-native-screens react-native-safe-area-context \
  react-native-gesture-handler react-native-reanimated react-native-worklets @expo/vector-icons
```
Sau đó chép **index.ts, App.tsx, assets/, src/, mockapi_phones.json** của gói này đè vào project, và
đảm bảo trong package.json có `"main": "index.ts"`.

```bash
npx expo start -c
# Bài 2 với API thật (PowerShell):
$env:EXPO_PUBLIC_API_URL="https://xxxxxxxx.mockapi.io/api/v1"; npx expo start -c
```
Ảnh trong assets/phones/ là ảnh minh họa tự vẽ, hãy thay bằng ảnh 4 màu từ Figma (giữ nguyên tên file).
