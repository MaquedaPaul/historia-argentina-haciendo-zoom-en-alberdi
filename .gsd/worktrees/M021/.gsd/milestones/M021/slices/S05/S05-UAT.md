# S05: Sub-nav, timeline y verificación final — UAT

**Milestone:** M021
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S05 delivers purely structural HTML/CSS changes with no runtime state, no user-input flows, and no async behavior. All correctness properties are verifiable against the static files via grep, Node.js DOM boundary counts, and browser DevTools console queries. The sub-nav and timeline are rendered by the existing JS infrastructure without new code — the only risk is missing markup or missing CSS stagger rules, both of which are directly observable.

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M021`
- `index.html` and `styles.css` are the files as modified by T01
- Node.js available in shell for boundary-count checks
- Browser (any modern): open `index.html` locally or via `http://localhost:PORT` to run DevTools checks
- For responsive checks: use DevTools device emulation at 320px and 1920px

## Smoke Test

Run in the worktree directory:

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const a=h.match(/href=\"#rev-san-martin\"/g); const b=h.match(/revolucion-timeline__marker/g); console.log('sub-nav:', a?a.length:0, b?b.length:0, 'markers'); console.log(a&&a.length===1&&b&&b.length===14?'SMOKE PASS':'SMOKE FAIL');"
```

**Expected:** `sub-nav: 1 14 markers` followed by `SMOKE PASS`

---

## Test Cases

### 1. Sub-nav link to #rev-san-martin is present

**Purpose:** Confirms the 8th sub-nav link was inserted and the SubNav observer can detect it.

1. Run: `grep -c 'href="#rev-san-martin"' index.html`
2. **Expected:** `1`
3. Run: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/class=\"sub-nav__link\"/g); console.log(m?m.length:0);"`
4. **Expected:** `8`
5. Open `index.html` in browser, open DevTools console, run: `document.querySelector('a[href="#rev-san-martin"]').textContent`
6. **Expected:** Contains `"1812"` and `"San Martín Libertador"`
7. Run: `document.querySelectorAll('.sub-nav__link').length` in console
8. **Expected:** `8`

---

### 2. Sub-nav link navigates to #rev-san-martin section

**Purpose:** Confirms the link scrolls correctly to the section and the URL fragment is valid.

1. Open `index.html` in browser, scroll down to the `#periodo-revolucion` section so the sticky sub-nav is visible
2. Click the "1812–1822 / San Martín Libertador" sub-nav link
3. **Expected:** Page scrolls to the `#rev-san-martin` sub-period section; the San Martín cards are visible on screen; URL hash changes to `#rev-san-martin`

---

### 3. revolucion-timeline has exactly 14 markers

**Purpose:** Confirms all 4 new markers were inserted without removing existing ones.

1. Run: `grep -c 'revolucion-timeline__marker' index.html`
2. **Expected:** `14`
3. Run in browser console: `document.querySelectorAll('.revolucion-timeline__marker').length`
4. **Expected:** `14`
5. Run: `grep 'marker-pos:' index.html | grep -E '20\.00|21\.67|28\.33|30\.00'`
6. **Expected:** 4 lines, one each for 20.00%, 21.67%, 28.33%, 30.00%

---

### 4. 1812 and 1817 markers are specifically present at correct positions

**Purpose:** Confirms the two milestone-required markers (1812 Granaderos, 1817 Cruce) are at the correct `--marker-pos` values derived from the `(year - 1800) / 60 * 100` formula.

1. Run: `grep -c 'marker-pos: 20.00%' index.html`
2. **Expected:** `1`  (1812: (1812-1800)/60*100 = 20.00%)
3. Run: `grep -c 'marker-pos: 28.33%' index.html`
4. **Expected:** `1`  (1817: (1817-1800)/60*100 = 28.33%)
5. In browser DevTools Elements panel, find the marker with `--marker-pos: 20.00%` and verify its label text contains "1812" and "San Martín"
6. **Expected:** Label reads "1812" with sublabel "San Martín"

---

### 5. CSS stagger rules extended to nth-child(15)

**Purpose:** Confirms the 8 new CSS rules exist so no marker is permanently at opacity:0 after scroll-reveal fires.

1. Run: `grep -c 'nth-child(15)' styles.css`
2. **Expected:** `2` (one dot rule, one label rule)
3. Run: `grep -c 'nth-child(12)' styles.css`
4. **Expected:** `2`
5. Run: `grep -c 'nth-child(13)' styles.css`
6. **Expected:** `2`
7. Run: `grep -c 'nth-child(14)' styles.css`
8. **Expected:** `2`

---

### 6. #rev-san-martin has ≥14 cards with data-certeza

**Purpose:** Confirms S04 content integrity is intact — S05 edits did not corrupt the sub-period content.

1. Run:
   ```bash
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"
   ```
2. **Expected:** `15`
3. Run: `grep -c 'data-certeza' index.html`
4. **Expected:** `108` (global total — unchanged by S05)
5. In browser console: `document.querySelectorAll('#rev-san-martin [data-certeza]').length`
6. **Expected:** `15`

---

### 7. JS syntax clean, no console errors

**Purpose:** Confirms no syntax error was introduced and the browser runtime is clean.

1. Run:
   ```bash
   node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"
   ```
2. **Expected:** `syntax OK`
3. Open `index.html` in browser; open DevTools console; filter by "Errors"
4. **Expected:** Zero red errors. Debug-level `[DEBUG]` logs (14 entries) are expected and benign.
5. Run in console: `document.querySelectorAll('.card-nota-certeza').length`
6. **Expected:** ≥0 (any value is fine — just confirms the DOM is queryable without error)

---

### 8. SubNav observer initializes with 8 links

**Purpose:** Confirms the JS SubNav module auto-detected the new link without any code changes.

1. Open `index.html` in browser; open DevTools console; filter by "SubNav"
2. **Expected:** Log entry: `[SubNav] Initialized with 8 sub-periods, 8 links.`
3. If the log shows `7 links`, the sub-nav link was not inserted correctly

---

### 9. Responsive layout — 320px

**Purpose:** Confirms sub-nav doesn't break at minimum viewport width.

1. In browser DevTools, set viewport to 320px width
2. Scroll to `#periodo-revolucion` section
3. Inspect the sticky sub-nav bar
4. **Expected:** Sub-nav has `overflow-x: auto`; user can scroll horizontally through the 8 links; no horizontal overflow on the page body; no content is clipped or illegible
5. The San Martín link text "1812–1822" with sublabel is readable (though it may require scrolling the sub-nav)

---

### 10. Responsive layout — 1920px

**Purpose:** Confirms sub-nav renders correctly at wide viewports with 8 links.

1. In browser DevTools, set viewport to 1920px width (or use a wide monitor)
2. Scroll to `#periodo-revolucion` section
3. **Expected:** All 8 sub-nav links are visible; no overflow or wrapping issues; the "1812–1822 / San Martín Libertador" link is visually consistent with the other 7 links

---

## Edge Cases

### Timeline marker animation visibility

**Scenario:** Markers 1812/1813/1817/1818 may be invisible if CSS stagger is missing.

1. Load `index.html` in browser from the top (do not pre-scroll)
2. Scroll slowly past `#periodo-revolucion` until the `revolucion-timeline` track is in view
3. Watch the markers animate in sequence (stagger)
4. **Expected:** All 14 dots and labels animate in; none remain permanently at opacity:0
5. If any 4 markers are invisible after scroll-reveal fires: run `grep -c 'nth-child(1[2-5])' styles.css` — expected `8` (2 per nth-child level × 4 levels)

---

### Label overlap in 1810–1820 cluster

**Scenario:** Four markers within ~10% of track span could visually overlap.

1. Scroll to the revolucion-timeline with DevTools Elements panel open
2. Inspect the markers at positions 20.00%, 21.67%, 26.67%, 28.33%
3. **Expected:** 1812 label appears below the track; 1813 label appears above; 1816 label appears below; 1817 label appears above — alternating pattern prevents overlap
4. At 320px viewport: small sub-labels may be hidden (CSS `display:none` for mobile); verify labels "1812" / "1813" / "1816" / "1817" are still readable

---

### Navigation anchoring to #rev-san-martin

**Scenario:** Verify the `#rev-san-martin` element is actually in the DOM and focusable from the address bar.

1. In browser address bar, navigate to `index.html#rev-san-martin`
2. **Expected:** Page jumps directly to the San Martín sub-period section; the section heading "San Martín: Libertador de América" (or equivalent) is visible near the top of the viewport

---

## Failure Signals

- `grep -c 'href="#rev-san-martin"' index.html` returns `0` → sub-nav link was not inserted
- `grep -c 'revolucion-timeline__marker' index.html` returns `10` or `13` → one or more markers missing
- `grep -c 'nth-child(15)' styles.css` returns `0` or `1` → CSS stagger not extended; 4 markers will be permanently invisible at opacity:0 after scroll (no JS error)
- `grep -c 'data-certeza' index.html` returns anything other than `108` → S05 edit corrupted pre-existing content
- Browser console `[SubNav]` log shows `7 links` instead of `8` → sub-nav link present in HTML but not found by the observer (check element is inside `#periodo-revolucion .sub-nav`)
- 4 markers invisible after scroll-reveal: missing nth-child stagger rules — check `styles.css` for nth-child(12)–(15) in both dot and label rule blocks
- JavaScript `SyntaxError` in console: syntax was broken by an edit to `app.js` (unlikely — S05 did not touch `app.js`)

## Not Proven By This UAT

- Visual quality of marker label typography at intermediate viewports (480px, 768px, 1024px) — only 320px and 1920px+ are specified in the milestone DoD
- Smooth scroll behavior when clicking the sub-nav link (depends on browser scroll behavior settings and `prefers-reduced-motion`)
- Aria/accessibility of the sub-nav link (keyboard navigation, screen reader announcement) — not in M021 scope
- Historical accuracy of the 1812/1813/1817/1818 event labels in the timeline — verified in S01 research but not re-verified in this UAT
- Whether the `--above` modifier labels are visually non-overlapping on all monitor DPR combinations — only standard 1x DPR tested

## Notes for Tester

- The 14 `[DEBUG]` console log entries are expected and benign — they come from `app.js` initialization routines and are not errors
- The sub-nav may require horizontal scrolling at 320px to reach the "1812–1822" link — this is the correct behavior (`overflow-x: auto`) and not a defect
- When testing timeline animation visibility, always load from the top of the page and scroll down; refreshing while already at `#rev-san-martin` may give the markers `reveal--no-anim` instead of `reveal--visible` (see KNOWLEDGE.md: "Reveal System: reveal--no-anim vs reveal--visible")
- The Guayaquil card uses `data-certeza="debatido"` rendered with `card-opinion` CSS class — this is intentional (D052); querying by CSS class will not distinguish it from standard opinion cards, but querying by attribute (`[data-certeza="debatido"]`) will
