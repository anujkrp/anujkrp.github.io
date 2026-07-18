# PR Draft: redesign/bold-creative -> main

Title: redesign(bold-creative): modern navy+coral visual refresh

Summary
- Apply the Bold Creative visual direction (navy + coral), Poppins/Inter fonts, brand utilities and animations in src/index.css.
- Refactor header / hero / services / portfolio / footer into components and update hero + header CTAs.
- Accessibility & perf: aria attributes, Skip-to-content link, lazy-loading/async decoding for images, focus states, responsive srcset, and AVIF/WebP fallbacks for portfolio images.

Files of interest
- src/index.css
- src/App.tsx
- src/components/Header.tsx
- src/components/Hero.tsx
- src/components/Services.tsx
- src/components/Portfolio.tsx
- src/components/Footer.tsx
- capture-screenshots.js (helper script)

What remains (follow-up commits)
- Final site-wide color-token swap for any remaining Tailwind tokens to use CSS variables.
- Convert canonical image assets in src/assets to AVIF/WebP and re-run responsive checks.
- Full accessibility sweep (keyboard nav, ARIA semantics, screen-reader testing) and responsive polish.
- CI/perf checks: run Lighthouse on production build and address any regressions.

How to preview locally
1. git fetch origin
2. git checkout redesign/bold-creative
3. npm install
4. npm run dev
5. npm run screenshot:dev (optional; generates ./screenshots)
6. npm run build (validate production build)

Screenshots to attach
1) hero-1200x800.png — AK Design Studio hero: Transform Your Ideas Into Powerful Digital Solutions
2) services-1200x700.png — Services: Comprehensive Digital Services Built To Scale
3) portfolio-1200x900.png — Portfolio: Pioneering Works That Drive Massive ROI

PR Checklist
- [ ] Run local dev server and confirm hero, services, portfolio render correctly
- [ ] Run npm run build and validate production output
- [ ] Quick accessibility smoke-check (axe or Lighthouse) on hero and portfolio pages
- [ ] Confirm images are lazy-loading and AVIF/WebP fallbacks work
- [ ] Confirm dark-mode toggle works and focus states are visible

Merge strategy
- Squash and merge recommended to keep main history tidy.

Notes
- I will continue pushing follow-up commits to the branch (image conversions, final token swap, accessibility fixes). These will appear automatically in the PR.
