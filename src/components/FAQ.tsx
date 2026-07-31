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
    q: 'Free vs Pro?',
    a: "Free covers the whole loop: a monthly physique scan, the generated plan or your own saved workouts, all 325+ exercises, volume charts, muscle maps, history, streaks, records, achievements, and meal plans with macros and a grocery list. Pro adds the AI Coach, Progress Prediction, cardio tracking with a stopwatch and interval timer, and moves scans from monthly to weekly.",
  },
  {
    q: 'How accurate is it?',
    a: 'It is a photo-based estimate and the app says so on the scan itself. Treat it as a trend line you compare month to month, not a clinical measurement. For a clinical number you want a DEXA scan.',
  },
  {
    q: 'Must I use the plan?',
    a: 'No. The generated split is built from your scan plus your age, weight, goal, experience, the days and time you can train, injuries and available equipment. You can ignore all of it and create, name and save your own workouts to reuse instead.',
  },
  {
    q: 'What can it track?',
    a: '325+ exercises across barbell, dumbbell, cable, machine, Smith, specialty bar and conditioning work, with separate left and right weights on single-arm and single-leg movements. Search finds an exercise by name, muscle or category, and a set in progress survives switching tabs or closing the app mid-workout.',
  },
  {
    q: 'What does Coach know?',
    a: 'Your training history. Ask it your bench max and it reads your logged sets rather than guessing. Ask it to review your week and it works from the sessions you actually did.',
  },
  {
    q: 'Is there Android?',
    a: 'Not yet. iPhone comes first and Android is being evaluated after launch.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-hairline">
      <div className="mx-auto max-w-[900px] px-5 py-11 lg:px-8 lg:py-14">
        <Reveal>
          <h2 className="font-display text-[clamp(24px,3.2vw,36px)] font-extralight leading-[1.08] tracking-[-0.02em] text-ink">
            Common questions.
          </h2>
        </Reveal>

        <div className="mt-8 divide-y divide-hairline border-y border-hairline">
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
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-[19px] font-light text-ink">
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
                  <p className="max-w-[68ch] pb-6 text-[15px] leading-relaxed text-ink-dim">
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
