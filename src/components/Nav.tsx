import { asset } from '../config';

/**
 * Stripped to the mark and two links. The hero already carries the icon,
 * the name and the download button, so repeating them here was noise.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center px-5 lg:px-8">
        <a href="#top" aria-label="CHIZZL AI home" className="flex items-center">
          <img
            src={asset('img/logo-mark.png')}
            alt=""
            width={495}
            height={720}
            className="h-7 w-auto"
          />
        </a>

        <div className="ml-auto flex items-center gap-7">
          <a href="#how" className="font-display text-sm font-light text-ink-dim transition hover:text-ink">
            How it works
          </a>
          <a href="#faq" className="font-display text-sm font-light text-ink-dim transition hover:text-ink">
            FAQ
          </a>
        </div>
      </nav>
    </header>
  );
}
