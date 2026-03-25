# S02 — Research: Formación en España, identidad criolla, logias y Granaderos

**Date:** 2026-03-25

## Summary

S02 is straightforward HTML integration work. The content draft (S01-CONTENT-DRAFT.md) is complete with all 15 entries — S02 is responsible for Entries 1–6. All editorial decisions (certeza, images, historiographic notes, insertion point) were resolved in S01. The task is mechanical: create `<div id="rev-san-martin" class="sub-period reveal reveal-fade">` at the correct anchor in index.html and populate it with 6 cards following patterns already in the codebase.

The only non-trivial element in S02 is the `card-nota-historiografica` content for Entries 3 and 4 (logias/Logia Lautaro) — these use `data-certeza="debatido"` with the balance-scale icon (&#x2696;) and a visible `<p class="card-nota-historiografica">` paragraph containing the three-position historiographic note. This pattern is established at lines 1754–1770 and 1791–1808 of index.html. No new JS, CSS, or patterns are needed.

Entry 5 (Granaderos) has a 495px image that requires the direct URL (no `/thumb/`) pattern; Entry 6 (San Lorenzo) uses the standard 500px thumb. All other S02 entries use the Gil de Castro portrait fallback (already in index.html at line 1308).

## Recommendation

Write S02's 6 cards to a temp file, then insert them as the body of a new `#rev-san-martin` sub-period div immediately after `</div><!-- /#rev-1800-1820 -->` (index.html line 1331) and before the `<!-- CONECTOR ALBERDI — SP1 → SP2 -->` block (line 1333). The insertion goes between these two lines — the Alberdi connector stays in place after the new sub-period.

Use `Write` for the temp file then targeted `Edit` to inject into index.html. Do NOT use heredoc (KNOWLEDGE.md: "Avoid heredocs for content that will be appended to files").

## Implementation Landscape

### Key Files

- `index.html` — single target file; insert `#rev-san-martin` block at line 1332 (between `</div><!-- /#rev-1800-1820 -->` and `<!-- CONECTOR ALBERDI `). Only file that changes in S02.
- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — canonical source for all card content (titles, excerpts, detail text, sources, wikimedia URLs, historiographic notes). Read before writing HTML.

### Insertion Anchor (textual, not line number)

Anchor string to search for:
```
        </div><!-- /#rev-1800-1820 -->

        <!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->
```

The new `#rev-san-martin` block goes between these two elements. After S02, the order in index.html is:
1. `</div><!-- /#rev-1800-1820 -->`
2. `<div id="rev-san-martin" ...>` ← new
3. `</div><!-- /#rev-san-martin -->`
4. `<!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->`
5. `<div id="rev-1820-1835" ...>`

### Card Templates to Follow

**Card hecho** (Entries 1, 2, 5, 6): Copy pattern from lines 1213–1246 of index.html (SP1-1 card). Structure:
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image"><img src="..." alt="..." loading="lazy"></div>
  <span class="event-card__year">...</span>
  <h3 class="event-card__title">...</h3>
  <p class="event-card__excerpt">...</p>
  <button class="card-expand-toggle" aria-expanded="false">
    <span class="card-expand-toggle__text">Ver más</span>
    <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
  </button>
  <div class="card-detail" hidden>
    <p>...</p>
  </div>
  <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>...</cite></footer>
</article>
```

**Card debatido** (Entries 3, 4): Copy pattern from lines 1754–1770 of index.html (S14-3). Structure:
```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
    <span class="card-certeza-label">Debatido historiográficamente</span>
  </div>
  <div class="card-image"><img src="..." alt="..." loading="lazy"></div>
  <span class="event-card__year">...</span>
  <h3 class="event-card__title">...</h3>
  <p class="event-card__excerpt">...</p>
  <button class="card-expand-toggle" aria-expanded="false">...</button>
  <div class="card-detail" hidden><p>...</p></div>
  <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>
  <footer class="card-source">...</footer>
</article>
```

Note: the `card-nota-historiografica` goes AFTER the detail block, before the footer. This matches the pattern in S14-3 and is the correct position for the visible epistemic notice.

### Sub-period Container Structure

```html
<!-- ══════════════════════════════════════════════════
     SUB-PERÍODO SAN MARTÍN: Formación, Campañas y Retiro (1778–1850)
     15 eventos — 9 hecho, 3 debatido, 1 opinión, 1 hecho+nota
     S02: Entradas 1–6 | S03: Entradas 7–10 | S04: Entradas 11–15
     ══════════════════════════════════════════════════ -->
<div id="rev-san-martin" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">San Martín: Formación, Campañas y Retiro del Poder (1778–1850)</h3>
  <div class="events-grid events-grid--certeza" aria-label="Arco completo de José de San Martín (1778–1850)">
    <!-- Entries 1–6 (S02) -->
    <!-- Entries 7–10 (S03) -->
    <!-- Entries 11–15 (S04) -->
  </div><!-- /.events-grid rev-san-martin -->
</div><!-- /#rev-san-martin -->
```

The events-grid must have `events-grid--certeza` class (required for certeza-aware card sizing, per KNOWLEDGE.md).

### Stagger Delays

6 cards in S02; apply `--reveal-delay` in 80ms increments:
- Entry 1: 0ms
- Entry 2: 80ms
- Entry 3: 160ms
- Entry 4: 240ms
- Entry 5: 320ms
- Entry 6: 400ms

S03 and S04 will continue from 480ms or reset to 0ms inside their own grid sections if the sub-period has secondary grids. Simplest: start from 0ms per entry since each card has its own reveal-slide animation and the reveal system fires per IntersectionObserver entry.

### Special Image Cases (FRAGILE)

- **Entry 5 (Granaderos):** Image is 495px — use URL directly without `/thumb/` path:
  `https://upload.wikimedia.org/wikipedia/commons/3/31/Uniformes_Granaderos_a_caballo_1816.png`
  Do NOT construct a thumb URL for this image — it will 404.
  
- **Entry 6 (San Lorenzo):** Standard 500px thumb, works normally:
  `https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Batalla_de_San_Lorenzo_por_Villanueva.jpg/500px-Batalla_de_San_Lorenzo_por_Villanueva.jpg`

- **Entries 1–4 (fallback):** All use the Gil de Castro portrait (same as SP1-5 in index.html):
  `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg`

### Certeza Encoding

- `data-certeza="hecho"` → Entries 1, 2, 5, 6
- `data-certeza="debatido"` → Entries 3, 4 (NO accent — distinct from `opinión`)
- Icons: ✓ for hecho, &#x2696; for debatido

### Expand/Collapse Toggle

All 6 S02 cards should include `<button class="card-expand-toggle">` + `<div class="card-detail" hidden>`. The JS in app.js auto-discovers `.card-expand-toggle` via event delegation on the section root — no per-card wiring needed (KNOWLEDGE.md: "Event delegation on the section root").

### Build Order

1. Read S01-CONTENT-DRAFT.md entries 1–6 (already done in this research pass)
2. Write full `#rev-san-martin` HTML block to a temp file
3. Use `Edit` to insert the block into index.html at the anchor
4. Verify with `grep -c 'id="rev-san-martin"' index.html` → should be 1
5. Verify with `grep -c 'data-certeza' index.html` vs. baseline to confirm +6 new cards

### Verification Approach

```bash
# 1. Sub-period div exists
grep -c 'id="rev-san-martin"' index.html   # → 1

# 2. Correct number of S02 cards added
grep -c 'data-certeza' index.html           # baseline before + 6

# 3. Both debatido cards present
grep -c 'data-certeza="debatido"' index.html  # existing + 2 new

# 4. Historiographic notes present
grep -c 'card-nota-historiografica' index.html  # existing + 2 new (Entries 3, 4)

# 5. Granaderos image URL uses direct (no /thumb/)
grep 'Uniformes_Granaderos' index.html | grep -v '/thumb/'  # → 1 match

# 6. JS syntax check (KNOWLEDGE.md pattern)
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"
# → syntax OK (no new JS added, but confirm no accidental corruption)
```

## Constraints

- Zero new JavaScript — expand/collapse, reveal, lightbox auto-discover new elements
- `card-nota-historiografica` must be VISIBLE (not inside `card-detail` hidden) — epistemic notice for debatido cards must always show (KNOWLEDGE.md: "Reserve expand/collapse toggles for supplementary detail")
- Insertion must use `Edit` with exact text match — the anchor string `</div><!-- /#rev-1800-1820 -->` is unique in index.html (confirmed via grep)
- Image for Entry 5 must NOT use `/thumb/` path (495px, under 500px threshold)

## Common Pitfalls

- **Using heredoc for large HTML blocks** — always write to temp file then `cat` append or use `Edit` tool (KNOWLEDGE.md: "Avoid heredocs")
- **Accent on `debatido`** — the value is `"debatido"` without accent. Using `"débatido"` or `"debátido"` will silently fail certeza detection. The KNOWLEDGE.md note on D057 shows both `opinion` and `opinión` exist; `debatido` is consistently without accent across the codebase.
- **`card-nota-historiografica` inside `card-detail`** — placing it inside the collapsed detail block hides the historiographic note from users who don't expand. It must be outside and after `card-detail`, before `card-source` footer.
- **Forgetting `events-grid--certeza`** on the grid div — without this class, cards don't render with certeza-aware sizing.
- **Stagger delays**: 6 cards at 80ms increments (0, 80, 160, 240, 320, 400ms). Don't skip or reuse values.
