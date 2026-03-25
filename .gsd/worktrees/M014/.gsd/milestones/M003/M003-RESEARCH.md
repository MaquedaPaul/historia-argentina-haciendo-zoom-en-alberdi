# M003 — Research: Período 1800-1860 (Foco Detallado)

**Date:** 2026-03-18

## Summary

M003 is the heart of the project — a deep, detailed narrative of the Argentine revolutionary, independence, and constitutional period (1800-1860) with Juan Bautista Alberdi as the narrative thread. This is fundamentally different from M002 (panoramic colonial coverage) in three ways: (1) **scale** — the context defines 7 slices with 40+ tasks vs. M002's 2 slices; (2) **depth** — each event needs extensive text, multiple quotes, and rich multimedia vs. M002's 2-4 sentence excerpts; and (3) **narrative complexity** — Alberdi must weave through events as a living presence, not just a distant reference.

The existing codebase provides a solid foundation: the `#periodo-revolucion` section in `index.html` already has a featured badge ("Corazón del relato"), a period intro with an Alberdi quote, and 3 placeholder cards demonstrating all three certeza types. The CSS has all the visual infrastructure — certeza card system, Alberdi quote styling, featured section treatment, reveal animations, responsive grids. The JS auto-discovers new `.reveal` elements. The primary challenge is **content volume and historical accuracy** — researching, writing, verifying, and classifying ~15-20 event cards with extensive text, Alberdi quotes, and attributed opinions, plus building multimedia elements (images, an animated timeline, sub-navigation).

The recommended approach restructures the M003 context's 7 slices into a more practical 4-slice pipeline: (1) content research + verification (the hard, high-risk work), (2) HTML integration with certeza cards and images, (3) interactive elements (sub-navigation, animated timeline, expand/collapse), and (4) visual polish and testing. This maps the 7 context slices to 4 executable slices by merging research phases (S01-S04 content → 1 research slice) and merging web implementation phases (S06-S07 → 2 implementation slices). S05 (verification) becomes a cross-cutting concern embedded in every slice rather than a standalone phase.

## Recommendation

**Approach: Content-first research in sub-period batches, then bulk HTML integration, then interactivity layer**

### Why restructure from 7 to 4 slices

The context's 7-slice structure maps to a research project, not a web development pipeline. Slices S01-S04 are all "research and write content" for different sub-periods; S05 is verification (a process concern, not a deliverable); S06 is multimedia sourcing; S07 is web development. For a roadmap planner, the natural boundaries are:

1. **Content slice (high risk):** Research, write, verify, and classify ALL ~15-20 events across all four sub-periods (1800-1820, 1820-1835, 1835-1852, 1852-1860) as structured content drafts with sources. This is the hardest work and the bottleneck. The M002 pattern of creating a `CONTENT-DRAFT.md` before touching HTML proved correct and should be scaled up here.

2. **HTML integration slice (medium risk):** Take all verified content drafts and integrate into `index.html` using the existing card templates. Replace the 3 placeholder cards in `#periodo-revolucion` with 15-20 proper certeza cards. Add images from Wikimedia Commons. This is template-mechanical work once content exists.

3. **Interactivity slice (medium risk):** Add sub-navigation within the period, animated timeline (extending the colonial pattern), expand/collapse for detailed content, and Alberdi-specific visual treatment. This is new CSS/JS work.

4. **Polish slice (low risk):** Visual verification, responsive testing, certeza treatment check, narrative flow read-through, final acceptance criteria.

### Why content-first is mandatory

Historical accuracy is the project's hardest constraint (D008, R012). M002 proved that separating research from HTML integration reduces risk. For M003, the content is 4-5× larger and includes attributed quotes (which need exact source verification), rumor classifications (which need origin documentation), and Alberdi's evolving perspective across 50 years. Getting this wrong in HTML and then revising is far more expensive than getting it right in markdown first.

### Card count estimate

The context lists ~32 specific tasks across S01-S04. Not every task maps to a card — some are narrative connective tissue (e.g., T07 in S01 about young Alberdi is context, not a standalone event). A realistic card count that fulfills the "mínimo 12 eventos con contenido detallado" acceptance criterion while staying manageable:

| Sub-period | Cards | Certeza mix | Alberdi presence |
|-----------|-------|-------------|------------------|
| 1800-1820 (Revolución e Independencia) | 4-5 | 3-4 hecho, 1 opinión | Birth context, background |
| 1820-1835 (Anarquía y guerras civiles) | 3-4 | 2-3 hecho, 1 opinión | Student, Gen. del 37 |
| 1835-1852 (Época de Rosas) | 4-5 | 3 hecho, 1-2 opinión, 1 rumor | Exile, intellectual production |
| 1852-1860 (Organización Nacional) | 4-5 | 3 hecho, 1-2 opinión | Bases, Constitution, diplomat |

**Total: 15-19 cards** (~10-12 hecho, 4-5 opinión, 1-2 rumor)

This exceeds the 12-event minimum while keeping Alberdi present in ~60% of events (R011).

## Implementation Landscape

### Key Files

- `index.html` — **Primary target.** Lines ~303-378 contain `#periodo-revolucion` with 3 placeholder cards (Primera Junta hecho, Alberdi opinión, Moreno rumor). These will be replaced with 15-19 proper certeza cards organized by sub-period, plus sub-navigation, an animated timeline, and enhanced intro content. Expected growth: ~200 lines → ~800-1000 lines.
- `styles.css` — **Moderate additions needed.** Existing certeza card system is complete. New CSS needed for: (a) sub-navigation within the period (~40-60 lines), (b) Alberdi-specific quote styling differentiation (~20 lines, extending `.alberdi-quote`), (c) expand/collapse toggle for detailed content (~30-40 lines), (d) animated timeline for 1800-1860 (extend `.colonial-timeline` pattern, ~60-80 lines), (e) sub-period dividers/headers within the events grid (~20-30 lines). Estimated CSS additions: ~170-230 lines.
- `app.js` — **Moderate additions needed.** New JS needed for: (a) expand/collapse toggle functionality (~20-30 lines), (b) sub-navigation scroll tracking within the revolucion section (~40-60 lines — extend the existing Intersection Observer pattern to sub-sections), (c) potentially a period-internal scroll spy for the sub-nav. Estimated JS additions: ~60-100 lines. The existing reveal system and image fallback handlers need zero changes.

### Existing Patterns to Reuse

**Card templates (proven in M002, stable):**
- `card-hecho`: certeza indicator → image → year → title → excerpt → `footer.card-source > cite`
- `card-opinion`: certeza indicator → image → year → title → `blockquote.card-opinion__quote` with attribution
- `card-rumor`: certeza indicator → image → year → title → italic excerpt → `footer.card-rumor__origin`
- `.alberdi-quote`: standalone blockquote for Alberdi quotes between card groups

**Grid + animation patterns:**
- `events-grid events-grid--certeza` for the card container
- `.reveal .reveal-slide` with `--reveal-delay` stagger on each card
- Image fallback via `initImageFallbacks()` in `app.js` (auto-discovers `.card-image img`)

**Animated timeline pattern (from colonial section):**
- `.colonial-timeline` with `.colonial-timeline__track`, `.colonial-timeline__progress`, `.colonial-timeline__marker`
- CSS keyframe animations triggered by `.reveal--visible` class
- `prefers-reduced-motion` handling built in
- This pattern can be cloned and adapted as `.revolucion-timeline` for the 1800-1860 period

**Image sourcing pattern (from M002 KNOWLEDGE):**
- Wikimedia Commons API for verified thumbnail URLs (500px)
- Pre-1900 artworks are public domain
- `card-image-placeholder` as fallback for subjects without suitable images

### Sub-period Structure (New Pattern)

The `#periodo-revolucion` section needs internal structure that doesn't exist yet. The recommended approach:

```html
<section id="periodo-revolucion" class="period period--revolucion period--featured">
  <!-- Period header (exists) -->
  <!-- Period intro with Alberdi quote (exists) -->
  
  <!-- NEW: Sub-navigation -->
  <nav class="sub-nav" aria-label="Sub-períodos">
    <a href="#rev-1800-1820">1800–1820</a>
    <a href="#rev-1820-1835">1820–1835</a>
    <a href="#rev-1835-1852">1835–1852</a>
    <a href="#rev-1852-1860">1852–1860</a>
  </nav>
  
  <!-- Sub-period 1: 1800-1820 -->
  <div id="rev-1800-1820" class="sub-period">
    <h3 class="sub-period__title">Revolución e Independencia (1800–1820)</h3>
    <div class="events-grid events-grid--certeza">
      <!-- 4-5 cards -->
    </div>
  </div>
  
  <!-- Sub-period 2: 1820-1835 -->
  <!-- Sub-period 3: 1835-1852 -->
  <!-- Sub-period 4: 1852-1860 -->
  
  <!-- NEW: Animated timeline for 1800-1860 -->
</section>
```

This requires:
- A `.sub-nav` component (new CSS, ~40 lines)
- `.sub-period` wrappers with headers (new CSS, ~30 lines)
- JS to track active sub-period in the sub-nav (extend Intersection Observer pattern)

### Build Order

1. **First (highest risk): Content research + verification draft**
   - Research all ~15-19 events across 4 sub-periods
   - Write structured content drafts (following M002's `S01-CONTENT-DRAFT.md` pattern)
   - Verify every date, name, place, quote against historical sources
   - Classify each event by certeza level
   - Document Alberdi's connection to each event
   - Verify all Alberdi quotes against original works
   - **This is the bottleneck.** Everything downstream depends on accurate content.

2. **Second: HTML integration + images**
   - Replace 3 placeholder cards with 15-19 verified cards
   - Add sub-period structure (`<div class="sub-period">` wrappers)
   - Source Wikimedia Commons images for each card
   - Add enhanced period intro and Alberdi connecting text between sub-periods
   - Apply reveal animations with stagger delays

3. **Third: Interactive elements**
   - Sub-navigation within the period
   - Animated timeline for 1800-1860 (extending colonial timeline pattern)
   - Expand/collapse for detailed content sections
   - Alberdi-specific visual treatment (highlighted quotes, contextual notes)
   - JS for sub-nav scroll tracking

4. **Last: Polish + acceptance**
   - Visual verification in browser (desktop + mobile)
   - Narrative flow read-through
   - Certeza classification consistency check
   - Responsive testing
   - All acceptance criteria verified

### Verification Approach

1. **Historical accuracy (per-card):** Every event must cite at least 2 reliable historical sources. Every Alberdi quote must reference the original work (title, year, context). Cross-check dates against established historiography.
2. **Certeza classification (systematic):** Review all cards in sequence — is each correctly classified? Are opinion attributions complete? Are rumor origins documented?
3. **Alberdi thread check:** Read through the entire section — does Alberdi appear naturally in ~60% of events? Is he a contextualizing presence, not an overshadowing one?
4. **Visual verification (browser):** Open `index.html`, scroll through `#periodo-revolucion`:
   - Sub-navigation renders and tracks scroll position
   - All cards display correct certeza styling
   - Images load (or fallback gracefully)
   - Reveal animations stagger correctly
   - Animated timeline fires on scroll
   - Expand/collapse toggles work
   - Responsive at 320px and 1920px+
5. **Acceptance criteria check (from M003 context):**
   - ≥12 events with detailed content ✓
   - Each event has extensive text + multimedia ✓
   - Alberdi present without eclipsing others ✓
   - Narrative connects events fluently ✓
   - Sub-navigation functional ✓
   - ≥2 maps/interactive animations ✓
   - Every fact verified + classified ✓
   - Opinions with exact citation ✓
   - Rumors marked explicitly ✓

## Constraints

- **Zero build step (D001).** All content goes directly into `index.html`, all CSS into `styles.css`, all JS into `app.js`. No templating, no markdown pipeline. With 15-19 cards, `index.html` will grow to ~1200-1400 lines total. This is manageable for a single-page static site but approaches the upper limit of hand-authored HTML.
- **Single-file architecture.** No partials, no includes. The `#periodo-revolucion` section will be the longest section in the file by far (~800-1000 lines vs. ~200 lines for colonial, ~50 lines for nacional).
- **Detailed scope (D003).** This period gets deep treatment. Cards should have extensive text (4-8 sentences each), not the 2-4 sentence excerpts of the colonial panoramic cards. Alberdi quotes should be full paragraph-length passages, not one-liners.
- **Historical rigor is non-negotiable (D008, R012).** Every fact, date, name, and quote must be verified. For Alberdi specifically: his quotes must come from identified original works (Bases, letters, speeches), not paraphrased or invented.
- **Alberdi as thread, not protagonist (D007, R011).** He contextualizes events from his perspective. Other próceres (San Martín, Belgrano, Rosas, Sarmiento, Urquiza, Moreno, Mitre) must have their own presence. Target: Alberdi in ~60% of events, others in 40%.
- **Three certeza levels must all appear (D009, R013).** The period has natural candidates for all three: documented events (hecho), attributed opinions from próceres (opinión), and contested historical claims like Moreno's poisoning (rumor).

## Common Pitfalls

- **Alberdi overshadowing other próceres** — The temptation is to make every card about Alberdi. He should appear as a connecting thread and commentator, but San Martín's campaigns, Rosas's government, and the Revolución de Mayo are events that belong to other protagonists. Reserve Alberdi-centric cards for his genuine moments: the Generación del 37, the exile, *Bases*, and the Constitutional Convention.
- **Quote fabrication risk** — Alberdi wrote prolifically, but not every pithy phrase attributed to him online is verified. "Gobernar es poblar" is genuine (from *Bases*, 1852). Other quotes need verification against the original text. Paraphrasing must be marked as such, not presented as direct quotes.
- **Scope creep from 7 context slices** — The M003 context defines 40+ tasks. Not every task needs a card. Some tasks (e.g., "Alberdi estudiante en Buenos Aires") are narrative connective tissue that belongs in intro paragraphs or expanded card details, not standalone cards. The card count should be 15-19, not 40.
- **Card length inconsistency** — "Detailed" doesn't mean every card is 500 words. Key events (Revolución de Mayo, Caseros, Constitución 1853) deserve more text than transitional events (Pacto Federal, Acuerdo de San Nicolás). Use expand/collapse for additional detail on major events.
- **Sub-navigation complexity** — The sub-nav must work within a single `<section>` element. Don't create separate `<section>` elements for sub-periods — that would break the scroll spy and timeline. Use `<div>` wrappers with IDs inside the existing section.
- **Animated timeline scaling** — The colonial timeline has 6 markers across 300 years. The revolucion timeline needs ~12-15 markers across 60 years. The markers will be more densely packed and need smaller labels or a different layout approach (possibly vertical instead of horizontal on mobile).
- **Image availability for this period** — The 1800-1860 period has better image availability than colonial (more paintings, portraits, engravings). Key images: Cabildo Abierto painting, San Martín portraits, Alberdi portraits (multiple ages), Rosas portraits, Caseros battle paintings, Constitution of 1853 documents. All pre-1900 and public domain.

## Open Risks

- **Content volume vs. context window** — 15-19 detailed cards with extensive text, quotes, and sources will be a large amount of HTML. Writing and integrating this in a single task may exceed practical limits. The content research slice should produce a complete markdown draft that the HTML integration slice consumes mechanically.
- **Alberdi quote sourcing** — While *Bases y puntos de partida* (1852) is widely available, Alberdi's earlier works, letters, and speeches are less accessible online. Quotes from the exile period (1838-1852) may require relying on secondary sources that paraphrase rather than quote directly. Each quote's provenance must be documented.
- **Animated timeline density** — With 12-15 events in 60 years, a horizontal timeline may become unreadable on mobile. May need to switch to vertical layout or simplify to show only the 6-8 most significant dates.
- **Expand/collapse interaction** — Adding JS interactivity for content expansion is new territory for this project. The existing JS only has scroll spy and reveal animations. The expand/collapse pattern needs careful implementation to not break the reveal system (e.g., what happens when an expanded card pushes content below the viewport?).
- **Sub-navigation scroll spy accuracy** — Tracking active sub-period within a single section requires a second Intersection Observer with different thresholds than the main scroll spy. The sub-nav must stay fixed within the period while scrolling. This could create UI conflicts with the existing sticky nav.

## Content Architecture: Event Selection

### Sub-period 1: Revolución e Independencia (1800-1820)

| Event | Certeza | Alberdi? | Card type |
|-------|---------|----------|-----------|
| Revolución de Mayo 1810 (Cabildo Abierto, Primera Junta) | hecho | Birth year context | Full detailed card |
| Primeros gobiernos patrios (Junta Grande, Triunviratos) | hecho | No | Concise card |
| Campañas de Belgrano (Norte) y San Martín (Cuyo) | hecho | No | Full detailed card |
| Congreso de Tucumán e Independencia (1816) | hecho | Born in Tucumán | Full detailed card |
| San Martín: cruce de los Andes, Chile, Perú | hecho | No | Full detailed card |

### Sub-period 2: Anarquía y guerras civiles (1820-1835)

| Event | Certeza | Alberdi? | Card type |
|-------|---------|----------|-----------|
| Batalla de Cepeda 1820, caída del Directorio | hecho | No | Concise card |
| Unitarios vs. Federales — causas y líderes | hecho | No | Full card |
| Rivadavia: presidencia y fracaso | hecho | No | Concise card |
| Rosas: primer gobierno + Alberdi y la Gen. del 37 | opinión | Sí — Salón Literario | Full card with Alberdi quote |

### Sub-period 3: Época de Rosas (1835-1852)

| Event | Certeza | Alberdi? | Card type |
|-------|---------|----------|-----------|
| Segundo gobierno de Rosas — Suma del poder público | hecho | No | Full card |
| La Mazorca — terror y control | hecho/rumor | No | Card with rumor elements |
| Generación del 37: exilio e ideas | opinión | Sí — clave | Full card with Alberdi's exile |
| Debate Alberdi-Sarmiento: Civilización y Barbarie | opinión | Sí — central | Full card with opposing views |
| El supuesto envenenamiento de Moreno | rumor | No | Existing placeholder, expand |
| Caseros (1852) | hecho | Sí — context | Full card |

### Sub-period 4: Organización Nacional (1852-1860)

| Event | Certeza | Alberdi? | Card type |
|-------|---------|----------|-----------|
| "Bases y puntos de partida" — la obra cumbre de Alberdi | opinión | Sí — central | Full card with extended quote |
| Congreso Constituyente y Constitución 1853 | hecho | Sí — influencia directa | Full detailed card |
| Secesión de Buenos Aires — Confederación vs. Estado | hecho | Sí — diplomático | Concise card |
| Cepeda 1859 + Pacto de San José de Flores | hecho | No | Concise card |
| Reunificación 1860 | hecho | Sí — context | Concise card |

**Total: 19 events** (12 hecho, 5 opinión, 2 rumor)
**Alberdi presence: 10/19 = 53%** — slightly below 60% target, but his connecting text between sub-periods and quotes throughout the intro will bring effective presence to ~60-65%.

## Candidate Requirements

These findings should be surfaced to the user but NOT auto-bound:

1. **Expand/collapse for detailed cards** — The context mentions "elementos interactivos (expandir/colapsar detalles)" but no requirement exists for this. It would allow extensive content without overwhelming the initial view. **Recommend adding as R015.**
2. **Sub-navigation within periods** — The context mentions "sub-navegación interna del período" and it's in the acceptance criteria. Currently not a standalone requirement. **Recommend adding as R016.**
3. **Animated timeline per period** — The colonial timeline exists but no requirement mandates one per period. The M003 acceptance criteria say "al menos 2 mapas/animaciones interactivas." **Covered by R005 partially, but should be explicit.**
4. **Maximum card text length for detailed vs. panoramic sections** — No requirement distinguishes text length by scope. Detailed sections should have 4-8 sentences (vs. 2-4 for panoramic). **Advisory only — don't formalize.**
5. **Alberdi quote visual differentiation** — R014 covers opinion attribution generally, but Alberdi quotes deserve special treatment (he's the narrative thread). The `.alberdi-quote` CSS class exists but isn't part of the card system. **Advisory — use `.alberdi-quote` for standalone quotes between card groups.**

## Sources

- Existing codebase: `index.html` (459 lines), `styles.css` (1482 lines), `app.js` (295 lines)
- M002 research, roadmap, and content draft patterns (`.gsd/milestones/M002/`)
- Project decisions D001-D019 (`.gsd/DECISIONS.md`)
- Requirements R001-R014 (`.gsd/REQUIREMENTS.md`)
- Project knowledge entries (`.gsd/KNOWLEDGE.md`) — Wikimedia sourcing, CSS animation integration, content draft pattern, card template reuse
- M003 context with 7 slices, 40+ tasks (`.gsd/milestones/M003/M003-CONTEXT.md`)