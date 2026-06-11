# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Visual design system is specified in design.md — it overrides any styling conventions below."

## What this is

Personal portfolio site for **Nadeem Ramli** (Growth Marketer / Indie Builder / Systems Thinker), forked from the Once UI **Magic Portfolio** template (`@once-ui-system/magic-portfolio`, package name still in `package.json`). It is a Next.js **App Router** site that renders mostly static, content-driven pages. There is no backend/database and no test suite.

> **Read before doing significant work:** **`design.md`** — the locked "Operator Console" design system. As of June 2026 it is **fully implemented** (branch `redesign/operator-console`, phase-gated commits). It remains the source of truth for any restyle; it is updated in the same commit whenever a design decision changes.

## Current state (June 2026)

- Recently upgraded to **Next.js 16.2.9** + **React 19.2.7** (from Next 14 / React 18). The async-request-API migration is done (`params` is awaited in `src/app/projects/[slug]/page.tsx`). Build passes with TypeScript type-checking.
- Builds with **Turbopack** (Next 16 default). `next build` emits a benign Turbopack NFT-tracing warning originating from `getPosts()`'s `fs`/`path` use traced through `sitemap.ts` — safe to ignore.
- Fonts are **self-hosted** (no build-time network dependency on Google Fonts) — see [Fonts](#fonts).
- Lint floor: **112 problems**, all pre-existing in vendored `once-ui/` code, recorded in **`lint-baseline.txt`** (tracked). The gate is "no new findings vs the baseline" — compare per-file error *contents*, not just totals. The real correctness gate is `next build` (it runs the type-checker).

## Commands

```bash
npm run dev        # next dev (Turbopack) — localhost:3000, falls back to 3001 if busy
npm run build      # production build + TypeScript type-check
npm run start      # serve the production build
npm run lint       # eslint . (flat config) — currently noisy, see above
npm run lint:fix   # eslint . --fix
```

Node **>= 20.9.0** required (`engines`, Next 16's floor). There is no single-test command — there are no tests.

When the dev server misbehaves with errors like `Cannot read properties of undefined (reading 'call')` referencing `*.runtime.prod.js`, it's almost always a stale cache from a prior `build`: `rm -rf .next` and restart.

## Tech stack

- **next 16**, **react / react-dom 19**, **@next/mdx 16**, **next-mdx-remote 6** (v6 is the React-19-compatible major)
- **framer-motion 12** (animations on about-page cards), **embla-carousel-react 8** (resource carousels)
- **sass** (SCSS modules + the once-ui token system), **postcss** + `postcss-preset-env`/`postcss-custom-media`
- **gray-matter** (MDX frontmatter), **react-icons** (icon registry), **sharp** (image handling)
- TypeScript is loose: `strict: false` but `strictNullChecks: true`, `allowJs: true` (resource files are `.js`). `tsconfig.json` is partly Next-managed (`jsx: react-jsx`, `.next/dev/types` include were auto-added by Next 16 — leave them).
- Deliberately held back during the upgrade (would add regression risk without serving the Next/React goal): **TypeScript** stays 5.x (not 6), **ESLint** stays 9.x (not 10), and the **PostCSS preset majors** are pinned to their current major.

## Architecture

### Content vs. code — the central pattern
The site is configured almost entirely through `src/app/resources/`, NOT by editing page components. Prefer editing these over touching pages:

- **`config.js`** — site-wide settings: `baseURL`, enabled `routes`, `protectedRoutes`, the `style` theme object, visual `effects` (mask/gradient/dots/lines/grid), `display` (location/time), and `mailchimp`.
- **`content.js`** (~870 lines) — all page copy and data, exported as: `person`, `social`, `newsletter`, `home`, `about`, `resources`, `projects`, `now`. Values use **JSX**, which is why this `.js` file is explicitly in `tsconfig.json`'s `include`. The `about` object is large (lines ~74–595) and drives the heavily-customized about page (experience, skills, tools, principles, case studies).
- **`index.ts`** re-exports both. **Always import from `@/app/resources`** (e.g. `import { person, baseURL, routes } from "@/app/resources"`).

Adding a route means flipping it on in `config.js` `routes` AND creating the App Router page.

### Routing — two routers coexist
**App Router** (`src/app/`) drives all pages:
- `/` (`page.tsx`), `/about`, `/projects` (list), `/projects/[slug]` (MDX detail), `/resources`, `/now`
- `og/route.tsx` — dynamic OG images (edge runtime)
- `sitemap.ts`, `robots.ts`, `not-found.tsx`
- `resource/page.jsx` — a **legacy** singular-`/resource` page not listed in `config.js` `routes`; the live route is `/resources`. Treat `resource/page.jsx` as dead/legacy unless told otherwise.

**Pages Router** (`src/pages/api/`) exists ONLY for the two auth endpoints. Don't migrate these without updating `RouteGuard`.

### MDX-driven projects
Project detail pages are MDX files in `src/app/projects/projects/*.mdx`, rendered by `src/app/projects/[slug]/page.tsx`.
- `src/app/utils/utils.ts` `getPosts([...pathSegments])` reads a directory of `.mdx`, parses frontmatter with `gray-matter`, returns `{ metadata, slug, content }`. The `Metadata` type there defines supported frontmatter: `title`, `publishedAt`, `summary`, `image`, `images`, `tag`, `team`, `link`.
- `generateStaticParams` enumerates slugs; `params` is a **Promise** (Next 15+) — `await` it.
- MDX renders via `src/components/mdx.tsx` (`CustomMDX`), which maps HTML elements to Once UI components, auto-slugifies headings into anchored `HeadingLink`s, routes internal/hash/external links, and renders code via `once-ui/modules/code/CodeBlock`.
- Add a project by dropping a `.mdx` file into `projects/projects/`. Current set: builddd-ai, building-daylog, dealn, expantus, mapping-of-metrics, maximal, properbooky, through-praxis.

### Design system: Once UI (`src/once-ui/`)
Vendored design-system library — treat as a dependency you happen to be able to edit. Build pages by composing its primitives rather than writing raw markup.
- **`components/`** (~67 primitives) — layout (`Flex`, `Row`, `Column`, `Grid`), typography (`Heading`, `Text`, `InlineCode`), inputs, selection, feedback (`Toast`/`ToastProvider`, `Spinner`), media (`Avatar`, `SmartImage`, `Carousel`), navigation (`Button`, `IconButton`, `ToggleButton`, `SmartLink`), data display (`Card`, `Badge`, `Tag`, `Table`, `Accordion`), and effects (`Background`, `RevealFx`, `GlitchFx`, `HoloFx`, `TiltFx`, `Fade`, `LetterFx`). Barrel-exported from `once-ui/components/index.ts`; import via `@/once-ui/components`.
- **`modules/code/`** — `CodeBlock` (Prism syntax highlighting).
- **`hooks/`** — e.g. `useDebounce`.
- **`tokens/`** (SCSS) — `index.scss` imports `scheme`, `function`, `layout`, `border`, `shadow`, `typography`, `theme`. `theme.scss` (large) defines the actual color palettes per `data-*` attribute.
- **`styles/`** — utility SCSS (spacing, flex/grid, color, typography, breakpoints, global resets), imported once in `layout.tsx`.
- **`interfaces.ts` / `types.ts`** — shared prop types and token enums.

### Theming — how it wires together
1. `config.js` exports a `style` object (`theme`, `neutral`, `brand`, `accent`, `solid`, `solidStyle`, `border`, `surface`, `transition`).
2. `layout.tsx` applies each as a `data-*` attribute on the `<html>` element (rendered via `<Flex as="html">`), plus the font CSS-variable classes.
3. `once-ui/tokens/theme.scss` targets those selectors (`[data-theme="dark"]`, `[data-brand=...]`, etc.) to set CSS custom properties.
4. Components reference tokens via props like `background="neutral-weak"` / `onBackground="brand-strong"`, which resolve to `var(--…)`.

The current live theme is **dark** (`style.theme = "dark"`). **Icons** used anywhere (e.g. in `social`) must first be registered in `src/once-ui/icons.ts` (maps names → react-icons).

### App-specific components (`src/components/`)
Custom components layered on top of Once UI. Barrel: `src/components/index.ts` (exports a subset: `Header`, `Footer`, `Mailchimp`, `ProjectCard`, `HeadingLink`, `RouteGuard`).
- **Chrome:** `Header` (nav as `ToggleButton`s from `routes`, live clock, location), `Footer` ("Let's Build Together" CTA + socials), `RouteGuard` (auth gate, see below).
- **Content:** `ProjectCard`, `ResourceCard`, `ResourceCarousel` + `InfiniteResourceCarousel` (Embla / CSS-marquee), `BlogContent`, `Mailchimp` (debounced newsletter form posting to `mailchimp.action`).
- **MDX/navigation helpers:** `mdx.tsx` (`CustomMDX`), `HeadingLink` (copy-permalink heading), `TableOfContents` (IntersectionObserver active-section tracking), `ScrollToHash`.
- **Skills (about page):** `HierarchicalSkillTracker`, `SkillRadarChart` (canvas radar), `SkillSection` — custom data-viz, all client components.
- **`components/about/`:** `CaseStudyCard`, `SideProjectCard`, `HowIWorkSteps`, `ToolsStackGrid` — animated (framer-motion) building blocks for the about page.
- **`components/projects/Projects.tsx`** and **`components/resource/Posts.tsx`** — list builders that call `getPosts()` / read `resources` and render cards by range.

### Auth / protected routes
A lightweight cookie gate, NOT real security:
1. `config.js` `protectedRoutes` maps a path → `true`.
2. `RouteGuard.tsx` (wraps page content in `layout.tsx`) checks the current path; if protected, calls `GET /api/check-auth`, and if unauthenticated renders a password form that `POST`s to `/api/authenticate`.
3. `src/pages/api/authenticate.ts` compares against **`process.env.PAGE_PASSWORD`** (see `.env.example`; the gate fails closed when unset) and sets an httpOnly `authToken=authenticated` cookie (1h). `src/pages/api/check-auth.ts` validates that cookie.

⚠️ The cookie value is a constant — this is a lightweight gate, not real security.

### OG images
`src/app/og/route.tsx` (`runtime = "edge"`) renders a 1920×1080 OG image via `next/og` `ImageResponse`, taking `?title=`. It **fetches its font from `public/fonts/Inter.ttf`** — a separate dependency from the self-hosted app fonts below. Pages build their OG URL as `https://${baseURL}/og?title=${encodeURIComponent(title)}`.

### Fonts
Two independent font setups — don't conflate them:
- **App UI fonts:** self-hosted via `next/font/local` in `layout.tsx`, files in **`src/app/fonts/`** (`inter.woff2`, `space-grotesk.woff2`, `source-code-pro.woff2`). These map to `--font-primary`, `--font-secondary`, `--font-code`. They were converted from `next/font/google` so the build needs no network access. Commit these `.woff2` files.
- **OG image font:** `public/fonts/Inter.ttf`, used only by `og/route.tsx`. Keep it.

### Static export
`next.config.mjs` enables MDX page extensions and sets `images.unoptimized: true`. The `output: 'export'` line is **commented out** — uncomment it to produce a static `out/` directory (an `out/` from a prior export exists in the tree but is gitignored).

## The console component system (implemented design)

`design.md` is fully implemented. The architecture an agent must know:

- **Tokens:** `src/styles/console-tokens.scss` defines every `--console-*` custom property (colors, type, radii, spacing, the neumorphic shadow pairs). Imported in `layout.tsx` AFTER the Once UI sheets. **Mint discipline:** console components use `--console-*` vars exclusively — never `--scheme-*` ramps, never hardcoded colors/shadows. Canonical mint is `#76D2B6`.
- **Components:** `src/components/console/` — `Panel` (device shell), `Screen` (LCD; statuses: sync = red pulse, live = mint, idle = amber, locked = red steady, off = dotless), `Gauge`, `Rocker`, `Led`, `MicroLcd`, `Key` (router-aware: internal hrefs render `next/link`), `Badge`, `Reveal` (scroll reveal), `Screws`/`BootIn` (hardware/per-page boot), `PageTransition` (90ms settle), `DitherCanvasMount` (raw-WebGL desk grain). Barrel: `@/components/console`.
- **Status canon** (everywhere — screens, LEDs, badges): red = activity/attention, mint = healthy/online, amber = standby/pending, none = off/archived. Red is a status language only (≤1% of any viewport).
- **Motion rules:** every effect checks `usePrefersReducedMotion` (`src/components/hooks/`) and renders final-state when reduced. Blink budget: one focal blinking element per screen (hero cursor, /now tail cursor); microdots exempt; decoration never blinks; nothing animates on archived/off devices. Max one decorative hardware detail per shell.
- **Guardrails that have teeth:** live data glows on glass, permanent info is printed ink; one gauge + one mint key per page; never pure white/black.

### The gaugePercent ritual

`src/app/resources/content.js` → `consoleData.focus.gaugePercent` = Order Series installments **drafted ÷ planned, as a %**. It renders in three instruments (hero gauge, /now gauge, Equity "% DRAFTED" readout). Update it whenever an installment is drafted or the plan changes — a stale needle is a lying instrument. It is the last remaining `TODO(nadeem)` placeholder outside unflipped blog drafts.

## Conventions

- Path alias `@/*` → `src/*`.
- Styling is **SCSS / CSS Modules** (`*.module.scss` / `*.module.css`) co-located with components; global tokens live in `once-ui/tokens` and utilities in `once-ui/styles`.
- Multiple lint configs exist: `eslint.config.mjs` (flat config — what `npm run lint` uses), plus legacy `.eslintrc.json` / `.eslintrc.js`, and a `biome.json`. Be aware they disagree; the flat config is the active one.
- `public/images/` holds project/resource/skill/resume imagery referenced by frontmatter and `content.js`.

## Gotchas

- **Stale `.next` cache** → cryptic dev runtime errors. `rm -rf .next` first.
- **Don't trust `npm run lint` as a gate** — it's pre-existingly broken/noisy (see Current state). Use `next build` to verify correctness.
- **Two `params` shapes:** `[slug]` `params` is now a `Promise` — `await` it. The OG route's `url.searchParams` is a normal `Request` API and is unaffected.
- **Browser-extension hydration warnings:** the `<body>` (`<Column as="body">` in `layout.tsx`) has `suppressHydrationWarning` because extensions (e.g. ColorZilla's `cz-shortcut-listen`) inject attributes pre-hydration. This is intentional; keep it.
- **`PAGE_PASSWORD` env var** drives the protected-route gate (`.env.example`); deployments must supply it.
- **Blog drafts:** posts in `src/app/blog/posts/` with `draft: true` are excluded from listing, sitemap, and static params (`dynamicParams = false` makes them hard 404s). Flip the flag to publish.
