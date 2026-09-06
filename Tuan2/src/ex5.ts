export function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task done after ${time}ms`);
    }, time);
  });
}

console.log("Bắt đầu thực hiện task...");
simulateTask(1500).then((res) => console.log("Đáp án:", res));
