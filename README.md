# CHIZZL AI — Landing Page

Landing page for the CHIZZL AI iOS app. React + Vite + Tailwind v4 + Motion,
built against the design system in `DESIGN.md`.

Live at **https://chizzl.co**

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # -> dist/
```

`vite.config.ts` sets `base: './'`, so every asset URL is relative and the same
build serves correctly from the Pages project subpath *and* from the apex of
chizzl.co. That is deliberate: an absolute base would need a cutover commit
timed against DNS, and would break one of the two URLs in the meantime. A
Playwright check loads the build at both mount points and asserts that every
asset, font and image resolves.

The exceptions are `og:url`, `og:image` and `rel=canonical` in `index.html`.
Those have to be absolute, because scrapers and search engines do not resolve
relative URLs against the page they fetched, so they name `https://chizzl.co`
directly.

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

## Pointing chizzl.co at the site

The build is already domain-agnostic, so this is DNS plus one setting — no
code change.

**1. DNS at your registrar.** Four A records on the apex, all host `@`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Add the AAAA records too if the registrar supports them, so the site answers
over IPv6:

```
2606:50c0:8000::153   2606:50c0:8001::153
2606:50c0:8002::153   2606:50c0:8003::153
```

Then one CNAME so the `www` spelling works: host `www`, value
`mgrugan.github.io`.

**2. Repo settings, by hand.** Settings › Pages › Custom domain → `chizzl.co`
→ Save. Then tick **Enforce HTTPS** once the certificate is issued a few
minutes later.

This one cannot be automated from inside the repo, and two plausible-looking
shortcuts both fail:

- **A `CNAME` file does not register the domain here.** That is the *legacy
  branch builder's* mechanism. Under the Actions builder the domain lives in
  repository settings and the artifact's CNAME file is inert. `public/CNAME`
  is kept anyway — harmless, and it records the intended domain next to the
  code — but it is not what switches anything on.
- **The Pages API rejects `GITHUB_TOKEN`.** `PUT /repos/{owner}/{repo}/pages`
  is where `cname` and `https_enforced` live, and it answers 403 *Resource not
  accessible by integration*. `pages: write` grants deployment creation, not
  settings edits; that needs repo admin. Automating it would mean a PAT in a
  secret, which is not worth it for a setting changed once.

The symptom of getting this wrong is specific and worth recognising: DNS
resolves to GitHub, `http://` even 308s to `https://`, and then every HTTPS
request dies because GitHub is presenting its `*.github.io` certificate for
your hostname. That is not propagation and it does not clear on its own — it
means the domain was never registered.

Order matters: set the DNS records and confirm they resolve before naming the
domain in settings. Doing it the other way round makes GitHub redirect
`mgrugan.github.io/chizzl-website/` to a hostname that does not answer yet,
which takes the site down until it does.

GoDaddy specifics, since they cost an afternoon: the parking page is an A
record on `@` displayed as **"WebsiteBuilder Site"** rather than an IP, and it
has to be deleted or visitors get round-robined onto it. GoDaddy also ships a
default `www` CNAME pointing at `@`; a name can hold only one CNAME, so that
record must be **edited**, not added alongside.

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

## Knowing how many people visited

Two halves, because one tool cannot see both.

**Landing-page visits — Cloudflare Web Analytics.** Live. Free, unlimited and
cookieless, so no consent banner. The token sits in the analytics block at the
bottom of `index.html`'s `<head>`; read the numbers at dash.cloudflare.com
under *Analytics & Logs › Web Analytics*.

The figures are **private to that Cloudflare account**. Nothing is rendered on
the page, no visitor sees a count, and the token in the page source only says
where to *send* measurements — it grants nobody the ability to read them. Tests
assert no count appears in the DOM and no cookie is set.

The one thing a public token does allow is someone forging beacons to inflate
your numbers. That is inherent to every client-side analytics tool, it needs
deliberate effort, and the blast radius is a wrong number on your own
dashboard. Treat the traffic figures as indicative, and Apple's install counts
as authoritative.

A blank or half-pasted token injects nothing rather than firing a broken
request, which is what makes the placeholder safe to commit. Tested with empty,
truncated and non-hex tokens.

The block sits deliberately **after** the social redirect. A visitor on their
way to `/go/` is leaving, so there is no reason to spend a request measuring
them, and the redirect must not wait on a script.

**Redirect traffic — App Store Connect.** `/go/` is not instrumented, on
purpose: it exists to be one request and gone, and an analytics library there
would add a round trip to the one page whose whole job is to be instant. Since
most social traffic never renders the landing page, that half of the funnel is
read from Apple instead — App Analytics › Acquisition › Campaigns shows product
page views and installs per `ct=` code, which is exactly the `/go/` throughput,
already broken down by source.

So: Cloudflare for "how many people saw the site", Apple for "how many the
links sent to the store, and how many installed".

## Referral links

`chizzl.co/r/<code>` — short enough to read out loud, and it carries an
attribution code all the way to the App Store.

```
chizzl.co/r/kai        →  …/id6790546338?ct=kai&mt=8
chizzl.co/go/?r=kai    →  the same thing, one hop shorter
```

Codes are `[A-Za-z0-9_-]`, up to 32 characters. Anything else is dropped rather
than passed through to the outbound URL. Make one up per creator or per post —
there is nothing to register.

**Where the numbers show up:** App Store Connect › App Analytics › Acquisition
› Campaigns, keyed by the `ct` value. Put your provider token in
`APPLE_PROVIDER_TOKEN` (`src/config.ts`) and `PT` (`public/go/index.html`);
it is the `pt=` in any link that Campaigns page generates. Codes still record
without it. The site's own badges are tagged `ct=website`, so creator traffic
is separable from people who found the site on their own.

**How `/r/` works.** GitHub Pages is static and has no rewrite rules, so
`/r/<code>` is caught by `public/404.html` — the one hook Pages offers — and
forwarded to `/go/` with the code attached. It costs one extra request over
linking `/go/?r=` directly. That file is a real not-found page for every other
unmatched path.

Referrals opened from inside Instagram or Facebook keep their code through the
webview escape, and through the manual button if the escape is swallowed. Both
are covered by tests.

### What this is not

Apple pays **no commission on apps**. The affiliate program stopped paying on
app referrals in 2018, so there is no Apple revenue share to plug in here, and
any service offering you one for iOS apps is not describing Apple's terms.

What you get instead is attribution: which code drove how many installs. That
is the number to pay a creator against if you want to run a paid programme —
you would be paying them yourself, out of band.

Two limits worth knowing before promising anyone a payout:

- App Analytics is **aggregate and privacy-thresholded**. Low-volume campaigns
  can report nothing at all until they clear Apple's minimum.
- It counts installs, not subscriptions. Attributing revenue rather than
  downloads means an in-app referral code the user types at signup, which is
  app work, not website work — and is also the only version accurate enough to
  pay commission on.

## Social traffic never sees the landing page

Anyone arriving inside Instagram, Threads, Facebook, Messenger, TikTok or
Reddit is redirected off the root straight to `/go/`, and from there to the App
Store.
They followed a bio link to download the app, and that webview is also where
App Store links get blocked, so the handling in `/go/` is what they need — not
a page to read.

The detection is an inline script at the top of `index.html`, above the bundle,
so it fires on first paint with no React and no fonts fetched first. Every
other context — Safari, Chrome, desktop, search crawlers — falls through to the
normal page.

`?stay=1` opts out and is remembered for the session. The "Visit the site
instead" link on `/go/` carries it, and has to: without it that link lands on
the root, gets detected, and is sent back to `/go/` forever.

The UA list is duplicated between `index.html`, `public/go/index.html` and
`src/lib/inAppBrowser.ts`, for the same reason the escape schemes are — the
first two must not wait on a bundle. Change one, change all three. A test
walks every app on both platforms to catch drift; that is what caught `/go/`
matching only `Instagram` while the module also matched Threads.

## In-app browsers

Meta's apps render links in an embedded webview that refuses App Store links.
A tap does nothing at all, with no error. `src/lib/inAppBrowser.ts` handles it:

| Context | Behaviour |
| --- | --- |
| Any normal browser | The badge stays a plain `<a href>` and navigates natively. Nothing is intercepted. |
| Instagram / Threads, iOS | `location.href = 'instagram://extbrowser/?url=' + encodeURIComponent(url)` |
| Facebook / Messenger, iOS | `window.open('x-safari-' + url, '_blank')` |
| TikTok / Reddit, iOS | `location.href = url.replace(/^https?:/, 'itms-apps:')` |
| Android, any of them | `location.href = 'intent://<url-without-scheme>#Intent;scheme=https;end'` |

TikTok and Reddit are the odd ones: neither publishes an escape-to-browser
scheme, so instead of routing through Safari they ask iOS to open the App Store
app directly with the store's own `itms-apps://` scheme, which the OS handles
rather than the webview that is doing the blocking.

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

### The limit worth knowing

A tap on a badge always carries a user gesture, so that path is reliable. The
**automatic** redirect on `/go/` does not: iOS discards custom-scheme
navigation with no gesture behind it, and a cold page load is exactly that, so
the automatic escape frequently does not fire inside a webview. Nothing can
make that a certainty on iOS.

So `/go/` fires automatically, and makes the recovery immediate: the
tap-anywhere retry is armed the instant the page loads rather than when the
card appears, and the card follows at 900ms. Worst case is one tap, not a dead
spinner.

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
