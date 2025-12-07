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
});
