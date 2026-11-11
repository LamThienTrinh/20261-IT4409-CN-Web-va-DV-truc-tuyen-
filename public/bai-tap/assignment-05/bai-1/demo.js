// Hai phiên bản chỉ khác việc hủy timer đang chờ trước khi đặt timer mới.
const cacViDu = [
  { suffix: "", huyTimerCu: true },
  { suffix: "-no-clear", huyTimerCu: false }
];
const datLai = [];
for (const viDu of cacViDu) {
  let timerId = null;
  let soLan = 0;
  const dangCho = new Set();
  const status = document.getElementById(`status${viDu.suffix}`);
  const count = document.getElementById(`count${viDu.suffix}`);
  const log = document.getElementById(`log${viDu.suffix}`);
  document.getElementById(`start${viDu.suffix}`).onclick = () => {
    if (viDu.huyTimerCu && timerId) {
      clearTimeout(timerId);
      dangCho.delete(timerId);
    }
    status.textContent = "Status: Timer started (3s)";
    const id = setTimeout(() => {
      dangCho.delete(id);
      soLan += 1;
      status.textContent = "✅ Action executed!";
      count.textContent = soLan;
      const dong = document.createElement("li");
      dong.textContent = `Callback thực thi lần ${soLan}.`;
      log.append(dong);
    }, 3000);
    timerId = id;
    dangCho.add(id);
  };
  datLai.push(() => {
    for (const id of dangCho) clearTimeout(id);
    dangCho.clear();
    timerId = null;
    soLan = 0;
    count.textContent = "0";
    status.textContent = "Status: Waiting...";
    log.replaceChildren();
  });
}
document.getElementById("reset").onclick = () => datLai.forEach(ham => ham());
