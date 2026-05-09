content = """---
name: ui-ux-pro-max
description: AI-powered design intelligence for UI/UX decisions. Use when building websites, landing pages, dashboards, or any UI component. Provides searchable databases of 67 UI styles, 161 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 15+ tech stacks (Next.js, React, Tailwind, etc.). MUST use before making design system, style, colour, or typography decisions on any web or app build.
license: MIT - github.com/nextlevelbuilder/ui-ux-pro-max-skill
---

# UI/UX Pro Max Skill

Searchable design intelligence database via Python scripts. Use to generate design systems, validate UI decisions, and get stack-specific implementation guidance.

## When to Use

- Building a new page or component (landing page, dashboard, hero section)
- Choosing style, colour palette, or font pairings
- Reviewing UI for UX/accessibility issues
- Implementing animations, navigation, or responsive layouts
- Getting Next.js / React / Tailwind best practices

## Core Commands

All commands run from: `cd /home/ubuntu/skills/ui-ux-pro-max`

### 1. Generate Full Design System (start here)

```bash
python3 scripts/search.py "<product_type> <style_keywords>" --design-system -p "Project Name" -f markdown
```

Returns: pattern, style, colours, typography, effects, anti-patterns, pre-delivery checklist.

OSO OHD example:
```bash
python3 scripts/search.py "commercial service dark industrial luxury high-contrast" --design-system -p "OSO OHD" -f markdown
```

### 2. Domain Search (deep-dive a specific dimension)

```bash
python3 scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Domain | Use For |
|--------|---------|
| `style` | UI styles (glassmorphism, brutalism, dark mode) |
| `color` | Colour palettes by product type |
| `typography` | Font pairings with Google Fonts imports |
| `landing` | Page structure, CTA placement strategies |
| `ux` | Best practices, accessibility, animation rules |
| `chart` | Chart types and library recommendations |
| `product` | Product type pattern recommendations |

### 3. Stack-Specific Guidelines

```bash
python3 scripts/search.py "<keyword>" --stack <stack>
```

Available stacks: `nextjs`, `react`, `html-tailwind`, `vue`, `nuxtjs`, `svelte`, `react-native`, `flutter`, `shadcn`, `swiftui`, `astro`

OSO OHD (Next.js) example:
```bash
python3 scripts/search.py "scroll animation performance image" --stack nextjs
```

### 4. Persist Design System Across Sessions

```bash
python3 scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

Creates `design-system/MASTER.md` (global rules) in the current working directory.

## OSO OHD Workflow Notes

OSO OHD has a fixed brand system. Use this skill for:
1. UX validation before delivery: `--domain ux "animation accessibility loading"`
2. Next.js best practices: `--stack nextjs`
3. New page patterns: `--domain landing`
4. Component style decisions: `--domain style "dark brutalism"`

**IMPORTANT:** OSO OHD colours (`#000000`, `#111111`, `#FF5500`) and fonts (Bebas Neue / DM Sans / JetBrains Mono) are fixed. Override any design system colour/font suggestions with OSO OHD brand values.

## Pre-Delivery UX Checklist

```bash
python3 scripts/search.py "animation accessibility z-index loading" --domain ux
```

Manual checks:
- Contrast ratio >= 4.5:1 for all text
- Touch targets >= 44x44px
- `prefers-reduced-motion` respected for all animations
- No horizontal scroll on mobile (375px)
- Focus states visible for keyboard navigation
- No emoji as structural icons (use SVG/Heroicons/Lucide)
"""

with open('/home/ubuntu/skills/ui-ux-pro-max/SKILL.md', 'w') as f:
    f.write(content)
print('SKILL.md written successfully')
