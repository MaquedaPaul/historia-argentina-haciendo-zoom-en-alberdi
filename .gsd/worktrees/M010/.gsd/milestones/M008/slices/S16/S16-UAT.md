# S16: La represión rosista — ¿perseguía y mataba? — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This is a static HTML site. The slice adds three cards to a static page — correctness can be fully verified by inspecting the HTML artifact. No server, database, or runtime state is involved. The reveal-on-scroll behavior is tested by an existing integration pattern that has been proven across 15 prior slices.

## Preconditions

- `index.html` in the working directory contains the three S16 cards (confirmed: data-certeza count = 79)
- No local web server is required for DOM structure verification — grep/inspection is sufficient
- For browser-based visual/scroll verification: open `index.html` directly in any modern browser (Chrome, Firefox, Edge) — no build step needed
- Recovery backup at `C:/tmp/index.html.bak-s16` is available if rollback is needed

## Smoke Test

```bash
grep -c 'data-id="S16-' index.html
```
Expected: `3`. If this returns 0 or any value other than 3, the splice failed and all subsequent tests are invalid.

---

## Test Cases

### 1. Three S16 cards are present with correct data-id attributes

```bash
grep -c 'data-id="S16-' index.html     # → 3
grep -c 'data-id="S16-1"' index.html   # → 1
grep -c 'data-id="S16-2"' index.html   # → 1
grep -c 'data-id="S16-3"' index.html   # → 1
```

**Expected:** Each command returns exactly 1 (or 3 for the first). Returns of 0 mean a card is missing; returns of 2+ mean a card was duplicated.

---

### 2. Certeza classification is correct per card

```bash
grep 'data-id="S16-1"' index.html   # → data-certeza="hecho"
grep 'data-id="S16-2"' index.html   # → data-certeza="hecho"
grep 'data-id="S16-3"' index.html   # → data-certeza="debatido"
```

**Expected:**
- S16-1: `data-certeza="hecho"` (Mazorca mechanics — documented historical fact)
- S16-2: `data-certeza="hecho"` (Exile mechanics — documented historical fact)
- S16-3: `data-certeza="debatido"` (Scale debate — historiographically contested)

---

### 3. Total data-certeza count is 79 (was 76 before S16)

```bash
grep -c 'data-certeza' index.html
```

**Expected:** `79`. A count of 76 means the splice failed silently. A count above 79 means cards were inserted more than once.

---

### 4. Append marker is intact exactly once (S17 can still target it)

```bash
grep -c 'cards will be appended here' index.html
```

**Expected:** `1`. A count of 0 means the marker was accidentally deleted — S17 will not be able to find its insertion point. A count of 2+ means the marker was duplicated.

---

### 5. No new CSS or JS was introduced

```bash
git diff --name-only HEAD -- styles.css app.js
```

**Expected:** Empty output. Any file listed here means CSS or JS was inadvertently modified, violating the slice constraint.

---

### 6. S16-3 contains a card-nota-historiografica with three named positions

```bash
grep -A 10 'data-id="S16-3"' index.html | grep 'card-nota-historiografica'
```

**Expected:** Returns a match. Then inspect the nota text manually:

1. Open `index.html` in a text editor and search for `data-id="S16-3"`.
2. Read the `<p class="card-nota-historiografica">` element.
3. **Expected:** Three distinct positions are named:
   - Liberal estimate (López 1883 — hundreds to low thousands, systematic)
   - Revisionist contextualization (Irazusta 1941, Rosa 1964 — figures inflated by exile propaganda)
   - Contemporary synthesis (Lynch 1981, Halperin Donghi 1972 — hundreds defensible, selectively organized)
4. **Expected:** Each position has at least one explicit source citation with author + year.

---

### 7. S16-1 image is the Facundo cover (not a portrait)

1. Search `index.html` for `data-id="S16-1"`.
2. Inspect the `<div class="card-image"><img src="...">` element.
3. **Expected:** `src` URL contains `Civilizaci%C3%B3n_y_Barbarie_Sarmiento_portada` — the 1845 Sarmiento *Facundo* cover from Wikimedia Commons.
4. **Expected:** `alt` text describes the book cover, not a portrait of a person.

---

### 8. S16-2 has no image (consistent with context card pattern)

1. Search `index.html` for `data-id="S16-2"`.
2. Inspect the card HTML.
3. **Expected:** No `<div class="card-image">` element inside the S16-2 article. The card starts directly with the year span and title heading.

---

### 9. Florencio Varela assassination is attributed, not asserted

1. Search `index.html` for `Florencio Varela`.
2. Read the sentence describing the assassination.
3. **Expected:** Language uses attribution: "la historiografía liberal atribuye el crimen a un agente de la Mazorca" with a note that revisionists dispute this attribution. The sentence must NOT say "fue asesinado por la Mazorca" as a bare assertion of fact.

---

### 10. Reveal-on-scroll classes are present for all three cards

```bash
grep 'data-id="S16-1"' index.html | grep 'reveal reveal-slide'
grep 'data-id="S16-2"' index.html | grep 'reveal reveal-slide'
grep 'data-id="S16-3"' index.html | grep 'reveal reveal-slide'
```

**Expected:** Each command returns a match. All three cards must have `class="... reveal reveal-slide ..."` to participate in the existing reveal-on-scroll system.

---

### 11. Stagger delays follow the 0ms / 80ms / 160ms per-slice reset pattern

```bash
grep 'data-id="S16-1"' index.html | grep 'reveal-delay: 0ms'
grep 'data-id="S16-2"' index.html | grep 'reveal-delay: 80ms'
grep 'data-id="S16-3"' index.html | grep 'reveal-delay: 160ms'
```

**Expected:** Each command returns a match. This confirms the per-slice stagger reset (not cumulative from prior slices).

---

### 12. (Browser) Cards render and animate at scroll in #periodo-rosas

1. Open `index.html` in a browser.
2. Navigate to the **Unitarios y Federales** section (either via nav link or by scrolling).
3. Scroll down through the Rosas period cards until the new S16 cards come into view.
4. **Expected:**
   - S16-1 slides in from below with a slight delay.
   - S16-2 follows ~80ms after S16-1.
   - S16-3 follows ~80ms after S16-2.
   - S16-1 shows the *Facundo* book cover image.
   - S16-2 shows no image — text starts immediately after the certeza indicator.
   - S16-3 shows the ⚖ certeza icon (debatido) and the historiographic note is visible inline (not collapsed).
5. **Expected:** The section after the S16 cards (append marker area) is empty — no S17 content yet.

---

## Edge Cases

### Duplicate splice check

```bash
grep -c 'data-id="S16-1"' index.html
```

If this returns 2, the Node.js splice was run twice. **Expected: 1.** Recovery: restore from `C:/tmp/index.html.bak-s16` and re-splice once.

---

### Entity encoding: no mojibake in browser render

1. Open `index.html` in a browser (any modern browser).
2. Navigate to S16-1 card title: expected to read **"La Mazorca: estructura y métodos del terror documentado"** (with proper accented characters).
3. Navigate to S16-2 card title: expected to read **"El exilio como represión: confiscaciones, punzó y el brazo largo de la Mazorca"**.
4. Navigate to S16-3 card title: expected to read **"¿Cuántas víctimas? El debate sobre la escala de la represión rosista"**.
5. **Expected:** All accented characters (é, ó, ú, í, ñ, ¿) render correctly. Mojibake (e.g., `�`, `&#xF3;` rendered as literal text) means the file was saved with incorrect encoding.

---

### card-nota-historiografica total count

```bash
grep -c 'card-nota-historiografica' index.html
```

**Expected:** ≥ 5 (S14-3 + S15-2 + S16-3 = at least 3 new occurrences; prior slices may have added more). A count below 5 means S16-3's nota was not spliced correctly.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns 76 → splice did not execute; check `C:/tmp/s16-cards.html` exists and re-run Node.js splice
- `grep -c 'data-id="S16-' index.html` returns 0 → cards not inserted; check marker is present with `grep -c 'cards will be appended here' index.html`
- `grep -c 'data-id="S16-' index.html` returns 6 → cards inserted twice; restore from `C:/tmp/index.html.bak-s16`
- `grep -c 'cards will be appended here' index.html` returns 0 → append marker was accidentally deleted; S17 will not be able to find its insertion point; restore from backup
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty → CSS/JS was accidentally modified
- Browser shows `&#xF3;` as literal text (not ó) → file encoding issue; the HTML entities must be interpreted by the browser, not rendered as raw text (this would only happen if the file was opened in a non-UTF-8 context or the `<meta charset="UTF-8">` is missing)
- S16-3 `card-nota-historiografica` paragraph is missing → grep for `card-nota-historiografica` in the S16-3 card range; if absent, the nota block was dropped during splice

---

## Not Proven By This UAT

- Accessibility compliance (WCAG 2.1) of the new cards — not audited in this slice
- Mobile layout of the three new cards at 375px — not verified (existing responsive grid handles this, but visual confirmation at mobile was not run)
- Cross-browser rendering of entity-encoded characters beyond Chrome/Firefox — not tested
- Historical accuracy of the source citations (Lynch 1981 cap. 7, Irazusta 1941, Rosa 1964, Halperin Donghi 1972) against the original texts — verified at draft level in T01 but no primary source text comparison was performed

---

## Notes for Tester

- The new cards are at the **end** of the `#periodo-rosas` events grid, immediately before the `<!-- S10–S24 cards will be appended here -->` marker. They appear after the S15 Quiroga assassination cards (the last cards currently in the grid before S16).
- S16-3 (`¿Cuántas víctimas?`) uses `data-certeza="debatido"` — the certeza indicator shows ⚖ (scales) and the label reads "Debatido historiográficamente". This is visually distinct from S16-1 and S16-2 which show ✓ and "Hecho documentado".
- The *Facundo* cover on S16-1 is from Wikimedia Commons (`Civilización_y_Barbarie_Sarmiento_portada.jpg`). If the image fails to load in a browser without internet access, this is expected — the `initImageFallbacks()` function in `app.js` will substitute a styled placeholder automatically.
- The `card-nota-historiografica` in S16-3 is intentionally verbose — it names authors, book titles, publication years, and page-level citations for all three positions. This is by design (the scale debate requires explicit sourcing to be credible) and should not be shortened.
