/*!
 * in-app-browser.js — escape Meta's in-app webviews.
 *
 * Instagram, Threads, Facebook and Messenger render links in their own
 * embedded webview, and that webview refuses to open iTunes/App Store links.
 * A normal <a href="https://apps.apple.com/..."> simply does nothing when
 * tapped — no navigation, no error.
 *
 * The fix is to hand the URL back to the host app with a scheme it recognises,
 * which makes it launch the system browser. Everything here has to happen
 * synchronously inside the click handler: iOS discards navigation requests
 * that arrive after the user-gesture window closes.
 *
 * Usage
 * -----
 *   InAppBrowser.bind('[data-appstore]', { url: APP_STORE_URL });
 *
 * In a normal browser bind() attaches nothing at all, so the element stays a
 * plain anchor and navigates natively. Only inside a Meta webview does it
 * intercept the tap.
 *
 * Theming: the fallback dialog reads --surface, --on-surface, --primary and
 * friends when the host page defines them, and falls back to its own dark
 * palette when it doesn't.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.InAppBrowser = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var UA = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
  var STYLE_ID = 'inapp-browser-styles';
  var ESCAPE_EVENT = 'inappbrowser:escape';
  var DEFAULT_TIMEOUT = 1500;

  /* ── Detection ─────────────────────────────────────────── */

  function isIOS() {
    if (/iPad|iPhone|iPod/i.test(UA)) return true;
    // iPadOS 13+ reports a desktop Safari UA; touch points give it away.
    return /Macintosh/i.test(UA) &&
      typeof navigator !== 'undefined' &&
      navigator.maxTouchPoints > 1;
  }

  function isAndroid() {
    return /Android/i.test(UA);
  }

  /** Instagram and Threads share the same webview and the same escape hatch. */
  function isInstagram() {
    return /Instagram|Threads|Barcelona/i.test(UA);
  }

  function isFacebook() {
    return /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Messenger/i.test(UA);
  }

  function isInAppBrowser() {
    return isInstagram() || isFacebook();
  }

  /** 'instagram' | 'facebook' | null — Instagram wins, its UA carries both. */
  function appName() {
    if (isInstagram()) return 'instagram';
    if (isFacebook()) return 'facebook';
    return null;
  }

  /* ── Escape URL ────────────────────────────────────────── */

  /**
   * The URL to navigate to in order to hand `url` back to the system browser.
   * Returns `url` unchanged outside a known in-app browser.
   */
  function buildEscapeUrl(url) {
    // Android's intent: scheme works for every Meta app, so it comes first.
    if (isAndroid()) {
      return 'intent://' + url.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '') +
        '#Intent;scheme=https;end';
    }
    if (isInstagram()) {
      // The Instagram app intercepts this and opens Safari. Note that the
      // x-safari- prefix, which works for Facebook, is silently swallowed by
      // Instagram's webview when assigned to location.href — hence the split.
      return 'instagram://extbrowser/?url=' + encodeURIComponent(url);
    }
    if (isFacebook()) {
      return 'x-safari-' + url;
    }
    return url;
  }

  /* ── Escape ────────────────────────────────────────────── */

  /**
   * Break out to the system browser. Call synchronously from a click handler.
   *
   * If the app takes over, the page is backgrounded and one of
   * visibilitychange / pagehide / blur fires — that counts as success. If
   * nothing fires within `timeout` ms the escape was swallowed, and the
   * fallback dialog goes up.
   */
  function escape(url, options) {
    var opts = options || {};
    var timeout = typeof opts.timeout === 'number' ? opts.timeout : DEFAULT_TIMEOUT;
    var target = buildEscapeUrl(url);
    var settled = false;
    var timer = null;

    function cleanup() {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onLeave);
      window.removeEventListener('blur', onLeave);
    }

    function settle(succeeded) {
      if (settled) return;
      settled = true;
      cleanup();
      if (timer) clearTimeout(timer);
      if (succeeded) {
        if (typeof opts.onSuccess === 'function') opts.onSuccess(url);
      } else if (opts.fallback === false) {
        if (typeof opts.onFallback === 'function') opts.onFallback(url);
      } else {
        if (typeof opts.onFallback === 'function') opts.onFallback(url);
        showFallback(url, opts);
      }
    }

    function onVisibility() {
      if (document.visibilityState === 'hidden') settle(true);
    }
    function onLeave() {
      settle(true);
    }

    // Listeners must be live before the navigation is fired.
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onLeave);
    window.addEventListener('blur', onLeave);
    timer = setTimeout(function () { settle(false); }, timeout);

    // Observable hook for tests and analytics, dispatched before navigating.
    try {
      window.dispatchEvent(new CustomEvent(ESCAPE_EVENT, {
        detail: { url: url, target: target, app: appName(), ios: isIOS(), android: isAndroid() }
      }));
    } catch (e) { /* CustomEvent unsupported — not fatal */ }

    // Fire. Synchronous, no awaits, no rAF: the gesture token is short-lived.
    if (isFacebook() && !isAndroid()) {
      window.open(target, '_blank');
    } else {
      window.location.href = target;
    }

    return { cancel: function () { settle(true); } };
  }

  /* ── Fallback dialog ───────────────────────────────────── */

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css =
      '.iab-backdrop{position:fixed;inset:0;z-index:9999;display:flex;' +
      'align-items:flex-end;justify-content:center;' +
      'background:rgba(0,0,0,.68);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);' +
      'padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px));' +
      'font-family:var(--font-body,ui-sans-serif,system-ui,-apple-system,sans-serif)}' +

      '@media (min-width:600px){.iab-backdrop{align-items:center}}' +

      '.iab-sheet{width:100%;max-width:420px;box-sizing:border-box;' +
      'background:var(--surface-container,#19221b);color:var(--on-surface,#dce5db);' +
      'border:1px solid var(--hairline,rgba(140,240,190,.16));border-radius:16px;' +
      'padding:24px;box-shadow:0 24px 60px -12px rgba(0,0,0,.8)}' +

      '.iab-sheet h2{margin:0 0 8px;font-size:19px;line-height:1.25;font-weight:700;' +
      'font-family:var(--font-display,inherit);color:var(--on-surface,#dce5db)}' +

      '.iab-sheet p{margin:0 0 16px;font-size:14.5px;line-height:1.55;' +
      'color:var(--on-surface-variant,#bacbbc)}' +

      '.iab-btn{display:block;width:100%;box-sizing:border-box;min-height:48px;' +
      'border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;' +
      'font-family:var(--font-display,inherit);padding:0 16px}' +

      '.iab-btn--primary{border:0;background:var(--primary,#53fda4);color:#00210f;margin-bottom:10px}' +

      '.iab-btn--ghost{background:transparent;color:var(--on-surface,#dce5db);' +
      'border:1px solid var(--hairline-strong,rgba(140,240,190,.28))}' +

      '.iab-steps{margin:16px 0;padding:12px 14px;border-radius:10px;' +
      'background:var(--surface-lowest,rgba(0,0,0,.32));' +
      'border:1px solid var(--hairline,rgba(140,240,190,.12));' +
      'font-size:13.5px;line-height:1.6;color:var(--on-surface-variant,#bacbbc)}' +
      '.iab-steps b{color:var(--on-surface,#dce5db)}' +

      '.iab-close{position:absolute;top:-9999px;left:-9999px}' +
      '.iab-dismiss{display:block;width:100%;margin-top:12px;background:none;border:0;' +
      'color:var(--outline,#859587);font-size:13px;cursor:pointer;' +
      'font-family:var(--font-body,inherit);min-height:32px}' +

      '@media (prefers-reduced-motion:no-preference){' +
      '.iab-sheet{animation:iab-rise .22s ease-out}' +
      '@keyframes iab-rise{from{transform:translateY(12px);opacity:0}to{transform:none;opacity:1}}}';

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Older in-app webviews have no async clipboard.
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('copy rejected'));
      } catch (err) { reject(err); }
    });
  }

  var openDialog = null;

  /** The on-theme sheet shown when the automatic escape didn't take. */
  function showFallback(url, options) {
    if (openDialog) return openDialog;
    injectStyles();

    var opts = options || {};
    var app = appName();
    var menu = isIOS() ? '•••' : '⋮';
    var browser = isIOS() ? 'Safari' : 'Chrome';
    var appLabel = app === 'instagram' ? 'Instagram' : app === 'facebook' ? 'Facebook' : 'this app';
    var lastFocus = document.activeElement;

    var backdrop = document.createElement('div');
    backdrop.className = 'iab-backdrop';

    var sheet = document.createElement('div');
    sheet.className = 'iab-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-labelledby', 'iab-title');

    var title = document.createElement('h2');
    title.id = 'iab-title';
    title.textContent = 'Open in your browser';

    var body = document.createElement('p');
    body.textContent = appLabel + ' blocks App Store links inside its own browser. ' +
      'Open this page in ' + browser + ' to continue.';

    var retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'iab-btn iab-btn--primary';
    retry.textContent = 'Open in my native browser';

    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'iab-btn iab-btn--ghost';
    copy.textContent = 'Copy link';

    var steps = document.createElement('div');
    steps.className = 'iab-steps';
    steps.innerHTML = 'Or do it manually: tap <b>' + menu +
      '</b> in the corner, then <b>Open in browser</b>.';

    var dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.className = 'iab-dismiss';
    dismiss.textContent = 'Not now';

    sheet.appendChild(title);
    sheet.appendChild(body);
    sheet.appendChild(retry);
    sheet.appendChild(copy);
    sheet.appendChild(steps);
    sheet.appendChild(dismiss);
    backdrop.appendChild(sheet);

    function close() {
      if (!openDialog) return;
      document.removeEventListener('keydown', onKeydown, true);
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      openDialog = null;
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    function onKeydown(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      // Minimal focus trap.
      var focusable = [retry, copy, dismiss];
      var i = focusable.indexOf(document.activeElement);
      var next = e.shiftKey
        ? focusable[(i <= 0 ? focusable.length : i) - 1]
        : focusable[(i + 1) % focusable.length];
      e.preventDefault();
      next.focus();
    }

    retry.addEventListener('click', function () {
      close();
      escape(url, opts);
    });

    copy.addEventListener('click', function () {
      copyToClipboard(url).then(function () {
        copy.textContent = 'Link copied';
      }, function () {
        copy.textContent = url;
      });
    });

    dismiss.addEventListener('click', close);
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) close();
    });
    document.addEventListener('keydown', onKeydown, true);

    document.body.appendChild(backdrop);
    retry.focus();

    openDialog = { close: close, element: backdrop };
    return openDialog;
  }

  /* ── Binding ───────────────────────────────────────────── */

  /**
   * Intercept download CTAs, but only inside an in-app browser. Elsewhere the
   * element is left completely alone so it behaves as a plain link.
   *
   * @param {string|Element|NodeList|Array} target selector or element(s)
   * @param {{url?:string, timeout?:number, onSuccess?:Function, onFallback?:Function}} options
   *        `url` overrides the element's href — useful for locked CTAs.
   * @returns {number} how many elements were intercepted
   */
  function bind(target, options) {
    var opts = options || {};
    if (!isInAppBrowser()) return 0;   // real anchors already work

    var nodes;
    if (typeof target === 'string') nodes = document.querySelectorAll(target);
    else if (!target) nodes = [];
    else if (target.nodeType === 1) nodes = [target];
    else nodes = target;

    var count = 0;
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.__inAppBound) return;
      el.__inAppBound = true;
      count++;
      el.addEventListener('click', function (event) {
        var url = opts.url || el.getAttribute('href');
        if (!url) return;                 // nothing to open — let it be
        event.preventDefault();
        escape(url, opts);
      });
    });
    return count;
  }

  return {
    isIOS: isIOS,
    isAndroid: isAndroid,
    isInstagram: isInstagram,
    isFacebook: isFacebook,
    isInAppBrowser: isInAppBrowser,
    appName: appName,
    buildEscapeUrl: buildEscapeUrl,
    escape: escape,
    showFallback: showFallback,
    bind: bind,
    ESCAPE_EVENT: ESCAPE_EVENT
  };
});
