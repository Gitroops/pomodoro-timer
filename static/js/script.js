(() => {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const timerEl = document.getElementById("timer");

  const DEFAULT_SECONDS = 25 * 60;

  let remaining = DEFAULT_SECONDS;
  let timerInterval = null;
  let running = false;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function updateDisplay() {
    timerEl.textContent = formatTime(remaining);
  }

  function tick() {
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      running = false;
      onFinish();
      return;
    }
    remaining--;
    updateDisplay();
  }

  function onFinish() {
    timerEl.textContent = "00:00";
    startBtn.disabled = false;
    startBtn.textContent = "Start";
    alert("Waktu selesai! Istirahat sebentar ✨");
  }

  startBtn.addEventListener("click", () => {
    if (running) return;
    running = true;
    startBtn.textContent = "Running...";
    startBtn.disabled = true;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(tick, 1000);
  });

  stopBtn.addEventListener("click", () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    running = false;
    remaining = DEFAULT_SECONDS;
    updateDisplay();
    startBtn.disabled = false;
    startBtn.textContent = "Start";
  });

  updateDisplay();
})();