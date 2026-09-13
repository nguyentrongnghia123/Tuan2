async function downloadFile(fileName: string) {
  console.log(`Bắt đầu tải file: ${fileName}... (Vui lòng chờ 3s)`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(`Đáp án: Hoàn tất tải xuống file ${fileName}!`);
}

downloadFile("tailieu_hoc_tap.pdf");
