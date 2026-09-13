const helloPromise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

async function run() {
  console.log("Đang chờ 2 giây...");
  const result = await helloPromise;
  console.log("Đáp án:", result);
}

run();
