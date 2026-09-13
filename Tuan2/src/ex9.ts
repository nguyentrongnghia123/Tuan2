function getEvenNumbers(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const evens = arr.filter((n) => n % 2 === 0);
      resolve(evens);
    }, 1000);
  });
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Đang lọc mảng:", numbers);
getEvenNumbers(numbers).then((evens) => {
  console.log("(Các số chẵn):", evens);
});
