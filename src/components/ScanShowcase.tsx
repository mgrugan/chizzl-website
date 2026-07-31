import { Reveal } from './Reveal';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS } from '../config';

/**
 * Full-bleed centred composition. Breaks the split rhythm so the page does
 * not read as a stack of alternating image-and-text rows.
 */
export function ScanShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-elevated/40 py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-40%] left-1/2 aspect-square w-[min(820px,150vw)] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(15,181,166,.14) 0%, rgba(15,181,166,0) 68%)' }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 text-center lg:px-8">
        <Reveal>
          <p className="eyebrow">Honest calibration</p>
          <h2 className="mx-auto mt-4 max-w-[18ch] font-display text-[clamp(30px,5vw,52px)] font-bold leading-[1.05] tracking-[-0.02em] text-balance text-ink">
            It tells you what it sees, not what you want to hear.
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-[17px] leading-relaxed text-ink-dim">
            Strong points and weak points, both written out. No streak-padding, no
            congratulations for showing up.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 flex items-end justify-center gap-[-2rem]">
          <div className="hidden -mr-10 opacity-75 md:block">
            <PhoneMockup src={SCREENS.analytics} alt="Volume tracked over the past week." width={190} rotate={-11} float="slower" />
          </div>
          <div className="relative z-10">
            <PhoneMockup
              src={SCREENS.scan}
              alt="Physique 83 out of 100, body fat estimate 10 to 13 percent, with written strong points."
              width={286}
              rotate={0}
              live
            />
          </div>
          <div className="hidden -ml-10 opacity-75 md:block">
            <PhoneMockup src={SCREENS.muscles} alt="Most trained and least trained muscle groups." width={190} rotate={11} float="slow" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
