(() => {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const stopBtn = document.getElementById("stopBtn");
  const timerEl = document.getElementById("timer");

  const DEFAULT_SECONDS = 25 * 60;

  let remaining = DEFAULT_SECONDS;
  let timerInterval = null;
  let running = false;
  let paused = false;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function updateDisplay() {
    timerEl.textContent = formatTime(remaining);
  }

  function showControlsForStart() {
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
    stopBtn.style.display = "none";
  }

  function showControlsForRunning() {
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
    stopBtn.style.display = "block";
    pauseBtn.textContent = "Pause";
  }

  function showControlsForPaused() {
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
    stopBtn.style.display = "block";
    pauseBtn.textContent = "Play";
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
    
    // Tampilkan alert
    if (confirm("Waktu selesai! Istirahat sebentar ✨\n\nKlik OK untuk kembali ke awal.")) {
      resetToInitialState();
    }
  }

  function resetToInitialState() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    running = false;
    paused = false;
    remaining = DEFAULT_SECONDS;
    updateDisplay();
    showControlsForStart();
  }

  function startTimer() {
    if (running) return;
    
    running = true;
    paused = false;
    showControlsForRunning();
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(tick, 1000);
  }

  function togglePause() {
    if (!running) return;
    
    if (!paused) {
      // Pause the timer
      clearInterval(timerInterval);
      timerInterval = null;
      paused = true;
      showControlsForPaused();
    } else {
      // Resume the timer
      paused = false;
      showControlsForRunning();
      timerInterval = setInterval(tick, 1000);
    }
  }

  // Event Listeners
  startBtn.addEventListener("click", startTimer);

  pauseBtn.addEventListener("click", togglePause);

  stopBtn.addEventListener("click", resetToInitialState);

  // Initialize
  updateDisplay();
  showControlsForStart();
})();