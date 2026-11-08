import type { User } from "../types";
import { loadJSON, removeKey, saveJSON } from "./storage";

const AUTH_KEY = "@bookstore/auth";
export interface StoredAuth { user: User; token: string }

export const saveAuth = (auth: StoredAuth) => saveJSON(AUTH_KEY, auth);
export const loadAuth = () => loadJSON<StoredAuth>(AUTH_KEY);
export const clearAuth = () => removeKey(AUTH_KEY);
