# Phase 1: Estructura y Arco del Norte - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-26
**Phase:** 01-estructura-y-arco-del-norte
**Areas discussed:** Sub-period placement, Nota historiografica pattern, Synthesis card format, Missing images fallback

---

## Sub-period Placement

### Q1: Where should the new Alto Peru sub-period go in the sub-nav?

| Option | Description | Selected |
|--------|-------------|----------|
| After "Los anos de formacion" (#3) | Position 4. Groups 1810s military content right after Alberdi's formation context. | |
| After "Revolucion e Independencia" (#5) | Position 6. Keeps it with the broader 1800-1820 block. | |
| Before "Revolucion e Independencia" (#5) | Position 5. Alto Peru events precede the general summary. | |
| Tu decides | Claude's discretion | ✓ |

**User's choice:** Tu decides
**Notes:** User deferred all sub-period placement decisions to Claude.

### Q2: What date range label should the sub-nav link show?

| Option | Description | Selected |
|--------|-------------|----------|
| 1810-1821 | Full span including guerra gaucha years | |
| 1810-1815 | Strictly expedition period | |
| 1810-1820 | Round decade | |
| Tu decides | Claude's discretion | ✓ |

**User's choice:** Tu decides

### Q3: Sub-nav link text?

| Option | Description | Selected |
|--------|-------------|----------|
| Alto Peru y la Guerra Gaucha | Full milestone name, descriptive | |
| El Frente del Norte | Shorter, evocative | |
| Tu decides | Claude picks best fit | ✓ |

**User's choice:** Tu decides

---

## Nota Historiografica Pattern

### Q1: How should the nota-historiografica appear inside a card?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline callout box | Styled aside/blockquote inside card-detail with border-left + muted background | |
| Collapsible sub-section | Nested details element, click to expand | |
| Separate tab/toggle | Second toggle button next to "Ver mas" | |
| Tu decides | Claude's discretion | ✓ |

**User's choice:** Tu decides

### Q2: Reusable pattern or Huaqui-specific?

| Option | Description | Selected |
|--------|-------------|----------|
| Reusable pattern | Generic .card-nota-historiografica class for any card | |
| Huaqui-specific only | Just for this card, refactor later | |
| Tu decides | Claude's discretion | ✓ |

**User's choice:** Tu decides

---

## Synthesis Card Format

### Q1: What certeza level for "Por que Chile"?

| Option | Description | Selected |
|--------|-------------|----------|
| Opinion (card-opinion) | Interpretive argument, uses existing pattern | |
| New level: "Sintesis" | New certeza type for historiographic synthesis | |
| Hecho (card-hecho) | Well-established historiographic consensus | |
| Tu decides | Claude's discretion | ✓ |

**User's choice:** Tu decides

### Q2: Should the synthesis card look visually different?

| Option | Description | Selected |
|--------|-------------|----------|
| Same card style | Identical pattern, only content differs | |
| Visually distinct | Different border/background to signal interpretation | |
| Tu decides | Claude picks based on visual language | ✓ |

**User's choice:** Tu decides

---

## Missing Images Fallback

### Q1: What to show when no battle-specific image exists?

| Option | Description | Selected |
|--------|-------------|----------|
| Period maps | General Alto Peru region or campaign route maps | |
| Commander portraits | Portraits of commanders involved | |
| No image | Skip card-image div entirely | |
| Tu decides per card | Claude picks best available per card | ✓ |

**User's choice:** Tu decides per card
**Notes:** Mix of maps, portraits, and documents as available on Wikimedia Commons.

---

## Claude's Discretion

All eight decisions (D-01 through D-08) were deferred to Claude's judgment. User trusts existing codebase patterns and conventions to guide implementation choices.

## Deferred Ideas

None — discussion stayed within phase scope.
