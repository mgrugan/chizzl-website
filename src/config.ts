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

export const asset = (p: string) => `/chizzl-website/assets/${p}`;

export const SCREENS = {
  scan: asset('img/screens/scan.jpg'),
  home: asset('img/screens/home.jpg'),
  coach: asset('img/screens/coach.jpg'),
  muscles: asset('img/screens/muscles.jpg'),
  analytics: asset('img/screens/analytics.jpg'),
} as const;
