import { Reveal } from './Reveal';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS, asset } from '../config';

function ProTag() {
  return (
    <span className="rounded-full border border-hairline-strong px-2 py-0.5 font-display text-[10px] font-light tracking-[0.12em] text-brand">
      PRO
    </span>
  );
}

/**
 * Bento with rhythm: one tall cell carrying the device, three supporting
 * cells. Exactly four cells for four ideas.
 */
export function PlanBento() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-11 lg:px-8 lg:py-14">
      <Reveal>
        <h2 className="max-w-[20ch] font-display text-[clamp(26px,3.6vw,40px)] font-extralight leading-[1.08] tracking-[-0.02em] text-ink">
          Then it shows you whether it worked.
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-3 lg:grid-cols-3 lg:grid-rows-2">
        <Reveal className="lg:row-span-2">
          <div
            className="relative flex h-full items-center justify-center overflow-hidden rounded-card border border-hairline p-5 lg:p-6"
            style={{ background: 'linear-gradient(160deg, #17181B 0%, #0E0F11 55%, #000 100%)' }}
          >
            <PhoneMockup
              src={SCREENS.coach}
              alt="AI Coach answering from the week's logged bench sessions."
              width="min(42vw, 180px)"
              rotate={-3}
              float="slow"
            />
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between gap-5 rounded-card border border-hairline bg-card p-5 lg:p-7">
            <img src={asset('img/icons/muscle-map.png')} alt="" width={96} height={96} className="h-8 w-8" loading="lazy" />
            <div>
              <h3 className="font-display text-[20px] font-light text-ink">Muscle maps that match what you lifted</h3>
              <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-ink-dim">
                A rotatable 3D body plus front and back maps, lighting up in proportion to the
                volume each muscle has actually taken. Alongside weekly volume charts, most and
                least trained rankings, streaks, and personal records with estimated one-rep maxes.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="flex h-full flex-col justify-between gap-5 rounded-card border border-hairline p-5 lg:p-6"
            style={{ background: 'linear-gradient(150deg, rgba(39,224,138,.10), rgba(15,181,166,.04) 60%, transparent)' }}
          >
            <div className="flex items-center justify-between gap-3">
              <img src={asset('img/icons/coach.png')} alt="" width={96} height={96} className="h-8 w-8" loading="lazy" />
              <ProTag />
            </div>
            <div>
              <h3 className="font-display text-[19px] font-light text-ink">AI Coach</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-dim">
                Ask it your bench max or to review your week. It answers from your real logged
                lifts, not generic advice.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex h-full flex-col justify-between gap-5 rounded-card border border-hairline bg-inset p-5 lg:p-6">
            <div className="flex items-center justify-between gap-3">
              <img src={asset('img/icons/prediction.png')} alt="" width={96} height={96} className="h-8 w-8" loading="lazy" />
              <ProTag />
            </div>
            <div>
              <h3 className="font-display text-[19px] font-light text-ink">Progress Prediction</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-dim">
                Where your weight, body fat and lifts are heading over 30, 60 and 90 days. Flags
                plateaus, simulates a bulk or a cut, and estimates when you hit your goal.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
