/* ============================================================
   LUXE KOREAN UNDER-EYE BALM — QUIZ FUNNEL LOGIC
   ============================================================ */

// ---- STATE ----
const TOTAL_QUESTIONS = 12;
let currentScreen = 0;
const totalScreens = 19; // screens 0–18

// Screens that are questions (for progress tracking)
const questionScreens = [1, 2, 3, 5, 6, 7, 8, 11, 12, 13, 14, 15];
// Screens that auto-advance after delay
const autoAdvanceScreens = {
  9:  animateLoading,   // profile loading
  16: animateLoading2   // results loading
};
// Screens that require a manual "Continue" button (multi-select)
const multiSelectScreens = [2, 3, 11, 12];
// Single-select screens auto-advance
const singleSelectScreens = [1, 5, 6, 7, 8, 13, 14, 15];

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  setTargetDate();
});

function setTargetDate() {
  const el = document.getElementById('targetDate');
  if (!el) return;
  const d = new Date();
  d.setDate(d.getDate() + 21);
  const opts = { month: 'long', day: 'numeric', year: 'numeric' };
  el.textContent = d.toLocaleDateString('en-US', opts);
}

// ---- NAVIGATION ----
function startQuiz() {
  goToScreen(1);
  document.getElementById('progressWrap').classList.add('visible');
}

function nextScreen() {
  goToScreen(currentScreen + 1);
}

function goToScreen(n) {
  if (n < 0 || n >= totalScreens) return;

  // Hide current
  const current = document.getElementById('screen-' + currentScreen);
  if (current) current.classList.remove('active');

  currentScreen = n;

  // Show next
  const next = document.getElementById('screen-' + currentScreen);
  if (next) {
    next.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateProgress();

  // Auto-advance screens
  if (autoAdvanceScreens[currentScreen]) {
    autoAdvanceScreens[currentScreen]();
  }

  // Hide progress on intro and offer screens
  const progressWrap = document.getElementById('progressWrap');
  if (currentScreen === 0 || currentScreen >= 17) {
    progressWrap.classList.remove('visible');
  } else {
    progressWrap.classList.add('visible');
  }
}

// ---- PROGRESS ----
function updateProgress() {
  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');
  if (!bar || !label) return;

  const qIndex = questionScreens.indexOf(currentScreen);
  let questionNum = qIndex >= 0 ? qIndex + 1 : null;

  // For non-question screens, find the last passed question
  if (questionNum === null) {
    for (let i = questionScreens.length - 1; i >= 0; i--) {
      if (questionScreens[i] < currentScreen) {
        questionNum = i + 1;
        break;
      }
    }
  }

  const pct = questionNum ? Math.round((questionNum / TOTAL_QUESTIONS) * 100) : 0;
  bar.style.setProperty('--progress', pct + '%');

  if (questionNum && questionNum <= TOTAL_QUESTIONS) {
    label.textContent = `Question ${questionNum} of ${TOTAL_QUESTIONS}`;
  } else if (currentScreen >= 9 && currentScreen < 17) {
    label.textContent = 'Almost done…';
  } else {
    label.textContent = '';
  }
}

// ---- OPTION SELECTION ----

// Single-select: select one option and auto-advance
function selectSingle(el, groupId) {
  const parent = el.closest('.options-list') || el.parentElement;
  parent.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
  el.classList.add('selected');

  // Auto-advance after short delay
  setTimeout(() => {
    nextScreen();
  }, 380);
}

// Multi-select: toggle options, require Continue button
function toggleMulti(el) {
  el.classList.toggle('selected');
}

// ---- LOADING ANIMATION: PROFILE (screen 9) ----
function animateLoading() {
  const steps = ['lstep-0', 'lstep-1', 'lstep-2', 'lstep-3'];
  const fill = document.getElementById('loadingFill');
  let i = 0;

  // Reset
  steps.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.querySelector('.step-icon').className = 'step-icon pending';
  });
  if (fill) fill.style.width = '0%';

  const interval = setInterval(() => {
    if (i > 0) {
      const prev = document.getElementById(steps[i - 1]);
      if (prev) {
        const icon = prev.querySelector('.step-icon');
        icon.className = 'step-icon done';
        icon.textContent = '✓';
      }
    }
    if (i < steps.length) {
      const curr = document.getElementById(steps[i]);
      if (curr) {
        const icon = curr.querySelector('.step-icon');
        icon.className = 'step-icon active';
        icon.textContent = '●';
      }
      if (fill) fill.style.width = ((i + 1) / steps.length * 100) + '%';
      i++;
    } else {
      clearInterval(interval);
      // Mark last step done
      const last = document.getElementById(steps[steps.length - 1]);
      if (last) {
        const icon = last.querySelector('.step-icon');
        icon.className = 'step-icon done';
        icon.textContent = '✓';
      }
      if (fill) fill.style.width = '100%';
      setTimeout(() => goToScreen(10), 600);
    }
  }, 900);
}

// ---- LOADING ANIMATION: RESULTS (screen 16) ----
function animateLoading2() {
  const fill = document.getElementById('loadingFill2');
  if (!fill) return;
  fill.style.width = '0%';

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 12 + 5;
    if (pct >= 100) {
      pct = 100;
      fill.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => goToScreen(17), 500);
    } else {
      fill.style.width = pct + '%';
    }
  }, 200);
}

// ---- KEYBOARD NAVIGATION ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && currentScreen > 0) {
    // Only advance if there's a visible continue button or we're on a loading screen
    const continueBtn = document.querySelector('#screen-' + currentScreen + ' .btn-continue');
    if (continueBtn) continueBtn.click();
  }
});

// ---- ANALYTICS HELPERS (optional — add your pixel/GA here) ----
function trackEvent(name, data) {
  // Example: window.fbq && fbq('trackCustom', name, data);
  // Example: window.gtag && gtag('event', name, data);
  console.log('[Quiz Event]', name, data);
}

// Track quiz start
window.addEventListener('load', () => {
  trackEvent('quiz_loaded', { product: 'luxe-under-eye-balm' });
});
