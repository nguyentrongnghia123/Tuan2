import axios from "axios";
import { API_URL } from "./config";

let tokenProvider: () => string | null = () => null;
export const setTokenProvider = (fn: () => string | null) => { tokenProvider = fn; };

export const api = axios.create({ baseURL: API_URL, timeout: 8000 }); // MỘT instance dùng chung

api.interceptors.request.use((config) => {
  const token = tokenProvider();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    let message = "Đã có lỗi xảy ra. Vui lòng thử lại.";
    if (axios.isAxiosError(error)) {
      if (!error.response) message = "Không kết nối được máy chủ. Hãy kiểm tra json-server (npm run api).";
      else if (error.response.status === 404) message = "Không tìm thấy dữ liệu.";
      else if (error.response.status >= 500) message = "Máy chủ đang gặp sự cố.";
    }
    return Promise.reject(new Error(message));
  }
);

export const getErrorMessage = (e: unknown) => (e instanceof Error ? e.message : "Đã có lỗi xảy ra.");
