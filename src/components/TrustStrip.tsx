import { CameraIcon, LockKeyIcon, DeviceMobileIcon } from '@phosphor-icons/react';
import { Reveal } from './Reveal';

/**
 * Sits under the hero, never inside it. These are facts about the product as
 * it ships, not social proof. Real testimonials and customer logos belong
 * here once the app is live and there are actual users to quote.
 */
const FACTS = [
  { Icon: DeviceMobileIcon, label: 'iPhone first', detail: 'Built for iOS' },
  { Icon: CameraIcon, label: 'One scan a month', detail: 'On the free plan' },
  { Icon: LockKeyIcon, label: 'Your photos, your call', detail: 'Scans stay in your account' },
];

export function TrustStrip() {
  return (
    <section className="border-y border-hairline bg-elevated/60">
      <Reveal className="mx-auto grid max-w-[1400px] gap-6 px-5 py-5 sm:grid-cols-3 lg:px-8">
        {FACTS.map(({ Icon, label, detail }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={20} weight="light" className="flex-none text-brand" />
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
