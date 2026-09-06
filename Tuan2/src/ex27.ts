async function fetchWithRetry(url: string, retries: number = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Thử lần ${i + 1}...`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error Status ${res.status}`);
      return await res.json();
    } catch (err: any) {
      console.log(`Lần ${i + 1} thất bại: ${err.message}`);
      if (i === retries - 1)
        throw new Error("Đã thử lại tối đa số lần nhưng vẫn thất bại!");
    }
  }
}

fetchWithRetry(
  "https://jsonplaceholder.typicode.com/invalid-url-12345",
  3,
).catch((err: Error) => console.log("Đáp án (Kết quả cuối):", err.message));
