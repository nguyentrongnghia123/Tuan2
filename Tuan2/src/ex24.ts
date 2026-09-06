async function postData() {
  const newTodo = {
    title: "Học TypeScript và Async/Await",
    completed: false,
    userId: 1,
  };

  try {
    console.log("Đang gửi request POST...");
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    const data = await response.json();
    console.log("Đáp án (Kết quả từ Server):", data);
  } catch (err: any) {
    console.log("Lỗi:", err.message);
  }
}

postData();
