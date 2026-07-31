import { asset } from '../config';

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-5 py-10 text-center lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="CHIZZL AI home">
          <img src={asset('img/logo-mark.png')} alt="" width={495} height={720} loading="lazy" className="h-7 w-auto" />
          <span className="font-display text-[15px] font-bold tracking-[4px] text-ink">
            CHIZZL <span className="text-brand">AI</span>
          </span>
        </a>
        <p className="text-[12.5px] text-ink-faint">
          © {new Date().getFullYear()} CHIZZL AI. Apple and the Apple logo are trademarks of Apple Inc.
        </p>
      </div>
    </footer>
  );
}
