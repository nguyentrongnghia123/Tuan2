interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser18(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User_${id}`, email: `user${id}@gmail.com` });
    }, 1000);
  });
}

async function run18() {
  console.log("Đang tải thông tin user 1...");
  const user = await fetchUser18(1);
  console.log("Đáp án:", user);
}

run18();
