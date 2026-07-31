/* ============================================================
   CHIZZL — site behaviour
   ============================================================ */

/* ------------------------------------------------------------
   APP STORE LINK
   ------------------------------------------------------------
   The badges are intentionally inert until the app is live.

   To go live: paste the App Store URL below and save. Every
   badge on the page unlocks automatically — no markup changes.

     const APP_STORE_URL = 'https://apps.apple.com/app/id0000000000';

   Leave it as an empty string to keep the badges locked.
------------------------------------------------------------ */
const APP_STORE_URL = '';

(function unlockAppStoreBadges() {
  const url = APP_STORE_URL.trim();
  if (!url) return; // still pre-launch — badges stay locked

  document.querySelectorAll('[data-appstore]').forEach((badge) => {
    badge.href = url;
    badge.rel = 'noopener';
    badge.classList.remove('is-locked');
    badge.removeAttribute('aria-disabled');
    badge.removeAttribute('tabindex');
    badge.setAttribute('aria-label', 'Download CHIZZL AI on the App Store');
  });

  // Drop the "Coming soon" notes once the link is real
  document.querySelectorAll('[data-appstore-note]').forEach((note) => {
    const pill = note.querySelector('.pill');
    if (pill) pill.remove();
  });

  document.documentElement.classList.add('is-launched');
})();

/* Footer year */
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
