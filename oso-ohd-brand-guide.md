# OSO OHD — Brand & Design Reference Guide

This document captures the complete brand identity, design system, and technical specifications for the **OSO OHD** (One Hour Door) premium garage door company website. Use this as the authoritative reference for any new website, landing page, or digital asset built for OSO OHD.

---

## Company Overview

**Company Name:** OSO OHD (One Hour Door)
**Industry:** Commercial & Residential Garage Door and Dock Solutions
**Positioning:** Premium, high-end garage door company — "spec" website valued at ~$10,000
**Hero Tagline:** "COMMERCIAL DOOR & DOCK SOLUTIONS"
**Brand Personality:** Industrial Luxury — precision engineering meets high-end aesthetics

---

## Colour Palette

| Role | Colour | Hex |
|---|---|---|
| Primary Background | Pitch Black | `#000000` |
| Surface / Card Background | Charcoal | `#111111` / `#121212` |
| Accent / CTA / Live Indicators | Safety Orange | `#FF5500` |
| Logo Accent | Black / Orange | Black base with orange mark |

**Usage Rules:**
- Safety Orange (`#FF5500`) is reserved **exclusively** for CTAs (buttons), live indicators, and critical UI accents
- Never use orange for body text or decorative elements
- All backgrounds default to pitch black or deep charcoal

---

## Typography

| Role | Font | Notes |
|---|---|---|
| Display / Hero Title | **Bebas Neue** | Industrial display — all caps, bold presence |
| Body / UI Text | **DM Sans** | Clean, readable, modern sans-serif |
| Stats / Labels / Technical | **JetBrains Mono** | Monospace — conveys technical precision |

**Type Scale:**
- Hero Title: `120px`
- Section Titles: `56px`
- Body Text: `17px`, line-height `1.7`

---

## Design Aesthetic

**Theme:** "Industrial Luxury" — High-Tech Brutalism + Precision Engineering

**Design Philosophy ("Vault"):**
- The scroll-triggered 3-door reveal IS the hero — the entire page is architected around that cinematic moment
- Visual quality benchmarks: [21st.dev](https://21st.dev) and [Awwwards](https://www.awwwards.com)
- Use high-quality, high-resolution imagery of modern glass-panel and matte-black garage doors

**Layout Principles:**
- Split-screen 60/40 sections
- Diagonal clip-path transitions between sections
- Full-width stat bands
- No generic stock photos — source premium luxury garage imagery

---

## Hero Section — Scroll Reveal Animation

The signature interaction of the OSO OHD site:

1. **Initial View:** A closed 3-car modern garage facade (full-screen)
2. **Scroll Action:** As user scrolls, the 3 doors slide **upward** with a staggered spring animation (0.1s delay between each door)
3. **The Reveal:** Opening doors expose a luxury garage interior — high-end SUV, sports car, and custom cabinetry
4. **Parallax:** Interior image subtly scales from `1.0` to `1.1` as doors open to create depth
5. **Container:** 300vh sticky scroll container

---

## Navigation Structure

```
SERVICES / INDUSTRIES / PROCESS / ABOUT / CONTACT
```

- Logo positioned top-left (black/orange)
- Navigation links are clean, uppercase, minimal

---

## Call-to-Action Buttons

Two primary CTAs used throughout the site:
1. **24/7 EMERGENCY** — urgency-driven, Safety Orange
2. **REQUEST SERVICE** — primary conversion CTA, Safety Orange

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js** (React) |
| Styling | **Tailwind CSS** |
| Animations | **Framer Motion** |
| Language | **TypeScript** |

---

## Key Brand Assets

- **Logo:** OSO OHD wordmark — black base with orange accent, positioned top-left in navigation
- **Imagery Style:** Luxury modern garage interiors, matte-black and glass-panel doors, high-end vehicles
- **Icon Style:** Minimal, technical, monochrome with orange highlights

---

## Sections / Page Structure

1. **Hero** — Full-screen scroll-triggered 3-door reveal animation
2. **Services** — Commercial door & dock solutions offerings
3. **Industries** — Sectors served (commercial, residential, industrial)
4. **Process** — How OSO OHD works / service workflow
5. **About** — Company story and credentials
6. **Contact** — Request service form + 24/7 emergency line

---

## Tone of Voice

- **Authoritative and confident** — no fluff, direct and professional
- **Technical precision** — use industry terminology appropriately
- **Premium positioning** — language reflects a high-end service, not a commodity
- **Action-oriented** — CTAs are urgent and clear ("Request Service Now", "24/7 Emergency")

---

## Notes for Future Builds

- Always maintain the Safety Orange (`#FF5500`) as the sole accent colour — do not introduce new accent colours
- The scroll-triggered hero reveal is the brand's signature interaction; preserve or reference it in any new builds
- Typography hierarchy (Bebas Neue → DM Sans → JetBrains Mono) must be maintained for brand consistency
- The site was built with Next.js + Tailwind CSS + Framer Motion; new builds should default to this stack unless otherwise specified
- Keep the "Industrial Luxury" aesthetic — dark backgrounds, high-contrast orange accents, premium imagery
