function failingTask(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error("Failed to load data from server")),
      1000,
    );
  });
}

async function handleTask() {
  try {
    console.log("Đang xử lý task lỗi...");
    const data = await failingTask();
    console.log(data);
  } catch (error: any) {
    console.log("(Bắt lỗi bằng try/catch):", error.message);
  }
}

handleTask();
