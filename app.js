// app.js

const STUDY_SECONDS = 45 * 60; // 45 min
const BREAK_SECONDS = 15 * 60; // 15 min

const statusLabel = document.getElementById("statusLabel");
const timerEl = document.getElementById("timer");
const petImg = document.getElementById("petImage");
const primaryBtn = document.getElementById("primaryActionBtn");
const backBtn = document.getElementById("backBtn");
const stopBtn = document.getElementById("stopBtn");

// modal elements
const overlay = document.getElementById("confirmOverlay");
const confirmTitle = document.getElementById("confirmTitle");
const confirmMessage = document.getElementById("confirmMessage");
const confirmOk = document.getElementById("confirmOk");
const confirmCancel = document.getElementById("confirmCancel");

let mode = "idle"; // "idle" | "study" | "break"
let secondsLeft = STUDY_SECONDS;
let timerId = null;
const historyStack = []; // for Back button

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function setMode(nextMode, nextSeconds) {
  historyStack.push({ mode, secondsLeft }); // store previous state
  mode = nextMode;
  secondsLeft = nextSeconds;
  startTimer();
  render();
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      secondsLeft = 0;
      clearInterval(timerId);
      render();
      onTimerFinished();
    } else {
      renderTimerOnly();
    }
  }, 1000);
}

function stopSession() {
  clearInterval(timerId);
  mode = "idle";
  secondsLeft = STUDY_SECONDS;
  render();
}

function goBack() {
  if (!historyStack.length) return;
  clearInterval(timerId);
  const last = historyStack.pop();
  mode = last.mode;
  secondsLeft = last.secondsLeft;
  if (mode === "idle") {
    timerId = null;
  } else {
    startTimer();
  }
  render();
}

/* ---------- CONFIRM MODAL ---------- */
let confirmCallback = null;

function openConfirm(title, message, onOk) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmCallback = onOk;
  overlay.hidden = false;
}

confirmOk.onclick = () => {
  overlay.hidden = true;
  if (confirmCallback) confirmCallback();
};

confirmCancel.onclick = () => {
  overlay.hidden = true;
  confirmCallback = null;
};

/* ---------- TIMER FINISHED LOGIC ---------- */
function onTimerFinished() {
  if (mode === "study") {
    openConfirm("Study session finished", "Start your break?", () =>
      setMode("break", BREAK_SECONDS)
    );
  } else if (mode === "break") {
    openConfirm("Break is over", "Start the next study session?", () =>
      setMode("study", STUDY_SECONDS)
    );
  }
}

/* ---------- RENDER ---------- */

function renderTimerOnly() {
  timerEl.textContent = formatTime(secondsLeft);
}

function render() {
  renderTimerOnly();

  // status text + button label + pet image
  if (mode === "idle") {
    statusLabel.textContent = "Welcome to Pet Pact!!";
    primaryBtn.textContent = "START STUDY";
    petImg.src = "img/pet_idle.png";
    stopBtn.disabled = true;
  } else if (mode === "study") {
    statusLabel.textContent = "Study time with your cat";
    primaryBtn.textContent = "START BREAK";
    petImg.src = "img/pet_love.png";
    stopBtn.disabled = false;
  } else if (mode === "break") {
    statusLabel.textContent = "Break time >_<";
    primaryBtn.textContent = "START STUDY";
    petImg.src = "img/pet_relaxed.png";
    stopBtn.disabled = false;
  }

  // Back button always enabled (if there is history)
  backBtn.disabled = historyStack.length === 0;
}

/* ---------- BUTTON EVENTS ---------- */

// main big button
primaryBtn.addEventListener("click", () => {
  if (mode === "idle") {
    openConfirm("Start study session?", "45 minutes of focus.", () =>
      setMode("study", STUDY_SECONDS)
    );
  } else if (mode === "study") {
    openConfirm("Start break?", "Take a 15 minute break.", () =>
      setMode("break", BREAK_SECONDS)
    );
  } else if (mode === "break") {
    openConfirm("Start next study session?", "Back to focus.", () =>
      setMode("study", STUDY_SECONDS)
    );
  }
});

//
