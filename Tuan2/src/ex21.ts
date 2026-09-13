async function getTodo() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    if (!response.ok) throw new Error("HTTP Error: " + response.status);
    const data = await response.json();
    console.log("Đáp án (Dữ liệu từ API):", data);
  } catch (err: any) {
    console.log("Lỗi:", err.message);
  }
}

getTodo();
