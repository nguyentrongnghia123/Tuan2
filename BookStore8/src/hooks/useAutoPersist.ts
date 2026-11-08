import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// BT8.7b — value đổi thì ghi; cờ ready chặn việc ghi quá sớm (ghi đè dữ liệu cũ khi chưa đọc xong)
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    if (ready) saveJSON(key, value);
  }, [key, value, ready]);
}
