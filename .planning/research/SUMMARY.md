# Project Research Summary

**Project:** Historia Argentina — M023: Alto Perú y la Guerra Gaucha (1810–1821)
**Domain:** Historical content integration — Argentine wars of independence, military front
**Researched:** 2026-03-26
**Confidence:** HIGH (architecture and implementation details verified against live codebase; factual historical content HIGH; interpretive framing MEDIUM)

## Executive Summary

M023 is a content milestone, not a technology milestone. The existing vanilla HTML/CSS/JS single-page application already handles everything needed: card expansion, IntersectionObserver reveal, sub-nav anchoring, and lightbox — no new libraries or build tooling are required. The research task was to identify what content to build, in what order, from which sources, using which existing patterns. All four research streams converge on a single recommendation: create one new sub-period (`rev-alto-peru-guerra-gaucha`) inserted between the existing `rev-1800-1820` and `rev-1820-1835` sections, containing 8 P1 cards that tell a unified narrative arc from the first patriot victory at Suipacha (November 1810) through the death of Güemes (June 1821).

The recommended approach is a two-movement narrative structure. Movement 1 (cards ALTO-01 through ALTO-06) covers the northern military failures: Suipacha, Huaqui, the Éxodo Jujeño, the Vilcapugio/Ayohuma disasters, Sipe-Sipe, and the connective historiographic card explaining why San Martín went via Chile instead of Alto Perú. Movement 2 (cards GUEM-01 and GUEM-02) covers the defensive phase: Güemes's profile and the guerra gaucha, and Juana Azurduy with the republiquetas. These two movements are causally linked — Güemes defended the frontier because the expeditions failed — and must stay in a single sub-period to preserve that cause-effect arc.

The key risks are historiographic, not technical. The site uses a three-certeza system (hecho/opinión/nota-historiográfica) that requires careful source discipline: Castelli's blame for Huaqui, Güemes's sociological role, Azurduy's military rank, and the republiquetas' coordination are all historically contested. The mitigation strategy is clear: use Sara Mata (2008) and Halperin Donghi as primary interpretive authorities, use Wikimedia Commons verified categories for public domain images, and mark contested interpretations explicitly with the card-opinión or card-nota-historiográfica patterns already established in the codebase.

---

## Key Findings

### Source Stack (from STACK.md)

This milestone runs on existing infrastructure. The "stack" is the source material stack — which historians, which image categories, and which primary documents anchor each card.

**Authoritative academic sources:**
- **Sara Mata, *Los gauchos de Güemes* (2008, Sudamericana):** Only monograph-length academic treatment of the guerra gaucha from a social history perspective; primary authority for all Güemes and republiquetas cards.
- **Tulio Halperin Donghi, *Revolución y guerra* (1972/2014, Siglo XXI):** Standard reference for structural analysis of the 1810 revolution; primary authority for the "why the north failed" interpretive arc card.
- **Bartolomé Mitre, *Historia de Belgrano* (1858, digitized Internet Archive):** Foundational primary historiography; use for battle chronology and maps (Huaqui, Salta), with explicit acknowledgment of his porteño bias.
- **Gabriel Di Meglio (2021 bicentenary interviews, UBA/UNSAM):** Contemporary academic consensus voice; useful for framing the guerra gaucha as strategically necessary.

**Verified Wikimedia Commons image sources:**
- `Category:Battle_of_Huaqui` — 2 files including the Mitre battle plan (essential)
- `Category:Battle_of_Salta` — 5 files including Mitre's topographic map
- `Category:Manuel_Belgrano` — 70 files across 5 subcategories
- `Category:Martin_Miguel_de_Guemes` — 22 files + 5 subcategories (rich asset set)
- `Category:Juana_Azurduy` — 14 files across 3 subcategories
- `Category:Battles_of_the_Argentine_War_of_Independence` — parent category with direct Vilcapugio and Ayohuma maps (critical workaround: no dedicated categories exist for these battles)

**Sources to avoid:** Felipe Pigna's elhistoriador.com.ar (mass-audience, cited by Mata/Halperin Donghi critics for anachronism), revisionist nationalist websites, fandom/Military Wiki compilations.

### Expected Features (from FEATURES.md)

The milestone has a defined MVP of 8 P1 cards that form a coherent two-movement narrative. Without all 8, the Alto Perú story is incoherent.

**Must have (P1 — table stakes for M023 to be complete):**
- ALTO-01: Battle of Suipacha (7 Nov 1810) — first patriot victory, establishes the northern front
- ALTO-02: Battle of Huaqui (20 Jun 1811) — first disaster, establishes the pattern of failure
- ALTO-03: Éxodo Jujeño (23 Aug 1812) — nationally commemorated; the human drama explaining Tucumán
- ALTO-04: Vilcapugio + Ayohuma combined (Nov 1813) — Belgrano's fall; triggers San Martín's Cuyo pivot
- ALTO-05: Sipe-Sipe (29 Nov 1815) — definitive close of the northern route
- ALTO-06: "Por qué San Martín fue por Chile" — connective historiographic card; the milestone's stated narrative goal
- GUEM-01: Güemes — profile, guerra gaucha tactics, and death (1815–1821)
- GUEM-02: Juana Azurduy y las republiquetas — covers Padilla and Warnes in expanded detail

**Should have (P2 — add in second pass within M023 if scope allows):**
- ALTO-00: Castelli y la revolución en el norte (1810–1811) — political/ideological dimension; high complexity
- GUEM-03: La guerra gaucha — táctica e identidad (card-opinión) — sociological interpretation
- GUEM-04: La invasión de De la Serna (1816–1817) — military stakes context

**Defer (v2+/future milestones):**
- Warnes solo card — sits between independence and provincial autonomy; belongs in M024 context
- Belgrano's armistice debate (1813) — specialist interest; defer to a Belgrano deep-dive milestone
- Full biographies of Belgrano or San Martín — covered elsewhere in the site; would duplicate without value

### Architecture Approach (from ARCHITECTURE.md)

The codebase is a static single-page HTML file with all sub-periods as `div.sub-period` elements inside `#periodo-revolucion`. The existing `rev-1800-1820` sub-period covers this time window at a summary level with 5 cards; it cannot absorb 8–12 new cards without destroying its sweep-summary character and exceeding the 3–6 card per sub-period pattern.

**The correct architecture is one new dedicated sub-period**, not an expansion of the existing one and not two separate sub-periods. One sub-period preserves the causal link between the expedition failures and the Güemes defensive phase.

**Major implementation components:**
1. **New sub-period `div#rev-alto-peru-guerra-gaucha`** — inserted at line ~2347 of index.html, between `rev-1800-1820` closing tag and the existing SP1→SP2 Alberdi connector
2. **New Alberdi connector (entry)** — transitions from the independence revolution summary into the northern wars detail; uses witness-child geographic framing (Tucumán was the army's base, Alberdi's hometown)
3. **Relocated/revised Alberdi connector (exit)** — the existing SP1→SP2 connector at lines 2348–2353 must be moved or rewritten to close the northern-front arc before `rev-1820-1835`
4. **New sub-nav `<a>` link** — one-line edit in `nav.sub-nav` at line ~362
5. **8–10 event-card articles** — all follow established HTML template; `card-hecho` or `card-opinion` class; `--reveal-delay` at 80ms increments starting at 0ms

No JavaScript changes. No CSS changes. All systems (IntersectionObserver, expand/collapse, sub-nav sticky, lightbox) use DOM-driven event delegation that automatically picks up new cards.

### Critical Pitfalls (from PITFALLS.md)

1. **Huaqui as "Castelli's fault"** — The defeat had multiple structural causes (terrain, troop desertions, royalist numerical superiority). Attributing it solely to Castelli's jacobin excesses is a 19th-century historiographic construction. Prevention: use `card-nota-historiografica` to surface the interpretive debate explicitly.

2. **Güemes as either barbaric caudillo or immaculate hero** — Both extremes are historically inaccurate. He was a landed military commander with sophisticated alliances and real social costs. Prevention: cite Sara Mata (2008) as primary authority; mark sociological interpretations as `card-opinion`.

3. **Azurduy's rank imprecision** — She is frequently attributed "generala" or "coronela" inaccurately. Historical rank was teniente coronel (Pueyrredón decree, 13 Aug 1816). "Generala" is a 2009 posthumous honorary promotion by Cristina Fernández. Prevention: cite exact decree date and distinguish historical rank from posthumous honor.

4. **Republiquetas as "organized guerrilla movement"** — They were dispersed, often mutually isolated focos with independent local leadership. Prevention: avoid language implying central coordination; each republiqueta leader is a local story, not a networked campaign.

5. **Inserting cards into `rev-1800-1820` instead of creating a new sub-period** — Adds 13–17 cards to a sub-period that holds 5, destroys the summary sweep character, and breaks the established 3–6 card pattern. Prevention: mandatory new sub-period per architecture recommendation.

---

## Implications for Roadmap

Research points to a 3-phase delivery structure within M023, based on narrative dependencies and implementation order.

### Phase 1: Structural Setup and Northern Failure Arc (ALTO cards)
**Rationale:** The architecture work (new sub-period insertion, connector writing, sub-nav update) must come first; it is the container for all cards. The Alto Perú battle cards (ALTO-01 through ALTO-06) form a linear narrative dependency chain — Suipacha → Huaqui → Éxodo → Vilcapugio/Ayohuma → Sipe-Sipe → "Por qué Chile" — and must be written and inserted in sequence. The connective arc card (ALTO-06) cannot be written before the battle cards are finalized.
**Delivers:** Complete northern failure narrative arc (Movement 1). New sub-period visible in sub-nav. Alberdi entry connector live.
**Addresses:** ALTO-01, ALTO-02, ALTO-03, ALTO-04, ALTO-05, ALTO-06
**Avoids:** S3 (duplication with SP1-3), anti-pattern of inserting into existing sub-period, P5 (Sipe-Sipe as "Bolivia lost")

### Phase 2: Güemes and Republiquetas (GUEM cards)
**Rationale:** GUEM cards depend on the Alto Perú arc being established — Güemes's defensive role is only comprehensible as a response to expedition failures. GUEM-01 (Güemes profile + death) should precede GUEM-02 (Azurduy + republiquetas) because the guerra gaucha context is needed to understand the republiquetas' relationship to the Güemes network.
**Delivers:** Complete defensive phase narrative arc (Movement 2). Sub-period closes with Güemes's death (Jun 1821) as natural endpoint.
**Addresses:** GUEM-01, GUEM-02
**Avoids:** P2 (Güemes hagiography), P3 (Azurduy rank error), P4 (republiquetas as organized movement)

### Phase 3: Exit Connector and Verification Pass
**Rationale:** The second Alberdi connector (closing the northern arc before `rev-1820-1835`) can only be written after card content is finalized — it must close the arc the cards established. The reveal-delay stagger values must be verified against the final card count. The existing SP1→SP2 connector relocation is a dependent edit.
**Delivers:** Narrative continuity across the full `#periodo-revolucion` section. Verified reveal animations. Relocated/revised Alberdi connector.
**Addresses:** S2 (contain-intrinsic-size recalculation), anti-pattern 4 (forgotten connector relocation)

### Phase Ordering Rationale

- Phases 1 and 2 follow narrative dependency: the northern failure must be established before the defensive phase response makes sense — this mirrors the historical logic and the card dependency graph in FEATURES.md.
- Phase 3 is always last because the exit connector and animation delays depend on final card content and count being locked.
- The P2 features (Castelli card, guerra gaucha tactics card, De la Serna invasion card) are deliberately excluded from the core three phases; they can be a Phase 4 if time and scope allow within M023, but M023 is complete without them.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Güemes/Azurduy cards):** Sara Mata (2008) is the correct primary source but requires actual access to verify specific claims about the guerra gaucha's social character. The Azurduy card's expanded detail (Padilla's death, Belgrano's sword gift, the Potosí charge) needs precise source verification to meet the certeza standard.
- **Phase 1, ALTO-06 ("Por qué Chile"):** This is the site's first historiographic synthesis card spanning multiple expedition failures. The framing of San Martín's reasoning requires careful balance between documented facts (his Cuyo request, his 1814 diagnosis) and inferential claims (that northern failures "caused" the Andean strategy).

Phases with standard patterns (no additional research needed):
- **Phase 3 (connectors and verification):** Pure implementation of established patterns. The Alberdi witness-child framing is fully documented in ARCHITECTURE.md with three specific strategies. The connector relocation is a mechanical edit with precise line numbers.
- **Phase 1, ALTO-01 through ALTO-05:** Battle cards are factual (hecho certeza); dates are verified at HIGH confidence. Wikimedia Commons image sources are verified with direct category fetches.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack (source material) | MEDIUM | Wikimedia Commons categories verified via direct fetch; academic works verified via publisher/repository pages; some image fallbacks needed for Vilcapugio/Ayohuma/Sipe-Sipe (no dedicated categories) |
| Features | HIGH | Battle dates and outcomes verified at HIGH confidence; narrative dependency map is explicit and reviewed; P1 vs P2 vs v2+ distinctions are well-reasoned |
| Architecture | HIGH | Based on direct inspection of index.html and styles.css; insertion points identified to precise line numbers; all existing systems confirmed DOM-driven with no registration required |
| Pitfalls | MEDIUM | Historical myths identified from academic source criticism; structural/performance pitfalls identified from direct codebase inspection; no live testing of reveal-delay behavior with 10+ card sub-period |

**Overall confidence:** HIGH for implementation decisions; MEDIUM for interpretive content framing

### Gaps to Address

- **Vilcapugio/Ayohuma/Sipe-Sipe images:** No dedicated Wikimedia categories. Plan confirmed (use parent category's direct files + Belgrano/Güemes portraits as fallback), but the actual image selection for these three cards is deferred to execution. Validate specific file names in `Category:Battles_of_the_Argentine_War_of_Independence` before writing card HTML.
- **Sara Mata (2008) full text access:** The book is cited consistently as the primary authority for Güemes and the guerra gaucha but was verified only through a SciELO review and publisher pages, not via direct text access. The Güemes and Azurduy cards will need specific citations; verify key claims against the actual text or use Di Meglio's 2021 synthesis as a more accessible corroborating source.
- **Castelli's Tiahuanaco speech:** If ALTO-00 (Castelli card, P2) is built, the speech text is historically disputed. The card must use `card-nota-historiográfica` and cite the dispute explicitly; do not quote the speech as verbatim without scholarly caveat.
- **`contain-intrinsic-size` recalculation:** Adding 8–12 cards increases the height of `#periodo-revolucion`. PITFALLS.md flags this (S2). Verify the CSS value after insertion and adjust if needed. Low risk for a static site but should be on the verification checklist.

---

## Sources

### Primary (HIGH confidence)
- Direct inspection of `index.html` (lines 360–374 sub-nav, 2216–2353 sub-period structure) — architecture decisions
- Direct inspection of `styles.css` (lines 508–532, 2004) — card and connector patterns
- Wikimedia Commons category fetches (Battle_of_Huaqui, Battle_of_Salta, Manuel_Belgrano, Martin_Miguel_de_Guemes, Juana_Azurduy, Battles_of_the_Argentine_War_of_Independence) — image asset verification
- [Internet Archive: Mitre *Historia de Belgrano*](https://archive.org/details/historiadebelgr00mitrgoog) — battle chronology, maps
- [Internet Archive: *Documentos del archivo de Belgrano* vol. 3](https://archive.org/details/documentosdelarc03muse) — primary documents
- [argentina.gob.ar: Éxodo Jujeño](https://www.argentina.gob.ar/noticias/23-de-agosto-aniversario-del-exodo-jujeno) — official date and framing
- [argentina.gob.ar: Batalla de Suipacha](https://www.argentina.gob.ar/noticias/7-de-noviembre-batalla-de-suipacha-la-primera-victoria-patria) — official date

### Secondary (MEDIUM confidence)
- [Siglo XXI: Halperin Donghi *Revolución y guerra*](https://sigloxxieditores.com.ar/libro/revolucion-y-guerra/) — publisher page; structural analysis framework
- [SciELO review of Sara Mata (2008)](http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S0121-16172011000100012) — academic review confirming Mata as primary authority
- [Di Meglio interview, Página 12](https://www.pagina12.com.ar/272800-sin-la-guerra-gaucha-la-independencia-no-podria-haber-sido-g) — "Sin la guerra gaucha, la independencia no podría haber sido ganada" quote
- Wikipedia ES: Expediciones Auxiliadoras al Alto Perú, Guerra gaucha, Republiquetas — battle dates, outcomes cross-referenced
- Wikipedia EN: Martín Miguel de Güemes, Battle of Sipe-Sipe — dates and key events
- [Museo Histórico Nacional: San Martín strategy shift](https://museohistoriconacional.cultura.gob.ar/noticia/san-martin-y-un-cambio-de-estrategia/) — San Martín's Mendoza arrival date

### Tertiary (LOW-MEDIUM confidence)
- [Historiography of Argentina — Wikipedia](https://en.wikipedia.org/wiki/Historiography_of_Argentina) — revisionism pitfall orientation
- elhistoriador.com.ar (Pigna) — used only for specific dates (Padilla death, Azurduy rank) where date is verifiable against official sources; interpretive claims from this source were excluded

---

*Research completed: 2026-03-26*
*Ready for roadmap: yes*
