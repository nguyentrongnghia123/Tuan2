export interface Book {
  id: number; title: string; author: string; price: number;
  categoryId: number; stock: number; description: string;
  emoji: string; color: string; // màu nền "bìa sách"
}
export interface Category { id: number; name: string; emoji: string; }
export interface CartItem {
  bookId: number; title: string; price: number;
  emoji: string; color: string; stock: number; quantity: number;
}
export interface User { id: number; name: string; email: string; phone?: string; }
export interface Review {
  id: number; bookId: number; userId: number; userName: string;
  rating: number; // 1 đến 5
  comment: string; createdAt: string;
}
export type NewReview = Omit<Review, "id" | "createdAt">;
