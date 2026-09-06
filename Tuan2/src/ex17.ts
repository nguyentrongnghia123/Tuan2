const sleep2 = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function runForAwait() {
  const promises = [
    sleep2(1000).then(() => "Kết quả 1"),
    sleep2(500).then(() => "Kết quả 2"),
    sleep2(1500).then(() => "Kết quả 3"),
  ];

  console.log("Đang duyệt qua các Promise...");
  for await (const result of promises) {
    console.log("Đáp án nhận được:", result);
  }
}

runForAwait();
