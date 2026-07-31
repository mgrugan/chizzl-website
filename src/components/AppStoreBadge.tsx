import { useCallback, useEffect, useRef, useState } from 'react';
import { APP_STORE_URL } from '../config';
import {
  appName,
  copyLink,
  escapeToBrowser,
  isIOS,
  isInAppBrowser,
} from '../lib/inAppBrowser';

/**
 * Apple's badge. The glyph is inline because Apple requires their mark and
 * their layout: this is the one exception to using an icon library, and the
 * badge must keep Apple's black treatment rather than the brand's chrome.
 * https://developer.apple.com/app-store/marketing/guidelines/
 */
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22.773 22.773" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.1 15.769 0zM20.67 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 1.673 1.462 2.872 3.146 3.58z" />
    </svg>
  );
}

type Size = 'default' | 'compact';

export function AppStoreBadge({ size = 'default', className = '' }: { size?: Size; className?: string }) {
  const [showFallback, setShowFallback] = useState(false);
  const live = APP_STORE_URL.trim().length > 0;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Outside a Meta webview this stays a plain anchor and navigates natively.
      if (!live || !isInAppBrowser()) return;
      event.preventDefault();
      escapeToBrowser(APP_STORE_URL, { onFallback: () => setShowFallback(true) });
    },
    [live],
  );

  const pad = size === 'compact' ? 'h-11 pl-3 pr-4 gap-2' : 'h-14 pl-4 pr-5 gap-2.5';
  const glyph = size === 'compact' ? 'w-[18px] h-[18px]' : 'w-[26px] h-[26px]';
  const sub = size === 'compact' ? 'text-[8.5px]' : 'text-[11px]';
  const main = size === 'compact' ? 'text-[15px]' : 'text-[21px]';

  return (
    <>
      <a
        href={live ? APP_STORE_URL : undefined}
        onClick={handleClick}
        role={live ? undefined : 'link'}
        aria-disabled={live ? undefined : true}
        tabIndex={live ? undefined : -1}
        rel={live ? 'noopener' : undefined}
        aria-label={live ? 'Download CHIZZL AI on the App Store' : 'CHIZZL AI is not on the App Store yet'}
        className={[
          'inline-flex items-center rounded-[11px] bg-black text-white',
          'border border-white/70 transition-transform duration-200',
          live
            ? 'hover:-translate-y-0.5 hover:border-white active:translate-y-0'
            : 'pointer-events-none border-white/45 opacity-90',
          pad,
          className,
        ].join(' ')}
      >
        <AppleGlyph className={`${glyph} -mt-0.5 flex-none`} />
        <span className="flex flex-col items-start leading-none text-left">
          <span className={`${sub} mb-[3px] font-normal`}>Download on the</span>
          <span className={`${main} font-semibold tracking-[-0.01em]`}>App Store</span>
        </span>
      </a>

      {showFallback && <EscapeSheet onClose={() => setShowFallback(false)} />}
    </>
  );
}

/**
 * Shown when the automatic escape was swallowed by the host app.
 * Offers a retry, the manual route, and a copy-link fallback.
 */
function EscapeSheet({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const retryRef = useRef<HTMLButtonElement>(null);
  const app = appName();
  const label = app === 'instagram' ? 'Instagram' : app === 'facebook' ? 'Facebook' : 'This app';
  const menu = isIOS() ? '•••' : '⋮';
  const browser = isIOS() ? 'Safari' : 'Chrome';

  useEffect(() => {
    retryRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="escape-title"
        className="w-full max-w-[420px] rounded-card border border-hairline bg-card p-6"
      >
        <h2 id="escape-title" className="font-display text-[19px] font-bold text-ink">
          Open in your browser
        </h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-dim">
          {label} blocks App Store links inside its own browser. Open this page in {browser} to continue.
        </p>

        <button
          ref={retryRef}
          type="button"
          onClick={() => { onClose(); escapeToBrowser(APP_STORE_URL); }}
          className="mt-5 h-12 w-full rounded-control bg-brand font-display text-[15px] font-semibold text-on-brand transition active:scale-[0.98]"
        >
          Open in my native browser
        </button>

        <button
          type="button"
          onClick={() => copyLink(APP_STORE_URL).then(() => setCopied(true), () => setCopied(false))}
          className="mt-2.5 h-12 w-full rounded-control border border-hairline-strong font-display text-[15px] font-semibold text-ink transition active:scale-[0.98]"
        >
          {copied ? 'Link copied' : 'Copy link'}
        </button>

        <p className="mt-4 rounded-[10px] border border-hairline bg-inset px-3.5 py-3 text-[13.5px] leading-relaxed text-ink-dim">
          Or do it manually: tap <b className="text-ink">{menu}</b> in the corner, then{' '}
          <b className="text-ink">Open in browser</b>.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-[13px] text-ink-faint transition hover:text-ink-dim"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
