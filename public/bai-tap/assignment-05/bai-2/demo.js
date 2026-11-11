function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve("✅ Done"), ms));
}

async function runDemo() {
  const out = document.getElementById("out");
  out.textContent = "⏳ Waiting...";
  const msg = await wait(1000);
  out.textContent = msg;
}

async function runWithoutAwait() {
  const out = document.getElementById("out-no-await");
  out.textContent = "⏳ Waiting...";
  const msg = wait(1000);
  out.textContent = msg;
}

document.getElementById("btn").onclick = runDemo;
document.getElementById("btn-no-await").onclick = runWithoutAwait;
