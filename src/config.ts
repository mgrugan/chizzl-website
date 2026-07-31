/**
 * Paste the App Store URL here when the app goes live. Every badge on the
 * page activates, including the Instagram/Facebook webview escape.
 * Leave empty to keep the pre-launch state.
 */
export const APP_STORE_URL = '';

export const asset = (p: string) => `/chizzl-website/assets/${p}`;

export const SCREENS = {
  scan: asset('img/screens/scan.jpg'),
  home: asset('img/screens/home.jpg'),
  coach: asset('img/screens/coach.jpg'),
  muscles: asset('img/screens/muscles.jpg'),
  analytics: asset('img/screens/analytics.jpg'),
} as const;
