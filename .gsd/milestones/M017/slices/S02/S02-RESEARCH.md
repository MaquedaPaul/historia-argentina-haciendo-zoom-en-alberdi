# S02: Integración HTML — Research

**Milestone:** M017 — Urquiza: Perfil y Trayectoria
**Slice:** S02 — Integración HTML
**Date:** 2026-03-24
**Complexity:** Light — well-understood pattern applied to known code.

---

## Summary

S02 is mechanical HTML integration. All content is verified in `S01-CONTENT-DRAFT.md` — no historical research needed. The task is: insert a new `<div id="rev-urquiza-perfil">` sub-period block with 6 cards into `index.html`, and add one sub-nav link. Every pattern required (card-hecho, card-opinion, data-certeza, card-nota-historiografica, card-nota-certeza, reveal stagger) is already in use elsewhere in the file. S02 does not add CSS or JS.

The insertion point is the grep-stable anchor `<!-- /#rev-1835-1852 -->` at line 2270. The new block goes **immediately before** that closing comment. The sub-nav link (8th) goes into the `<nav class="sub-nav">` block at lines 326–334.

## Recommendation

Single task: build the full HTML block from the draft and splice it in two places (sub-nav + body insertion). Use the Write tool for the temp file containing the new HTML, then edit the two splice points. Verify with grep counts.

Do **not** write a Python script — Python is unavailable (KNOWLEDGE.md). Use `node -e` or pure bash greps for verification.

---

## Implementation Landscape

### Key Files

- `index.html` — the only file to modify. All changes are confined to two locations:
  1. **Sub-nav** (line 333–334): add 8th `<a>` element before the closing `</nav>`
  2. **Body** (line 2270): insert new `<div id="rev-urquiza-perfil">` block immediately before `<!-- /#rev-1835-1852 -->`

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — source of truth for all card content. Read-only for S02.

### Exact Insertion Targets

**Target 1 — Sub-nav (add 8th link):**
The current 7 links end at line 333:
```html
          <a href="#rev-1852-1860" class="sub-nav__link">1852–1860<span class="sub-nav__link-label">Organización Nacional</span></a>
```
Insert after this line:
```html
          <a href="#rev-urquiza-perfil" class="sub-nav__link">1801–1851<span class="sub-nav__link-label">Urquiza: Perfil</span></a>
```

**Target 2 — Body (insert sub-period before `<!-- /#rev-1835-1852 -->`):**
The anchor is at line 2270. The CONECTOR ALBERDI SP3→SP4 begins at line 2272. New block must be between line 2270 and line 2272 — i.e., immediately before `<!-- /#rev-1835-1852 -->`.

### Card Templates to Follow

All templates exist in `index.html` — copy structure exactly:

**card-hecho with image** (see lines 2118–2138, SP3-1):
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="URL" alt="ALT" loading="lazy">
  </div>
  <span class="event-card__year">DATE</span>
  <h3 class="event-card__title">TITLE</h3>
  <p class="event-card__excerpt">EXCERPT</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>SOURCES</cite>
  </footer>
</article>
```

**card-hecho without image** (URQ-2): same but omit `<div class="card-image">` block.

**card-opinion with data-certeza="debatido"** (see lines 1753–1784, S14-3):
```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="URQ-5" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">⚖</span>
    <span class="card-certeza-label">Debate historiográfico</span>
  </div>
  <div class="card-image">...</div>
  <span class="event-card__year">DATE</span>
  <h3 class="event-card__title">TITLE</h3>
  <p class="event-card__excerpt">EXCERPT TEXT</p>
  <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> TWO-POSITION TEXT</p>
  <footer class="card-source">...</footer>
</article>
```
Note: URQ-5 has the ⚖ icon (not 💬) per D058. The card-opinion__quote / blockquote pattern is NOT used for "debatido" cards — only `card-nota-historiografica` paragraphs.

**card-opinion with data-certeza="opini&#xF3;n"** (see line 1851, S17-1):
```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" data-id="URQ-6" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
    <span class="card-certeza-label">Opinión / debate interpretativo</span>
  </div>
  <span class="event-card__year">DATE</span>
  <h3 class="event-card__title">TITLE</h3>
  <p class="event-card__excerpt">EXCERPT (attributed paraphrase — NO blockquote)</p>
  <footer class="card-source">...</footer>
</article>
```
Note: URQ-6 uses `data-certeza="opini&#xF3;n"` with the HTML entity per D053/D057. The excerpt is a paraphrase (no `<blockquote>`) — URQ-6 deliberately avoids adding another `alberdi-quote` blockquote per the draft warning.

### Card-specific details

| Card | data-id | certeza | class | image | reveal-delay |
|------|---------|---------|-------|-------|--------------|
| URQ-1 | URQ-1 | hecho | card-hecho | `Justo_José_de_Urquiza.jpg` (500px thumb, already in use) | 0ms |
| URQ-2 | URQ-2 | hecho | card-hecho | none | 80ms |
| URQ-3 | URQ-3 | hecho | card-hecho | `Palacio_San_José_Fachada.JPG` (500px thumb confirmed) | 160ms |
| URQ-4 | URQ-4 | hecho | card-hecho | `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` (original URL, image < 500px wide — use `width="100%"`) | 240ms |
| URQ-5 | URQ-5 | debatido | card-opinion | `Justo_José_de_Urquiza_(retrato).jpg` (500px thumb, already in use) | 320ms |
| URQ-6 | URQ-6 | opini&#xF3;n | card-opinion | none | 400ms |

**URQ-1 image URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg`
**URQ-3 image URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG/500px-Palacio_San_Jos%C3%A9_Fachada.JPG`
**URQ-4 image URL:** `https://upload.wikimedia.org/wikipedia/commons/2/2e/Daguerrotipo_de_Justo_Jos%C3%A9_de_Urquiza_%28recorte%29.jpg` (use as-is with `width="100%"`)
**URQ-5 image URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Justo_Jos%C3%A9_de_Urquiza_%28retrato%29.jpg/500px-Justo_Jos%C3%A9_de_Urquiza_%28retrato%29.jpg`

> **Note on URQ-1 URL:** The image is already used in index.html around line 1636. Before writing the HTML, verify the exact src URL that's already in use with `grep "Justo_Jos" index.html | head -5` and reuse that same URL string rather than guessing.

### Special patterns

**URQ-3 inline card-nota-certeza:** The excerpt must include the `<span class="card-nota-certeza">` element inline — do not strip it. See draft for exact text.

**URQ-5 nota-historiografica:** Use two-position format (revisionista + liberal/síntesis) as a `<p class="card-nota-historiografica">` paragraph. The PARÁFRASIS text from the draft becomes `event-card__excerpt` prose, not a blockquote.

**URQ-6 no blockquote:** The excerpt is attributed paraphrase (Mayer, Halperin). Do not introduce a new `<blockquote>` for Alberdi — the existing alberdi-quote at lines ~2274–2276 covers that connection.

### Outer wrapper structure

```html
<div id="rev-urquiza-perfil" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">Urquiza: Perfil y Trayectoria (1801–1851)</h3>
  <div class="events-grid events-grid--certeza" aria-label="Cards sobre Urquiza, 1801–1851">
    <!-- URQ-1 through URQ-6 articles -->
  </div>
</div><!-- /#rev-urquiza-perfil -->
```

### Build Order

1. **Verify current state:** `grep -c 'sub-nav__link' index.html` → expect 7. `grep -n '/#rev-1835-1852' index.html` → note line number.
2. **Build temp file:** Write the full new HTML block (sub-period + 6 cards) to a temp file, e.g. `.gsd/tmp/urquiza-cards.html`.
3. **Apply edit 1 (sub-nav):** Use Edit tool to insert the 8th `<a>` after the 7th sub-nav link.
4. **Apply edit 2 (body):** Use Edit tool to insert the new sub-period block immediately before `        </div><!-- /#rev-1835-1852 -->`.
5. **Verify:** Run the checks below.

### Verification Approach

```bash
# 1. Sub-nav count = 8
grep -c 'sub-nav__link' index.html

# 2. New section ID exists
grep -c 'id="rev-urquiza-perfil"' index.html   # → 1

# 3. 6 URQ cards present
grep -c 'data-id="URQ-' index.html   # → 6

# 4. All 6 data-certeza annotations present
grep -c 'URQ-[1-6]' index.html   # → ≥6

# 5. URQ-5 debatido present
grep 'data-certeza="debatido".*URQ-5\|URQ-5.*data-certeza="debatido"' index.html
# or: grep -c 'data-id="URQ-5"' index.html → 1

# 6. URQ-6 opinión entity correct
grep 'data-certeza="opini&#xF3;n".*URQ-6\|URQ-6.*opini&#xF3;n' index.html

# 7. No JS syntax errors
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX:', e.message); else console.log('OK'); }"

# 8. card-nota-certeza preserved in URQ-3
grep 'card-nota-certeza' index.html   # → must return ≥1 result (may already exist elsewhere)
grep -A2 'URQ-3' index.html | grep 'card-nota-certeza'   # → 1 result

# 9. Insertion anchor still intact (closing comment survived)
grep -c '/#rev-1835-1852' index.html   # → 1

# 10. No duplicate Alberdi blockquote in URQ-6 area
# Manual check: grep -A20 'URQ-6' index.html | grep 'blockquote'   # → 0
```

---

## Constraints

- **No new CSS or JS** — all patterns are covered by existing classes. Zero new rules needed.
- **Python unavailable** — use Node.js for any scripted manipulation (KNOWLEDGE.md).
- **Avoid heredocs** — write temp file with Write tool, then edit index.html with Edit tool (KNOWLEDGE.md).
- **data-certeza="opini&#xF3;n" must use HTML entity** `&#xF3;` — not raw ó — per D053 (Windows encoding round-trip safety).
- **URQ-4 image has no 500px thumb** — use original URL with `width="100%"` per KNOWLEDGE.md.
- **URQ-6 must NOT add a new alberdi-quote blockquote** — the existing one at ~line 2275 already covers the Urquiza–Alberdi connection.
- **Insertion is before `<!-- /#rev-1835-1852 -->`**, NOT inside `#rev-1835-1852`. The new sub-period is a sibling that precedes the closing comment of the old sub-period.

## Common Pitfalls

- **Wrong insertion point** — the new block goes BEFORE `</div><!-- /#rev-1835-1852 -->`, creating a new sibling sub-period, not inside the existing one. Inserting inside `#rev-1835-1852` would place Urquiza cards inside the Época de Rosas section.
- **URQ-5 PARÁFRASIS text** — draft marks positions as `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]`. These go into `event-card__excerpt` as plain prose, not as `<blockquote>` elements. The historiographic positions are summarized narratively per the draft excerpt.
- **Stagger delay ordering** — URQ-2 has no image; URQ-6 has no image; the stagger should still increment by 80ms for each card (0ms, 80ms, 160ms, 240ms, 320ms, 400ms).
- **URQ-1 image URL** — the image is already in use in index.html; grep the existing URL to reuse the exact string rather than re-constructing it.
- **Sub-nav observer** — the `rev-urquiza-perfil` div gets the `sub-period` class (required for the sub-nav IntersectionObserver to pick it up). This is already in the proposed outer wrapper structure.
