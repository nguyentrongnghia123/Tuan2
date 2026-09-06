const fastTask = new Promise<string>((res) =>
  setTimeout(() => res("Fast Task Win!"), 500),
);
const slowTask = new Promise<string>((res) =>
  setTimeout(() => res("Slow Task Win!"), 2000),
);

console.log("Đang chạy 2 task...");
Promise.race([fastTask, slowTask]).then((winner) => {
  console.log("đầu tiên:", winner);
});
