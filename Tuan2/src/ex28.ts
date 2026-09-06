async function createTask(id: number): Promise<string> {
  const delay = Math.floor(Math.random() * 1000) + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));
  return `Task #${id} processed in ${delay}ms`;
}

async function batchProcess() {
  console.log("Đang xử lý đồng loạt 5 task...");
  const tasks = [1, 2, 3, 4, 5].map((id) => createTask(id));
  const results = await Promise.all(tasks);
  console.log("Đáp án:", results);
}

batchProcess();
