const sleep26 = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function waitFiveSeconds() {
  console.log("Đang chờ 5 giây...");
  await sleep26(5000);
  console.log("Đáp án: Đã trôi qua 5 giây!");
}

waitFiveSeconds();
