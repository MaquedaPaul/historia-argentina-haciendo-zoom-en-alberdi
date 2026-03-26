# Architecture Patterns

**Domain:** Single-page HTML history website — content integration for new military event cards
**Researched:** 2026-03-26
**Confidence:** HIGH — based on direct inspection of index.html and styles.css

---

## Context: What Exists

The `#periodo-revolucion` section currently contains 11 sub-periods rendered as `<div class="sub-period reveal reveal-fade">` elements. A sticky scrollable `<nav class="sub-nav">` sits at the top of the section with anchor links to each sub-period. Between adjacent sub-periods, `<blockquote class="alberdi-quote reveal reveal-slide">` elements serve as narrative connectors.

Current sub-periods (in DOM order):

| DOM id | Label in sub-nav | Year range |
|--------|-----------------|------------|
| `rev-invasiones-inglesas` | Invasiones Inglesas | 1806–1807 |
| `rev-despertar-1808-1810` | El despertar revolucionario | 1808–1810 |
| `rev-alberdi-formacion` | Los años de formación | 1810–1838 |
| `rev-alberdi-quiroga` | Alberdi y Quiroga | 1834–1835 |
| `rev-1800-1820` | Revolución e Independencia | 1800–1820 |
| `rev-1820-1835` | Anarquía y Guerras Civiles | 1820–1835 |
| `periodo-rosas` | Unitarios y Federales | 1820–1852 |
| `rev-1835-1852` | Época de Rosas | 1835–1852 |
| `rev-1852-1860` | Organización Nacional | 1852–1860 |
| `rev-alberdi-rosas` | Alberdi y Rosas en Europa | 1857 |
| `rev-alberdi-balcarce` | Batalla diplomática | 1855–1862 |

The Alto Peru campaigns (1810–1815) and the Guerra Gaucha / Guemes arc (1815–1821) currently have zero cards. The existing sub-period `rev-1800-1820` covers this span but holds only 5 generic cards on: Revolución de Mayo, Junta Grande / Asamblea XIII, Belgrano and San Martin (summary card), Congreso de Tucumán, and San Martin's Andean campaign. That sub-period already covers the same time window but at a summary level; it does not drill into Alto Peru or Guemes at all.

---

## Recommended Architecture

### Do Not Expand `rev-1800-1820`

Adding 8–12 new cards into the existing `rev-1800-1820` sub-period would give it 13–17 cards — far above the established pattern (3–6 cards per sub-period is typical; 6 is the largest observed). This would also destroy the summary character of that sub-period, which currently reads as a sweep of the independence decade.

### Create One New Sub-Period: `rev-alto-peru-guerra-gaucha`

Insert a new dedicated sub-period between `rev-1800-1820` and `rev-1820-1835`. This placement is chronologically correct (1810–1821 sits between those two) and editorially clean: it deepens the independence decade without disturbing the summary arc.

**Proposed id:** `rev-alto-peru-guerra-gaucha`
**Title:** `Las guerras del norte: Alto Perú y la guerra gaucha (1810–1821)`
**Card count:** 8–12 (fits the milestone scope)

This is a single sub-period, not two. The Alto Peru expeditions and Guemes are causally linked (Guemes defended the frontier precisely because the expeditions failed) and share the same narrative arc: the northern front as a necessary sacrifice that made the Andean strategy inevitable. Splitting them into two sub-periods would break that arc and add a second sub-nav entry that is only marginally useful.

---

## Component Boundaries

### New Elements to Create

| Element | Where | Notes |
|---------|-------|-------|
| New sub-period `div#rev-alto-peru-guerra-gaucha` | In `#periodo-revolucion`, after `</div><!-- /#rev-1800-1820 -->` line 2346 | Follows the same `class="sub-period reveal reveal-fade"` pattern |
| New Alberdi connector `blockquote.alberdi-quote` | Between `#rev-1800-1820` closing and the new sub-period | Replaces the existing "CONECTOR ALBERDI — SP1 → SP2" at line 2348 |
| Second Alberdi connector `blockquote.alberdi-quote` | Between the new sub-period and `#rev-1820-1835` | New connector needed; the existing SP1→SP2 connector must be relocated or repurposed |
| New sub-nav link | Inside `nav.sub-nav` at line 361–373 | One new `<a>` entry; position: after the `1800–1820` link |

### Elements to Modify

| Element | Change |
|---------|--------|
| `nav.sub-nav` anchor list | Add `<a href="#rev-alto-peru-guerra-gaucha">` after the `#rev-1800-1820` link |
| Existing "CONECTOR ALBERDI — SP1 → SP2" at line 2348–2353 | The text currently says "creció huérfano entre los ecos de las campañas de Belgrano." This connector sits between `rev-1800-1820` and `rev-1820-1835`. After the new sub-period is inserted, it should be relocated to sit between the new sub-period and `rev-1820-1835`, with its text updated to close the northern-front arc. |
| New connector before the new sub-period | Write a new Alberdi connector that transitions from the independence revolution summary (`rev-1800-1820`) into the northern front detail. |

---

## Data Flow: New Cards into Existing JS Systems

No JavaScript changes are required. Every system is DOM-driven:

- **IntersectionObserver reveal:** Targets `.reveal` class. New cards get `class="event-card ... reveal reveal-slide"`. They are picked up automatically on page load.
- **Expand/collapse toggle:** Uses event delegation on `.card-expand-toggle` clicks. No card registration needed.
- **Sub-nav sticky behavior:** CSS `position: sticky`. The new anchor link requires no JS.
- **Lightbox modal:** Uses event delegation. No registration needed.
- **content-visibility:** Applied at `#periodo-revolucion` wrapper level, not per sub-period. No change needed.
- **`--reveal-delay` stagger:** Set via inline `style="--reveal-delay: Xms"` on each card. Follow the 80ms-per-card increment pattern established in adjacent sub-periods.

The only structural requirement: the new `div#rev-alto-peru-guerra-gaucha` must carry `class="sub-period reveal reveal-fade"` and be a direct child of the `#periodo-revolucion` inner content container, at the same nesting level as all other sub-periods.

---

## HTML Insertion Point (Precise)

```
Line 2345: </div><!-- /.events-grid SP1 -->
Line 2346: </div><!-- /#rev-1800-1820 -->
                                                   ← INSERT new Alberdi connector here (SP1a: rev-1800-1820 → new)
                                                   ← INSERT new sub-period div#rev-alto-peru-guerra-gaucha here
                                                   ← INSERT second Alberdi connector here (SP1b: new → rev-1820-1835)
Line 2355: <!-- SUB-PERÍODO 2: Anarquía y guerras civiles -->
Line 2359: <div id="rev-1820-1835" ...>
```

The existing CONECTOR at lines 2348–2353 (SP1 → SP2) must be moved to become the second of the two new connectors (the one closing the northern-front arc before `rev-1820-1835`), or replaced with a revised text that fits the new narrative flow.

---

## Alberdi Narrative Thread: How to Connect Military Events to a Child Witness

Alberdi was born 29 August 1810 in Tucumán and his father died ca. 1822. His years 1810–1821 are the period of the Alto Peru campaigns and Guemes. He was not a participant; he was a child in the city closest to the front.

**The connection is geographic and biographical, not participatory.** Tucumán was:
- The headquarters of the Army of the North (Belgrano commanded there 1812–1813)
- The location of the 1816 Congress of Independence
- Behind the Güemes defensive line — the last barrier before Buenos Aires

Alberdi's father Salvador was documented as a friend and supporter of Belgrano during the northern campaigns. The child Alberdi grew up in a household directly tied to the officers who fought and lost at Vilcapugio and Ayohuma.

**Three narrative strategies, in order of editorial strength:**

1. **Witness-child framing (recommended):** The Alberdi connectors should frame him as a child who heard the dispatches, whose father's friend was the general retreating from Alto Peru, who saw the wounded pass through Tucumán. Not a participant — a witness. This is historically accurate and thematically rich: the child who would later write the constitution grew up in the shadow of the wars that made constitution-writing necessary.

2. **Aftermath framing:** The defeats at Huaqui (1811), Vilcapugio (1813), Ayohuma (1813), and Sipe-Sipe (1815) each produced waves of retreating soldiers and refugees moving south through Tucumán. The 1812–1813 period saw Belgrano quartered in Tucumán itself. This is documented context for the Alberdi childhood household.

3. **Retrospective framing (for card-detail sections):** Alberdi wrote about the failures of the revolutionary generation in his 1837 Salón Literario discourse and in Bases (1852). These texts can be used in `card-detail` expanded sections on the defeats — not as direct witnesses but as retrospective judgments by someone who grew up with the consequences.

**What to avoid:** Do not claim Alberdi "remembered" specific battles he was 1–4 years old during. The existing BIOG-3 card at line 1374 already notes the family's patriot alignment. The connectors and card-detail sections should stay in the witness/child register, not fabricate memories.

**Recommended Alberdi connector text pattern for this new sub-period:**

The connector before the sub-period should invoke the geographic reality: Tucumán was not a rear city — it was the army's home base. The connector after should close with the consequence: the northern front held, at great cost, long enough for San Martin to prepare his crossing of the Andes. Alberdi, child of Tucumán, grew up in the city where this bargain was struck.

---

## Card Structure Patterns to Follow

Each card in the new sub-period should use the established template:

```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Xms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="[wikimedia-url]" alt="[descriptive alt with attribution]" loading="lazy">
  </div>
  <span class="event-card__year">[year or date range]</span>
  <h3 class="event-card__title">[title]</h3>
  <p class="event-card__excerpt">[excerpt — visible without expansion]</p>
  <button class="card-expand-toggle" aria-expanded="false">
    <span class="card-expand-toggle__text">Ver más</span>
    <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
  </button>
  <div class="card-detail" hidden>
    <p>[expanded detail — may include Alberdi connection here]</p>
  </div>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>[source citation]</cite>
  </footer>
</article>
```

For `card-opinion` (historiographic interpretation), replace `card-hecho` with `card-opinion`, the certeza indicator with the `💬` icon and "Interpretación historiográfica" label, and wrap the excerpt content in `<blockquote class="card-opinion__quote">`.

For cards with historiographic debates, add `<p class="card-nota-historiografica">` inside the `card-detail` section. This is appropriate for: the Huaqui defeat (blame between Castelli and Balcarce), Güemes's death (ambush circumstances), and the republiquetas' ultimate failure (structural vs. tactical explanation).

`--reveal-delay` increment: 80ms per card, starting at 0ms. For 8 cards: 0, 80, 160, 240, 320, 400, 480, 560ms.

---

## Sub-Period Block Comment Convention

Follow the established comment header pattern above each sub-period:

```html
<!-- ══════════════════════════════════════════════════
     SUB-PERÍODO N: [Title] ([year range])
     N eventos — N hecho, N opinión
     ══════════════════════════════════════════════════ -->
<div id="rev-alto-peru-guerra-gaucha" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">Las guerras del norte: Alto Perú y la guerra gaucha (1810–1821)</h3>
  <div class="events-grid events-grid--certeza" aria-label="Eventos del sub-período Las guerras del norte (1810–1821)">
```

---

## Suggested Card Inventory (8–10 cards)

This maps the M023 scope to the card structure. Final certeza assignments are editorial decisions, but the following breakdown is architecturally sound:

| Card id | Topic | Certeza | Alberdi angle |
|---------|-------|---------|---------------|
| NORTE-01 | Expedición al Alto Peru I: Huaqui (1811) | hecho | Father's friend Castelli commanded |
| NORTE-02 | Belgrano al norte: Tucumán y Salta (1812–1813) | hecho | Belgrano quartered in Tucumán, Alberdi age 2–3 |
| NORTE-03 | Vilcapugio y Ayohuma: las dos derrotas (1813) | hecho | none in excerpt; card-detail can note child-Tucumán context |
| NORTE-04 | Sipe-Sipe y el fin de las expediciones (1815) | hecho | none direct |
| NORTE-05 | ¿Por qué fracasó el norte? El arco interpretativo | opinion | Alberdi's 1852 Bases as retrospective — "the revolution's lesson" |
| NORTE-06 | Las republiquetas: Padilla, Warnes, Juana Azurduy | hecho | geographic witnesses of the people behind the front |
| NORTE-07 | Güemes: perfil y la guerra gaucha | hecho | geographic: Güemes defended Salta/Jujuy, the road to Tucumán |
| NORTE-08 | La línea defensiva de Güemes (1815–1821) | hecho | none direct; card-detail: Tucumán was behind this line |
| NORTE-09 | La muerte de Güemes (1821) | hecho | Alberdi age 10, in Buenos Aires since 1824 — no direct connection |
| NORTE-10 | El norte que se perdió: causa de la estrategia andina | opinion | Retrospective Alberdi: the northern sacrifice enabled San Martin's plan |

Cards NORTE-01 through NORTE-09 go inside `div#rev-alto-peru-guerra-gaucha`. NORTE-10 (the interpretive arc card) could serve as a closing card within the same sub-period, or as standalone content if the milestone scope allows.

---

## Build Order

Dependencies exist in this order; follow them strictly:

1. **Write new Alberdi connector (before new sub-period).**
   Depends on: nothing. Can be written first to establish the narrative entry point.

2. **Build card HTML for NORTE-01 through NORTE-09 (or whatever final count).**
   Depends on: content research (historical accuracy). Cards can be drafted in parallel but should be sequenced Huaqui → Belgrano → Vilcapugio/Ayohuma → Sipe-Sipe → Republiquetas → Guemes arc → death for narrative coherence.

3. **Wrap cards in the new sub-period `div#rev-alto-peru-guerra-gaucha`.**
   Depends on: card HTML complete.

4. **Insert the new sub-period block into index.html at line ~2347.**
   Depends on: sub-period block complete.

5. **Write the second Alberdi connector (after new sub-period, before rev-1820-1835).**
   Depends on: card content finalized — the connector must close the arc the cards established.

6. **Update the existing SP1→SP2 connector at lines 2348–2353.**
   Depends on: step 5 — this existing connector either becomes the second connector (updated text) or is removed and replaced.

7. **Add the new sub-nav `<a>` link.**
   Depends on: the new `div` id is finalized. This is a one-line edit in the `<nav class="sub-nav">` block at line 362.

8. **Verify reveal-delay values are sequential starting at 0ms.**
   Depends on: final card count known.

No CSS changes are required. All visual patterns (card colors, grid layout, expand/collapse, alberdi-quote blockquote) are already defined in `styles.css` and apply automatically via existing class names.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Inserting Cards Directly into `rev-1800-1820`

**What goes wrong:** The sub-period becomes too long (13–17 cards), destroys the sweep-summary character of that section, and creates a section that takes several minutes to scroll through with no visual break.

**Instead:** New dedicated sub-period with its own sub-nav anchor.

### Anti-Pattern 2: Creating Two Separate Sub-Periods (Alto Peru | Guemes)

**What goes wrong:** The causal link between the two — "Guemes defended because the expeditions failed" — is the entire editorial point of this milestone. Splitting them severs the cause-effect arc and adds a sub-nav entry that duplicates scope.

**Instead:** One sub-period that opens with the expeditions and closes with Guemes's death, with a thematic arc: attack → failure → defensive adaptation → holding the line long enough for San Martin.

### Anti-Pattern 3: Fabricating Alberdi's "Memories" of Battles

**What goes wrong:** Alberdi was 1–5 years old during the Alto Peru campaigns. Any claim that he "witnessed" or "remembered" specific battles is historically inaccurate and damages the certeza epistemology the site depends on.

**Instead:** Witness-child framing using documented facts: Belgrano was his father's friend, Tucumán was the army's base, Alberdi grew up in the consequential geography. Card-detail sections can cite his adult retrospective writings without claiming childhood memory.

### Anti-Pattern 4: Forgetting to Relocate the Existing SP1→SP2 Connector

**What goes wrong:** If the new sub-period is inserted between `rev-1800-1820` and `rev-1820-1835` but the existing connector at line 2348 is left in place, the narrative will jump directly from the independence revolution summary into the northern wars without transition.

**Instead:** The existing connector must be either moved (to close the northern-wars sub-period) or replaced with two new connectors: one entering the northern wars, one exiting.

---

## Scalability Considerations

This is a static content site. The only scalability concern is page weight: the current page is 429KB of HTML. Adding 8–12 cards at the pattern density observed (~250–400 words per card with expanded detail) will add approximately 15–25KB. This is within acceptable range for a static site on GitHub Pages. No lazy-loading changes are needed beyond the existing `loading="lazy"` on `<img>` tags.

---

## Sources

- Direct inspection of `index.html` (lines 360–374 for sub-nav, 2216–2353 for rev-1800-1820 and adjacent connectors, all sub-period `id` attributes)
- Direct inspection of `styles.css` (lines 508–532 for `.alberdi-quote`, lines 2004 for `.sub-period + .alberdi-quote`)
- `.planning/PROJECT.md` for milestone scope, Alberdi biographical data, and tech stack constraints
- `S01-CONTENT-DRAFT-M023.md` for established content patterns and editorial conventions
