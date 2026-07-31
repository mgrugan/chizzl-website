import { Reveal } from './Reveal';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS } from '../config';

/**
 * Asymmetric flow rather than three equal cards: the first step carries the
 * device, the rest step down in weight, so the eye reads an order.
 */
export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1400px] px-5 py-11 lg:px-8 lg:py-14">
      <Reveal>
        <h2 className="max-w-[16ch] font-display text-[clamp(26px,3.6vw,40px)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
          Three photos in. A real number out.
        </h2>
      </Reveal>

      <div className="mt-7 grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
        <Reveal className="hidden lg:flex lg:justify-start">
          <PhoneMockup
            src={SCREENS.home}
            alt="Dashboard showing a physique score of 76, a body fat estimate, and the day's workout."
            width={196}
            rotate={-4}
            float="slow"
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline">
          {[
            { t: 'Take the scan', d: 'Front, side and back. The app walks you through framing so the comparison holds up month to month.' },
            { t: 'Read the estimate', d: 'A physique score out of 100 and a body fat range, with the reasoning written out in plain language.' },
            { t: 'Train the plan', d: 'Sessions adjust to the volume you actually logged, not the volume you meant to hit.' },
          ].map((step, i) => (
            <Reveal key={step.t} delay={i * 0.08}>
              <div className="bg-card p-5 lg:p-7">
                <h3 className="font-display text-[19px] font-semibold text-ink">{step.t}</h3>
                <p className="mt-1.5 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-dim">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
