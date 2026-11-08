import { api } from "../api/client";
import type { User } from "../types";

type UserRecord = User & { password: string };
export interface AuthResult { user: User; token: string }

const strip = ({ password: _pw, ...user }: UserRecord): User => user;
const makeToken = (id: number) => `fake-token-${id}-${Date.now()}`; // GIẢ LẬP: hệ thống thật do server cấp

export async function login(email: string, password: string): Promise<AuthResult> {
  const res = await api.get<UserRecord[]>("/users", { params: { email: email.trim().toLowerCase() } });
  const found = res.data[0];
  if (!found || found.password !== password) throw new Error("Email hoặc mật khẩu không đúng");
  return { user: strip(found), token: makeToken(found.id) };
}

export async function register(name: string, email: string, password: string): Promise<AuthResult> {
  const mail = email.trim().toLowerCase();
  const exists = await api.get<UserRecord[]>("/users", { params: { email: mail } });
  if (exists.data.length > 0) throw new Error("Email này đã được đăng ký");
  const res = await api.post<UserRecord>("/users", { name: name.trim(), email: mail, password });
  return { user: strip(res.data), token: makeToken(res.data.id) };
}
