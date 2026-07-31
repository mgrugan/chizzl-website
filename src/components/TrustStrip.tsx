import { Reveal } from './Reveal';
import { asset } from '../config';

/**
 * Facts about the product as it ships, sitting under the hero. Not social
 * proof: real testimonials belong here once the app has users to quote.
 */
const FACTS = [
  { icon: 'barbell', label: '325+ exercises', detail: 'Barbell to conditioning' },
  { icon: 'scan', label: 'Monthly scans', detail: 'Weekly on Pro' },
  { icon: 'meal', label: 'Meal plans', detail: 'Macros and a grocery list' },
];

export function TrustStrip() {
  return (
    <section className="border-y border-hairline bg-elevated/60">
      <Reveal className="mx-auto grid max-w-[1400px] gap-4 px-5 py-5 sm:grid-cols-3 lg:px-8">
        {FACTS.map(({ icon, label, detail }) => (
          <div key={label} className="flex items-center gap-3">
            <img
              src={asset(`img/icons/${icon}.png`)}
              alt=""
              width={96}
              height={96}
              className="h-5 w-5 flex-none opacity-90"
              loading="lazy"
            />
            <p className="text-[14.5px] text-ink">
              {label}
              <span className="ml-2 text-ink-faint">{detail}</span>
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
