const status = document.getElementById("status");
const nutDat = document.getElementById("order");
const nutHuy = document.getElementById("cancel");
let intervalId = null;

function countdown(seconds) {
  return new Promise((resolve, reject) => {
    let left = seconds;
    status.textContent = `Còn ${left}s để hủy...`;
    intervalId = setInterval(() => {
      left--;
      status.textContent = `Còn ${left}s để hủy...`;
      if (left === 0) {
        clearInterval(intervalId);
        resolve("Đơn hàng đã được xác nhận");
      }
    }, 1000);
    nutHuy.onclick = () => {
      clearInterval(intervalId);
      reject(new Error("Bạn đã hủy đơn"));
    };
  });
}

nutDat.onclick = async () => {
  nutDat.disabled = true;
  nutHuy.disabled = false;
  try {
    const msg = await countdown(5);
    status.textContent = `${msg}`;
  } catch (err) {
    status.textContent = `${err.message}`;
  } finally {
    intervalId = null;
    nutHuy.onclick = null;
    nutHuy.disabled = true;
    nutDat.disabled = false;
  }
};
