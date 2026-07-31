import { Reveal } from './Reveal';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS } from '../config';
import { TrendUpIcon, BarbellIcon, FlameIcon } from '@phosphor-icons/react';

/**
 * Bento with rhythm: one tall cell carrying the device, three supporting
 * cells with real visual variation. Exactly four cells for four ideas.
 */
export function PlanBento() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <h2 className="max-w-[20ch] font-display text-[clamp(30px,5vw,52px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
          A plan that answers to your logbook.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
        {/* Device cell, spans both rows */}
        <Reveal className="lg:row-span-2">
          <div
            className="relative flex h-full items-center justify-center overflow-hidden rounded-card border border-hairline p-8"
            style={{ background: 'linear-gradient(160deg, #17181B 0%, #0E0F11 55%, #000 100%)' }}
          >
            <PhoneMockup
              src={SCREENS.coach}
              alt="Coach citing the week's bench sessions and setting the next load."
              width={230}
              rotate={-3}
              float="slow"
            />
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between gap-6 rounded-card border border-hairline bg-card p-7 lg:p-9">
            <TrendUpIcon size={26} weight="light" className="text-brand" />
            <div>
              <h3 className="font-display text-[22px] font-semibold text-ink">It reads the sessions you logged</h3>
              <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-ink-dim">
                Targets move with your actual volume. Miss a week and the plan meets you
                where you are instead of pretending the week happened.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="flex h-full flex-col justify-between gap-6 rounded-card border border-hairline p-7"
            style={{ background: 'linear-gradient(150deg, rgba(39,224,138,.10), rgba(15,181,166,.04) 60%, transparent)' }}
          >
            <BarbellIcon size={26} weight="light" className="text-lime" />
            <div>
              <h3 className="font-display text-[19px] font-semibold text-ink">Balance you can see</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-dim">
                Brighter means more volume. Neglected groups stop hiding.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex h-full flex-col justify-between gap-6 rounded-card border border-hairline bg-inset p-7">
            <FlameIcon size={26} weight="light" className="text-brand" />
            <div>
              <h3 className="font-display text-[19px] font-semibold text-ink">Nutrition alongside</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-dim">
                Calories tracked next to the lift, so the surplus is a decision and not an accident.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
