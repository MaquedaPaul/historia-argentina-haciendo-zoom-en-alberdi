# S02: Integración HTML — UAT

**Milestone:** M016
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: The slice's deliverable is HTML content inserted into a static file. Artifact-driven checks (grep, node scripts) verify structural correctness. Live-runtime browser checks verify visual rendering, sub-nav behavior, and console cleanliness. No backend, no auth, no data seeding required.

## Preconditions

- `index.html` is the file in the working directory (M016 worktree or main repo)
- A browser or local static server is available to render `index.html`
- Node.js is available for the artifact verification scripts
- The `app.js` file is present alongside `index.html`

## Smoke Test

Run: `grep -c "rev-alberdi-mitre" index.html`

Expected: `3` (or any value ≥ 2). If this returns 0 or 1, the sub-period block or closing comment is missing — stop and investigate before running further tests.

## Test Cases

### 1. Sub-period block is structurally correct

```bash
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
console.log('start:', start, '| end:', end, '| end > start:', end > start);
const block = html.slice(start, end);
console.log('block length (chars):', block.length);
"
```

1. Run the script above.
2. **Expected:** `end > start: true` and `block length` between 3000–8000 characters. If `end` is -1, the closing comment `<!-- /#rev-alberdi-mitre -->` is missing. If `start` is -1, the wrapper `id="rev-alberdi-mitre"` is absent.

---

### 2. Certeza distribution — 3 hecho, 1 opinión

```bash
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
const hecho = (block.match(/data-certeza=\"hecho\"/g)||[]).length;
const opinion = (block.match(/card-opinion/g)||[]).length;
console.log('hecho:', hecho, '(expected 3) | card-opinion class count:', opinion, '(expected >=1)');
"
```

1. Run the script above.
2. **Expected:** `hecho: 3` and `card-opinion class count: 1` or higher (6 reflects nested class occurrences in Card D — any value ≥1 is acceptable).

---

### 3. Cite count — ≥4 sources cited

```bash
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
console.log('<cite> count:', (block.match(/<cite>/g)||[]).length, '(expected >=4)');
"
```

1. Run the script above.
2. **Expected:** `<cite> count: 4` or higher.

---

### 4. Nota historiográfica visible in Card C

```bash
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
console.log('card-nota-historiografica:', block.includes('card-nota-historiografica') ? 'PRESENT' : 'MISSING');
"
```

1. Run the script above.
2. **Expected:** `card-nota-historiografica: PRESENT`.

---

### 5. JS syntax check — no parse errors introduced

```bash
node -e "
try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); }
catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK'); }
"
```

1. Run the script above.
2. **Expected:** `syntax OK`. Any `SYNTAX ERROR:` line means `app.js` was corrupted during editing.

---

### 6. Banned phrases absent — no duplication of BIOG-13 or SP4-3

```bash
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
const b13 = block.includes('dej\xE1ndolo en Par\xEDs sin sueldo');
const sp43 = block.includes('revoluci\xF3n encabezada por Mitre separ\xF3');
console.log('BIOG-13 phrase:', b13 ? 'FOUND (BAD)' : 'absent (OK)');
console.log('SP4-3 phrase:', sp43 ? 'FOUND (BAD)' : 'absent (OK)');
"
```

1. Run the script above.
2. **Expected:** both lines report `absent (OK)`. Any `FOUND (BAD)` means content from BIOG-13 or SP4-3 was duplicated verbatim — remove the offending phrase.

---

### 7. Sub-nav link present and correctly positioned

```bash
grep -n "rev-alberdi-mitre\|rev-1852-1860" index.html | head -20
```

1. Run the command above.
2. **Expected:** The `#rev-1852-1860` sub-nav link line number is **lower** (earlier in file) than the `#rev-alberdi-mitre` sub-nav link. The `#rev-alberdi-mitre` sub-period wrapper (`id="rev-alberdi-mitre"`) must also appear — its line should come after the sub-nav link.
3. The sub-nav `<a href="#rev-alberdi-mitre"` link text should be `1848–1862 Alberdi y Mitre`.

---

### 8. Browser: section renders and sub-nav activates

1. Open `index.html` in a browser (local file or `http-server`).
2. Navigate to `#periodo-revolucion` section.
3. Look for a sub-nav bar with period links including `1848–1862 Alberdi y Mitre`.
4. Click the `1848–1862 Alberdi y Mitre` sub-nav link.
5. **Expected:** Page scrolls to the "Alberdi y Mitre: Dos Proyectos de País" sub-period header. Four cards are visible.
6. Open DevTools Console and scroll into the section from above.
7. **Expected:** Console shows `[SubNav] Active sub-period → rev-alberdi-mitre`. No new `ERROR` lines (one pre-existing 404 error from an unrelated resource is acceptable).

---

### 9. Browser: Card C nota historiográfica visible

1. Open `index.html` in browser, scroll to the `#rev-alberdi-mitre` section.
2. Find Card C: "La Constitución de 1853 — legado de Alberdi, derrota política".
3. **Expected:** Below the main excerpt text, a paragraph beginning with `Nota historiográfica:` in bold is visible without any click or expand action required.

---

### 10. Browser: Card D opinión badge and blockquote

1. Scroll to Card D: "Pavón y el modelo de país (1861–1862)".
2. **Expected:** An `OPINIÓN HISTORIOGRÁFICA` badge is visible at the top of the card. A blockquote with a Mayer attribution is visible inside the card body. The card has a distinct visual treatment vs. the 3 hecho cards.

---

## Edge Cases

### Missing closing comment `/#rev-alberdi-mitre`

1. Run: `grep -n "/#rev-alberdi-mitre" index.html`
2. **Expected:** exactly 1 result. If 0 results, the node verification scripts will silently slice to end-of-file and produce inflated counts. Fix: add `<!-- /#rev-alberdi-mitre -->` immediately after the sub-period's closing `</div>`.

### Sub-nav overflow on narrow viewport

1. Open `index.html`, resize browser to 375px width (mobile).
2. Scroll to `#periodo-revolucion` until the sub-nav becomes sticky.
3. **Expected:** Sub-nav with 8 links either wraps cleanly or scrolls horizontally without breaking the layout. Cards stack in single-column layout.

### Reveal animation fires on scroll (not on page load)

1. Open `index.html` from the top (do not scroll to `#rev-alberdi-mitre` before DOMContentLoaded).
2. Scroll down until `#rev-alberdi-mitre` enters viewport.
3. **Expected:** Cards animate in (fade/slide) as they enter the viewport. If the section was already visible on page load, cards appear instantly (`reveal--no-anim`) — this is correct behavior per the KNOWLEDGE.md entry on `reveal--no-anim` vs `reveal--visible`.

## Failure Signals

- `grep -c "rev-alberdi-mitre" index.html` returns 0 or 1 → block or closing comment missing
- `hecho: 0` or `card-opinion: 0` from certeza check → wrong certeza attribute values or missing card-opinion class
- `<cite> count: 0` → cite elements stripped or misplaced outside the block boundary
- `card-nota-historiografica: MISSING` → nota not present or placed outside the block
- `SYNTAX ERROR:` from JS check → `app.js` corrupted by the edit — restore from git
- `FOUND (BAD)` for either banned phrase → verbatim duplication of existing content
- `[SubNav] Initialized with 8 sub-periods, 7 links` in console → sub-nav link was not added
- No `[SubNav] Active sub-period → rev-alberdi-mitre` on scroll → sub-period ID mismatch between wrapper and sub-nav link href

## Not Proven By This UAT

- Visual fidelity of card images on a production CDN — all three specific Wikimedia images for Cards B, C, D were MISSING during development; fallback images are used. A production audit should re-verify those URLs.
- Cross-browser rendering beyond Chromium — the section uses CSS classes established in earlier milestones (tested on Chromium and Safari); no new CSS was introduced in S02.
- Lighthouse/performance impact of adding 4 cards — the cards follow the same structure as the 20 existing cards in the section; no new JS or CSS was added.

## Notes for Tester

- The one pre-existing 404 error (`Failed to load resource`) on each page load is unrelated to M016 — ignore it.
- Card D shows a `[WARNING] [Images] Failed to load` console warning for the inline SVG `data:` URI — this is a cosmetic issue with the app's fallback handler and does not affect rendering.
- Cards A and B share the same fallback image URL (Mitre retrato general). This is intentional — the three specific Wikimedia images were confirmed MISSING. The section is content-correct; image variety is a cosmetic follow-up.
- The `card-opinion class count: 6` reported by check #2 is correct — it reflects multiple class occurrences on nested elements within Card D, not 6 opinion cards. There is 1 opinion card in the block.
