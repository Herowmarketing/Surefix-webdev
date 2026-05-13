# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Sure-Fix Remodeling — a React SPA (Vite + Tailwind CSS v4 + Framer Motion + TypeScript) for a residential remodeling company. No backend or database; purely client-side.

### Development commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | ESLint (warnings for non-component exports are expected) |
| `npm run typecheck` | TypeScript `--noEmit` check |

### Key architecture notes

- **Path alias**: `@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).
- **Tailwind CSS v4**: Uses `@import "tailwindcss"` syntax in `src/index.css`, with `@tailwindcss/vite` plugin — no `tailwind.config.js` needed.
- **Routing**: `wouter` (lightweight router), not React Router.
- **Toasts**: `sonner` library with a thin shadcn-style wrapper at `src/components/ui/sonner.tsx`.
- **Brand assets**: SVGs and mascot image in `src/assets/`. Some image paths in the code reference `/manus-storage/` (external CDN from original Manus AI build environment) — these won't load locally but don't break the app.
- **Analytics**: `index.html` references `%VITE_ANALYTICS_ENDPOINT%` and `%VITE_ANALYTICS_WEBSITE_ID%` env vars for Umami analytics. These are optional; warnings during build are expected and safe to ignore.
