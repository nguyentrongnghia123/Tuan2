Promise.resolve(2)
  .then((num) => {
    console.log("Bước 1 (Bình phương):", num * num);
    return num * num;
  })
  .then((num) => {
    console.log("Bước 2 (Nhân đôi):", num * 2);
    return num * 2;
  })
  .then((num) => {
    console.log("Bước 3 (Cộng 5):", num + 5);
    return num + 5;
  })
  .then((finalResult) => {
    console.log("Đáp án cuối cùng:", finalResult);
  });
