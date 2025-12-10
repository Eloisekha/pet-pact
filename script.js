document.addEventListener("DOMContentLoaded", () => {
  // --- SCREEN 1: LOGIN LOGIC ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    // ... (Keep your existing password toggle logic here) ...
    const toggleBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const eyeIcon = toggleBtn.querySelector("svg");

    toggleBtn.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      eyeIcon.style.opacity = type === "text" ? "0.5" : "1";
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Login successful. Going to Welcome Screen.");
      window.location.href = "screen2.html";
    });
  }

  // --- SCREEN 2: WELCOME SCREEN LOGIC ---
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      console.log("Starting App...");
      // This will go to the main dashboard/timer screen (Screen 3)
      // Ensure you create 'screen3.html' next
      window.location.href = "screen3.html";
    });
  }
  // --- SCREEN 3: DASHBOARD LOGIC ---
  const timerDisplay = document.getElementById("timerDisplay");

  if (timerDisplay) {
    let timeLeft = 25 * 60; // 25 Minutes
    let timerInterval = null;
    let isRunning = false;

    const actionBtn = document.getElementById("actionBtn");
    const stopBtn = document.getElementById("stopBtn");
    const backBtn = document.getElementById("backBtn");
    const modal = document.getElementById("modalOverlay");
    const modalConfirm = document.getElementById("modalConfirm");
    const modalCancel = document.getElementById("modalCancel");
    const statusText = document.getElementById("statusText");

    // Format MM:SS
    function updateDisplay() {
      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      timerDisplay.textContent = `${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    }

    // 1. START / PAUSE
    actionBtn.addEventListener("click", () => {
      if (isRunning) {
        // Pause
        clearInterval(timerInterval);
        isRunning = false;
        actionBtn.textContent = "Resume";
        statusText.textContent = "Session Paused";
      } else {
        // Start
        isRunning = true;
        actionBtn.textContent = "Pause";
        statusText.textContent = "Stay Focused...";

        timerInterval = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
          } else {
            // Timer Finished
            clearInterval(timerInterval);
            isRunning = false;
            alert("Session Finished! Time for a Break."); // Simplified alert for demo
            timeLeft = 5 * 60; // Set Break time
            statusText.textContent = "Break Time";
            updateDisplay();
            actionBtn.textContent = "Start Break";
          }
        }, 1000); // 1000ms = 1 second
      }
    });

    // 2. STOP BUTTON -> OPEN MODAL
    stopBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    // 3. MODAL ACTIONS
    modalCancel.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modalConfirm.addEventListener("click", () => {
      // Reset everything
      clearInterval(timerInterval);
      isRunning = false;
      timeLeft = 25 * 60;
      updateDisplay();
      actionBtn.textContent = "Start Focus";
      statusText.textContent = "Focus Session";
      modal.classList.add("hidden");
    });

    // 4. BACK BUTTON
    backBtn.addEventListener("click", () => {
      // Confirm if timer is running?
      if (isRunning) {
        modal.classList.remove("hidden"); // Use the same modal for safety
      } else {
        window.location.href = "screen2.html";
      }
    });
  }
});
