# CHIZZL AI — Landing Page

Static, phone-first landing page for the CHIZZL AI iOS app. No build step, no
dependencies, no third-party requests — open `index.html` and it runs.

Live at **https://mgrugan.github.io/chizzl-website/**

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

No markup edits required. Leaving it as `''` keeps the pre-launch state. Push to
the default branch and Pages redeploys automatically.

## Structure

```
index.html                  single page
.github/workflows/pages.yml GitHub Pages deploy
assets/
  css/styles.css            design system + layout + device mockup
  css/fonts.css             @font-face declarations
  fonts/*.woff2             self-hosted Space Grotesk + Manrope
  js/main.js                App Store link switch, footer year
  img/logo-mark.png         Spartan mark
  img/og-image.png          social card
  img/screens/*.jpg         in-app screenshots, uniform 900×1955
```

## The iPhone mockups

Built entirely in CSS (`.device` in `styles.css`) — nothing is baked into an
image. The frame is three nested layers: a polished titanium rail, a black
bezel, then the screen, with the Dynamic Island, side buttons and glass sheen as
separate elements.

Every dimension derives from a single `--pw` (phone width) custom property, so a
mockup rescales by changing one value and nothing drifts out of proportion.

Two details worth preserving if you edit it:

- The rail uses a **conic** gradient, not a linear one. Light has to travel
  around the frame or it reads flat. The specular bands deliberately stop short
  of white — a blown-out rail looks like a glowing outline instead of metal.
- The glass sheen is kept very faint on purpose. The screenshot has to stay
  readable; that is the entire point of the mockup.

Screenshots are normalised to 1320×2868 (iPhone 16 Pro Max native) before
downscaling, so the Dynamic Island lands in the gap between the status-bar clock
and the battery icons, exactly as it does on a real device. To swap one, drop in
a file at the same aspect ratio.

`analytics.jpg` and `muscles.jpg` are not currently referenced — they are kept
so screens can be swapped without re-exporting.

## Cache busting

GitHub Pages serves every file with `cache-control: max-age=600`, and that
header cannot be configured. Without versioned asset URLs a returning visitor
can load fresh HTML against a still-cached stylesheet and get a broken hybrid
page — new markup, old layout rules.

So `index.html` references its CSS and JS as `?v=dev`, and the Pages workflow
rewrites that to the commit SHA before uploading. The HTML and the assets it
depends on therefore always change together.

Keep the `?v=dev` suffix on any stylesheet or script added to `index.html`; the
workflow stamps whatever it finds. Locally `?v=dev` is just an ignored query
string, so nothing special is needed to develop.

## Notes

**Design tokens** in `:root` come from the project's "Obsidian Kinetic" design
system: dark-first surfaces, hairline borders instead of shadows, a 5%
film-grain overlay, Space Grotesk for display and Manrope for body.

**Steps** — the hero carries step 01 (Body Scan), so it is not repeated below;
the feature sections pick up at 02.

**Responsive** — the hero is two columns at every width: the phone on the left,
the mark, wordmark and App Store badge on its right. The phone scales down on
small screens to keep them side by side, and the badge has a compact variant that
fits a 137px column at 320px while holding a 44px tap target. Below the hero, one
full-size device per step, alternating left/right from 900px. Verified free of
horizontal overflow from 320px up. Honours `prefers-reduced-motion` and
`prefers-contrast`.

**Spacing** follows the design system's scale — `--unit` 4px, `--gutter` 12px,
`--stack-sm/md/lg` 8/24/48px, `--pad` 20px — on a strict 8pt grid.

## Credits

Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and
[Manrope](https://fonts.google.com/specimen/Manrope), both SIL Open Font
License 1.1.

Apple and the Apple logo are trademarks of Apple Inc. The App Store badge must
follow Apple's
[marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
once the link is live.
