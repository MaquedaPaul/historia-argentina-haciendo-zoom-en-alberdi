# Phase 1: Estructura y Arco del Norte - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the new sub-period `rev-alto-peru-guerra-gaucha` inside `#periodo-revolucion` with six cards: five battle events (Suipacha, Huaqui, Exodo Jujeno, Vilcapugio/Ayohuma, Sipe-Sipe) and one historiographic synthesis card ("Por que Chile"). The sub-nav link must be active and scroll to the section. All cards follow existing patterns (card-expand-toggle, card-detail, reveal-on-scroll, certeza markers, Wikimedia images).

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All gray areas were deferred to Claude's judgment. The following decisions should be made during research/planning based on what fits the existing codebase best:

- **D-01:** Sub-period placement in sub-nav — choose position based on narrative flow and chronological coherence with existing sub-periods
- **D-02:** Date range label for sub-nav link — pick the span that best covers both Phase 1 (expeditions) and Phase 2 (guerra gaucha) content
- **D-03:** Sub-nav link text — choose between full milestone name, shorter evocative label, or whatever fits the existing sub-nav style
- **D-04:** Nota historiografica format — design the in-card pattern for the Castelli/Balcarce controversy in Huaqui (inline callout, collapsible, or other approach)
- **D-05:** Nota historiografica reusability — decide whether to make it a generic `.card-nota-historiografica` class or Huaqui-specific
- **D-06:** "Por que Chile" certeza level — choose between `card-opinion`, a new "sintesis" level, or `card-hecho` based on historiographic consensus
- **D-07:** "Por que Chile" visual style — decide whether the synthesis card looks identical to event cards or visually distinct as a narrative bridge
- **D-08:** Missing images strategy — pick the best available Wikimedia image per card (maps, commander portraits, campaign documents) rather than forcing a uniform approach. Skip image entirely if nothing appropriate exists.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Codebase Patterns
- `index.html` — Full page structure; sub-nav at ~line 361; sub-period pattern at ~line 376; card patterns throughout
- `styles.css` — All card styles, certeza indicators, sub-nav, reveal animations, card-expand-toggle

### Requirements
- `.planning/REQUIREMENTS.md` — ALTO-01 through ALTO-05, ARCO-01, ARCO-02, INTG-02

### Project Context
- `.planning/PROJECT.md` — Established patterns list, constraints, key decisions
- `.planning/STATE.md` — Blockers/concerns for Phase 1 (image availability, synthesis card novelty)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `card-expand-toggle` / `card-detail` pattern: expand/collapse with `hidden` attribute, event delegation via JS
- `card-certeza-indicator`: three levels (hecho/opinion/rumor) with icons and labels
- `events-grid--certeza`: grid container for cards within a sub-period
- `reveal reveal-slide` / `reveal reveal-fade`: IntersectionObserver-based scroll animations with `--reveal-delay` custom property
- `sub-nav__link`: sticky sub-navigation pattern with year span + label
- `card-opinion__quote` / `card-opinion__attribution`: blockquote pattern for opinion cards
- Lightbox modal with event delegation (for images)

### Established Patterns
- Sub-periods are `div.sub-period.reveal.reveal-fade` with `h3.sub-period__title`
- Cards are `article.event-card` with certeza class and `data-certeza` attribute
- Images use Wikimedia Commons URLs with `loading="lazy"`
- Reveal delays increment by 80ms per card within a sub-period
- `content-visibility` per periodo for performance

### Integration Points
- Sub-nav: add new `a.sub-nav__link` inside `.sub-nav` nav element (~line 361)
- Section content: new `div.sub-period` inside `#periodo-revolucion`, positioned relative to existing sub-periods
- No JS changes needed — event delegation on `card-expand-toggle` and IntersectionObserver handle new cards automatically

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User deferred all visual/structural decisions to Claude's judgment, trusting the existing patterns and codebase conventions.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-estructura-y-arco-del-norte*
*Context gathered: 2026-03-26*
