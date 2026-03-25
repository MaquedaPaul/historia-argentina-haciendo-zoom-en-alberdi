# S07: Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga — UAT

**Milestone:** M007
**Written:** 2026-03-22

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: This slice produces two HTML cards in a static site. Shell checks verify structural integrity; browser DOM queries verify runtime registration and certeza classification; narrative review verifies content correctness and promise fulfillment. No backend, no auth, no state transitions — the full slice output is inspectable in the HTML file and browser.

## Preconditions

- A local HTTP server is running serving `index.html` from the working directory (e.g., `npx http-server -p 8099` or equivalent)
- Browser navigated to `http://localhost:<port>/index.html`
- `index.html` is the file at the root of the worktree — not the main repository copy (worktrees may diverge)
- The tester has a browser DevTools console available

## Smoke Test

```bash
grep -c 'id="BIOG-21"' index.html   # → 1
grep -c 'id="BIOG-22"' index.html   # → 1
grep -c 'data-certeza' index.html   # → 56
```
If all three return expected values, the slice shipped. Proceed to full test cases.

---

## Test Cases

### 1. Thematic block is present and correctly placed within #rev-alberdi-quiroga

1. Open browser DevTools → Console
2. Run: `document.querySelector('#rev-alberdi-quiroga h4.sub-period__subtitle:last-of-type').textContent`
3. **Expected:** The text contains "El rechazo del viaje: análisis" (or similar — the heading of the new thematic block)
4. Run: `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length`
5. **Expected:** `6` (BIOG-17 through BIOG-22 — four pre-existing from S05/S06 plus the two new ones)

### 2. BIOG-21 is a card-hecho with correct content and no verbatim BIOG-18 quotes

1. In the browser, scroll to the "Alberdi y Facundo Quiroga (1834–1835)" sub-period
2. Scroll past BIOG-17, BIOG-18, BIOG-19, BIOG-20 until you reach the "El rechazo del viaje: análisis" heading
3. Read BIOG-21 (the left-column card)
4. **Expected:**
   - The card displays as a `card-hecho` (green/neutral styling, no "Opinión" badge)
   - The card narrates the episode of Alberdi returning the bank draft (libranza) to Quiroga
   - The card does NOT contain the phrase "Lo visité con repetición" (verbatim from BIOG-18)
   - The card does NOT contain the phrase "Al día siguiente le hice una visita respetuosa" (verbatim from BIOG-18)
   - The card has a `card-nota-certeza` visible in the body noting that the "gesto de independencia" framing is historiographic, not Alberdi's own words
   - The card footer `<cite>` references *Obras Completas* or *Mi vida privada*
5. In DevTools Console, run: `document.querySelector('#BIOG-21').dataset.certeza`
6. **Expected:** `"hecho"`

### 3. BIOG-22 is a card-opinion with historian attribution and correct certeza

1. Read BIOG-22 (the right-column card in the "El rechazo del viaje: análisis" block)
2. **Expected:**
   - The card displays as a `card-opinion` with a "💬 Interpretación historiográfica" badge (or similar opinion indicator)
   - The card header shows date "1834" and type "Opinión"
   - The card body presents four numbered reasons for the rejection
   - The body explicitly names **Jorge Mayer** (*Alberdi y su tiempo*, EUDEBA, 1963) as a source
   - The body explicitly names **Tulio Halperin Donghi** as a source
   - A `card-nota-certeza` is visible stating that the four factors are historiographic inferences, not documented facts
3. In DevTools Console, run: `document.querySelector('#BIOG-22').dataset.certeza`
4. **Expected:** `"opinion"` (no accent — normalized form used since M004)

### 4. BIOG-18's promise is fulfilled

1. Scroll back up to BIOG-18 within the same sub-period
2. Find the `card-nota-certeza` at the bottom of BIOG-18's body
3. **Expected:** The note reads something like "El análisis de esa decisión se desarrolla en una sección posterior de este sitio"
4. Scroll down to BIOG-22 (which is in the same sub-period, a few cards below)
5. **Expected:** BIOG-22 is the visible "sección posterior" that delivers the promised analysis — both cards are within `#rev-alberdi-quiroga` without navigating to a new section

### 5. Sub-nav integrity preserved (no new link added)

1. In DevTools Console, run: `document.querySelectorAll('.sub-nav .sub-nav__link').length`
2. **Expected:** `6` (same as before S07 — no new sub-nav link was added)
3. Run: `document.querySelectorAll('#periodo-revolucion .sub-period').length`
4. **Expected:** `6` (same count — no new sub-period was created)
5. In the browser, inspect the sub-nav for the "1800–1860" period
6. **Expected:** The "Alberdi y Facundo Quiroga" link is present; no new link appears for the new thematic block

### 6. Reveal animation system registered new elements

1. In DevTools Console, run: `document.querySelectorAll('.reveal').length`
2. **Expected:** `79` (was 76 before S07; the new h4 + BIOG-21 + BIOG-22 = 3 new reveal elements)
3. Scroll through the page starting from above the Quiroga sub-period
4. **Expected:** BIOG-21 and BIOG-22 animate in (fade/slide) as they enter the viewport — they do not appear instantly (unless already in viewport on load)

---

## Edge Cases

### BIOG-21 does not duplicate any content from BIOG-18

1. In DevTools Console, run:
   ```js
   const b18 = document.querySelector('#BIOG-18').textContent;
   const b21 = document.querySelector('#BIOG-21').textContent;
   console.log('shared long phrase:', b21.includes('Lo visité con repetición'));
   console.log('shared long phrase 2:', b21.includes('Al día siguiente le hice una visita respetuosa'));
   ```
2. **Expected:** both `false` — no verbatim lift from BIOG-18's blockquotes

### BIOG-22 certeza badge with no-accent value

1. In DevTools Console, run:
   ```js
   document.querySelector('#BIOG-22 .card-certeza-indicator').textContent
   ```
2. **Expected:** Contains "Opinión" or "Interpretación historiográfica" — the badge text for opinion cards
3. Run: `document.querySelector('#BIOG-22').getAttribute('data-certeza')`
4. **Expected:** `"opinion"` (NOT `"opinión"` with accent — see KNOWLEDGE.md certeza normalization entry)

### CRLF integrity (Windows line endings preserved)

```bash
node -e "
  const fs = require('fs');
  const html = fs.readFileSync('index.html', 'utf8');
  const crlfLines = html.split('\r\n').length;
  const lfLines = html.split('\n').length;
  console.log('CRLF lines:', crlfLines, '| LF lines:', lfLines, '| Match:', crlfLines === lfLines);
"
```
**Expected:** Both counts equal (2043) and `Match: true` — no mixed line endings introduced by the splice

### New block is inside #rev-alberdi-quiroga, not after it

```bash
node -e "
  const html = require('fs').readFileSync('index.html','utf8');
  const start = html.indexOf('id=\"rev-alberdi-quiroga\"');
  const end = html.indexOf('</div><!-- /#rev-alberdi-quiroga -->');
  const section = html.slice(start, end);
  console.log('BIOG-21 in section:', section.includes('id=\"BIOG-21\"'));
  console.log('BIOG-22 in section:', section.includes('id=\"BIOG-22\"'));
"
```
**Expected:** both `true`

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns anything other than `56` → insertion failed, partially applied, or duplicate
- `grep -c 'id="BIOG-21"' index.html` returns `0` → T02 insertion did not run or the anchor wasn't found
- `grep -c 'id="BIOG-21"' index.html` returns `2` → duplicate insertion occurred; the CRLF-safe splice ran twice
- `grep -c 'sub-nav__link' index.html` returns `7` → a new sub-nav link was accidentally added; sub-period invariant broken
- `grep -c 'rev-alberdi-quiroga' index.html` returns anything other than `3` → a new sub-period was accidentally created
- `document.querySelector('#BIOG-22').dataset.certeza` returns `"opinión"` (with accent) → certeza normalization regression (should be `"opinion"` per M004+ convention)
- BIOG-21 and BIOG-22 display at full opacity without scrolling → reveal system misconfigured (but this is also expected in Playwright headless without viewport scroll)
- The "El rechazo del viaje: análisis" heading is not visible in the browser → the h4 was inserted outside the sub-period or never inserted

---

## Not Proven By This UAT

- Mobile layout rendering at 375px — verified in prior slices; this slice adds no new CSS and uses existing grid classes
- Cross-browser compatibility (Firefox, Safari) — the site uses standard HTML/CSS; no browser-specific patterns were introduced
- The specific page/passage citations in Mayer and Halperin Donghi — the attribution to these historians is correct in substance but direct page references were not verified against digitized copies of those books
- The "correct" historical answer to why Alberdi rejected the trip — BIOG-22 presents the best available historiographic consensus; the actual reasons are not documented in Alberdi's own words

---

## Notes for Tester

- **The two new cards are in a thematic synthesis block** — not appended to the existing Quiroga narrative block (BIOG-19 + BIOG-20). Look for the `<h4>El rechazo del viaje: análisis</h4>` heading between the existing BIOG-20 card and the end of the sub-period.
- **BIOG-18 is the "promise" card** — it explicitly tells the reader that the reasons for the rejection will be explained later. BIOG-22 is the payoff. Reading them in sequence (BIOG-18 → scroll down → BIOG-22) is the intended user journey.
- **Playwright/headless screenshot caveat:** Cards appear blank (opacity:0) in headless screenshots before IntersectionObserver fires. This is not a rendering bug — it is the reveal animation's initial state. Scroll into the viewport or use `browser_evaluate` to force-reveal for visual verification.
- **The `data-certeza="rumor"` entries visible in the failure-path diagnostic grep** are two pre-existing cards from earlier slices — they are valid and expected. Do not interpret them as errors.
