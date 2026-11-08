import { useEffect, useState } from "react";

// BT7.7b — chỉ cập nhật giá trị sau khi ngừng thay đổi `delay` ms
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
