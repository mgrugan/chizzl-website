import { Reveal } from './Reveal';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS } from '../config';

/**
 * Steps left, device right, both boxed. The device sits in the same
 * rounded gradient cell the bento uses, so the two sections read as one
 * system.
 */
export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1400px] px-5 py-11 lg:px-8 lg:py-14">
      <Reveal>
        <h2 className="max-w-[16ch] font-display text-[clamp(26px,3.6vw,40px)] font-extralight leading-[1.08] tracking-[-0.02em] text-ink">
          Three photos in. A real number out.
        </h2>
      </Reveal>

      <div className="mt-7 grid gap-3 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline">
          {[
            { t: 'Take the scan', d: 'Front, side and back. The app walks you through framing so the comparison holds up month to month.' },
            { t: 'Read the estimate', d: 'A physique score out of 100 and a body fat range, with the reasoning written out in plain language.' },
            { t: 'Train the plan', d: 'Sessions adjust to the volume you actually logged, not the volume you meant to hit.' },
          ].map((step, i) => (
            <Reveal key={step.t} delay={i * 0.08}>
              <div className="h-full bg-card p-5 lg:p-7">
                <h3 className="font-display text-[19px] font-light text-ink">{step.t}</h3>
                <p className="mt-1.5 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-dim">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="hidden lg:block">
          <div
            className="flex h-full items-center justify-center overflow-hidden rounded-card border border-hairline p-6"
            style={{ background: 'linear-gradient(160deg, #17181B 0%, #0E0F11 55%, #000 100%)' }}
          >
            <PhoneMockup
              src={SCREENS.home}
              alt="Dashboard showing a physique score of 76, a body fat estimate, and the day's workout."
              width={188}
              rotate={4}
              float="slow"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
