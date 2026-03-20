# Design System Migration — index.html

**Date:** 2026-03-20
**Status:** Approved

---

## Overview

Migrate `index.html` from the current custom CSS approach (`assets/css/style.css`) to a full **Tailwind CSS** rebuild that implements the design system defined in `DESIGN.md`, using `code.html` as the visual and structural reference.

All existing content (real names, dates, companies, bullet points) is preserved exactly. Only the markup and styling changes.

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Styling approach | Tailwind CSS (CDN) | 1:1 token match with DESIGN.md |
| Dark mode | `class` strategy, `localStorage` | Already in code.html, works without server |
| Navigation | **Responsive** — top nav on desktop (`md+`), bottom tab bar on mobile | Best of both; matches code.html patterns |
| Background animation | **Preserved** — port `.page-bg` + `code-stream` @keyframes from `assets/css/style.css` verbatim into `<style>` block in new HTML | Unique identity element, zero-JS, no equivalent in code.html |
| JS | Keep `assets/js/main.js`, update selectors to match new markup | Scroll, fade-in, nav, theme toggle logic is solid |
| Fonts | Plus Jakarta Sans (headlines) + Inter (body) via Google Fonts | Per DESIGN.md |

---

## Color Tokens (Tailwind Config)

Directly from DESIGN.md:

```
primary: #00685f
primary-container: #008378
primary-fixed: #89f5e7
on-primary: #ffffff
on-primary-fixed: #00201d
surface: #f8fafa
surface-container-low: #f2f4f4
surface-container: #eceeee
surface-container-high: #e6e8e8
surface-container-lowest: #ffffff
on-surface: #191c1d
on-surface-variant: #3d4947
outline-variant: #bcc9c6
secondary: #5f5e5e
```

Dark mode applied via `dark:` Tailwind classes. Dark values follow `code.html` convention:
- bg: `dark:bg-[#0f1717]`, sections: `dark:bg-[#141d1d]`, cards: `dark:bg-[#1a2525]`
- text: `dark:text-emerald-50`, muted: `dark:text-slate-400`
- accent: `dark:text-emerald-400`, hover: `dark:hover:bg-emerald-500`

---

## Background Animation

Ported verbatim from `assets/css/style.css` into a `<style>` block. The `<div>` stays in `<body>`:

```html
<div class="page-bg" aria-hidden="true"></div>
```

```css
.page-bg {
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(circle at 0% 0%, rgba(13,148,136,0.10), transparent 60%),
    radial-gradient(circle at 100% 100%, rgba(15,23,42,0.16), transparent 55%),
    repeating-linear-gradient(90deg,
      rgba(15,23,42,0.35) 0px, rgba(15,23,42,0.35) 1px,
      transparent 1px, transparent 3px);
  opacity: 0.55;
  animation: code-stream 26s linear infinite;
}
.dark .page-bg {
  opacity: 0.75;
  background:
    radial-gradient(circle at 0% 0%, rgba(45,212,191,0.2), transparent 60%),
    radial-gradient(circle at 100% 100%, rgba(15,23,42,0.7), transparent 55%),
    repeating-linear-gradient(90deg,
      rgba(15,23,42,0.75) 0px, rgba(15,23,42,0.75) 1px,
      transparent 1px, transparent 3px);
}
@keyframes code-stream {
  0%   { background-position: 0 0, 0 0, 0 0; }
  50%  { background-position: 0 -120px, 0 80px, -40px 0; }
  100% { background-position: 0 -240px, 0 160px, -80px 0; }
}
```

Note: dark mode selector changes from `[data-theme="dark"]` to `.dark` (Tailwind class strategy).

---

## Navigation

### Desktop Top Nav (`hidden md:flex` on mobile — i.e., visible only on `md+`)

```
<amal_james/>  |  About  Skills  Experience  Services  Contact  | 🌙 | [Get in touch]
```

- Links are smooth-scroll anchors: `#about`, `#skills`, `#experience`, `#services`, `#contact`
- Glassmorphism: `bg-surface/70 dark:bg-[#0f1717]/80 backdrop-blur-xl`
- Ambient shadow: `shadow-sm shadow-slate-900/5`
- Theme toggle: moon/sun SVG swap on `dark` class toggle
- CTA: `bg-primary text-on-primary rounded-xl`
- Mobile hamburger button: `md:hidden`, triggers `nav-mobile` drawer (existing pattern)

### Mobile Bottom Nav (`flex md:hidden`)

Fixed bottom bar, `z-50`, `bg-surface-container-lowest/80 dark:bg-[#0f1717]/90 backdrop-blur-lg`

| Tab | Icon (Material Symbols) | Anchor |
|-----|------------------------|--------|
| About | `person` | `#about` |
| Skills | `terminal` | `#skills` |
| Work | `work` | `#experience` |
| Contact | `alternate_email` | `#contact` |

Active tab: pill background `bg-surface-container-low dark:bg-emerald-900/30`, text `text-primary dark:text-emerald-400`

---

## Sections

### 1. Hero (`bg-surface`)

- **Badge**: green pulse dot (`animate-pulse`, color `primary`) + "Available for freelance" — `bg-primary/10 text-primary rounded-full`
- **H1**: "Amal" plain + "James" gradient — `bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent` (light); `dark:from-emerald-400 dark:to-teal-300` (dark)
- **Role**: "Senior Backend Engineer · Berlin, Germany"
- **Description**: 14+ years copy
- **CTAs**: primary (`bg-primary`) + ghost secondary (`bg-surface-container`)
- **Stats row**: `14+` Years experience · `16+` Microservices · `7` Industries
- **Social**: GitHub + LinkedIn SVGs

### 2. About (`bg-surface-container-low`)

- Profile image left + content right grid (single column on mobile)
- Section eyebrow ("About Me") + title "Engineer. Architect. Problem solver."
- 3 bio paragraphs (preserved exactly)
- Stats: `14+` / `MCA` / `7`
- Meta items: Location · Connect · Education · Freelance status (with `status-available` green pill)

### 3. Skills (`bg-surface`)

- Section eyebrow + `h2` "Technology stack" + desc
- Grid of category cards, each: `bg-surface-container-lowest rounded-2xl` on `bg-surface-container-low`
- **Categories** (all tags preserved from index.html with simpleicons):
  - Backend, Frontend, Infrastructure & Cloud, Databases, Observability, Practices
- **Chip style**: `bg-surface-container-high rounded-full text-xs font-semibold`
- **Chip hover**: `hover:bg-primary-fixed hover:text-on-primary-fixed dark:hover:bg-emerald-500 transition-colors 200ms`

### 4. Experience (`bg-surface-container-low`)

- Section eyebrow + `h2` "Experience & Education"
- Two-column grid (mobile: single col): **Work Experience** | **Education**
- Timeline vertical line: `bg-outline-variant/30`
- **Active dot** (current role): `bg-primary border-4 border-surface ring-2 ring-primary/20`
- **Past dots**: `bg-outline-variant border-4 border-surface`
- All 5 work roles + 2 education entries preserved with dates, companies, bullets, exp-tags
- **Exp-tags**: same chip style as skill chips

### 5. Services (`bg-surface`)

- Section eyebrow + `h2` "How I can help" + desc
- 3×2 responsive grid
- Each card: `bg-surface-container-lowest rounded-2xl p-6` — icon + title + desc
- **6 services preserved**: Full-Stack Dev, Custom Software, Database Architecture, Cloud & Kubernetes, Microservices Architecture, Technical Consulting
- SVG icons from existing index.html preserved

### 6. Contact (`bg-surface-container-low`)

- Two-column: headline left ("Let's work together") + contact links right
- CTA: "Message on LinkedIn" primary button
- Contact items: LinkedIn (message), GitHub, LinkedIn (profile), Location
- No form — links only

### 7. Footer (`bg-surface-container`)

- `<amal_james/>` logo + GitHub + LinkedIn links
- "© 2025 Amal James. Built with care in Berlin."

### 8. Back to Top

- Fixed button, visible after 400px scroll (JS toggle of `.visible` class → `opacity-100`)

---

## JavaScript (assets/js/main.js)

Update selectors to match new Tailwind markup. Key changes:

| Old pattern | New pattern |
|-------------|-------------|
| `document.documentElement.dataset.theme` | `document.documentElement.classList` (`add/remove 'dark'`) |
| `localStorage.theme = 'dark'` | same, but check `classList.contains('dark')` |
| `.nav-mobile.open` | keep same class, add `open` toggling |
| `nav.classList.toggle('scrolled', y > 10)` | same pattern, CSS for `.scrolled` in `<style>` block |
| `.fade-in` / `.visible` | keep same pattern, add animation via `<style>` |

Theme toggle: switch from `data-theme` attribute to `classList.add/remove('dark')` on `<html>`.

---

## Files Changed

| File | Action |
|---|---|
| `index.html` | **Rewrite** — Tailwind classes, all content preserved |
| `assets/js/main.js` | **Update** — theme toggle uses `classList` not `data-theme` |
| `assets/css/style.css` | **Kept, unlinked** — no longer linked from index.html |

---

## Out of Scope

- `inner-page.html`, `portfolio-details.html` — not touched
- `code.html` — reference only, not modified
- New content or sections
