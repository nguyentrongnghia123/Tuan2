const sleepp = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function step1() {
  await sleepp(1000);
  console.log("-> Hoàn thành Bước 1");
}

async function step2() {
  await sleepp(1000);
  console.log("-> Hoàn thành Bước 2");
}

async function runSequentially() {
  console.log("Bắt đầu chạy tuần tự...");
  await step1();
  await step2();
  console.log("Tất cả các bước đã hoàn tất tuần tự!");
}

runSequentially();
