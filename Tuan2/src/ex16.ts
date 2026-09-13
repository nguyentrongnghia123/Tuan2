const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function asyncTask(id: number, delay: number): Promise<string> {
  await sleep(delay);
  return `Task ${id} done`;
}

async function runInParallel() {
  console.log("Bắt đầu chạy song song...");
  const results = await Promise.all([
    asyncTask(1, 1000),
    asyncTask(2, 1500),
    asyncTask(3, 800),
  ]);
  console.log("Đáp án:", results);
}

runInParallel();
