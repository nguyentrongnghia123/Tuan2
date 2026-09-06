function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out (> 2s)")), timeoutMs),
  );
  return Promise.race([promise, timeoutPromise]);
}

async function run20() {
  const slowApiCall = new Promise<string>((res) =>
    setTimeout(() => res("API Response Data"), 3000),
  );

  try {
    console.log("Đang gọi API có timeout 2 giây...");
    const data = await fetchWithTimeout(slowApiCall, 2000);
    console.log(data);
  } catch (error: any) {
    console.log("Đáp án (Lỗi timeout):", error.message);
  }
}

run20();
