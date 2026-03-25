# S21: La Suma del Poder Público — ¿avalada por todas las provincias? — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S21 is a static HTML content slice — there is no server, no runtime, no user accounts, and no dynamic state. All correctness claims are verifiable by inspecting the HTML file directly (grep counts, DOM structure checks) and by opening the page in a browser to confirm visual rendering and reveal animations.

## Preconditions

1. Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`.
2. `index.html` has been modified by T02 (confirmed: `grep -c 'data-certeza' index.html` returns 88).
3. A browser capable of rendering HTML5 is available (Chrome, Firefox, or Edge).
4. To test reveal animations, open the page from the top (do not navigate directly to `#periodo-rosas`) — elements already in the viewport on load receive `reveal--no-anim`, not `reveal--visible`, which is correct behavior.

## Smoke Test

Run:
```bash
grep -c 'data-certeza' index.html    # must return 88
grep -c 'data-id="S21-' index.html  # must return 2
```
If both return the expected values, the splice is present and the slice basically works.

---

## Test Cases

### 1. Both S21 cards are present in the HTML with correct identifiers

**Steps:**
1. Run: `grep -n 'data-id="S21-' index.html`
2. **Expected:** Two lines, one containing `data-id="S21-1"` and one containing `data-id="S21-2"`. Both should appear before the append marker line (verify with `grep -n 'cards will be appended here' index.html` — S21 card lines should have lower line numbers than the marker).

---

### 2. S21-1 has correct certeza classification and card type

**Steps:**
1. Run: `grep -A2 'data-id="S21-1"' index.html`
2. **Expected:** The article element has `class="event-card card-hecho reveal reveal-slide"` and `data-certeza="hecho"`. The certeza indicator icon should be `&#x2713;` (✓) and label `Hecho documentado`.

---

### 3. S21-1 lists all 14 provinces of the 1835 Confederation

**Steps:**
1. Run: `grep -o 'Jujuy' index.html | head -5` (Jujuy is the most unusual entry — autonomous since 1834, often omitted)
2. Run: `sed -n '1973,1995p' index.html` and visually scan for all 14 province names: Buenos Aires, Córdoba, Corrientes, Entre Ríos, Santa Fe, Santiago del Estero, Tucumán, Salta, Mendoza, San Juan, La Rioja, Catamarca, San Luis, Jujuy.
3. **Expected:** All 14 province names are present in S21-1's excerpt paragraph, entity-encoded where necessary (e.g., `C&#xF3;rdoba`, `Tucum&#xE1;n`, `M&#xE9;ndoza`).

---

### 4. S21-1 does NOT re-narrate S14-1 content

**Steps:**
1. Run: `node -e "const f=require('fs').readFileSync('index.html','utf8'); const s21=f.slice(f.indexOf('data-id=\"S21-1\"'),f.indexOf('data-id=\"S21-2\"')); const banned=['9,316','9316','Restaurador de las Leyes','13 de abril de 1835']; const found=banned.filter(b=>s21.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"`
2. **Expected:** `SCOPE_PASS` — none of the four banned strings appear in the S21-1 card body.

---

### 5. S21-1 contains a back-reference to S14-1

**Steps:**
1. Run: `grep 'S14-1' index.html | grep 'S21-1\|S21\|Suma.*otorgada\|abril de 1835'`
2. Alternatively: `sed -n '1973,1992p' index.html | grep 'S14-1'`
3. **Expected:** The excerpt paragraph contains an explicit reference like "cuya concesión cubre la tarjeta S14-1" — confirming the scope boundary is documented in the rendered content, not just in metadata.

---

### 6. S21-2 has correct certeza classification (opinión, entity-encoded)

**Steps:**
1. Run: `grep -A2 'data-id="S21-2"' index.html`
2. **Expected:** The article element has `class="event-card card-opinion reveal reveal-slide"` and `data-certeza="opini&#xF3;n"` (entity-encoded accent). The certeza indicator icon should be `&#x1F4AC;` (💬) and label `Interpretación historiográfica`.

---

### 7. S21-2 contains a card-nota-historiografica with all three positions

**Steps:**
1. Run: `grep -A30 'data-id="S21-2"' index.html | grep 'card-nota-historiografica'`
2. Run: `grep -A30 'data-id="S21-2"' index.html | grep -c 'Irazusta\|Mitre\|Lynch'`
3. **Expected:** (a) `card-nota-historiografica` paragraph is present; (b) grep count returns 3 — all three historians (Irazusta for revisionist position, Mitre for liberal position, Lynch for contemporary synthesis) are cited within the nota.

---

### 8. S21-2 nota historiográfica is positioned correctly (after excerpt, before footer)

**Steps:**
1. Run: `sed -n '1992,2025p' index.html`
2. Visually verify the order of elements within the S21-2 `<article>`:
   - `<div class="card-certeza-indicator">` first
   - `<span class="event-card__year">` 
   - `<h3 class="event-card__title">`
   - `<p class="event-card__excerpt">` (the framing question)
   - `<p class="card-nota-historiografica">` (three-position debate)
   - `<footer class="card-source">` last
3. **Expected:** The nota historiográfica paragraph appears between the excerpt and the footer — matching the established pattern from S14-3, S15-2, S16-3, S17-1, S19-2.

---

### 9. Append marker remains intact after splice

**Steps:**
1. Run: `grep -c 'cards will be appended here by subsequent slices' index.html`
2. **Expected:** Returns `1` — exactly one marker, confirming it was not removed or duplicated by the splice.

---

### 10. No CSS or JS changes were introduced

**Steps:**
1. Run: `git diff --name-only HEAD -- styles.css app.js`
2. **Expected:** Empty output — S21 introduced zero new CSS or JS.

---

### 11. Reveal animation fires for S21 cards (visual)

**Steps:**
1. Open `index.html` in a browser (file:// or local server).
2. Navigate to the top of the page (do not jump directly to `#periodo-rosas`).
3. Scroll down through the page until the `#periodo-rosas` section becomes visible.
4. Continue scrolling until the S21 cards enter the viewport.
5. **Expected:** S21-1 animates in first (reveal-slide, no delay). S21-2 animates in ~80ms after S21-1 (stagger delay: 80ms). Both cards use the `reveal-slide` class — they should slide in from below or side, consistent with all other cards in the grid.

---

### 12. S21-1 Pellegrini image loads correctly (visual)

**Steps:**
1. Open `index.html` in a browser with network access.
2. Navigate to the S21-1 card.
3. **Expected:** The Carlos Pellegrini river view of Buenos Aires (ca. 1829) loads from Wikimedia Commons. The `img-attribution` paragraph reads "Carlos Pellegrini, *Buenos Aires — San Nicolás*, ca. 1829. Wikimedia Commons. Dominio público." If the image fails to load (network issue), the card should display the alt text gracefully — not a broken image icon.

---

## Edge Cases

### Entity-encoding: ü renders correctly in S21-2 nota

**Steps:**
1. Open `index.html` in a browser.
2. Navigate to the S21-2 card and read the nota historiográfica.
3. Find the word "ambigüedad" (near the end of the Lynch/Myers synthesis paragraph).
4. **Expected:** The word renders as "ambigüedad" (with ü), not as "ambig&#xFC;edad" (raw entity) or "ambig?" (encoding failure). All major browsers decode `&#xFC;` correctly.

---

### S21-2 has no image (consistent behavior)

**Steps:**
1. Run: `sed -n '1992,2025p' index.html | grep 'card-image'`
2. **Expected:** Empty output — S21-2 contains no `<div class="card-image">` block. This is intentional, consistent with the pure historiographic debate card pattern (S17-1, S18-1, S19-1, S19-2 also have no images).

---

### Stagger delay values are correct

**Steps:**
1. Run: `grep -A1 'data-id="S21-' index.html | grep 'reveal-delay'`
2. **Expected:** S21-1 has `--reveal-delay: 0ms`; S21-2 has `--reveal-delay: 80ms`. Per-slice stagger resets to 0ms (does not continue cumulative delay from prior slices).

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns anything other than 88 → splice failed or introduced duplicate cards; restore from `C:/tmp/index.html.bak-s21`.
- `grep -c 'data-id="S21-' index.html` returns 0 → T02 splice did not execute; re-run T02.
- `grep -c 'data-id="S21-' index.html` returns 4 → both HTML comments AND data-id attributes are present in both cards (known multiplier issue from S13 KNOWLEDGE entry); not a functional failure, but a verification-count discrepancy.
- `grep -c 'cards will be appended here' index.html` returns 0 → marker was accidentally removed; check `diff C:/tmp/index.html.bak-s21 index.html` and restore.
- `grep -c 'cards will be appended here' index.html` returns 2+ → marker was duplicated; index.html is malformed; restore from backup.
- `git diff --name-only HEAD -- styles.css app.js` returns `styles.css` or `app.js` → S21 violated the zero-new-CSS/JS constraint; revert those files.
- S21-1 excerpt renders blank or malformed HTML → entity-encoding issue in the splice; compare with `C:/tmp/s21-cards.html` as reference.
- `card-nota-historiografica` paragraph missing from S21-2 in the browser → the nota was outside the article boundary in the HTML; inspect the DOM structure with browser DevTools.

---

## Not Proven By This UAT

- **Cross-browser rendering beyond visual spot-check** — this UAT covers Chrome/Firefox/Edge but does not run automated cross-browser tests. Safari rendering is not verified.
- **Mobile responsiveness of the new cards** — S21-1 and S21-2 follow the same card template as all M008 cards; mobile layout is inherited. No new CSS was introduced, so no new mobile breakpoints were created, but the cards have not been specifically tested at 375px.
- **Accessibility audit of S21 cards** — screen reader behavior (aria-labels, heading hierarchy, alt text quality) is not formally tested in this UAT. The cards follow established M008 templates which were not accessibility-audited per-slice.
- **Load performance** — the Pellegrini Wikimedia image is loaded lazily (`loading="lazy"`); actual lazy-load behavior under slow network conditions is not verified.
- **The Wikimedia image URL stability** — the URL is valid today; Wikimedia occasionally renames or reclassifies files. Not a deployment concern for this milestone.

---

## Notes for Tester

- The S21 cards appear near the **end of the `#periodo-rosas` section grid**, immediately before the `<!-- S10–S24 cards will be appended here -->` marker. There are many cards before them (S09 through S20 cards). Scroll past all of them to reach S21-1 and S21-2.
- The back-reference "cuya concesión cubre la tarjeta S14-1" in S21-1 is intentional — it tells the reader that the plebiscite event is documented elsewhere. This is not an error or incomplete sentence.
- S21-2's `data-certeza="opini&#xF3;n"` (entity-encoded in source HTML) decodes to `data-certeza="opinión"` in the DOM. CSS selectors using `[data-certeza="opinión"]` (native char) will match correctly; `[data-certeza="opini&#xF3;n"]` will not work as a CSS selector (entities are HTML-only).
- If the Pellegrini image doesn't load during testing (network-dependent), the `initImageFallbacks` function in `app.js` will handle it gracefully with a styled placeholder — this is expected behavior, not a bug.
