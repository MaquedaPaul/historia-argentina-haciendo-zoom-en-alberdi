# S02: Integración HTML — UAT

**Milestone:** M015
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: S02 makes two types of changes — static HTML/CSS insertions (verifiable with grep/node) and runtime behavior (scroll-reveal, sub-nav tracking). Both are covered: artifact checks confirm structural correctness; browser inspection confirms runtime behavior. No server-side logic or user accounts involved.

## Preconditions

1. Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M015`
2. A local HTTP server serving `index.html` is running (e.g., `npx http-server . -p 8767` or equivalent)
3. Browser DevTools available (Chrome or Firefox recommended)
4. `node` is available in the terminal (`node --version` returns a version)

## Smoke Test

```bash
grep -c 'data-certeza=' index.html
```
**Expected:** `98`

If this returns 98, the 5 new cards are present and the file is not corrupted.

---

## Test Cases

### 1. data-certeza count is exactly 98

```bash
grep -c 'data-certeza=' index.html
```
**Expected:** `98`
**Failure signal:** any other number — check `grep -n 'data-certeza=' index.html | tail -20` to locate missing or extra cards.

---

### 2. #rev-generacion-37 section is present in the correct position

```bash
grep -n "rev-generacion-37" index.html
```
**Expected:** exactly 3 lines:
- line ~331: sub-nav `<a href="#rev-generacion-37" ...>`
- line ~1442: `<div id="rev-generacion-37" class="sub-period reveal reveal-fade">`
- line ~1523: `</div><!-- /#rev-generacion-37 -->`

Then confirm order:
```bash
grep -n "/#rev-1820-1835\|rev-generacion-37\|id=\"periodo-rosas\"" index.html
```
**Expected:** the three landmarks appear in ascending line order: `/#rev-1820-1835` → `rev-generacion-37` open → `rev-generacion-37` close → `periodo-rosas`.

---

### 3. Sub-nav link uses correct span class

```bash
grep -n "rev-generacion-37" index.html | grep "sub-nav__link-label"
```
**Expected:** 1 match, containing `<span class="sub-nav__link-label">Generación del 37</span>`.
**Failure signal:** 0 matches — the link is either missing or using a bare `<span>` without the class.

---

### 4. CSS rule for block-level aside is present

```bash
grep -n "card-nota-certeza:not(span)" styles.css
```
**Expected:** 1 match at approximately line 1228.
**Failure signal:** 0 matches — the aside on GEN37-3 will render flat (no border, no visual distinction).

---

### 5. No JS syntax errors

```bash
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:',e.message); else console.log('OK'); }"
```
**Expected:** `OK`
**Failure signal:** `SYNTAX ERROR: ...` — a syntax error was introduced into `app.js`.

---

### 6. Section renders in browser with 5 cards

1. Open `http://localhost:8767` (or your local server port) in the browser
2. Open DevTools → Console
3. Run:
```js
const section = document.querySelector('#rev-generacion-37');
console.log({
  sectionFound: !!section,
  cardCount: section?.querySelectorAll('[data-certeza]').length,
  asideFound: !!section?.querySelector('aside.card-nota-certeza'),
});
```
**Expected:**
```
{ sectionFound: true, cardCount: 5, asideFound: true }
```

---

### 7. Block-level aside has amber left border (CSS applied)

1. In DevTools Console (with section visible):
```js
const aside = document.querySelector('#rev-generacion-37 aside.card-nota-certeza');
const cs = window.getComputedStyle(aside);
console.log({
  borderLeftStyle: cs.borderLeftStyle,   // expected: "solid"
  borderLeftWidth: cs.borderLeftWidth,   // expected: non-zero (e.g. "3px" or "2.4px" at 0.8 dpr)
  paddingLeft: cs.paddingLeft,           // expected: "12px" (0.75rem)
  fontSize: cs.fontSize,                 // expected: "14px" (0.875rem)
});
```
**Expected:** `borderLeftStyle: "solid"`, `borderLeftWidth` non-zero, `paddingLeft: "12px"`, `fontSize: "14px"`.
**Failure signal:** `borderLeftStyle: "none"` or `borderLeftWidth: "0px"` — rule not applying, check specificity in DevTools → Elements → aside → Styles tab.

---

### 8. Inline span.card-nota-certeza elements are unaffected

1. In DevTools Console:
```js
const spans = document.querySelectorAll('span.card-nota-certeza');
const affected = Array.from(spans).filter(s => 
  window.getComputedStyle(s).borderLeftStyle !== 'none'
);
console.log({ spanCount: spans.length, incorrectlyStyled: affected.length });
```
**Expected:** `incorrectlyStyled: 0` — the `:not(span)` qualifier prevents bleed.
**Failure signal:** `incorrectlyStyled > 0` — the CSS rule is leaking to inline spans in BIOG cards.

---

### 9. Sub-nav link activates on scroll to #rev-generacion-37

1. Scroll the page to the `#rev-generacion-37` section
2. Open DevTools → Console and check for:
```
[SubNav] Active sub-period → rev-generacion-37
```
3. Alternatively, inspect the sub-nav link element — it should receive the active class while the section is in the top 30% of the viewport.
**Expected:** Sub-nav link becomes active; no JS errors in console.

---

### 10. Scroll-reveal animation fires on all 5 cards

1. Navigate to the page from the top (do not start scrolled to the section)
2. Scroll down to `#rev-generacion-37`
3. Observe the 5 cards entering the viewport
**Expected:** Cards reveal with stagger fade animation (each card slightly delayed after the previous). If `prefers-reduced-motion` is enabled in the OS, cards appear instantly with no animation — both are correct behavior.

---

## Edge Cases

### Inline span safety (BIOG section)

1. Scroll to the biography/BIOG section near the top of the page (lines ~381–560 of index.html)
2. Find any inline `<span class="card-nota-certeza">` elements
3. Visually confirm they have no left border and no extra padding
**Expected:** Inline spans render as normal inline text — no visual change from the S02 CSS addition.

### GEN37-3 aside content readable

1. Scroll to the Salón Literario card (GEN37-3, `data-certeza="hecho"`)
2. Locate the aside below the main excerpt
3. Confirm it shows the 🔍 icon, the `Nota:` label in bold, and the date dispute text about 23 vs. 26 June 1837
**Expected:** Aside is visually distinct (amber left border), text is readable, icon present.

---

## Failure Signals

- `grep -c 'data-certeza=' index.html` returns anything other than 98 → card insertion incomplete or extra cards added
- `grep -n "rev-generacion-37" index.html` returns 0 lines → section was not inserted
- `grep -n "rev-generacion-37" index.html | grep "sub-nav__link-label"` returns 0 → sub-nav link missing or malformed
- `grep -n "card-nota-certeza:not(span)" styles.css` returns 0 → CSS rule not present
- `node -e "new Function(..."` returns `SYNTAX ERROR` → app.js is broken
- Browser: section not found, cardCount ≠ 5 → DOM structure mismatch
- Browser: `borderLeftWidth: "0px"` on aside → CSS specificity conflict

---

## Not Proven By This UAT

- Full cross-browser rendering (only Chrome/Chromium tested during development)
- Mobile layout of the new section at 320px–640px viewport widths
- Performance impact of adding 5 cards (negligible given static HTML, but not measured)
- Whether the certeza color coding (amber, gray, etc.) is visually sufficient for color-blind users
- End-to-end scroll behavior with all sections loaded simultaneously on low-end hardware

---

## Notes for Tester

- **Port may vary:** The dev server was run on port 8767 during development (8765 was occupied). Use whatever port your local server is on.
- **The pre-existing 404 error** in the browser console predates M015 — it is unrelated to S02 and can be ignored.
- **Device pixel ratio affects `borderLeftWidth` reading:** At 0.8 dpr, `getComputedStyle` returns `"2.4px"` for a 3px border — this is correct, not a failure.
- **data-certeza accent variants:** Some cards use `data-certeza="opinion"` (no accent), others `data-certeza="opinión"` (with accent). Both are in use across the codebase. Test Case 6 uses `[data-certeza]` (attribute presence) which catches both — no accent issue for count verification.
