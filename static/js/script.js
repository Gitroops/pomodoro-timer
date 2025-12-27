(() => {
  const startBtn = document.getElementById("startBtn");
  const pausePlayBtn = document.getElementById("pausePlayBtn");
  const stopBtn = document.getElementById("stopBtn");
  const timerEl = document.getElementById("timer");

  const DEFAULT_SECONDS = 25 * 60;

  let remaining = DEFAULT_SECONDS;
  let timerInterval = null;
  let isPaused = false;
  let isRunning = false;

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
      isRunning = false;
      onFinish();
      return;
    }
    remaining--;
    updateDisplay();
  }

  function onFinish() {
    timerEl.textContent = "00:00";
    
    // Tampilkan notifikasi
    const confirmed = confirm("Waktu selesai! Istirahat sebentar ✨");
    
    if (confirmed) {
      // Kembali ke tampilan awal
      resetToInitialState();
    }
  }

  function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    isPaused = false;
    
    // Sembunyikan tombol start, tampilkan pause dan stop
    startBtn.style.display = "none";
    pausePlayBtn.style.display = "inline-block";
    stopBtn.style.display = "inline-block";
    pausePlayBtn.textContent = "Pause";
    pausePlayBtn.classList.remove("primary");
    pausePlayBtn.classList.add("secondary");
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(tick, 1000);
  }

  function pauseResumeTimer() {
    if (!isRunning) return;
    
    if (isPaused) {
      // Resume timer
      isPaused = false;
      pausePlayBtn.textContent = "Pause";
      pausePlayBtn.classList.remove("primary");
      pausePlayBtn.classList.add("secondary");
      
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(tick, 1000);
    } else {
      // Pause timer
      isPaused = true;
      pausePlayBtn.textContent = "Play";
      pausePlayBtn.classList.remove("secondary");
      pausePlayBtn.classList.add("primary");
      
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }
  }

  function stopTimer() {
    // Reset semua state
    resetToInitialState();
  }

  function resetToInitialState() {
    // Hentikan timer
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    // Reset state
    isRunning = false;
    isPaused = false;
    remaining = DEFAULT_SECONDS;
    
    // Update tampilan
    updateDisplay();
    
    // Kembalikan ke tampilan awal: hanya tombol Start yang terlihat
    startBtn.style.display = "inline-block";
    pausePlayBtn.style.display = "none";
    stopBtn.style.display = "none";
    
    // Reset teks tombol pause/play
    pausePlayBtn.textContent = "Pause";
    pausePlayBtn.classList.remove("primary");
    pausePlayBtn.classList.add("secondary");
  }

  // Event Listeners
  startBtn.addEventListener("click", startTimer);
  pausePlayBtn.addEventListener("click", pauseResumeTimer);
  stopBtn.addEventListener("click", stopTimer);

  // Inisialisasi tampilan
  updateDisplay();
})();