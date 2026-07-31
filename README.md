# CHIZZL — Landing Page

Static, mobile-first landing page for the CHIZZL iOS app. No build step, no
dependencies, no third-party requests — open `index.html` and it runs.

## Going live on the App Store

The App Store badges ship **intentionally inert**. To activate all three at once,
set one constant in `assets/js/main.js`:

```js
const APP_STORE_URL = 'https://apps.apple.com/app/id0000000000';
```

That single change:

- points every `[data-appstore]` badge at the URL
- removes the `is-locked` state (restores hover, focus and pointer events)
- clears the `aria-disabled` / `tabindex="-1"` accessibility lock
- strips the "Coming soon" pills from the surrounding notes

No markup edits required. Leaving it as `''` keeps the pre-launch state.

## Structure

```
index.html                  single page
assets/
  css/styles.css            design system + layout
  css/fonts.css             @font-face declarations
  fonts/*.woff2             self-hosted Space Grotesk + Manrope
  js/main.js                App Store link switch, footer year
  img/logo-mark.png         Spartan emblem (background keyed out)
  img/logo-full.png         emblem + wordmark
  img/screens/*.jpg         in-app screenshots, uniform 900×1955
```

## Notes

**iPhone mockups** are built in CSS (`.device` in `styles.css`), not baked into
images. The frame, Dynamic Island, side buttons and screen glare are all
elements; the screenshot sits underneath. To swap a screenshot, drop in a new
file at the same aspect ratio — the frame adapts. Scale any mockup by changing
its `--pw` (phone width); every other dimension is derived from it.

Screenshots are normalised to 1320×2868 (iPhone 16 Pro Max native) before
downscaling, so the Dynamic Island lands in the gap between the status-bar clock
and the battery icons, exactly as it does on a real device.

**Design tokens** in `:root` come from the project's "Obsidian Kinetic" design
system: dark-first surfaces, hairline borders instead of shadows, a 5% film-grain
overlay, Space Grotesk for display and Manrope for body.

**Responsive behaviour** — the screenshot showcase is a snap-scrolling rail on
phones and a wider rail on desktop. Layout is verified free of horizontal
overflow from 320px up. Honours `prefers-reduced-motion` and `prefers-contrast`.

## Credits

Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and
[Manrope](https://fonts.google.com/specimen/Manrope), both SIL Open Font
License 1.1.

Apple and the Apple logo are trademarks of Apple Inc. The App Store badge must
follow Apple's
[marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
once the link is live.
