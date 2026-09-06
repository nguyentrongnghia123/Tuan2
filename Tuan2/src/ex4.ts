export function getRandomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    const rand = Math.random();
    if (rand > 0.3) {
      resolve(rand);
    } else {
      reject(new Error(`Thất bại! Số ngẫu nhiên quá nhỏ: ${rand.toFixed(2)}`));
    }
  });
}

getRandomNumber()
  .then((num) => console.log("(Thành công):", num))
  .catch((err: Error) => console.log("(Lỗi):", err.message));
