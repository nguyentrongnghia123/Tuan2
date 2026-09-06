async function checkMultipleApis() {
  const endpoints = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/invalid-endpoint-fail", // Lỗi
    "https://jsonplaceholder.typicode.com/todos/2",
  ];

  console.log("Đang gọi nhiều API cùng lúc...");
  const requests = endpoints.map((url) =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error(`HTTP Error Status ${res.status}`);
      return res.json();
    }),
  );

  const results = await Promise.allSettled(requests);

  console.log("Đáp án:");
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`API ${index + 1} [Thành công]:`, result.value);
    } else {
      console.log(`API ${index + 1} [Thất bại]:`, result.reason.message);
    }
  });
}

checkMultipleApis();
