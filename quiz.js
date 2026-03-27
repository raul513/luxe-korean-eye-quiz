/* ============================================================
   LUXE KOREAN UNDER-EYE BALM — QUIZ FUNNEL
   JavaScript: Navigation, animations, loading screens
   Screens: 0 (intro) → 1-17 (questions) → 9 (loading1) →
            10 (profile) → 18 (loading2) → 19 (results) → 20 (offer)
   ============================================================ */

// ── State ────────────────────────────────────────────
let currentScreen = 0;

// Screens that auto-advance after single-choice selection
// (screen 0 is intro+age combined, handled by selectSingleIntro)
const AUTO_ADVANCE = [5, 6, 7, 8, 13, 15, 16, 17];

// ── Init ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Set target date (3 weeks from now)
  const target = new Date();
  target.setDate(target.getDate() + 21);
  const dateEl = document.getElementById('targetDate');
  if (dateEl) {
    dateEl.textContent = target.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  }
});

// ── Intro selection (screen 0 → screen 2, skipping placeholder 1) ─────────────
function selectSingleIntro(el) {
  const parent = el.closest('.options-list');
  if (!parent) return;
  parent.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
  el.classList.add('selected');
  // Show progress bar and go to screen 2
  const wrap = document.getElementById('progressWrap');
  if (wrap) wrap.classList.add('visible');
  setTimeout(() => goToScreen(2), 300);
}

// ── Navigate to a screen ───────────────────────────────────
function goToScreen(n) {
  const prev = document.getElementById('screen-' + currentScreen);
  const next = document.getElementById('screen-' + n);
  if (!next) return;

  if (prev) prev.classList.remove('active');
  next.classList.add('active');
  currentScreen = n;

  updateProgress(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger loading animations
  if (n === 9)  runLoadingAnimation1();
  if (n === 18) runLoadingAnimation2();
}

// ── Next screen ────────────────────────────────────────────
function nextScreen() {
  goToScreen(currentScreen + 1);
}

// ── Progress bar ───────────────────────────────────────────
function updateProgress(n) {
  const wrap = document.getElementById('progressWrap');
  const fill = document.getElementById('progressBarFill');
  if (!wrap || !fill) return;

  if (n === 0) {
    wrap.classList.remove('visible');
    return;
  }

  wrap.classList.add('visible');

  // Screens 1–17 = questions, 18 = loading, 19–20 = results/offer
  let pct = 0;
  if (n >= 1 && n <= 17) {
    pct = Math.round((n / 17) * 95); // cap at 95% until results
  } else if (n >= 18) {
    pct = 100;
  }

  fill.style.width = pct + '%';
}

// ── Single-choice selection ────────────────────────────────
function selectSingle(el) {
  const parent = el.closest('.options-list');
  if (!parent) return;

  // Deselect all
  parent.querySelectorAll('.option-item').forEach(item => {
    item.classList.remove('selected');
  });

  // Select clicked
  el.classList.add('selected');

  // Auto-advance if this screen is in the list
  if (AUTO_ADVANCE.includes(currentScreen)) {
    setTimeout(() => nextScreen(), 300);
  }
}

// ── Multi-choice toggle ────────────────────────────────────
function toggleMulti(el) {
  el.classList.toggle('selected');
}

// ── Loading animation 1 (profile creation — screen 9) ─────
function runLoadingAnimation1() {
  const iconIds = ['sicon-0', 'sicon-1', 'sicon-2', 'sicon-3'];
  const fill = document.getElementById('loadingFill1');
  const delays = [600, 1400, 2200, 3000];

  // Reset all icons
  iconIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('done', 'active');
      el.textContent = '○';
    }
  });
  if (fill) fill.style.width = '0%';

  iconIds.forEach((id, i) => {
    // Activate
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('active');
        el.textContent = '↻';
      }
      if (fill) fill.style.width = ((i + 0.5) / iconIds.length * 100) + '%';
    }, delays[i]);

    // Mark done
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('active');
        el.classList.add('done');
        el.textContent = '✓';
      }
      if (fill) fill.style.width = ((i + 1) / iconIds.length * 100) + '%';

      // After last step, advance
      if (i === iconIds.length - 1) {
        setTimeout(() => goToScreen(10), 600);
      }
    }, delays[i] + 600);
  });
}

// ── Loading animation 2 (calculating transformation — screen 18) ──
function runLoadingAnimation2() {
  const fill = document.getElementById('loadingFill2');
  if (!fill) {
    setTimeout(() => goToScreen(19), 2200);
    return;
  }

  fill.style.width = '0%';
  let pct = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 10 + 5;
    if (pct >= 100) {
      pct = 100;
      fill.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => goToScreen(19), 500);
    } else {
      fill.style.width = pct + '%';
    }
  }, 180);
}

// ── Analytics helpers (add your pixel/GA here) ────────────
function trackEvent(name, data) {
  // window.fbq && fbq('trackCustom', name, data);
  // window.gtag && gtag('event', name, data);
  console.log('[Quiz Event]', name, data);
}

window.addEventListener('load', () => {
  trackEvent('quiz_loaded', { product: 'luxe-under-eye-balm' });
});
