import { useState } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import { Reveal } from './Reveal';

/**
 * Accordion, not a bulleted list. Answers questions a launch page actually
 * gets asked. This slot is where real testimonials go once the app has users
 * to quote; inventing them before launch would be fabricated social proof.
 */
const ITEMS = [
  {
    q: 'How accurate is the body fat estimate?',
    a: 'It is a photo-based estimate and the app labels it that way in the scan itself. Treat it as a trend line you can compare month to month, not a clinical measurement. For a clinical number you want a DEXA scan.',
  },
  {
    q: 'What do I need for a scan?',
    a: 'Three photos: front, side and back, in reasonable light. The app frames each one for you so the next scan lines up with the last.',
  },
  {
    q: 'What does the free plan include?',
    a: 'One scan a month. Pro unlocks weekly scans, which is the cadence that makes the trend line useful during a cut or a bulk.',
  },
  {
    q: 'Is there an Android version?',
    a: 'Not yet. iPhone comes first and Android is being evaluated after launch.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-hairline">
      <div className="mx-auto max-w-[900px] px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <h2 className="font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
            Questions worth answering.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {ITEMS.map((item, i) => {
            const expanded = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[17px] font-semibold text-ink lg:text-[19px]">
                      {item.q}
                    </span>
                    <PlusIcon
                      size={20}
                      weight="light"
                      className={`flex-none text-brand transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!expanded}
                >
                  <p className="max-w-[68ch] pb-7 text-[15.5px] leading-relaxed text-ink-dim">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
