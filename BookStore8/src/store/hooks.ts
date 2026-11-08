import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";
import { addItem, clearCart, removeItem, setQuantity } from "./cartSlice";
import { logout, setCredentials, updateUser } from "./authSlice";
import { toggleWishlist } from "./wishlistSlice";
import type { CartItem, User } from "../types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ADAPTER: giao diện chỉ dùng các hook dưới đây, không biết gì về Redux.
export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const totalQuantity = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((n, i) => n + i.price * i.quantity, 0), [items]);
  return {
    items, totalQuantity, totalPrice,
    add: (item: Omit<CartItem, "quantity">) => dispatch(addItem(item)),
    remove: (bookId: number) => dispatch(removeItem(bookId)),
    setQty: (bookId: number, quantity: number) => dispatch(setQuantity({ bookId, quantity })),
    clear: () => dispatch(clearCart()),
  };
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  return {
    user, token,
    isLoggedIn: !!token && !!user,
    signIn: (u: User, t: string) => dispatch(setCredentials({ user: u, token: t })),
    signOut: () => dispatch(logout()),
    patchUser: (partial: Partial<User>) => dispatch(updateUser(partial)),
  };
}

export function useWishlist() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.wishlist.ids);
  return {
    ids,
    isFavorite: (bookId: number) => ids.includes(bookId),
    toggle: (bookId: number) => dispatch(toggleWishlist(bookId)),
  };
}
