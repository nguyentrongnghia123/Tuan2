import { api } from "../api/client";
import type { NewReview, Review } from "../types";

export async function getReviews(bookId: number): Promise<Review[]> {
  const res = await api.get<Review[]>("/reviews", { params: { bookId, _sort: "createdAt", _order: "desc" } });
  return res.data;
}

export async function addReview(payload: NewReview): Promise<Review> {
  const res = await api.post<Review>("/reviews", { ...payload, createdAt: new Date().toISOString() });
  return res.data;
}
