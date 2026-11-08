import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage";
import { CART_KEY, WISHLIST_KEY, loadJSON } from "../storage/storage";
import { useAutoPersist } from "./useAutoPersist";
import type { CartItem } from "../types";

// Trả về false cho tới khi đọc xong AsyncStorage
export function usePersistence(): boolean {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  // Đọc phiên, giỏ hàng, yêu thích song song khi mở app
  useEffect(() => {
    (async () => {
      const [auth, cart, wish] = await Promise.all([
        loadAuth(), loadJSON<CartItem[]>(CART_KEY), loadJSON<number[]>(WISHLIST_KEY),
      ]);
      if (auth?.token && auth.user) dispatch(setCredentials(auth)); // BT8.3
      if (cart) dispatch(hydrateCart(cart));                         // BT8.7b
      if (wish) dispatch(hydrateWishlist(wish));                     // BT8.7b
      setReady(true);
    })();
  }, [dispatch]);

  // Ghi/xóa phiên khi user, token đổi
  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });
    else clearAuth();
  }, [ready, user, token]);

  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}
