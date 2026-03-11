# Amal James — Personal Portfolio

Personal engineering portfolio. Built from scratch — no frameworks, no build tools, no npm packages.

**Live:** [amalrajvinoth.github.io](https://amalrajvinoth.github.io)

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Markup | HTML5 (semantic) | No template engine needed |
| Styling | Vanilla CSS (custom properties) | Full control, zero overhead |
| Scripting | Vanilla JavaScript | 113 lines total |
| Font | Plus Jakarta Sans (Google Fonts) | More character than Inter |
| Hosting | GitHub Pages | Free, zero config |

Zero npm packages. Zero build step. Push to `main` → live in ~60 seconds.

---

## Features

- **Light / Dark theme** — detects `prefers-color-scheme`, persists to `localStorage`
- **No theme flash** — inline `<script>` in `<head>` applies theme before first paint
- **Scroll animations** — native `IntersectionObserver`, no AOS or similar
- **Mobile-first** — responsive at 520px, 768px, 1024px breakpoints
- **Accessible** — semantic HTML5, ARIA labels, keyboard navigable
- **Fast** — 1 CSS file, 1 JS file, 0 blocking scripts, lazy-loaded images

---

## Project Structure

```
├── index.html               # Single-page portfolio
├── assets/
│   ├── css/
│   │   └── style.css        # All styles — custom properties at the top
│   ├── js/
│   │   └── main.js          # Theme toggle, nav, scroll animations
│   └── img/
│       ├── profile-img.jpg  # Profile photo
│       ├── favicon.png
│       └── amal-icon.png    # Apple touch icon
├── .talismanrc              # Secret scanner false-positive whitelist
└── README.md
```

---

## Sections

| # | Section | Purpose |
|---|---------|---------|
| 1 | Hero | Name, title, stats, social links |
| 2 | About | Professional summary, career highlights, contact details |
| 3 | Skills | Tech stack grouped by domain |
| 4 | Experience | Work history + education, 2-column layout |
| 5 | Services | Freelance offerings |
| 6 | Contact | Email, GitHub, LinkedIn, location CTA |

---

## Local Development

No build required. Any of these work:

```bash
# Python (built-in)
python3 -m http.server 8000

# Node.js
npx serve .

# VS Code
# "Live Server" extension → right-click index.html → Open with Live Server
```

Then open [localhost:8000](http://localhost:8000).

---

## Customization

All design tokens are CSS custom properties at the top of `assets/css/style.css`:

```css
:root {
  --accent: #2563eb;      /* primary brand color */
  --font: 'Plus Jakarta Sans', sans-serif;
  --radius-md: 12px;
  /* ... */
}

[data-theme="dark"] {
  --bg: #09090f;          /* dark mode overrides */
  --accent: #60a5fa;
  /* ... */
}
```

Change values in `:root` for light mode, and in `[data-theme="dark"]` for dark mode.

---

## Deployment

GitHub Pages serves from the `main` branch root automatically. After any push:

```bash
git add .
git commit -m "update: description of change"
git push origin main
```

The site updates within ~60 seconds.

---

## License

Personal portfolio — all rights reserved.
Feel free to use the code structure as inspiration, but please don't copy the content or design verbatim.
