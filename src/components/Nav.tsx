import { AppStoreBadge } from './AppStoreBadge';
import { asset } from '../config';

export function Nav() {
  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="CHIZZL AI home">
          <img src={asset('img/logo-mark.png')} alt="" width={495} height={720} className="h-7 w-auto" />
          <span className="font-display text-[17px] font-bold tracking-[4px] text-ink">
            CHIZZL <span className="text-brand">AI</span>
          </span>
        </a>

        <div className="ml-auto flex items-center gap-6">
          <a href="#how" className="hidden font-display text-sm text-ink-dim transition hover:text-ink sm:block">
            How it works
          </a>
          <a href="#faq" className="hidden font-display text-sm text-ink-dim transition hover:text-ink sm:block">
            FAQ
          </a>
          <AppStoreBadge size="compact" className="hidden md:inline-flex" />
        </div>
      </nav>
    </header>
  );
}
