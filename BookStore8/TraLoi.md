# Trả lời câu hỏi bổ sung – Buổi 8

**1. Cờ `ready`.**
Ở lần render đầu, giỏ hàng trong store còn rỗng (`[]`) vì AsyncStorage chưa đọc xong. Nếu `useAutoPersist` bỏ điều kiện `ready` thì effect chạy ngay sau lần render đầu và ghi `[]` đè lên giỏ đã lưu, trong khi hàm đọc `loadJSON` vẫn đang chờ. Khi hàm đọc trả về thì dữ liệu cũ đã bị ghi đè nên giỏ mất. Cờ `ready` chỉ bật sau khi đọc xong và đã `dispatch(hydrateCart(...))`, nên các lần ghi sau đó đều dùng dữ liệu đúng.

**2. Token giả.**
Hai điểm không an toàn: (1) mật khẩu nằm sẵn trong `db.json` ở dạng thô và được so sánh ngay trong app, ai gọi `GET /users` cũng đọc được mật khẩu của mọi người; (2) token do app tự tạo (`fake-token-…`) nên ai cũng có thể tự làm giả, server không hề xác thực. Hệ thống thật để **server** kiểm tra mật khẩu (đã băm bằng bcrypt/argon2) rồi cấp token có thời hạn (ví dụ JWT). Token nên lưu bằng `expo-secure-store` (Keychain trên iOS, Keystore trên Android) thay cho AsyncStorage vì AsyncStorage lưu chữ thô, không mã hoá.

**3. Hai effect trong `CartItemRow`.**
Nếu xóa effect đồng bộ `setQty(item.quantity)` thì state cục bộ `qty` chỉ nhận giá trị `item.quantity` ở lần khởi tạo. Số trên nút sẽ bị lệch so với store khi store đổi từ nơi khác, ví dụ: giỏ được nạp lại từ AsyncStorage sau khi mở app (dòng được render trước với số lượng cũ), hoặc khi xóa rồi thêm lại cùng một sách thì số lượng trong store là 1 nhưng ô vẫn hiện số cũ. Effect đồng bộ giúp state cục bộ luôn theo kịp store.

**4. Một nguồn state.**
Nếu mỗi nơi giữ `useState` riêng thì tim ở lưới và tim ở trang chi tiết là hai biến độc lập: thả tim ở lưới, mở chi tiết vẫn thấy ♡ trắng (và ngược lại), màn Yêu thích cũng không biết gì. Store Redux là **một nguồn duy nhất** (`wishlist.ids`): mọi `HeartButton` đọc cùng mảng này qua `useWishlist()`, nên bấm ở đâu thì mọi nơi cập nhật cùng lúc, và chỉ cần ghi một chỗ vào AsyncStorage.

**5. Code bổ sung – hiện/ẩn mật khẩu (`LoginScreen.tsx`).**

```tsx
const [showPassword, setShowPassword] = useState(false);

<FormField
  label="Mật khẩu" value={password} onChangeText={setPassword} error={errors.password}
  secureTextEntry={!showPassword}
  right={
    <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
      <Text style={{ fontSize: 18, opacity: showPassword ? 1 : 0.5 }}>👁</Text>
    </Pressable>
  }
/>
```

State `showPassword` điều khiển `secureTextEntry`; `FormField` có prop `right` để đặt biểu tượng 👁 cạnh ô nhập. *(Ảnh chụp màn hình kết quả: tự chụp và đính kèm khi nộp.)*
