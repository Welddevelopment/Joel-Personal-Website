# joel — personal site

One-page static site. No frameworks, no build step, no dependencies.

## Run locally
Open `index.html` in a browser. That's it.

## Deploy
- **Vercel**: `vercel` from this folder (or drag-drop the folder at vercel.com/new).
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from branch root.

## Files
- `index.html` — all content
- `styles.css` — design tokens + styles (dark by default, light via `prefers-color-scheme`)
- `main.js` — scroll reveal, scroll-driven work timeline, copy-email button
- `assets/favicon.svg`

## Before shipping (optional)
- Add an `og:image` (1200×630) and reference it in `index.html`.
