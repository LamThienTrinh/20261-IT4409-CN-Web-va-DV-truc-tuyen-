function fetchUser(id) {
  // (1) Hai callback của Promise.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        // (2) Hoàn thành thành công.
        resolve({ id: id, name: "An" });
      } else {
        // (3) Hoàn thành với lỗi.
        reject(new Error("ID không hợp lệ"));
      }
    }, 1000);
  });
}

// (4) Hàm bất đồng bộ.
async function showUser(id) {
  const result = document.getElementById("result");
  result.textContent = "Đang tải...";
  // (5) Bắt lỗi Promise bị reject.
  try {
    // (6) Chờ giá trị thành công.
    const user = await fetchUser(id);
    result.textContent = `User: ${user.name}`;
  } catch (err) {
    result.textContent = `Lỗi: ${err.message}`;
  }
}

document.getElementById("ok").onclick = () => showUser(1);
document.getElementById("fail").onclick = () => showUser(-1);
