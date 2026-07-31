import { motion, useReducedMotion } from 'motion/react';
import { AppStoreBadge } from './AppStoreBadge';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS } from '../config';

/**
 * Asymmetric split hero: message left, device cluster right.
 * Three phones staggered and rotated in 2D, layered by depth.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-20 lg:pt-24 lg:pb-28">
      {/* Brand bloom. Sits behind everything, never intercepts pointers. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 left-1/2 aspect-square w-[min(900px,160vw)] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(39,224,138,.16) 0%, rgba(39,224,138,0) 68%)' }}
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-5 lg:grid-cols-[1.02fr_1fr] lg:gap-8 lg:px-8">
        {/* Message */}
        <div className="max-w-xl">
          <motion.p {...enter(0)} className="eyebrow">
            Physique tracking
          </motion.p>

          <motion.h1
            {...enter(0.08)}
            className="mt-4 font-display text-[clamp(38px,8.5vw,68px)] font-bold leading-[1.03] tracking-[-0.03em] text-balance text-ink"
          >
            Know exactly where you <span className="brand-gradient-text">stand</span>.
          </motion.h1>

          <motion.p
            {...enter(0.16)}
            className="mt-5 max-w-[46ch] text-[clamp(16px,2vw,19px)] leading-relaxed text-ink-dim"
          >
            Scan your physique, get an honest body fat estimate, and train against a plan
            that adapts to what you actually lifted.
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <AppStoreBadge />
            <a
              href="#how"
              className="inline-flex h-14 items-center rounded-control border border-hairline-strong px-6 font-display text-[15px] font-semibold text-ink transition hover:border-brand hover:text-brand active:scale-[0.98]"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* Device cluster */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex min-h-[460px] items-center justify-center lg:min-h-[640px]"
        >
          {/* Back left, deepest */}
          <div className="absolute left-[2%] top-[8%] hidden opacity-70 sm:block lg:left-[-2%]">
            <PhoneMockup
              src={SCREENS.muscles}
              alt="Muscle map highlighting the groups trained this week."
              width={172}
              rotate={-9}
              float="slower"
            />
          </div>

          {/* Back right */}
          <div className="absolute right-[2%] top-[2%] hidden opacity-80 sm:block lg:right-[-1%]">
            <PhoneMockup
              src={SCREENS.coach}
              alt="Coach reviewing the week and setting the next targets."
              width={188}
              rotate={8}
              float="slow"
            />
          </div>

          {/* Front centre, the hero device */}
          <div className="relative z-10">
            <PhoneMockup
              src={SCREENS.scan}
              alt="Body Scan turning three progress photos into a physique score of 83 out of 100 with a body fat estimate."
              width={278}
              rotate={-3}
              live
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
