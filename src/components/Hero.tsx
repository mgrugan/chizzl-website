import { motion, useReducedMotion } from 'motion/react';
import { AppStoreBadge } from './AppStoreBadge';
import { PhoneMockup } from './PhoneMockup';
import { SCREENS, asset } from '../config';

/**
 * Minimal centred hero: app icon and store badge side by side, one line,
 * then the fanned device cluster. The fan shows on every width; the side
 * phones size down with the viewport so the trio fits a phone screen.
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
      <h1 className="sr-only">CHIZZL AI</h1>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/4 left-1/2 aspect-square w-[min(880px,160vw)] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(39,224,138,.15) 0%, rgba(39,224,138,0) 68%)' }}
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center px-5 text-center lg:px-8">
        <motion.div {...enter(0)} className="flex items-center gap-4">
          <img
            src={asset('img/logo-tile.png')}
            alt="CHIZZL AI app icon"
            width={320}
            height={320}
            /* No CSS border-radius: the tile carries its own corners and
               border. Rounding again clips them off. */
            className="h-14 w-14 lg:h-16 lg:w-16"
            fetchPriority="high"
            decoding="async"
          />
          <AppStoreBadge />
        </motion.div>

        <motion.p
          {...enter(0.1)}
          className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-ink-dim lg:text-[16px]"
        >
          Photos of your body become a training plan. Then it tracks whether the plan is working.
        </motion.p>

        {/* The fan */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-end justify-center lg:mt-10"
        >
          <div className="-mr-6 opacity-75 sm:-mr-9">
            <PhoneMockup
              src={SCREENS.analytics}
              alt="Volume tracked over the past week."
              width="min(29vw, 148px)"
              rotate={-11}
              float="slower"
            />
          </div>
          <div className="relative z-10">
            <PhoneMockup
              src={SCREENS.scan}
              alt="Body Scan turning three progress photos into a physique score of 83 out of 100 with a body fat estimate."
              width="min(50vw, 212px)"
              rotate={0}
              priority
            />
          </div>
          <div className="-ml-6 opacity-75 sm:-ml-9">
            <PhoneMockup
              src={SCREENS.muscles}
              alt="Muscle map highlighting the groups trained this week."
              width="min(29vw, 148px)"
              rotate={11}
              float="slow"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
