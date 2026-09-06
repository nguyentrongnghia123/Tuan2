async function getMultipleTodos(ids: number[]) {
  try {
    console.log("Đang gọi API cho các ID:", ids);
    const promises = ids.map((id) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
        res.json(),
      ),
    );
    const todos = await Promise.all(promises);
    console.log("Đáp án:", todos);
  } catch (err: any) {
    console.log("Lỗi:", err.message);
  }
}

getMultipleTodos([1, 2, 3]);
