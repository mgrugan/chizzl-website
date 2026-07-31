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
        <h2 className="font-display text-[clamp(24px,3.2vw,36px)] font-extralight leading-[1.08] tracking-[-0.02em] text-ink">
          Scan. Plan. Log.
        </h2>
      </Reveal>

      <div className="mt-7 grid gap-3 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline">
          {[
            { t: 'Scan', d: 'A front photo, a side, and a back if you want one. Back comes a rating out of 100, an estimated body-fat range, your strong and weak points, posture notes and a goal to aim at.' },
            { t: 'Get a plan', d: 'A weekly split built from that scan plus your age, weight, experience, the days and time you actually have, any injuries, and the equipment within reach. Or skip it and save your own workouts.' },
            { t: 'Log the work', d: '325+ exercises, with separate left and right weights on single-arm and single-leg movements. Sets survive switching tabs or closing the app mid-session.' },
          ].map((step, i) => (
            <Reveal key={step.t} delay={i * 0.08}>
              <div className="h-full bg-card p-5 lg:p-7">
                <h3 className="font-display text-[19px] font-light text-ink">{step.t}</h3>
                <p className="mt-1.5 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-dim">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="order-first lg:order-none">
          <div
            className="flex h-full items-center justify-center overflow-hidden rounded-card border border-hairline p-5 lg:p-6"
            style={{ background: 'linear-gradient(160deg, #17181B 0%, #0E0F11 55%, #000 100%)' }}
          >
            <PhoneMockup
              src={SCREENS.home}
              alt="Dashboard showing a physique score of 76, a body fat estimate, and the day's workout."
              width="min(42vw, 188px)"
              rotate={4}
              float="slow"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
