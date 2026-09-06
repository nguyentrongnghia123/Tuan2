async function queueProcess(tasks: (() => Promise<string>)[]) {
  console.log("Bắt đầu xử lý hàng đợi (Queue)...");
  const results: string[] = [];

  for (const taskFn of tasks) {
    const result = await taskFn();
    console.log("-> Xử lý xong:", result);
    results.push(result);
  }

  console.log("Đáp án (Tất cả task trong queue đã hoàn thành):", results);
}

const taskQueue = [
  () => new Promise<string>((r) => setTimeout(() => r("Task 1 Done"), 1000)),
  () => new Promise<string>((r) => setTimeout(() => r("Task 2 Done"), 500)),
  () => new Promise<string>((r) => setTimeout(() => r("Task 3 Done"), 800)),
];

queueProcess(taskQueue);
