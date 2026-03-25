---
id: S03
parent: M001
milestone: M001
provides:
  - Three certeza card variants (hecho, opinión, rumor) with distinct visual treatment
  - Reusable card template structure with data-certeza attribute for M002/M003/M004 content
  - 304 lines of certeza CSS including responsive rules and hover states
requires:
  - slice: S01
    provides: CSS custom properties, grid layout, section structure
affects:
  - M002 (uses card templates for colonial period events)
  - M003 (uses card templates for revolution period events — primary content)
  - M004 (uses card templates for national organization period events)
key_files:
  - index.html
  - styles.css
key_decisions:
  - Cards placed in periodo-revolucion section as examples; other sections keep placeholders
  - Color palette: green (#4a7c59) hecho, blue (#4a6fa5) opinión, amber (#b8860b) rumor
  - Card structure uses article elements with data-certeza attribute for programmatic access
  - Type-specific footers: source citation (hecho), blockquote attribution (opinión), origin note (rumor)
patterns_established:
  - Card certeza indicator bar at top with icon + label (✓/💬/⚠️)
  - Image placeholder with 16:9 aspect ratio and descriptive text
  - Each card type has a distinct footer pattern for sourcing/attribution
  - Shared .event-card base class with .card-{tipo} modifier for variant styles
  - data-certeza attribute on article elements for JS access
observability_surfaces:
  - DOM query: document.querySelectorAll('[data-certeza]') returns all certeza cards
  - Computed style: getComputedStyle(el).borderLeftColor differs per type (green/blue/amber)
  - Reveal integration: cards carry .reveal .reveal-slide classes, logged by [Reveal] observer
drill_down_paths:
  - .gsd/milestones/M001/slices/S03/tasks/T01-SUMMARY.md
duration: 20min
verification_result: passed
completed_at: 2026-03-18
---

# S03: Sistema de cards y niveles de certeza

**Built three visually distinct certeza card variants (hecho/opinión/rumor) with semantic HTML, 304 lines of new CSS, and type-specific content patterns — establishing the reusable template for all historical event content in M002–M004.**

## What Happened

Replaced placeholder event cards in the periodo-revolucion section with three certeza-typed example cards, one per type:

1. **Card Hecho (green):** Solid left border, ✓ icon, "HECHO DOCUMENTADO" indicator bar, green-tinted background, source citation footer. Example: Primera Junta de gobierno (25 de mayo de 1810) with Acta capitular citation.

2. **Card Opinión (blue):** Blue left border, 💬 icon, "OPINIÓN ATRIBUIDA" indicator, blockquote with large decorative curly quote, author attribution in blue. Example: Alberdi quote on constitutional organization from *Bases* (1852).

3. **Card Rumor (amber):** Amber left border, ⚠️ icon, "RUMOR" badge pill, italic body text, dashed-border "Origen del rumor" footer explaining provenance. Example: Supposed poisoning of Mariano Moreno (1811).

CSS adds 304 non-blank lines under `/* Cards de certeza */`, including CSS custom properties for the certeza accent palette, shared card structure, three complete variant blocks with distinct colors/backgrounds/footers, hover enhancements, and responsive mobile adjustments. All cards integrate with the existing reveal-on-scroll system via `.reveal .reveal-slide` classes.

## Verification

- 3 cards visible on page, one per certeza type — confirmed via DOM query and visual screenshot
- All structural elements present per card: date, title, image placeholder, text, type-specific footer
- Computed border-left colors are distinct: rgb(74,124,89), rgb(74,111,165), rgb(184,134,11)
- Rumor text renders in italic (fontStyle: "italic")
- Rumor badge present (`.card-certeza-badge-rumor`)
- Opinión blockquote with author attribution and source context confirmed
- Hecho source citation footer with `<cite>` element confirmed
- All cards have `.reveal` classes — logged correctly by `[Reveal]` observer in console
- No console errors (only 404 for favicon, unrelated)
- 304 non-blank CSS lines (≥80 required)
- `data-certeza` attribute present on all three cards

## Requirements Advanced

- R013 — Card system now provides the visual infrastructure for classifying all content by certeza level. Templates ready for M002–M004 content population.
- R014 — Opinión card template establishes the blockquote + author + source context pattern. Alberdi example demonstrates the attribution format.

## Requirements Validated

- None — R013 and R014 require actual content (M002–M004) to fully validate. The visual system is built but not yet populated with real historical content at scale.

## New Requirements Surfaced

- None

## Requirements Invalidated or Re-scoped

- None

## Deviations

- Replaced 4 placeholder cards with 3 certeza cards (not 1:1 replacement). The plan called for 3 example cards by type, which is exactly what shipped. Old placeholder content (generic Revolución/Independencia/Constitución/Caseros) was superseded by the certeza examples with real historical content.
- Old `.certeza-hecho`, `.certeza-opinion`, `.certeza-rumor` CSS stubs from S01 were removed and replaced with the full implementation.

## Known Limitations

- Only the periodo-revolucion section has certeza cards; colonial and nacional sections still have generic placeholder cards. This is by design — real content comes in M002–M004.
- Image placeholders are text-only boxes, not actual images. Real images will be added with content milestones.
- No JavaScript interaction on cards yet (no expand/collapse, no filtering by certeza type). Pure CSS presentation.

## Follow-ups

- None — M002–M004 content milestones will populate cards using these templates.

## Files Created/Modified

- `index.html` — Replaced placeholder event cards in periodo-revolucion with 3 certeza-typed article cards (hecho, opinión, rumor) with full semantic markup
- `styles.css` — Added 304 non-blank lines of certeza card CSS (custom properties, 3 variant blocks, shared structure, hover states, responsive rules); removed old placeholder stubs

## Forward Intelligence

### What the next slice should know
- Card templates live in the periodo-revolucion section of index.html. Copy the article structure for new cards — each needs `event-card card-{tipo}` classes, `data-certeza` attribute, and `.reveal .reveal-slide` for animation.
- The three footer patterns are different per type: `<footer class="card-source">` for hecho, `<footer class="card-opinion__attribution">` inside a blockquote for opinión, `<footer class="card-rumor__origin">` for rumor. Don't mix them.
- CSS custom properties `--certeza-hecho`, `--certeza-opinion`, `--certeza-rumor` define the accent colors and are available globally.

### What's fragile
- The `events-grid--certeza` grid assumes 3 cards side-by-side on desktop. Adding more cards to a section will need either a different grid class or modification to handle variable card counts.
- Card heights vary significantly between types (rumor is tallest due to origin footer). On mobile they stack fine, but mixed grids may look uneven until content is standardized.

### Authoritative diagnostics
- `document.querySelectorAll('[data-certeza]')` — returns all certeza cards with their type. This is the most reliable selector for programmatic access.
- `getComputedStyle(el).borderLeftColor` — visual confirmation of card type without needing to parse class names.
- Console `[Reveal]` debug lines — confirm cards are being picked up by the animation system.

### What assumptions changed
- Original plan assumed cards would be added alongside existing placeholders. Instead, the certeza cards replaced the placeholder cards in the revolution section entirely. This is cleaner — the placeholders served their purpose in S01 and are no longer needed where real card templates exist.
