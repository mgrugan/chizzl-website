# CHIZZL AI — Landing Page

Landing page for the CHIZZL AI iOS app. React + Vite + Tailwind v4 + Motion,
built against the design system in `DESIGN.md`.

Live at **https://mgrugan.github.io/chizzl-website/**

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # -> dist/
```

`vite.config.ts` sets `base: '/chizzl-website/'` because Project Pages serve from
a subpath. Files in `public/assets/` are referenced with that prefix.

## The App Store link

Every badge on the page reads one constant, in `src/config.ts`:

```ts
export const APP_STORE_URL = 'https://apps.apple.com/app/chizzl-ai/id6790546338';
```

It is live. Emptying the string puts every badge back into the inert
pre-launch state and switches off the in-app browser escape below.

The path carries **no country code**. Apple then resolves each visitor to their
own storefront; a hard-coded `/us/` shows everyone outside the US a "not
available in your country" interstitial instead of the listing.

`index.html` also carries `<meta name="apple-itunes-app" content="app-id=6790546338">`,
which is what makes Safari on iOS show its native Smart App Banner above the
page — a second route to the listing that costs nothing and does not depend on
the visitor reaching a badge.

## `/go/` — the instant redirect

**https://mgrugan.github.io/chizzl-website/go/**

For bio links, stories and DMs, where the landing page is a detour. It sends
the visitor to the App Store with no tap and nothing to read.

`public/go/index.html` is a standalone file that Vite copies through
untouched. It loads **no fonts, no stylesheet, no JS bundle and no images** —
one request, then the redirect. A Playwright check asserts that request count
so a future edit cannot quietly add a second one.

Three details it exists to get right:

- **The redirect fires on `DOMContentLoaded`, not from inside `<head>`.** A
  navigation fired mid-parse truncates the document, so the fallback card
  never gets built — and that card is precisely what is needed when the
  redirect is the thing that failed. The file is a few KB with nothing
  external in it, so the wait is a fraction of a millisecond.
- **`location.replace`, not `location.href`.** The store must not become a
  Back-button trap: Back skips past `/go/` to wherever the visitor came from.
- **Coming back is handled.** On iOS the App Store opens as an app while
  Safari stays parked on this page, and a bfcache restore never re-runs the
  script. Without `pageshow` and `visibilitychange` handling, the visitor
  returns to a spinner that never resolves. They get a tappable button
  instead.

Inside Instagram or Facebook it runs the same escape as the badges (below),
automatically. If iOS discards it for having no user gesture behind it — the
usual outcome on a cold load — the card appears and **the next tap anywhere on
the page** retries the escape with a real gesture attached.

The escape schemes are duplicated from `src/lib/inAppBrowser.ts` rather than
imported, because importing anything would cost the round trip the page exists
to avoid. Change one, change the other.

To make the whole site behave this way, point the root at it — but the landing
page then stops existing for anyone, including people arriving from search.

## Instagram and Facebook in-app browsers

Meta's apps render links in an embedded webview that refuses App Store links.
A tap does nothing at all, with no error. `src/lib/inAppBrowser.ts` handles it:

| Context | Behaviour |
| --- | --- |
| Any normal browser | The badge stays a plain `<a href>` and navigates natively. Nothing is intercepted. |
| Instagram / Threads, iOS | `location.href = 'instagram://extbrowser/?url=' + encodeURIComponent(url)` |
| Facebook / Messenger, iOS | `window.open('x-safari-' + url, '_blank')` |
| Android, any Meta app | `location.href = 'intent://<url-without-scheme>#Intent;scheme=https;end'` |

Two details that matter:

- Everything fires **synchronously inside the click handler**. iOS discards
  navigation requested after the user-gesture window closes, so no `await`, no
  `requestAnimationFrame`, no promise chain before the call.
- Instagram and Facebook need **different schemes**. The `x-safari-` prefix that
  works for Facebook is silently swallowed by Instagram's webview when assigned
  to `location.href`, which is why the two paths differ.

Success is inferred from `visibilitychange` / `pagehide` / `blur`, since the
page is backgrounded when the host app hands off. If none fires within 1.5s the
escape was swallowed, and a sheet offers a retry, the manual route
(tap the corner menu, then Open in browser), and a copy-link fallback.

## Design system

`DESIGN.md` is the source of truth, in Google's DESIGN.md format. It lints with
zero errors:

```sh
npx @google/design.md lint DESIGN.md
npx @google/design.md export DESIGN.md --format css-vars   # -> design/tokens.generated.css
```

The seven warnings it does emit are all orphaned `metal-*` stops. That is
expected: the format has no gradient token type and a component carries one
`backgroundColor`, so a nine-stop ramp cannot be referenced by one.

Tokens are mirrored into Tailwind's `@theme` block in `src/index.css`. Edit
`DESIGN.md` first, then bring the theme in line.

Only `tier-bronze` is fixed by the brand book. The other four tier metals are
provisional and should be confirmed before shipping anywhere user-facing.

## The iPhone mockups

`src/components/PhoneMockup.tsx` builds the frame entirely in CSS: a rotating
liquid-metal rail, a black bezel, then the screenshot, with the Dynamic Island,
side buttons and glass sheen as separate elements. Every dimension derives from
the `--pw` custom property, so a mockup rescales by changing one number.

- The rail wash is an oversized linear gradient rotating under a clipped rim on
  a 12s linear loop, carrying the brand's green dispersion band so the chrome
  reads as chrome-with-green rather than grey. Animated on hero devices only
  (`live`), static elsewhere, per the brand book.
- Rotation is **2D only**. The brand book rules out perspective and 3D
  transforms because iOS renders them incorrectly.
- The glass sheen is deliberately faint. The screenshot has to stay readable;
  that is the whole point of the mockup.

Screenshots are normalised to 1320x2868 (iPhone 16 Pro Max native), so the
Dynamic Island lands between the status-bar clock and the battery icons.

## Deploy

The Pages workflow sets the repository's Pages source to *GitHub Actions* on
every run, then builds and uploads `dist/`. That call is required rather than
cosmetic: the repo root is now Vite source instead of publishable output, so
GitHub's legacy branch builder would serve a broken page. It is idempotent.

Vite content-hashes every asset filename, which is what stops a returning
visitor loading fresh HTML against a cached stylesheet. Pages serves everything
with `cache-control: max-age=600` and that header cannot be configured.

## What is deliberately missing

The page has no testimonials and no customer logo wall. The app has not
launched, so anything in those slots would be fabricated social proof on a
public page. The FAQ occupies that position instead. Drop real quotes in once
there are users to quote.

`analytics.jpg` is currently unreferenced and kept so screens can be swapped
without re-exporting.

## Credits

Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and
[Manrope](https://fonts.google.com/specimen/Manrope), both SIL Open Font
License 1.1. Self-hosted, so the page makes no third-party requests.

Icons: the six line icons in `public/assets/img/icons/` were generated as a
single sheet through Higgs, then sliced, keyed to transparency and normalised
to one optical size. Generating them in one pass is what keeps the stroke
weight and construction consistent; six separate generations would not match.
[Phosphor](https://phosphoricons.com/) still supplies the FAQ chevron. The
Apple glyph in the App Store badge is inline because Apple requires their own
mark and layout.

Apple and the Apple logo are trademarks of Apple Inc. The badge must follow
Apple's [marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
once the link is live.
