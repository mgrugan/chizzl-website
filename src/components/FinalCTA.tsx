import { Reveal } from './Reveal';
import { AppStoreBadge } from './AppStoreBadge';
import { asset } from '../config';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-hairline py-11 lg:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-50%] left-1/2 aspect-square w-[min(760px,150vw)] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(39,224,138,.15) 0%, rgba(39,224,138,0) 66%)' }}
      />
      <Reveal className="relative mx-auto flex max-w-[1400px] flex-col items-center px-5 text-center lg:px-8">
        <img src={asset('img/logo-mark.png')} alt="" width={495} height={720} loading="lazy" className="h-14 w-auto" />
        <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(26px,3.8vw,42px)] font-semibold leading-[1.08] tracking-[-0.02em] text-balance text-ink">
          Stop guessing. Start measuring.
        </h2>
        <div className="mt-7">
          <AppStoreBadge />
        </div>
        <p className="mt-4 text-[13px] text-ink-faint">Requires iPhone.</p>
      </Reveal>
    </section>
  );
}
