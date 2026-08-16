/**
 * Escape in-app webviews.
 *
 * Instagram, Threads, Facebook, Messenger, TikTok and Reddit render links in
 * an embedded webview that refuses App Store links: a tap does nothing, with
 * no error. The fix hands the URL back to the host app using a scheme it
 * recognises, which makes it launch the system browser — or, for the apps that
 * publish no such scheme, asks the OS to open the App Store app directly.
 *
 * Everything fires synchronously inside the click handler. iOS discards
 * navigation requested after the user-gesture window closes.
 */

const UA = typeof navigator !== 'undefined' ? navigator.userAgent : '';

export const isIOS = (): boolean =>
  /iPad|iPhone|iPod/i.test(UA) ||
  (/Macintosh/i.test(UA) && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1);

export const isAndroid = (): boolean => /Android/i.test(UA);

/** Instagram and Threads share a webview and the same escape hatch. */
export const isInstagram = (): boolean => /Instagram|Threads|Barcelona/i.test(UA);

export const isFacebook = (): boolean => /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Messenger/i.test(UA);

/**
 * TikTok's webview. Its UA is inconsistent across builds and regions, so this
 * matches the whole family: the ByteDance webview marker, the app's original
 * name, and the two internal codenames that still ship in some locales.
 */
export const isTikTok = (): boolean =>
  /BytedanceWebview|musical_ly|TikTok|Trill|aweme/i.test(UA);

/** Reddit's webview, which tags itself the same way on iOS and Android. */
export const isReddit = (): boolean => /Reddit/i.test(UA);

export const isInAppBrowser = (): boolean =>
  isInstagram() || isFacebook() || isTikTok() || isReddit();

export type InAppName = 'instagram' | 'facebook' | 'tiktok' | 'reddit' | null;

/** Instagram wins over Facebook: its UA can carry both signatures. */
export const appName = (): InAppName =>
  isInstagram() ? 'instagram'
    : isFacebook() ? 'facebook'
      : isTikTok() ? 'tiktok'
        : isReddit() ? 'reddit'
          : null;

/** The URL that hands `url` to the system browser. Unchanged outside a webview. */
export function buildEscapeUrl(url: string): string {
  // Guard first, or the Android branch below rewrites the URL for every
  // Android browser rather than only the webviews. Callers here always gate on
  // isInAppBrowser() so nothing was reaching it, but the function is exported
  // and its contract is the sentence directly above.
  if (!isInAppBrowser()) return url;

  if (isAndroid()) {
    return `intent://${url.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')}#Intent;scheme=https;end`;
  }
  if (isTikTok() || isReddit()) {
    // Neither exposes an "open in the system browser" scheme the way Instagram
    // does, so rather than escaping to Safari this asks iOS to open the App
    // Store app directly. itms-apps:// is the store's own scheme, so it is
    // handled by the OS rather than by the webview that is doing the blocking.
    return url.replace(/^https?:/i, 'itms-apps:');
  }
  if (isInstagram()) {
    // Instagram intercepts this and opens Safari. The x-safari- prefix that
    // works for Facebook is silently swallowed by Instagram's webview when
    // assigned to location.href, which is why the two differ.
    return `instagram://extbrowser/?url=${encodeURIComponent(url)}`;
  }
  if (isFacebook()) {
    return `x-safari-${url}`;
  }
  return url;
}

export interface EscapeOptions {
  timeout?: number;
  onSuccess?: (url: string) => void;
  onFallback?: (url: string) => void;
}

/**
 * Break out to the system browser. Call synchronously from a click handler.
 *
 * If the host app takes over, the page is backgrounded and one of
 * visibilitychange / pagehide / blur fires, which counts as success. If none
 * fires within `timeout`, the escape was swallowed and onFallback runs.
 */
export function escapeToBrowser(url: string, options: EscapeOptions = {}): void {
  const { timeout = 1500, onSuccess, onFallback } = options;
  const target = buildEscapeUrl(url);
  let settled = false;

  const cleanup = () => {
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', onLeave);
    window.removeEventListener('blur', onLeave);
  };

  const settle = (succeeded: boolean) => {
    if (settled) return;
    settled = true;
    cleanup();
    clearTimeout(timer);
    if (succeeded) onSuccess?.(url);
    else onFallback?.(url);
  };

  function onVisibility() { if (document.visibilityState === 'hidden') settle(true); }
  function onLeave() { settle(true); }

  // Listeners must be live before the navigation is fired.
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onLeave);
  window.addEventListener('blur', onLeave);
  const timer = setTimeout(() => settle(false), timeout);

  if (isFacebook() && !isAndroid()) {
    window.open(target, '_blank');
  } else {
    window.location.href = target;
  }
}

export async function copyLink(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  // Older in-app webviews have no async clipboard.
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  if (!ok) throw new Error('copy rejected');
}
