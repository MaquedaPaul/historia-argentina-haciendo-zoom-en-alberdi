# M002 — Research: Período 1500-1800 (Panorámico)

**Date:** 2026-03-18

## Summary

M002 transforms the colonial period section (`#periodo-colonial`) from placeholder cards into a fully researched, verified, and multimedia-enriched narrative covering ~300 years of history in panoramic scope. The existing codebase from M001 provides a mature foundation: the HTML structure has 3 placeholder cards inside an `.events-grid`, the CSS has a complete certeza card system (`.card-hecho`, `.card-opinion`, `.card-rumor` with 300+ lines of styling), and the JS has reveal-on-scroll animations that automatically pick up new `.reveal` elements. The work is primarily **content authoring + historical verification**, with moderate HTML expansion and minimal CSS/JS changes.

The main challenge is content integrity: every fact, date, name, and quote must be historically verified against reliable sources, and each piece of content must be classified by certeza level. The secondary challenge is multimedia sourcing — images must be historically appropriate (maps, period illustrations) and either public domain or creatable as CSS/HTML representations.

The recommended approach is to work content-first (research → verify → classify), then integrate into HTML using existing card templates, and finally add multimedia. The existing certeza card templates in `periodo-revolucion` serve as exact copy-paste models — no new CSS components are needed for the cards themselves.

## Recommendation

**Approach: Content-driven, template-reuse, verify-before-integrate**

1. **Research and write content for 5 key events** spanning the period: Pueblos originarios (~1500), Spanish arrival and conquest (1516-1580), founding of key cities, Virreinato del Río de la Plata (1776), and Invasiones Inglesas (1806-1807). This matches the M002 context slices exactly.
2. **Verify every claim** against known historical sources before integration. Cross-check dates, names, places. This is a hard requirement (D008, R012).
3. **Classify each content piece** by certeza level. Most colonial period content will be `hecho` (documented facts), with selected `opinión` cards (period chronicles, attributed observations) and `rumor` cards (legends, disputed accounts).
4. **Reuse existing card HTML templates** from `periodo-revolucion` section — copy the `<article class="event-card card-hecho" ...>` structure verbatim and replace content.
5. **Replace the `.events-grid` in `#periodo-colonial`** — swap the 3 placeholder `event-card--placeholder` cards with proper certeza-typed cards.
6. **Add multimedia** — at minimum images (or styled image placeholders with real alt text), and one embedded video or CSS animation.
7. **Upgrade the intro paragraph** with richer panoramic context.

## Implementation Landscape

### Key Files

- `index.html` — **Primary target.** Lines 77-111 contain the `#periodo-colonial` section. Currently has 3 `event-card--placeholder` divs (1536, 1776, 1806). These need to be replaced with proper `<article>` elements using certeza card classes. The template to follow is lines 140-212 (the `periodo-revolucion` certeza cards).
- `styles.css` — **Minimal changes needed.** The certeza card system (lines 790-1132) is complete and scoped by `.card-hecho`, `.card-opinion`, `.card-rumor` classes, not by section. The colonial section already has `period--colonial .event-card { border-top: 2px solid rgba(160, 128, 96, 0.3); }` (line 480). May need: (a) CSS for video embeds/iframes, (b) CSS for real `<img>` elements replacing `.card-image-placeholder`.
- `app.js` — **No changes expected.** The reveal system uses `document.querySelectorAll('.reveal')` at init time. New cards added to the HTML with `.reveal .reveal-slide` classes will be picked up automatically. The scroll spy targets section IDs which don't change.

### Existing Patterns to Reuse

**Card templates (from `periodo-revolucion` section, lines 140-212 of index.html):**

1. **Hecho card** structure:
   ```
   article.event-card.card-hecho.reveal.reveal-slide[data-certeza="hecho"]
     > div.card-certeza-indicator (✓ icon + "Hecho documentado")
     > div.card-image-placeholder (or real <img>)
     > span.event-card__year
     > h3.event-card__title
     > p.event-card__excerpt
     > footer.card-source > cite
   ```

2. **Opinión card** structure:
   ```
   article.event-card.card-opinion.reveal.reveal-slide[data-certeza="opinion"]
     > div.card-certeza-indicator (💬 icon + "Opinión atribuida")
     > div.card-image-placeholder
     > span.event-card__year
     > h3.event-card__title
     > blockquote.card-opinion__quote > p + footer.card-opinion__attribution
   ```

3. **Rumor card** structure:
   ```
   article.event-card.card-rumor.reveal.reveal-slide[data-certeza="rumor"]
     > div.card-certeza-indicator (⚠️ icon + badge "Rumor")
     > div.card-image-placeholder
     > span.event-card__year
     > h3.event-card__title
     > p.event-card__excerpt.card-rumor__text
     > footer.card-rumor__origin
   ```

**Grid wrapper:** Change existing `<div class="events-grid">` to `<div class="events-grid events-grid--certeza">` to get the wider card min-width (22rem vs 20rem) and increased gap.

**Reveal animation:** Every new card needs `class="... reveal reveal-slide"` and optionally `style="--reveal-delay: Xms"` for stagger.

### Content Plan: 5 Events for Colonial Period

| # | Event | Approx. Date | Certeza Type | Rationale |
|---|-------|-------------|--------------|-----------|
| 1 | Pueblos originarios pre-conquista | ~1500 | hecho | Well-documented by archaeology and ethnohistory |
| 2 | Primera fundación de Buenos Aires (Mendoza) | 1536 | hecho | Documented fact, though circumstances debated |
| 3 | Segunda fundación de Buenos Aires (Garay) | 1580 | hecho | Well-documented founding act |
| 4 | Misiones jesuíticas | 1609-1767 | opinión | Include period chronicle observations about the mission system |
| 5 | Creación del Virreinato del Río de la Plata | 1776 | hecho | Royal decree, fully documented |
| 6 | Invasiones Inglesas | 1806-1807 | hecho | Well-documented, pivotal for criollo identity |
| 7 | La Ciudad de los Césares (optional rumor) | Siglos XVI-XVIII | rumor | Classic colonial legend, perfect for rumor card |

**Note:** The context lists 5 tasks (T01-T05), but combining related events and adding a rumor card creates a richer experience. Recommend 5-7 cards total to match panoramic scope without overcrowding. At least 1 of each certeza type to demonstrate the system.

### Build Order

1. **First: S01 content research + S02 verification (parallel).** Research and verify all 5-7 events simultaneously. This is the highest-risk phase — historical accuracy is non-negotiable (D008). Write content drafts with source citations before touching any code.

2. **Second: S04-T01 HTML integration.** Take verified content and slot it into `index.html` using the existing card templates. Replace the 3 placeholder cards with 5-7 proper certeza cards. Add the `events-grid--certeza` class to the grid wrapper. This is low-risk — pure template replication.

3. **Third: S03 multimedia.** Add images (public domain historical illustrations, maps) or create CSS-styled decorative placeholders with meaningful alt text. Add 1 embedded video (YouTube/Vimeo iframe of a relevant short documentary). This requires CSS for responsive iframe embedding if not already present.

4. **Last: S04-T02/T03/T04 layout polish and testing.** Verify certeza visual treatments render correctly, test responsive layout, ensure reveal animations work with the new card count.

**Rationale for this order:** Content verification (the hardest constraint) is proven first. HTML integration is mechanical once content is verified. Multimedia is additive and can be simplified (placeholder images) if needed. Layout polish catches any issues from the expanded card count.

### Verification Approach

1. **Historical accuracy:** Each event's dates, names, and facts must be cross-referenced against at least 2 reliable sources. Document sources in card `<cite>` elements and in the research notes.
2. **Visual verification:** Open `index.html` in browser, verify:
   - Colonial section has 5-7 cards with correct certeza styling (green/blue/amber borders)
   - Cards display certeza indicators (✓, 💬, ⚠️)
   - Reveal animations trigger on scroll
   - Grid layout adapts responsively (single column on mobile)
   - At least 1 multimedia element (image or video) renders
3. **Content classification check:** Every card has `data-certeza` attribute matching its class. Opinions have full attribution (author, source, date). Rumors have origin explanation.
4. **Acceptance criteria from M002 context:**
   - [x] 5 events clave con texto + imagen mínimo
   - [x] Flujo narrativo coherente de 300 años
   - [x] Al menos 1 video o animación
   - [x] Todos los hechos verificados
   - [x] Cada contenido clasificado por nivel de certeza
   - [x] Opiniones con atribución completa
   - [x] Rumores marcados explícitamente

## Constraints

- **Zero build step.** All content goes directly into `index.html`. No templating engine, no markdown-to-HTML pipeline. Cards are hand-authored HTML.
- **Panoramic scope (D003).** This period covers 300 years but should NOT be exhaustive — 5-7 cards is appropriate. The detailed treatment is reserved for M003 (1800-1860).
- **Single file architecture.** All HTML in one file, all CSS in one file, all JS in one file. No partials, no imports. The colonial section is ~35 lines currently and will grow to ~150-200 lines.
- **No external images in repo currently.** The project has zero media assets. Either (a) use external URLs to public domain images (Wikimedia Commons), (b) create an `img/` or `assets/` directory, or (c) keep using styled `.card-image-placeholder` divs with real descriptive text. Recommend option (a) for real images + keeping placeholders as fallback.
- **CSS for video/iframe embedding does not exist yet.** Will need a responsive iframe wrapper (aspect-ratio or padding-bottom trick). ~10-15 lines of CSS.
- **Historical rigor is a hard process constraint (D008, R012).** Every fact must be verified. This is not optional or deferrable.

## Common Pitfalls

- **Anachronistic language or framing** — Colonial period events should be described in historically appropriate terms. Avoid projecting modern political frameworks onto 16th-18th century events. Use period-appropriate context.
- **Date precision vs. accuracy** — Some colonial dates are approximate (e.g., indigenous populations "circa 1500"). Cards should reflect this uncertainty in the year display (e.g., "~1500" or "Siglo XVI") rather than presenting false precision.
- **Overcrowding the panoramic section** — With 5-7 cards plus intro text plus multimedia, the section could become too long for "panoramic" scope. Each card's excerpt should be 2-4 sentences max, not full essays.
- **Image licensing** — Historical images from Wikimedia Commons are generally safe (public domain for pre-1900 works), but verify each image's license status. Paintings and engravings from the colonial period are almost certainly public domain.
- **Card template divergence** — When creating new cards, copy the exact HTML structure from the `periodo-revolucion` examples. Missing a class or nesting element differently will break the CSS styling silently.
- **Reveal animation stagger** — With 5-7 cards, add `--reveal-delay` values (0ms, 80ms, 160ms, etc.) to prevent all cards from animating simultaneously, which looks jarring.

## Open Risks

- **Video embed availability:** Finding a quality, short documentary video in Spanish about colonial Argentina that's embeddable may be challenging. Fallback: use a CSS animation (e.g., an animated timeline or map reveal) instead of a video embed.
- **Image sourcing for pre-conquest period:** Visual representations of pueblos originarios before European contact are limited and often post-contact European illustrations (which carry their own bias). This should be acknowledged in alt text or card context.
- **Content length calibration:** "Panoramic" is subjective. If the roadmap planner creates too many sub-tasks for content, the section could bloat beyond panoramic scope. Recommend hard cap of 7 cards.

## Requirements Analysis

### Table Stakes (must be delivered)
- **R002:** 4-5 events with text + image — this is the core deliverable
- **R012:** Historical verification — non-negotiable process requirement
- **R013:** Certeza classification — visual system exists, must be applied to real content

### Already Satisfied by M001
- **R008, R009, R010:** Timeline, reveal animations, and navigation — all working and will automatically support new content
- **D016:** Certeza card palette and `data-certeza` attribute — CSS complete

### Candidate Requirements (advisory, not auto-binding)
- **Image alt text standard:** All images should have descriptive alt text for accessibility. Not currently a requirement but should be.
- **Source citation format:** Cards should cite sources consistently. The `card-source` footer pattern exists but no format standard is defined.
- **Content length guideline:** "Panoramic" sections should have a defined max word count per card (suggest 80-120 words for excerpt text).

### Out of Scope for M002
- **R003, R011:** Alberdi as narrative thread — that's M003's focus. Colonial period predates Alberdi (born 1810).
- **R006:** Ambient sounds — that's M005.
- **R007:** Full responsive testing — that's M005. Basic responsive works via existing CSS.

## Sources

- Existing codebase analysis: `index.html` (278 lines), `styles.css` (1132 lines), `app.js` (269 lines)
- M001 roadmap and boundary map (`.gsd/milestones/M001/M001-ROADMAP.md`)
- Project decisions D001-D016 (`.gsd/DECISIONS.md`)
- Requirements R001-R014 (`.gsd/REQUIREMENTS.md`)
