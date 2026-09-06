async function tripleAfterOneSec(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

async function runn() {
  console.log("Đang tính 5 * 3...");
  const result = await tripleAfterOneSec(5);
  console.log("Đáp án:", result);
}

runn();
