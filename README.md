# Personal Site

Source for [laoukili.com](https://laoukili.com), organised as a static site with hand-authored pages and Quarto-based long-form articles.

## Repository layout

- `index.html` – landing page served from the repository root.
- `public/` – compiled assets grouped by type (`css/`, `js/`, `images/`, `icons/`, `downloads/`).
- `content/` – human-edited pages:
  - `content/blog/index.html` – blog listing.
  - `content/blog/understanding-sparsification/` – Quarto project and generated article.
  - `content/research/` – shared academic references.
- `config/tailwind.config.js` – Tailwind configuration pointing to the reorganised paths.
- `src/styles/tailwind-input.css` – Tailwind source file before compilation.
- `public/css/tailwind.css` – compiled Tailwind bundle (checked in for GitHub Pages).
- `public/css/site.css` – custom global overrides layered on top of Tailwind.
- `public/js/site.js` – navigation, theme, and service worker bootstrap.
- `service-worker.js` – root-scoped offline caching manifest.
- `reports/lighthouse.json` – latest Lighthouse audit snapshot.

## Working on styles

Install dependencies once:

```bash
npm install
```

Rebuild the Tailwind bundle when styles change:

```bash
npm run build:css
```

## Licensing

- Code and configuration: MIT License (`LICENSE`)
- Articles and narrative content: Creative Commons Attribution 4.0 (`CONTENT_LICENSE`)
