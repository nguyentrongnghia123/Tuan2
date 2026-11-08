# BookStore – Buổi 8

## Cài thư viện (trên nền project Buổi 7)
```bash
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context expo-constants @react-native-async-storage/async-storage
npm install @reduxjs/toolkit react-redux axios
npm install -D json-server@0.17.4
```
Chép **App.tsx, db.json, src/, TraLoi.md** đè vào project. Thêm vào `scripts`:
`"api": "json-server --watch db.json --port 3000 --host 0.0.0.0"`

## Chạy
```bash
npm run api          # Terminal 1
npx expo start -c    # Terminal 2
npx tsc --noEmit
```
Tài khoản thử: demo@bookstore.vn / 123456
