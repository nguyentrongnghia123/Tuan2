function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Task completed in ${time}ms`), time),
  );
}

async function executeTask() {
  console.log("Bắt đầu gọi simulateTask(2000)...");
  const result = await simulateTask(2000);
  console.log("Đáp án:", result);
}

executeTask();
