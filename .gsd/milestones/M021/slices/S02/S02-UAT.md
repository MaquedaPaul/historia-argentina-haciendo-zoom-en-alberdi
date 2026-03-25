# S02: Formación en España, identidad criolla, logias y Granaderos — UAT

**Milestone:** M021
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S02 produces static HTML content with no runtime logic, no server, no user state. All observable behavior (card count, certeza attributes, nota visibility, image URLs, JS health) is verifiable via DOM queries and grep on the built file. Browser rendering can be confirmed by opening `index.html` directly.

## Preconditions

1. `index.html` exists in the working directory and has been modified by T01.
2. `app.js` exists and is syntactically valid.
3. A browser is available to open `index.html` directly (no server required — static file).
4. Browser console is accessible (DevTools).

## Smoke Test

Open `index.html` in a browser. Run in console:

```js
document.querySelectorAll('#rev-san-martin .event-card').length
```

**Expected:** `6` — confirms the sub-period container exists and all 6 cards were inserted.

---

## Test Cases

### 1. Sub-period container exists exactly once

**Verify via grep:**
```bash
grep -c 'id="rev-san-martin"' index.html
```

**Expected:** `1`

**Why:** A count of 0 means the block was never inserted; a count of 2+ means a duplicate injection occurred.

---

### 2. Total data-certeza count is 99

**Verify via grep:**
```bash
grep -c 'data-certeza' index.html
```

**Expected:** `99`

**Why:** Baseline was 93 before S02. Adding 6 new cards = 99. Any other value means cards are missing or the baseline changed.

---

### 3. Two debatido cards exist in the sub-period

**Verify via grep:**
```bash
grep -c 'data-certeza="debatido"' index.html
```

**Expected:** `7`

**Why:** Baseline was 5 debatido cards. S02 adds 2 (Entradas 3 and 4: logias and identidad criolla). Total = 7.

**Verify in browser console:**
```js
document.querySelectorAll('#rev-san-martin [data-certeza="debatido"]').length
```
**Expected:** `2`

---

### 4. Historiographic notes are visible (not hidden inside card-detail)

**Verify via grep:**
```bash
grep -c 'card-nota-historiografica' index.html
```

**Expected:** `14` (baseline 12 + 2 new)

**Verify in browser console:**
```js
// Returns 2 if notes exist and are positioned correctly
document.querySelectorAll('#rev-san-martin .card-nota-historiografica').length
```
**Expected:** `2`

```js
// Returns null if notes are NOT hidden inside a collapsed detail — must be null
document.querySelector('#rev-san-martin .card-nota-historiografica').closest('[hidden]')
```
**Expected:** `null` — if this returns an element, the nota is inside `card-detail hidden` and will not be visible to users without expanding.

---

### 5. Granaderos image uses direct URL (no /thumb/)

**Verify via grep:**
```bash
grep 'Uniformes_Granaderos' index.html | grep -v '/thumb/'
```

**Expected:** 1 match (line containing the direct Wikimedia URL)

**Verify in browser console:**
```js
document.querySelector('#rev-san-martin img[src*="Uniformes_Granaderos"]').src
```
**Expected:** URL containing `commons/3/31/Uniformes_Granaderos_a_caballo_1816.png` without `/thumb/` path segment.

---

### 6. app.js syntax is valid

```bash
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

**Expected:** `OK`

---

### 7. Expand/collapse works on all 6 cards

In the browser, for each of the 6 cards in `#rev-san-martin`:

1. Locate the card in the page (scroll to the `#rev-san-martin` section).
2. Click the expand toggle button ("Ver más detalle" or "▼" label).
3. **Expected:** The `card-detail` section expands smoothly; content is readable.
4. Click the toggle again.
5. **Expected:** The `card-detail` section collapses. No JS errors in console.

**Verify toggle buttons exist:**
```js
document.querySelectorAll('#rev-san-martin .card-expand-toggle').length
```
**Expected:** `6`

---

### 8. Reveal-on-scroll operates correctly

1. Open `index.html` in a browser.
2. Scroll from the top of the page down to the `#rev-san-martin` section.
3. **Expected:** Cards in `#rev-san-martin` fade/slide in as they enter the viewport. Cards do not appear pre-rendered before the section scrolls into view (unless the page is short enough that they are immediately visible).

**Verify reveal classes are assigned:**
```js
// At least 1 card should have reveal--visible after scrolling into view
document.querySelectorAll('#rev-san-martin .event-card.reveal--visible').length
```
**Expected:** ≥ 1 after scrolling to the section.

---

### 9. Certeza distribution is correct (4 hecho, 2 debatido in the sub-period)

```js
const sm = document.querySelectorAll('#rev-san-martin [data-certeza]');
const dist = [...sm].reduce((acc, el) => {
  const c = el.dataset.certeza;
  acc[c] = (acc[c] || 0) + 1;
  return acc;
}, {});
console.log(dist);
```

**Expected:** `{ hecho: 4, debatido: 2 }` (Entradas 1, 2, 5, 6 = hecho; Entradas 3, 4 = debatido)

---

### 10. Connector block between sub-periods is intact

```bash
grep 'CONECTOR ALBERDI.*SP1.*SP2' index.html
```

**Expected:** 1 match — confirms the Alberdi connector comment between `#rev-1800-1820` and the next section was not damaged by the insertion.

---

## Edge Cases

### Edge Case A: card-nota-historiografica is not duplicated inside card-detail

In the browser:
```js
// Should return empty NodeList — no nota inside a card-detail
document.querySelectorAll('#rev-san-martin .card-detail .card-nota-historiografica')
```
**Expected:** `NodeList []` (length 0)

If this returns elements, the nota was accidentally placed in two locations.

---

### Edge Case B: No JS console errors on page load

1. Open `index.html` in browser with DevTools Console open.
2. Hard reload (Ctrl+Shift+R / Cmd+Shift+R).
3. Scroll through the entire page including `#rev-san-martin`.
4. **Expected:** Zero red errors in console. Yellow warnings from Wikimedia image loading (HTTP 429 rate-limit) are acceptable — this is a known curl/server-side behavior that does not affect browser rendering.

---

### Edge Case C: Section renders at 320px width

1. Open DevTools → device toolbar → set width to 320px.
2. Scroll to `#rev-san-martin`.
3. **Expected:** Cards stack in single column. Text is readable. No horizontal overflow. Nota historiográfica text wraps correctly. Expand toggle is tappable.

---

### Edge Case D: Section renders at 1920px+ width

1. Open DevTools → device toolbar → set width to 1920px (or use a wide monitor).
2. Scroll to `#rev-san-martin`.
3. **Expected:** Cards display in multi-column grid (2–3 columns depending on minmax). Content is readable. No excessively wide cards. Section does not break page layout.

---

## Failure Signals

- `document.querySelectorAll('#rev-san-martin .event-card').length` returns `0` → block was not inserted; check anchor text was matched correctly.
- `grep -c 'data-certeza' index.html` returns `93` (baseline) instead of `99` → cards were not injected.
- `document.querySelector('#rev-san-martin .card-nota-historiografica').closest('[hidden]')` returns an element → nota is inside collapsed `card-detail` and won't be readable without user action.
- `grep 'Uniformes_Granaderos' index.html | grep '/thumb/'` returns a match → Granaderos image is using a thumb path that will 404.
- JS syntax check returns `SYNTAX ERROR:` → the HTML injection corrupted `app.js` or `index.html` contains a script tag with malformed inline JS.
- `grep -c 'CONECTOR ALBERDI.*SP1.*SP2' index.html` returns `0` → the Alberdi connector comment was accidentally overwritten during injection.

## Not Proven By This UAT

- Whether images actually load at runtime (Wikimedia rate-limiting affects server-side curl checks but not browser rendering — visual confirmation in browser is the correct test).
- Sub-nav link to `#rev-san-martin` (deferred to S05).
- `revolucion-timeline` markers for 1812/1817 (deferred to S05).
- Cards added in S03 and S04 (not yet present).
- `querySelectorAll('#rev-san-martin [data-certeza]').length >= 14` milestone criterion (requires S04 completion).

## Notes for Tester

- The `#rev-san-martin` section appears between `#rev-1800-1820` and the Alberdi connector pasaje. Scroll past the "1800–1820" sub-period heading to find it.
- Entradas 1–4 share the same Gil de Castro portrait fallback image — this is intentional (no period-specific images available for formation/logias topics). Don't flag as a bug.
- Cards 3 and 4 (logias, identidad criolla) should display the balance-scale icon (⚖) and the label "Debatido historiográficamente" plus a visible historiographic note paragraph — verify both are present without expanding the card.
- The Granaderos card (Entrada 5) image may appear slightly smaller or differently proportioned than other cards because it uses a direct 495px URL rather than a 500px thumb — this is correct behavior.
