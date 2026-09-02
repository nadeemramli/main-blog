---
version: "nadeemramli-console-v2-2026-09-03"
name: "Operator Console — nadeemramli.com"
description: "A full-site design system adapting the Atmospheric Data Console aesthetic (warm neumorphic hardware, LCD readouts, instrument-panel hierarchy) to a personal portfolio for a growth marketer / product developer. The site is framed as the operator's control panel: every page is a device, every metric is a readout, every status is an indicator light. Day mode by default; a Night token set is switched by the header lamp. Reskin target: existing Once UI / Next.js codebase."
mode: "day + night (lamp switch)"
implementation-target: "Once UI / Next.js reskin (override theme tokens + component styles; preserve routing, content model, and layout primitives where possible)"

colors:
  # Environment
  background: "#D5D2C6"        # warm cream — the desk / wall the devices sit on
  background-deep: "#C9C6BA"   # slightly darker zone for footer / section separation
  # Hardware surfaces
  panel: "#E4E1D6"             # raised device faceplate (lighter than bg)
  panel-high: "#EDEAE0"        # topmost raised elements (keys, knob caps)
  well: "#CBC8BC"              # recessed wells / inset tracks (darker than bg)
  border: "#A09D94"            # hairline seams between panel parts
  # LCD / screen
  lcd-bg: "#0E0F0D"            # near-black screen glass
  lcd-bezel: "#1C1D1A"         # screen bezel frame
  lcd-text: "#76D2B6"          # mint phosphor — primary readout color
  lcd-dim: "#3E6E5E"           # secondary/dimmed readout text
  lcd-glow: "rgba(118,210,182,0.35)"  # text-shadow glow on LCD type
  # Ink (print on the device body)
  text-primary: "#111827"      # printed labels, prose, display type
  text-secondary: "#4B5563"    # supporting copy, captions
  text-tertiary: "#8A877C"     # silkscreen fine print, disabled
  # Signals
  led-red: "#FF3333"           # STATUS LANGUAGE ONLY — needles, sync dots, alerts, in-dev badges
  led-amber: "#E8A33D"         # optional warning state (use rarely)
  accent-mint: "#76D2B6"       # primary action color outside LCD contexts
  accent-mint-ink: "#0E2E24"   # text on mint surfaces

typography:
  # Faces (v2): Space Grotesk (ink) + Geist Mono (chrome). Sizes are the --console-fs-* tokens.
  display-xl:   { fontFamily: "Space Grotesk", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 500, lineHeight: "1.02", letterSpacing: "-0.02em" }
  display-lg:   { fontFamily: "Space Grotesk", fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 500, lineHeight: "1.06", letterSpacing: "-0.015em" }
  heading-lg:   { fontFamily: "Space Grotesk", fontSize: "30px", fontWeight: 500, lineHeight: "1.2" }
  heading-md:   { fontFamily: "Space Grotesk", fontSize: "24px", fontWeight: 550, lineHeight: "1.2" }
  heading-sm:   { fontFamily: "Space Grotesk", fontSize: "18px", fontWeight: 600, lineHeight: "1.3" }
  body-lg:      { fontFamily: "Space Grotesk", fontSize: "18px", fontWeight: 400, lineHeight: "1.65" }  # long-form prose (About, case studies)
  body-md:      { fontFamily: "Space Grotesk", fontSize: "16px", fontWeight: 400, lineHeight: "1.6" }
  # Mono is CHROME ONLY: labels, readouts, metadata, nav, timestamps, badges, table data
  label-md:     { fontFamily: "Geist Mono", fontSize: "12px", fontWeight: 600, lineHeight: "1.2", letterSpacing: "0.08em", textTransform: "uppercase" }
  label-sm:     { fontFamily: "Geist Mono", fontSize: "10px", fontWeight: 600, lineHeight: "1.2", letterSpacing: "0.1em", textTransform: "uppercase" }
  readout-xl:   { fontFamily: "Geist Mono", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, lineHeight: "1.0" }  # big LCD numbers
  readout-lg:   { fontFamily: "Geist Mono", fontSize: "22px", fontWeight: 500, lineHeight: "1.2" }
  readout-md:   { fontFamily: "Geist Mono", fontSize: "16px", fontWeight: 500, lineHeight: "1.4" }
  data-sm:      { fontFamily: "Geist Mono", fontSize: "13px", fontWeight: 400, lineHeight: "1.5" }  # tables, logs, metadata rows
  body-sm:      { fontFamily: "Space Grotesk", fontSize: "14px", fontWeight: 400, lineHeight: "1.6" }

spacing:
  base: "8px"
  gap: "16px"
  panel-padding: "24px"
  panel-padding-lg: "32px"
  section-gap: "96px"          # space between devices on the desk
  page-max-width: "1120px"

rounded:
  panel: "40px"                # outer device shells
  panel-inner: "24px"          # nested modules inside a shell
  lcd: "16px"                  # screen glass corners
  control: "8px"               # small controls, inputs
  key: "12px"                  # pressable keys/buttons
  pill: "9999px"               # toggles, badges, nav

shadows:
  # Neumorphism recipe — the entire material system depends on these pairs.
  # v2: every pair is composed from a light vector (--light-dx, --light-dy) and
  # six shadow inks (shade / highlight × soft / base / hard). The canonical lamp
  # is top-left (-1, -1), which yields exactly the literal recipes below; the
  # pointer lamp (§7) moves the vector at runtime, night mode (§2) recolours
  # the inks. With no JS the var() fallbacks make the pairs byte-identical.
  raised: "8px 8px 20px rgba(123,119,105,0.45), -8px -8px 20px rgba(255,255,255,0.75)"
  raised-sm: "4px 4px 10px rgba(123,119,105,0.4), -4px -4px 10px rgba(255,255,255,0.7)"
  inset: "inset 4px 4px 10px rgba(123,119,105,0.45), inset -4px -4px 10px rgba(255,255,255,0.6)"
  pressed: "inset 2px 2px 6px rgba(123,119,105,0.5), inset -2px -2px 6px rgba(255,255,255,0.5)"
  lcd-depth: "inset 0 2px 12px rgba(0,0,0,0.85)"   # screen sits behind glass — never directional
  hover-lift: "12px 12px 28px rgba(123,119,105,0.5), -10px -10px 24px rgba(255,255,255,0.8)"

motion:
  # Durations and eases are tokens (src/styles/console-tokens.scss), never literals.
  dur: { press: "120ms", cap: "150ms", lift: "200ms", settle: "90ms", reveal: "400ms", boot: "280ms", boot-line: "200ms", type: "420ms", flare: "600ms", condense: "220ms" }
  stagger: { shell: "80ms", line: "60ms", log: "70ms" }
  ease: { out: "cubic-bezier(0.22,1,0.36,1)", inout: "cubic-bezier(0.65,0,0.35,1)", mech: "cubic-bezier(0.2,0.9,0.3,1.04)" }
  depth: { perspective: "1200px", tilt-max: "4deg", reveal-rx: "8deg", reveal-y: "24px" }
  z: { desk: 0, page: 1, rail: 5, header: 9, overlay: 20, toast: 30 }
---

# Operator Console — nadeemramli.com Design System

Source aesthetic: Neuform "Atmospheric Data Console" (staff featured). Adapted from a single
weather-device demo into a complete five-page personal site system for Nadeem Ramli —
Growth Marketer, Indie Builder, Systems Thinker.

## 1. Concept

The site is **Nadeem's operator console**: a physical instrument panel sitting on a warm cream
desk, with dark LCD screens reporting live status. The metaphor is earned, not decorative —
the subject genuinely runs on metrics, dashboards, systems, and status tracking. The redesign
makes the personal brand literal: *a person who runs his life like an instrumented system.*

Three material layers, always in this order:

1. **The desk** — warm cream background (`background`), subtle WebGL dither grain.
2. **The hardware** — raised neumorphic panels (`panel`) with printed ink labels (Inter +
   silkscreen mono), physical controls (knobs, rockers, keys, gauges).
3. **The screens** — recessed dark LCDs (`lcd-bg`) with mint phosphor type. Anything "live"
   (clock, status, metrics, project state) renders on a screen. Anything "printed" (prose,
   labels, headings) renders as ink on the hardware.

**The rule that keeps the whole system coherent: live data glows on glass; permanent
information is printed on the body.** When deciding how to render any element, ask which it is.

## 2. Color

- `background` #D5D2C6 is the page. Never pure white anywhere on the site.
- Panels are *lighter* than the background (#E4E1D6); wells and tracks are *darker* (#CBC8BC).
  Depth comes from this triad + the dual shadows, not from borders. Use `border` #A09D94 only
  as 1px hairline seams where two panel parts meet (e.g., module dividers inside a shell).
- **Red #FF3333 is a status language, never a brand wash.** Permitted uses: gauge needle,
  `● SYNC` (pulsing) and `● LOCKED` (steady) dots, "IN DEVELOPMENT" badges, error states, the
  small record-style dot next to "What I'm Working On Now". `● LIVE` is NOT red — live/healthy
  is mint (see §5.6 canon). Forbidden uses: backgrounds, headings, large CTAs,
  hover states, gradients. If red covers more than ~1% of any viewport, it's wrong.
- Mint #76D2B6 has two jobs: phosphor text on LCD surfaces, and the fill of the single primary
  CTA per page (e.g., "Schedule a Call"). On mint surfaces, text is `accent-mint-ink`.
- **Night palette (v2) — the lamp is off.** Switched by the header rocker; `data-console="night"` on
  `<html>`. **Night is the default** (v2 revision): the SSR document carries the attribute; a
  visitor's "day" choice is stored in `localStorage["console.lamp"]` and applied before first
  paint (the switch is the only input — never `prefers-color-scheme`, so the rocker and the page
  always agree). Desk `#1A1B19` (drift `#1F201D`, deep `#141513`, grain at 35%); panel `#242522`,
  panel-high `#2C2D2A`, well `#161715`, border `#3A3B37`; glass `#0B0C0A` in a `#151613` bezel,
  phosphor `#7FE0C1` / dim `#4A8672` with a stronger glow and bloom; ink `#E8E4D8` / `#ACA89B`
  (≈7.4:1 on panel) / `#6F6C62`; mint-ink `#0A241C`. Shadow inks: shade `rgba(0,0,0,.45–.65)`, and
  the highlight becomes a faint warm rim `rgba(255,244,224,.05–.09)` — there is no white at
  night. Red, amber and canonical mint are unchanged. Switching is instant, no crossfade.
- Contrast notes: `text-secondary` #4B5563 on `panel` passes AA for body sizes. `lcd-dim`
  is for secondary LCD data ≥13px only. `text-tertiary` is decoration-grade fine print only.

## 3. Typography

- **Space Grotesk carries all reading and all display** (v2 brand revision; was Inter). Its
  geometric, slightly wide letterforms give headings the instrument-panel character Inter
  lacked while staying readable at body sizes. Display weights at 500 (not 700 — the source
  uses medium-weight large type; keep that restraint); section headings at 550.
- **Geist Mono is chrome only** (v2; was JetBrains Mono): nav items, the clock, timezone,
  section eyebrows, metric labels, table data, timestamps, badges, button labels on "keys",
  LCD readouts. If a sentence is longer than ~8 words, it should not be mono.
- **The type scale is tokens** (`--console-fs-*`, `--console-lh-*`, `--console-track-*`,
  `--console-fw-*` in `console-tokens.scss`) and every font-size in console code is one of
  them — never a pixel literal. Ink: display-xl/lg, heading-lg (30) / md (24) / sm (18),
  body-lg (18) / md (16) / sm (14). Chrome: readout-xl / lg (22) / md (16), data (13),
  label-md (12), label-sm (10). Line heights: tight 1.06, heading 1.2, snug 1.3, data 1.5,
  body 1.6, prose 1.65. Tracking: display −0.015em, label-md 0.08em, label-sm 0.1em, data
  0.04em. Weights: medium 500, heading 550, label 600. Both faces are self-hosted variable
  fonts (`src/app/fonts/space-grotesk.woff2` 300–700, `geist-mono.woff2` 100–900; OFL).
- Eyebrow pattern above every section: `label-sm` mono, uppercase, tracked, `text-tertiary`,
  e.g. `SEC.03 — SIDE PROJECTS`. Section numbers are justified here: the pages genuinely
  read top-to-bottom as a panel layout with numbered modules.
- LCD type always gets `text-shadow: 0 0 8px var(--lcd-glow)` and `font-feature-settings`
  with tabular numbers (`tnum`) so readouts don't jitter when ticking.

## 4. Layout

- Max width 1120px, centered. Generous `section-gap` (96px) between device shells — devices
  are separate objects on a desk, not a continuous sheet.
- Each major section is **one device shell**: a `panel`-colored container at `rounded.panel`
  (40px) with `shadows.raised`, containing 1–3 inner modules at `rounded.panel-inner` (24px)
  separated by hairline seams or recessed wells.
- Inside shells, follow the source's tri-panel rhythm where content allows:
  analog control (gauge/dial) | screen (LCD) | printed reference (mini-table/labels).
- Decorative hardware details, used sparingly (max one per shell): speaker-grille dot grid
  (bottom-right corner, as in source), a screw-head dot in shell corners, an embossed
  silkscreen logo. These are texture, not content.
- Responsive: shells stack to single column below 768px; tri-panel modules stack in order
  control → screen → reference. Gauge scales down before it wraps. LCD readout-xl steps
  down via clamp. Never let a shell exceed viewport width minus 32px gutters.
- **Mobile pass (v2, ≤768px):** the desk gets smaller at the token level — section gap 56px,
  shell padding 20/22px, shell radius 28/20px, readout-xl `clamp(28px, 7.4vw, 56px)` so the
  operator name holds one line on a 360px glass. Page gutter 16px (`page-gutter` in
  `console-mobile.scss`), `overflow-x: clip` on the document so no shell, arrow or 3D reveal
  can scroll the desk sideways. Touch: keys grow to 44px tall on coarse pointers; header caps
  32×36 with the clock showing HH:MM only; footer icon keys 36px so all seven sit in one row.
  Manual-page sidebars stop sticking in single column. The dock shows the printed outline in a
  150px landscape well; the rail, lamp, tilt and 3D unit never load.
- **Mobile scroll budget (v2):** nothing may be promoted to a compositing layer for an effect a
  phone never shows. Shells drop their `perspective()` transform and screens their `translateZ`
  below 1025px / without hover; the condensed header is an opaque faceplate on coarse pointers
  (no `backdrop-filter`); the rail component does not mount at all off-desktop; the desk grain
  runs at ~20fps on touch. Keys carry `touch-action: manipulation` and no tap highlight.

## 5. Component Library

### 5.1 Device Shell (`<Panel>`)
Replaces Once UI cards/sections. `panel` bg, 40px radius, `raised` shadow, 24–32px padding.
Hover (when interactive): `hover-lift` shadow + translateY(-2px), 200ms ease-out. Device cards
(projects, resources, side projects, the featured shell) are `TiltPanel`s: under a fine pointer
they also tilt up to 4° toward the cursor (`--tilt-x/--tilt-y` into the composed transform),
snapping back to exactly 0° on leave. Text-heavy shells (manual prose, maintenance log, footer,
hero) never tilt. No tilt under reduced motion or coarse pointers.

### 5.2 LCD Screen (`<Screen>`)
A `lcd-bezel` frame (4–8px) around `lcd-bg` glass at 16px radius with `lcd-depth` inset shadow.
Optional 2% opacity scanline overlay (repeating-linear-gradient, 3px period) — subtle, off on
mobile. Top row convention: `label-sm` in `lcd-dim`, left = node ID, right = status dot + word.
Example: `NODE-NR.01    ● SYNC`. All text mint phosphor with glow.
Canonical statuses (locked): `sync` = red, pulsing; `live` = mint; `idle` = amber;
`locked` = red, steady; `off` = dotless.
**The glass material (v2):** two overlay layers above the content — a curved-glass vignette with a
thin top-edge sheen, and a specular reflection positioned by the lamp vector (it follows the
pointer lamp; canonical top-left with no JS). Powered screens (`live`, `sync`) bloom: an inset mint
glow on top of `lcd-depth`. A booting screen (`data-boot="on"`) gets one 700ms reflection sweep.
**The glass reacts; the content never does.**

### 5.3 Gauge Dial (`<Gauge>`)
The signature element (one per page max, hero gets the primary one). Semicircular recessed
well, red needle, center knob with `raised-sm` cap. SVG-based; needle animates from rest to
value on viewport entry (spring, slight overshoot). Below the dial: `label-sm` caption +
`heading-md` Inter value, exactly like the source's "Current Status / Clear & 75°".

### 5.4 Rocker Switch (`<Rocker>`)
The source's °C/°F switch, repurposed as the **EN / BM language toggle** in the header, and
reusable for any binary filter (e.g., Projects: ALL / ACTIVE). Recessed pill track (`well`,
`inset` shadow) + raised sliding cap (`panel-high`, `raised-sm`). Cap slides 150ms ease;
active side label in `text-primary`, inactive in `text-tertiary`.

### 5.5 Keys (Buttons)
Buttons are physical keys: `panel-high` bg, 12px radius, `raised-sm` shadow, mono `label-md`
text. On press: swap to `pressed` shadow + translateY(1px) — the key physically depresses.
Primary CTA variant: mint fill, `accent-mint-ink` label, same press behavior. One mint key
per page. Icon-only keys are square, 40×40.
**Magnetic (v2):** keys never lift on hover. Under a fine pointer a free-standing cap is magnetic: it
drifts up to 6px toward the cursor (`--mag-x/--mag-y`, written by `PointerLight` for the one hovered
`[data-magnetic]` cap) and returns on leave. Press remains the only vertical movement a key makes on
its own. Track-seated caps (the nav) are not magnetic. Decorative caps (`as="span"`, e.g. the tool
chips) are real keys in every respect except semantics.

### 5.6 LED Indicator (`<Led>`)
6px dot + mono label. Canonical semantics (locked): red = activity/attention (sync, locked,
in-development, alerts); mint = healthy/online (live, ok, open); amber = standby/pending
(idle, prototype); none = off/archived.
Idle pulse animation (2s, opacity 1 → 0.4) on sync/live states only.

### 5.7 Header / Nav — the instrument cluster (mechanical revision)
A slim raised strip, width max-content, centered, sticky 16px. Panel bg, **16px radius —
a machined faceplate, not a lozenge**, padding 8px 12px, `raised-sm` (no halo on a slim
strip). Three modules in a 12px-gap flex row, separated by 1px hairline segment dividers:
[location MicroLcd] | [key track] | [clock MicroLcd]. A slotted mounting-screw dot caps
each end of the strip — the shell's one decorative detail (the pair reads as hardware).
- **Key track:** a recessed well (`well` bg, 10px radius, `inset` shadow) with a 1px
  `border` seam where the well meets the panel. 1px seam + 2px padding + 34px caps = 40px,
  the chip rhythm.
- **Keycaps:** text-only mono labels (HOME ABOUT NOW PROJECTS BLOG RESOURCES), 11px
  tracked, `panel-high` bg, **8px radius — square machined caps**, 34px tall, 0 16px
  padding, 4px gaps, `raised-sm`. Active route: pressed shadow + translateY(1px) + `panel`
  bg — a seated key, and it carries the **carriage**: a 2px mint slot near the bottom of the cap
  (`0 0 6px` mint glow) that slides to the newly seated key on route change (framer `layoutId`,
  spring 500/40; instant under reduced motion). The carriage is an indicator strip, not a mint key.
  Nav caps are not magnetic; press is the only movement. No icons on desktop.
- **Condensed state (v2):** past 120px of scroll (`data-scrolled`, hysteresis: off again below
  72px) the strip condenses over 220ms — padding 5px 10px, caps 30px, chips 36px, `raised` shadow —
  and its faceplate turns to glass: `panel-glass` (78% panel) with `backdrop-filter: blur(14px)
  saturate(1.15)`, so the desk grain shows through. Plain condensed panel where backdrop-filter is
  unsupported.
- **MicroLcd chips:** 40px tall to match the track exactly, 3px `lcd-bezel` ring, `lcd-bg`
  glass, glass squared to 8px to match the caps, mono ~11.5px mint with glow. The location
  chip carries a 5px red sync dot pulsing at 1s (static under reduced motion); the clock
  ticks live.
- **Mobile (<768px):** location chip, screws, and dividers hide; clock stays; keycaps go
  icon-only inside the same track. No horizontal overflow at 360px.

### 5.8 Footer — the desk edge
Seamless: the faceplate floats on the same continuous desk — no `background-deep` band,
no seam (revised: the band read as a leak, not a zone). One faceplate panel: max-width 980px,
28px radius, padding 34px 38px 0 (the fine-print row owns the bottom edge), and a tighter
dual shadow tuned for the deep bg (`raised-deep`, ~5px/14px, white alpha ~0.5 — no halo).
- **Top block** (flex space-between, wrap): left — "Follow the build" (~30px Inter 500 ink)
  over "Essays ship every Saturday. Everything else gets logged along the way."; right —
  the mint READ THE ESSAYS key (40px) beside a recessed icon tray (`well`, 14px radius,
  `inset`, 5px padding) holding seven square 40×40 icon keys at 11px radius (GitHub,
  LinkedIn, X, Instagram, Threads, TikTok, Email). Icon keys are NOT circles.
- **Bottom edge:** a full-width hairline seam inside the panel, then the baseplate row —
  silkscreen fine print left (mono 10px, 0.12em tracking, `text-tertiary`:
  `© 2026 NADEEM RAMLI — KUALA LUMPUR`) and the speaker-grille dot grid (~64×22px) right —
  the shell's one decorative detail.
- **Mobile:** the top block stacks; the tray wraps; the fine print drops the location
  suffix below ~400px.

### 5.9 Badge
Mono `label-sm` in a recessed pill (`well` + `inset`). Status badges get an LED dot:
`● IN DEVELOPMENT` (red), `● LIVE` (mint), `● PROTOTYPE` (amber), `ARCHIVED` (no dot, ink only).

### 5.10 Attribute Console (`<AttributeConsole>`)
The /now page's instrument for skill and equity state. A layer-select key row
[META | FUNDAMENTAL | STRATEGIC | TACTICAL | EQUITY] sits above ONE large Screen;
the active layer's key is held down (pressed). Default layer: META. Selection swaps
the attribute set rendered inside the glass: META/STRATEGIC/TACTICAL render the
mint-on-dark radar chart, FUNDAMENTAL renders the cluster drill-down, EQUITY renders
MicroLcd readouts only — qualitative/factual values, never invented proficiency
scores. Long-form layer notes (description/approach) print as ink below the Screen,
not on the glass (§1 rule). Proper tablist semantics: role="tablist"/"tab"/
"tabpanel", roving tabindex, ArrowLeft/ArrowRight/Home/End navigation. Client
component; layer state is client-only (no URL param).

### 5.11 Scroll Rail (`<ScrollRail>`) — the rack rail
A fixed instrument on the left edge (≥1200px, fine pointers only): a 4px recessed track
(`well` + `inset`, 240px tall, vertically centred) with a 10×18px `panel-high` carriage
(`raised-sm`, hairline slot) that rides scroll progress on a spring (stiffness 120, damping 24;
no spring under reduced motion). One tick per section — sections opt in with
`data-rail="LABEL"` — placed in progress space so the carriage lines up with them. The active
section's mark seats (ink) and its mono `label-sm` prints; all labels print on rail hover. Ticks
are buttons: click scrolls there through Lenis with the header offset. Hidden when a page has
fewer than two sections. On /about it replaces the old table of contents.

### 5.12 Lamp Switch (`<LampSwitch>`)
The header's fourth module, after the clock: a small Rocker (`size="sm"`, 40px) labelled
DAY / NIGHT (`D` / `N` below 768px). `role="switch"`, `aria-checked` when night. Flips
`data-console` on `<html>`, persists to `localStorage`, swaps the `theme-color` meta, and
notifies the desk canvas and the 3D unit. The cap never slides on first paint: a returning night
visitor finds the rocker already seated (`html:not([data-hydrated]) .cap { transition: none }`).
The module list is now `[location] | [key track] | [clock] | [lamp]`.

### 5.13 Device Dock (`<DeviceDockMount>`) — the reference unit
The hero's third module: a recessed well (`well` + `inset`, `panel-inner` radius, ~1:1.05)
holding a **3D handheld console** built from primitives (vanilla three.js on the shared ticker, no
model file): a sand `RoundedBox` body, a dark bezel, a glass plane with mint emissive readouts
and an additive phosphor halo, three `panel-high` keycaps and one knob. Lit by the same lamp as
the CSS shadows — the key light tracks `--light-dx/--light-dy` — with a warm fill; colours read
from the console tokens and re-read when the lamp switch flips (night: dimmer key light, cool
fill, brighter phosphor). A radial contact shadow on the well floor keeps it resting above the
desk. **Fallback and placeholder:** a printed-ink SVG outline of the same silhouette occupies the
well first and stays wherever the scene never loads (below 1024px, low-tier machines —
≤4 cores, <4GB, no WebGL2 — or reduced motion, where the scene holds a static three-quarter
pose if it does load). The scene is one lazy chunk loaded on idle; it is never the LCP element
and never appears before the LCD has painted; the outline reserves the box so nothing shifts.

## 6. Page Treatments

### 6.1 Home — the Master Console
**Hero IS a console** (locked decision). One wide device shell, tri-panel like the source:

- **Left — Gauge:** "CURRENT FOCUS" dial. Needle points at the active phase; caption reads
  e.g. `Current Focus / Building Dealn`. (Content feeds from the same data as the Now page.)
- **Center — Main LCD:** boot sequence on first paint (see Motion), then:
  `NODE-NR.01  ● SYNC` / `OPERATOR` / readout-xl `NADEEM RAMLI` / `lcd-dim` line
  `GROWTH MARKETER · INDIE BUILDER · SYSTEMS THINKER` / bottom 2×2 mini-grid of live stats
  (e.g. `YRS EXP 5+`, `CURRENT dealn.app`, `LOCAL 00:43`, `STATUS OPEN`).
- **Right — the Dock (v2):** the 3D reference unit (§5.13), a handheld twin of this console
  floating in a recessed well. The grid is `232px | 1fr | 260px`.
- **Below the tri-panel — Shipping week strip (v2):** the source's weekly forecast strip,
  repurposed as a **shipping week** and laid out as one recessed rail under the three modules:
  `SHIPPING WEEK  M○ T○ W○ T○ F○ S●  ● ship · ○ build`, fed manually or from the Now data, with
  the speaker grille riding its right end (still the shell's one decorative detail). As the reader
  scrolls past, the whole console recedes (§7).

Below the hero, as separate shells: "What I'm Working On Now" (a log module: red record LED,
mono timestamped lines, key linking to /now) → Featured project (large Screen, see 6.4
treatment) → Resources rail (see 6.5) → footer console.

### 6.2 About — the Operator's Manual
Long-form page; prose must breathe. Framing: a printed manual that ships with the device.

- Top: identity faceplate shell — portrait in a rounded-square inset well, name in display-lg
  ink, role line, social icon keys, location micro-LCD.
- **Work experience as a maintenance log:** each role is a module row inside one tall shell —
  left column mono metadata (`2025—PRESENT`, company, role badge), right column Inter prose.
  Hairline seams between rows. Screenshots/photos sit in inset wells with 16px radius.
- **How I Work (5 steps):** numbered keys `01–05` down the left rail — here numbering is
  honest (it's a real sequence). Each step: heading-sm + body-md ink.
- **Builder Principles:** toggle rows — each principle is a labeled switch rendered in the
  "on" position. Quiet, scannable, on-theme.
- **Tools & Stack:** the switchboard. Category modules (Product / Analytics / Ads / Automation)
  as recessed wells containing tool chips as small raised keys with logos.
- Case study cards: small Screens with mono title + tag badges.

### 6.3 Now — the Live Status Page
The most literal page: a status console. Header row: page title ink, `● LIVE` Led
(mint), and an `UPDATED` MicroLcd whose date is a manual content field set when the
content changes — it reports content freshness, not deploy freshness. One shell pairs
a small Gauge mirroring the hero's Current Focus (same data source — one value, two
instruments) with the dominant log Screen: mono entries, newest first, e.g.
`2026-06  ▸ ORDER SERIES — writing & polishing`. Below it, the Attribute Console
(§5.10). This page should feel like ssh-ing into Nadeem.

### 6.4 Projects — the Device Rack
Each project is its own device shell in a 2-col grid (1-col mobile). **The screen-saver rule
solves empty thumbnails:** every project Screen renders, at minimum, a generated idle state —
project name in readout-md mint, a status badge, one metric or one-line descriptor in
`lcd-dim`, and the node convention top row (`NODE-PRJ.04  ● IDLE`). Projects *with* real
screenshots show them inside the glass at reduced brightness (filter: brightness(0.9)) so
they read as on-screen content. Below each screen, printed ink: name (heading-md), one-line
Inter description, "Read case study →" key, status badge. No project ever shows an empty
gray rectangle again.

### 6.5 Resources — the Handhelds
Horizontal rail (keep the existing carousel interaction) of smaller palm-sized devices:
mini shell, mini Screen showing the resource preview, printed name + one-liner, `VISIT SITE`
key. Arrow controls are round keys with press behavior. Each handheld ~320px wide.

### 6.6 Case Study Template — the case-study console (built, v2)
Head: eyebrow `NODE-PRJ.NN — CASE STUDY` (the same node id as the project's rack slot: newest
first, so the rack and the manual agree), display-lg title, a `← DEVICE RACK` key. Then two
shells in `Reveal`s: **the project's own device** — a Panel holding one Screen with the first
on-disk screenshot at `brightness(.9)`, or the §6.4 idle state (name + metric) when there is
none; archived projects dim the whole shell — and **the manual page**: a `220px | 1fr` grid, mono
sticky sidebar (Published, Status badge, Stack badges, Team names · roles, a Visit key, Outcomes
as MicroLcd chips from `metrics:` frontmatter) beside Inter prose at body-lg, max 68ch. Result
metrics get the LCD chip treatment — numbers glow, context is printed. Images inside the prose
fade up on a CSS `view()` timeline (static where unsupported). Sections opt into the rack rail
as `CASE STUDY` and `MANUAL`.

## 7. Motion & Effects (Full budget — locked; v2 "The Lit Desk" additions marked)

- **Foundation (v2):** durations, eases, stagger steps, depth (perspective, tilt cap, reveal
  hinge) and the z scale are tokens in `console-tokens.scss` — components never carry motion
  literals. Every neumorphic shadow pair is composed from the light vector `--light-dx/--light-dy`
  (canonical top-left `-1,-1` as the `var()` fallback). Panel and Key transforms are single
  composed expressions (`perspective · rotateX · rotateY · translateY(--lift-y)`;
  `translate(--mag-x, --mag-y + --press-y)`) so lift, tilt, drift and press never overwrite one
  another. Screens expose `data-status`; a booting screen's wrapper exposes `data-boot="on"`.
  One shared rAF ticker (`components/motion/ticker.ts`) drives every runtime effect.

- **The pointer lamp (v2):** one document-level tracker (`PointerLight`, mounted in `Providers`)
  writes the light vector `--light-dx/--light-dy` and `--pointer-x/--pointer-y` on `<html>`, so
  every shadow pair and every glass specular is lit from where the cursor is. The lamp swings on a
  short arm inside the top-left quadrant (`-1 … -0.45` per axis) — the pair never flattens or
  flips. Eased (lerp 0.12), quantized to 0.04, written at 30Hz and only on change; on pointer leave it eases
  back and the properties are removed so the CSS fallbacks resume. Fine pointers on ≥1024px only;
  never under reduced motion. `html[data-lighting="static"]` is the kill switch.
- **WebGL dither desk (the ambient layer):** full-viewport canvas behind everything.
  Ordered-dither / Bayer grain over a very slow warm gradient drift in the cream family, plus (v2)
  a soft lamp pool that follows the pointer (read from the shared pointer store, ~640px radius),
  a grain phase that slides with scroll, and a faint desk-edge vignette — the desk is lit, not flat.
  (#D5D2C6 ↔ #CFCBBE), ~8s period, opacity ≤ 0.5 over the flat color. Three.js or raw WebGL
  fragment shader; ~30fps cap; pause when tab hidden; static PNG grain fallback when WebGL
  unavailable or `prefers-reduced-motion`.
- **LCD boot sequence (hero, every arrival):** ~600ms — screen flickers on (two opacity
  stutters), then text lines fade in staggered 60ms. Replays each time the hero mounts
  (revised from once-per-session: the power-on is the point). Skipped on reduced motion.
- **Gauge needles:** animate from 0 to value on viewport entry, spring easing with ~4°
  overshoot, once per page load.
- **Numeric tick:** clock ticks live (1s); stat numbers count up over 800ms on entry,
  tabular nums mandatory.
- **Shell reveals (v2):** scroll-triggered — shells lift off the desk: hinged at the bottom edge,
  from 8° and 24px below, fading in over 400ms ease-out. Shells entering the viewport in the same
  ~120ms window auto-stagger 80ms apart (`index` remains an explicit override); a shell entering
  alone starts at once. One-shot; anything already in view at hydration is never hidden. The
  revealed shell carries `data-revealed`, which log lines and LEDs key their entry motion off.
  Subtle; the desk never moves.
- **Scroll choreography (v2):** the hero console recedes as you scroll past it (scale .965,
  −18px, 55% opacity over the first 520px — a CSS `scroll()` timeline, compositor-only, static
  where unsupported; ≥1024px). Log lines type in after their shell reveals (or after the /now
  screen boots): a 420ms clip reveal with a 70ms stagger — not a blink. An LED inside a freshly
  revealed shell flares once (600ms, one-shot, exempt from the blink budget).
- **Hover:** shells lift (`hover-lift`) and device cards tilt, keys depress on press, LCD *content*
  never animates on hover — only the glass layer (specular) does; screens respond to data, not
  cursors.
- **Smooth scroll (v2):** Lenis (`SmoothScroll` in `Providers`, `lerp 0.1`) smooths the wheel on
  fine pointers and, since the mobile pass, **syncs touch on coarse pointers** (`syncTouch`,
  lerp 0.09, inertia exponent 1.7): a flick decays on the same eased curve as the wheel instead of
  the browser's stepped momentum. The mode is decided once after hydration. It rides the shared
  ticker, is never instantiated before hydration or under reduced motion (native scroll, nothing
  mounted), resyncs its target on every route change so momentum never carries into the next page,
  and intercepts `a[href^="#"]` with a −96px header offset. `ScrollToHash` and the table of contents
  scroll through it when present. Sticky chrome and CSS scroll timelines are unaffected: Lenis moves
  the real scroll position.
- **Idle cursors & per-page boot:** live LCDs may carry one blinking block cursor (hero role
  line; the tail of the /now log — `tail -f`). A page's dominant Screen powers on (~400ms
  flicker) when you arrive at its page — switching pages is switching devices. Blink budget:
  at most one focal blinking element per screen; status microdots don't count, decoration
  never blinks, and nothing animates on archived/off devices.
- **Page transitions:** client-side (App Router) — the chrome, desk grain, and clock persist
  across navigation; never a blank frame or blocking loading state. Each navigation lands
  with a 90ms phosphor settle on the incoming page — no stutters, no movement (a boot-flicker
  and an unlock chip were both tried and cut as too much). First document load skips the
  settle (the hero boot owns it). LCDs don't crossfade.
- **The reference unit (v2):** the 3D handheld in the hero dock idles on a slow float
  (±0.06 units, ~8s) and a ±0.02rad roll, turns toward the pointer (±0.22/±0.32rad from the
  shared pointer store), and yaws up to 0.6rad with scroll, all critically damped. Renders only
  while the dock is in view; static three-quarter pose under reduced motion; ≥1024px, capable
  machines only; lazy chunk on idle, never on the LCP path.
- **Night mode (v2):** switching the lamp is instant — no crossfade, no transition on colours
  (switching a lamp is instant). The desk canvas re-reads its colours on the attribute flip and
  drops to 35% grain; the lamp pool still follows the pointer.
- **Hard rule:** `prefers-reduced-motion: reduce` kills the dither drift, boot sequence,
  needle springs, and count-ups. Everything renders in final state. Non-negotiable.

## 8. Once UI Implementation Notes

- Override at the token layer first: map this palette/type/radius/shadow set onto Once UI's
  CSS custom properties (`--neutral-*`, `--brand-*`, radius and shadow vars) in the theme
  config. Once-ui stays pinned to `data-theme="light"` site-wide (its dark ramp is unaudited
  and off-palette); the console's own night set is `data-console="night"` on `<html>`, applied
  pre-hydration from `localStorage["console.lamp"]` by an inline script at the top of `<body>`.
- Keep Once UI layout primitives (Flex, Grid, Column) — they're structure, not skin. Replace
  surface-level components (Card, Button, Badge, Navbar) with the components in §5, or
  wrap them with the new classes if rebuild cost is high.
- New components to build: `Panel`, `Screen`, `Gauge`, `Rocker`, `Led`, `MicroLcd` (clock/
  location chips), `DitherCanvas`. All client components except Panel.
- The red ambient gradient and the old red CTA styles are removed entirely. The only dark
  palette is the console's Night set (§2); once-ui's dark theme is never enabled. The dev-overlay "1 Issue" badges visible in current
  screenshots are tooling artifacts, not design elements; ignore.
- Fonts: self-host Space Grotesk (variable 300–700) + Geist Mono (variable 100–900) via
  next/font/local (v2; Inter + JetBrains Mono before).

## 9. Guardrails

- Do not flatten shells into flat cards with plain `box-shadow: 0 1px 3px` — the dual-light
  neumorphic shadow pair is the material; if it's missing, the design has failed.
- Never put long prose on an LCD. Never print live data as ink. (See §1 rule.)
- Red is an indicator, not a theme. Audit every red usage against §2.
- One gauge per page, one mint key per page, max one decorative hardware detail per shell.
- Do not introduce pure white (#FFFFFF) surfaces or pure black (#000000) text.
- Preserve the first-viewport signal: a single wide console with gauge + glowing LCD + name.
  If the hero reads as "headline + subtext + two buttons", it has regressed to template.
- Keep Manglish-friendly copy tone where copy is rewritten: plain, direct, a bit playful in
  microcopy (`STATUS: OPEN FOR COLLABS`), never corporate.
- Performance floor: dither canvas + boot sequence must not push LCP past 2.5s on mid-tier
  mobile; the canvas mounts after first paint. three.js ships in one lazy chunk
  (≈170KB gz) loaded on idle, ≥1024px only, never on the LCP path; the pointer lamp writes at
  30Hz and only on change. Every runtime effect has a static `var()` fallback.
- Preserve the first-viewport signal (v2 addendum): the reference unit is an instrument beside the
  LCD, never a hero image; it must never appear before the LCD has painted.