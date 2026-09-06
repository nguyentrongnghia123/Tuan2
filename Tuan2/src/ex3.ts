export function getError(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

console.log("Đang xử lý...");
getError().catch((err: Error) => {
  console.log("Lỗi:", err.message);
});
