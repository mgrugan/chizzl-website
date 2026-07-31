---
version: alpha
name: CHIZZL AI
description: >-
  Premium black minimalism for a physique-tracking app. True-black OLED ground,
  green as accent only, chrome as the expensive signal. Spartan mythology,
  data-forward, calm continuous motion.
colors:
  # ── Surfaces ──────────────────────────────────────────────
  background: "#000000"
  surface-elevated: "#0C0D0E"
  surface-card: "#0E0F11"
  surface-inset: "#17181B"
  surface-skeleton: "#262C31"

  # ── Text ──────────────────────────────────────────────────
  text: "#F5F5F7"
  text-dim: "#A2A7A5"
  text-faint: "#63696B"

  # ── Brand ─────────────────────────────────────────────────
  primary: "#27E08A"
  primary-dim: "#1AA866"
  on-primary: "#06210F"
  accent-lime: "#C6FF3D"
  accent-teal: "#0FB5A6"

  # ── Borders ───────────────────────────────────────────────
  border-hairline: "rgba(140, 240, 190, 0.12)"
  border-emphasis: "rgba(150, 245, 195, 0.22)"

  # ── Status ────────────────────────────────────────────────
  warning: "#FFC24B"
  danger: "#FF5A6E"
  info: "#4BC0FF"

  # ── Muscle heat ramp ──────────────────────────────────────
  heat-rest: "#475049"
  heat-worked: "{colors.primary}"
  heat-peak: "{colors.accent-lime}"

  # ── Tier metals ───────────────────────────────────────────
  tier-bronze: "#CD7F32"
  tier-silver: "#C7CBD1"
  tier-gold: "#E5B93C"
  tier-diamond: "#8FE3F0"
  tier-platinum: "#E9ECF2"

  # ── Liquid metal ramp ─────────────────────────────────────
  # Chrome with a green dispersion band through the middle, so the metal
  # reads as chrome-with-green rather than plain grey.
  metal-highlight: "#F2F4F8"
  metal-steel: "#A9B1C0"
  metal-shadow: "#4A4E59"
  metal-disperse-lime: "#8FDE6F"
  metal-disperse-white: "#E9FBD9"
  metal-disperse-mint: "#7CE8B4"
  metal-disperse-green: "#3BB98A"
  metal-deep: "#343741"
  metal-rim: "#E9ECF2"

typography:
  wordmark:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 4px
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.03em
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  title:
    fontFamily: Space Grotesk
    fontSize: 19px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: 1.5px
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
  numeral-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.03em
  numeral-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em

rounded:
  xs: 0.25rem
  sm: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  gutter: 12px
  md: 16px
  lg: 24px
  container: 20px
  xl: 48px
  xxl: 96px

components:
  app-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-inset:
    backgroundColor: "{colors.surface-inset}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  tab-bar:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  divider:
    backgroundColor: "{colors.border-hairline}"
    height: 1px
  divider-focus:
    backgroundColor: "{colors.border-emphasis}"
    height: 1px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    typography: "{typography.title}"
    height: 56px
    padding: "{spacing.lg}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-dim}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-metal:
    backgroundColor: "{colors.metal-steel}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    height: 56px
  button-ghost:
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    typography: "{typography.title}"
    height: 56px
    padding: "{spacing.lg}"
  device-rail:
    backgroundColor: "{colors.metal-shadow}"
    rounded: "{rounded.xl}"
  chip:
    textColor: "{colors.text-dim}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
    typography: "{typography.label}"
  chip-selected:
    backgroundColor: "{colors.accent-lime}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  display:
    textColor: "{colors.text}"
    typography: "{typography.display-xl}"
  display-secondary:
    textColor: "{colors.text}"
    typography: "{typography.display-lg}"
  headline:
    textColor: "{colors.text}"
    typography: "{typography.headline-lg}"
  subheadline:
    textColor: "{colors.text}"
    typography: "{typography.headline-md}"
  wordmark:
    textColor: "{colors.text}"
    typography: "{typography.wordmark}"
  body:
    textColor: "{colors.text-dim}"
    typography: "{typography.body-md}"
  body-lead:
    textColor: "{colors.text-dim}"
    typography: "{typography.body-lg}"
  body-compact:
    textColor: "{colors.text-dim}"
    typography: "{typography.body-sm}"
  section-label:
    textColor: "{colors.text-faint}"
    typography: "{typography.label}"
  caption:
    textColor: "{colors.text-faint}"
    typography: "{typography.caption}"
  stat-value:
    textColor: "{colors.text}"
    typography: "{typography.numeral-lg}"
  stat-hero:
    textColor: "{colors.primary}"
    typography: "{typography.numeral-xl}"
  progress-track:
    backgroundColor: "{colors.surface-inset}"
    rounded: "{rounded.full}"
    height: 8px
  progress-indicator:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: 8px
  progress-peak:
    backgroundColor: "{colors.accent-teal}"
    rounded: "{rounded.full}"
    height: 8px
  skeleton:
    backgroundColor: "{colors.surface-skeleton}"
    rounded: "{rounded.sm}"
  muscle-rest:
    backgroundColor: "{colors.heat-rest}"
  muscle-worked:
    backgroundColor: "{colors.heat-worked}"
  muscle-peak:
    backgroundColor: "{colors.heat-peak}"
  alert-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  alert-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  alert-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  tier-bronze:
    backgroundColor: "{colors.tier-bronze}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  tier-silver:
    backgroundColor: "{colors.tier-silver}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  tier-gold:
    backgroundColor: "{colors.tier-gold}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  tier-diamond:
    backgroundColor: "{colors.tier-diamond}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  tier-platinum:
    backgroundColor: "{colors.tier-platinum}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
---

# CHIZZL AI

## Overview

CHIZZL AI is a physique-tracking app for people who treat training as a
technical pursuit. The visual identity is **premium black minimalism**:
restraint over decoration, structure that reads black-and-white, and green used
strictly as an accent.

The mood is gym-at-night. Content **emerges from black** rather than sitting on
top of it — surfaces are barely lighter than the ground, separated by hairlines
rather than shadows. The brand borrows Spartan mythology: strength is earned,
progress is ranked in tiers, and the interface never flatters the user.

The voice is Gen-Z-direct — hype, but never body-shaming. Data is presented
honestly: big numerals, plain calibration, no padding.

## Colors

The ground is **true black** (`background`, `#000000`), chosen for OLED. Three
surfaces sit above it, and they are deliberately close in value:
`surface-elevated` for floating chrome like the tab bar, `surface-card` for
content cards, and `surface-inset` for wells and alternate rows. The separation
between them is a *hairline*, not a shadow.

Text never uses pure white. `text` (`#F5F5F7`) is the off-white primary,
`text-dim` carries secondary copy, and `text-faint` handles captions and
metadata.

**Green is an accent, not a theme.** `primary` (`#27E08A`) marks action,
success and glow. `accent-lime` (`#C6FF3D`) is reserved for peaks and
high-intensity states — it should feel rare. `accent-teal` closes the deep end
of the brand ramp. Text placed on a green fill uses `on-primary`, never white.

Gradients:

- **Brand** — `accent-lime → primary`, for progress and active states.
- **Brand deep** — `primary → accent-teal`, for larger fills.
- **Ring** — lime → green → teal, for circular progress.
- **Screen backdrop** — `#141518 → #08090A → #000000` at stops 0 / 0.45 / 1.
- **Glass** — `rgba(255,255,255,0.12) → rgba(255,255,255,0.02)`.
- **Liquid metal** — the nine `metal-*` tokens with tight custom stops. The
  four `metal-disperse-*` values form a dispersion band through the middle of
  the chrome so the metal reads as chrome-with-green rather than grey.

The format has no gradient token type, so gradient ramps are declared as
individual colors and composed in code. Seven `metal-*` stops are therefore
reported as orphaned by the linter — that is expected, not an oversight: a
component can only carry one `backgroundColor`, and a nine-stop ramp cannot be
expressed as one.

The muscle heat ramp runs `heat-rest → heat-worked → heat-peak`; brighter means
more volume.

Only `tier-bronze` is fixed by the brand book. The other four tier metals are
provisional and should be confirmed before they ship anywhere user-facing.

## Typography

Two families, no exceptions. **Space Grotesk** carries display, headings,
labels and all numerals — its geometry reads technical. **Manrope** carries
body and UI copy, where legibility matters more than character.

- **Wordmark** — `C H I Z Z L`, Space Grotesk, all-caps, 4px tracking. It
  should feel chiselled, like an inscription.
- **Section labels** — uppercase, 1–4px tracking, caption size, `text-faint`.
- **Numerals** — always the display font, with tight negative tracking at large
  sizes. Weights, reps, percentages and scores are the most important elements
  on any screen and should be set as such.

Do not introduce a third family, and do not fall back to Inter, Roboto, Arial
or system-ui for display text.

## Layout & Spacing

Strictly **8pt-grid**, favouring a compact-fluid model.

- **Safe zones** — 20px horizontal margins on mobile, letting the OLED black
  bleed into the device bezel.
- **Grid** — 12 columns on desktop, 4 on mobile.
- **Stacking** — elements stack vertically; they do not overlap.
- **Mobile reflow** — cards go full-width minus margins so large numerals stay
  readable. Tablets reflow to 2–3 columns to avoid awkward line lengths.

## Elevation & Depth

Depth is communicated through **light and border, never shadow**.

1. **Base** — `background`, level 0.
2. **Tiers** — `surface-elevated` and `surface-card` for raised containers.
3. **The hairline** — every interactive surface carries a 1px
   `border-hairline`, which reads as a faint glow defining the shape against
   black. `border-emphasis` marks focus and selection.
4. **Glass** — reserved for the floating tab bar and top header: 20px backdrop
   blur under the glass gradient.
5. **Film grain** — a global 5% overlay at the highest z-index, unifying every
   layer with a cinematic texture.

## Shapes

Sophisticated-geometric. Corners are soft enough to read premium, never
aggressively sharp.

- Cards use `rounded.lg`.
- Buttons and chips use `rounded.sm`, or `rounded.full` for status pills.
- Nested elements step down one level to keep corners concentric.

## Components

**Buttons** — Primary is a liquid-metal chrome fill with `on-primary` text and
no shadow. Secondary is a ghost: hairline border, transparent background.
Tertiary drops the border entirely and uses `text-dim`.

**Cards** — `surface-card` background, hairline border, `label` header in
`text-faint`, `numeral-lg` content in `text`.

**Chips** — pill-shaped. Unselected carries a hairline and `text-dim`;
selected fills with `accent-lime` and black text.

**Tab bar** — pill-shaped, floating, backdrop-blurred, with a white active
chip.

**Progress** — track in `surface-inset`, indicator on the brand gradient. A
personal-record state adds a slow pulse.

**Skeletons** — `surface-skeleton` bones breathing between 0.35 and 1.0 opacity
over 0.65s ease-in-out each way, cross-fading to real content over 220ms.

## Do's and Don'ts

**Do**

- Let content emerge from black; keep surfaces close in value.
- Use hairlines for separation.
- Reserve `accent-lime` for genuine peaks so it keeps its meaning.
- Reserve liquid metal for the key action on a screen — animated on hero
  actions, static on secondary cards.
- Keep motion calm and continuous: breathing, floating, washing. Spring physics
  for entrances, linear for ambient loops. The liquid-metal wash is a 12s
  linear loop.
- Set numerals large, tight and honest.

**Don't**

- Don't use drop shadows for elevation.
- Don't tint the background green — the structure reads black-and-white.
- Don't use pure white text or pure white fills.
- Don't use Inter, Roboto, Arial or system-ui for display type.
- Don't use purple, or any gradient outside the brand ramps.
- Don't use perspective or 3D transforms; they render incorrectly on iOS. Use
  solid fills over gradients inside transformed subtrees.
- Don't make motion bouncy or playful.
- Don't flatter the user in copy, and never body-shame.
