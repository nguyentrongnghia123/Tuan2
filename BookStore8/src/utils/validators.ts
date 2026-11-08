// Mỗi hàm trả về câu báo lỗi, hoặc null nếu hợp lệ
export const validateEmail = (v: string): string | null => {
  const s = v.trim();
  if (!s) return "Vui lòng nhập email";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? null : "Email không đúng định dạng";
};

export const validatePassword = (v: string): string | null => {
  if (!v) return "Vui lòng nhập mật khẩu";
  return v.length >= 6 ? null : "Mật khẩu tối thiểu 6 ký tự";
};

export const validateRequired = (label: string) => (v: string): string | null =>
  v.trim() ? null : `Vui lòng nhập ${label}`;
