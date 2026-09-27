document.querySelectorAll('[data-checklist]').forEach((container) => {
  const storageKey = `it4409-checklist:${container.dataset.checklist}`;
  const inputs = Array.from(container.querySelectorAll('input[type="checkbox"][data-task]'));
  const count = container.querySelector('[data-progress-count]');
  const progress = container.querySelector('progress');
  let saved = {};

  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  } catch {
    saved = {};
  }

  inputs.forEach((input) => {
    input.checked = saved[input.dataset.task] === true;
    input.addEventListener('change', () => {
      saved[input.dataset.task] = input.checked;
      try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch { /* Private browsing may disable storage. */ }
      update();
    });
  });

  function update() {
    const done = inputs.filter((input) => input.checked).length;
    if (count) count.textContent = `${done}/${inputs.length} bước`;
    if (progress) {
      progress.max = inputs.length;
      progress.value = done;
    }
  }

  update();
});
