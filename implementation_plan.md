# RCH Marketing Website — Implementation Plan

## 1. Audit (what exists today)

| Area | Finding | Consequence for the site |
|---|---|---|
| Repository | `D:\CarFlow` is the **product app** (Vite 8 + React 19 + Tailwind 4 + Supabase). `/` is the authenticated dashboard. | The marketing site lives in its own project, `D:/RCH_landing_page`, so the app's routes, auth and bundle stay untouched. It can be deployed to its own domain. |
| Product name | The interface name is **RCH — Rent Clever Helper — المساعد الذكي لتأجير السيارات**. `src/i18n/i18n.test.ts` explicitly forbids "CarFlow" in the UI ("the old name is gone"). | Every visible string says **RCH**. "CarFlow" stays an internal/repo name only. Hero copy becomes «أسهل مع RCH». |
| Logo | `src/assets/brand/rch-logo.png` (full, blue on light), `rch-logo-on-blue.png` (reversed: white + orange arc), `rch-mark.png` (mark only, blue). | Used as-is. For the dark header a white mark was **cropped** (not redrawn) from the reversed logo → `rch-mark-on-dark.png`. Proportions untouched. |
| Colours | Sampled from the logo: blue `#3570D8`, orange `#F59C0F`. App tokens: `#2563EB` / `#1D4ED8`. Brief: `#2563EB`, `#F59E0B`, dark `#060A13`. | Tokens below. No new hues; status colours reuse the app's badge tones (emerald / sky / amber / violet / rose / zinc). |
| Typography | App uses **IBM Plex Sans Arabic** (400–700) via `@fontsource`. | Same family on the site → visual continuity between site and product. |
| Product screenshots | **None** in the repo. Capturing the live app would expose real customer data and require signing in. | Product visuals are rebuilt as **faithful UI fragments** using the app's real labels, statuses, badge styles and financial rules, filled with clearly-labelled sample data ("بيانات توضيحية"). Swappable later for real screenshots (one component per pane). |
| Vehicle photography | None in the repo. | No stock / generated cars. Automotive language comes from the logo's **roof line** (the "flow line") and road-like motion, not photos. |
| Real facts available | Support phone/WhatsApp `+968 7768 5747`; "مدعوم ومطور من خلال رواد للحلول التقنية"; currency ر.ع.; features from the codebase. | Only these are used. No pricing, customers, testimonials, statistics, social links or app URL invented. |

## 2. Experience reference (Jisr — studied, not copied)

Taken as *quality bar* only: confident centred Arabic headline on a dark stage, product fragments framing the headline, a product surface rising from the fold, generous whitespace, one idea per screen, sticky product storytelling. Not taken: layout grid, colours, copy, components, illustrations, testimonial/stat blocks.

## 3. Architecture

```
RCH_landing_page/
  index.html                 SEO, OG, lang="ar" dir="rtl"
  public/                    favicon, robots.txt, sitemap.xml, og image
  src/
    main.tsx / App.tsx
    content/                 ar.ts, en.ts, sample.ts (all copy + illustrative data in one place)
    i18n/                    LocaleProvider (ar default, en toggle, dir switching)
    hooks/                   useReveal, useScrollProgress, useReducedMotion, useMediaQuery
    components/
      Brand/  Button/  Header/  Footer/  BrowserFrame/  Badge/  Reveal/  FlowLine/
      product/               UI fragments: FleetPane, ContractPane, PaymentsPane, CalcPane, ReportPane
    sections/
      Hero/  Problem/  ProductStory/  FleetControl/  Accounts/  FinalCta/
    styles/                  tokens.css, globals.css
```

No animation library: IntersectionObserver for reveals, one rAF-throttled scroll reader per sticky section writing a CSS variable (`--p`), CSS transforms/opacity only.

## 4. Page structure (storytelling order)

1. **Header** — floating, transparent on the dark hero, condensed glass bar after scroll. Logo · كيف يعمل · المزايا · عن RCH · language · CTA (WhatsApp). Mobile: `[Logo] [CTA] [Menu]` → full-screen dark sheet with staggered links.
2. **Hero** (dark stage) — headline / text / CTAs reveal in sequence; a product window rises in perspective and flattens on scroll; four controlled floating fragments (vehicle status, open contract, payment, office due) enter one by one.
3. **The problem** (light, editorial, sticky on desktop) — "Excel · واتساب · الدفاتر · ملفات · حسابات يدوية" scattered as real-looking scraps → on scroll they converge into one RCH line: «مع RCH، كل شيء أوضح».
4. **Product story** (sticky split) — 01 الأسطول → 02 العقود → 03 التمديد والدفعات → 04 العمولات والمستحقات → 05 التقارير. Text scrolls, one framed product surface stays and morphs between panes; progress rail. Mobile: stacked chapters, each with its own pane.
5. **Fleet control** — «كل تفاصيل أسطولك تحت السيطرة»: a fleet timeline (cars × days) that slides horizontally with scroll; contracts never overlap, open contracts run to the edge, extensions in orange, overdue in rose.
6. **Accounts & access** — each account sees only its data; admin enable/disable shown as a working toggle.
7. **Final CTA** (dark, mirrors the hero) — «جاهز تدير مكتبك بطريقة أسهل؟» + WhatsApp CTA, roof line drawing itself.
8. **Footer** — logo, anchors, real contact, developer credit, ©.

## 5. Design system (tokens in `styles/tokens.css`)

- **Colour**: `brand #2563EB`, `brand-strong #1D4ED8`, `brand-logo #3570D8`, `accent #F59E0B`, `night #060A13`, `night-2 #0B1324`, `canvas #F6F6F4`, `surface #FFF`, `ink #18181B`, `ink-soft #3F3F46`, `muted #71717A`, `line #E8E7E3`. Status tones = app badge tones.
- **Type**: IBM Plex Sans Arabic. Display `clamp(2.6rem, 6vw, 5.5rem)` / 1.15; H2 `clamp(2rem, 4.2vw, 3.75rem)` / 1.2; body 1.0625–1.25rem / 1.8. Arabic never below 13px; no negative letter-spacing on Arabic.
- **Spacing**: 4px base; section rhythm `clamp(96px, 14vw, 180px)`; gutter 16px (mobile) → 32px → 48px.
- **Radius**: 10 / 16 / 24 / pill. **Shadows**: two levels only (soft, float).
- **Motion**: ease `cubic-bezier(.22,1,.36,1)`; durations 240 / 600 / 900ms; stagger 90ms; everything off under `prefers-reduced-motion`.
- **Breakpoints**: 360 / 390 / 768 / 1024 / 1280 / 1440.

## 6. Product presentation strategy

- Panes are built from the same vocabulary as the app (labels from `src/i18n/ar.ts`, badge tones from `Badge.tsx`, formulas from `lib/finance.ts`: commission = general total × office %, office due = total − commission).
- Every frame carries a small "بيانات توضيحية" caption: honest, and it keeps sample numbers from reading as company statistics.
- Frames are pure DOM (crisp at any DPI, no distortion, no image weight).

## 7. Responsive strategy

- ≥1024: sticky problem + sticky product story + horizontal fleet timeline.
- <1024: sticky behaviour switched off; problem becomes a stacked "before → after"; story becomes chapters with inline panes; timeline becomes a swipeable strip with snap.
- All frames scale by width with fixed aspect boxes; no horizontal page overflow (`overflow-x: clip` on sections + verified at 360/390/768/1280/1440).

## 8. Verification checklist

`npm run build` clean · no console errors · images load · RTL + EN switch · keyboard nav + visible focus · reduced motion · 360/390/768/1280/1440 without overflow.
