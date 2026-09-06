export function getTen(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

console.log("Đang xử lý...");
getTen().then((num) => {
  console.log("Đáp án:", num);
});
