import type { Book } from "../types";

export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null;
export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k – 300k" },
  { key: "gt300", label: "Trên 300k" },
];

export interface BookFilter { keyword: string; categoryId: number | null; priceRange: PriceRange; }

// BT7.C2
export const inRange = (p: number, r: PriceRange) =>
  r === null || (r === "lt100" ? p < 100000 : r === "100to300" ? p >= 100000 && p <= 300000 : p > 300000);

// BT7.7c + BT7.8a + BT7.C2 — các điều kiện kết hợp theo AND
export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const k = normalize(f.keyword);
  return books.filter(
    (b) =>
      (k === "" || normalize(b.title).includes(k) || normalize(b.author).includes(k)) &&
      (f.categoryId === null || b.categoryId === f.categoryId) &&
      inRange(b.price, f.priceRange)
  );
}
