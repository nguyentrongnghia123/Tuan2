export function simulateTask(time: number, id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} completed in ${time}ms`);
    }, time);
  });
}

const p1 = simulateTask(1000, 1);
const p2 = simulateTask(2000, 2);
const p3 = simulateTask(1500, 3);

Promise.all([p1, p2, p3]).then((results) => {
  console.log("Đáp án :", results);
});
