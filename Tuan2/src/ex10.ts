function checkTask(success: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    if (success) resolve("Task completed successfully!");
    else reject(new Error("Task failed!"));
  });
}

checkTask(true)
  .then((res) => console.log("Kết quả:", res))
  .catch((err: Error) => console.log("Lỗi:", err.message))
  .finally(() => {
    console.log("Đáp án cuối cùng: Done!");
  });
