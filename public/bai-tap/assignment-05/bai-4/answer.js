const status = document.getElementById("status");
let intervalId = null;

function countdown(seconds) {
  return new Promise((resolve, reject) => {
    let left = seconds;
    status.textContent = `Còn ${left}s để hủy...`;
    // (1) Lặp mỗi 1000 ms.
    intervalId = setInterval(() => {
      // (2) Giảm biến đếm.
      left--;
      status.textContent = `Còn ${left}s để hủy...`;
      if (left === 0) {
        // (3) Dừng lặp; (4) hoàn thành thành công.
        clearInterval(intervalId);
        resolve("Đơn hàng đã được xác nhận");
      }
    }, 1000);
    document.getElementById("cancel").onclick = () => {
      clearInterval(intervalId);
      // (5) Hoàn thành với lỗi khi hủy.
      reject(new Error("Bạn đã hủy đơn"));
    };
  });
}

document.getElementById("order").onclick = async () => {
  try {
    const msg = await countdown(5);
    status.textContent = `${msg}`;
  } catch (err) {
    status.textContent = `${err.message}`;
  }
};
