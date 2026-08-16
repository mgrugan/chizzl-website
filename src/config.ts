/**
 * The App Store URL. Every badge on the page reads this one constant,
 * including the Instagram/Facebook webview escape. Emptying it puts the
 * page back into the inert pre-launch state.
 *
 * No country code in the path on purpose: Apple then serves each visitor
 * their own storefront. Hard-coding /us/ shows everyone else a
 * "not available in your country" interstitial.
 */
export const APP_STORE_URL = 'https://apps.apple.com/app/chizzl-ai/id6790546338';

/** Numeric App Store ID, for Safari's Smart App Banner. */
export const APP_STORE_ID = '6790546338';

/**
 * Apple provider token, from App Store Connect › App Analytics › Acquisition ›
 * Campaigns (it is the `pt` in any link that page generates). Campaign codes
 * are still recorded without it, so this stays optional and is simply omitted
 * while empty.
 */
export const APPLE_PROVIDER_TOKEN = '';

/**
 * The store URL tagged with a campaign, so App Analytics can attribute the
 * install. `campaign` becomes the `ct` value you read in the Campaigns table.
 */
export function storeUrl(campaign?: string): string {
  if (!APP_STORE_URL) return '';
  if (!campaign) return APP_STORE_URL;
  const q = new URLSearchParams();
  if (APPLE_PROVIDER_TOKEN) q.set('pt', APPLE_PROVIDER_TOKEN);
  q.set('ct', campaign);
  q.set('mt', '8');
  return `${APP_STORE_URL}?${q}`;
}

/** Relative on purpose — see the base note in vite.config.ts. */
export const asset = (p: string) => `./assets/${p}`;

export const SCREENS = {
  scan: asset('img/screens/scan.jpg'),
  home: asset('img/screens/home.jpg'),
  coach: asset('img/screens/coach.jpg'),
  muscles: asset('img/screens/muscles.jpg'),
  analytics: asset('img/screens/analytics.jpg'),
} as const;
