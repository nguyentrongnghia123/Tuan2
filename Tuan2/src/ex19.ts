interface User19 {
  id: number;
  name: string;
}

async function fetchUser19(id: number): Promise<User19> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User_${id}` }), 1000);
  });
}

async function fetchUsers19(ids: number[]): Promise<User19[]> {
  const userPromises = ids.map((id) => fetchUser19(id));
  return await Promise.all(userPromises);
}

async function run19() {
  console.log("Đang tải danh sách user [1, 2, 3, 4]...");
  const users = await fetchUsers19([1, 2, 3, 4]);
  console.log("Đáp án:", users);
}

run19();
