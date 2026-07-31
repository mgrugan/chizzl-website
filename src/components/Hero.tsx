import { motion, useReducedMotion } from 'motion/react';
import { AppStoreBadge } from './AppStoreBadge';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS } from '../config';

/**
 * Minimal centred hero: name, one line, one CTA, and the fanned device
 * cluster as the visual. Sized to land inside the first viewport on both
 * desktop and mobile.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-9 pb-10 lg:pt-12 lg:pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/4 left-1/2 aspect-square w-[min(880px,160vw)] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(39,224,138,.15) 0%, rgba(39,224,138,0) 68%)' }}
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center px-5 text-center lg:px-8">
        <motion.h1
          {...enter(0)}
          className="font-display text-[clamp(30px,6vw,44px)] font-semibold leading-none tracking-[-0.02em] text-ink"
        >
          CHIZZL <span className="brand-gradient-text">AI</span>
        </motion.h1>

        <motion.p
          {...enter(0.08)}
          className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-ink-dim lg:text-[16px]"
        >
          Scan your physique, get an honest body fat estimate, and train a plan that adapts.
        </motion.p>

        <motion.div {...enter(0.16)} className="mt-6">
          <AppStoreBadge />
        </motion.div>

        {/* The fan */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex items-end justify-center lg:mt-11"
        >
          <div className="hidden -mr-9 opacity-75 sm:block">
            <PhoneMockup
              src={SCREENS.analytics}
              alt="Volume tracked over the past week."
              width={148}
              rotate={-11}
              float="slower"
            />
          </div>
          <div className="relative z-10">
            <PhoneMockup
              src={SCREENS.scan}
              alt="Body Scan turning three progress photos into a physique score of 83 out of 100 with a body fat estimate."
              width={212}
              rotate={0}
              live
              priority
            />
          </div>
          <div className="hidden -ml-9 opacity-75 sm:block">
            <PhoneMockup
              src={SCREENS.muscles}
              alt="Muscle map highlighting the groups trained this week."
              width={148}
              rotate={11}
              float="slow"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
